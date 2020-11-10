/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTInspectorPackagerConnection.h"

#if RCT_DEV

#import "RCTDefines.h"
#import "RCTInspector.h"
//#import <React/RCTLog.h>
#import <SocketRocket/SRWebSocket.h>
//#import <React/RCTUtils.h>
#import <objc/message.h>

NSString *const RCTErrorDomain = @"RCTErrorDomain";;

extern NSError *RCTErrorWithMessage(NSString *message);

static id __nullable _RCTJSONParse(NSString *__nullable jsonString, BOOL mutable, NSError **error)
{
  static SEL JSONKitSelector = NULL;
  static SEL JSONKitMutableSelector = NULL;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    SEL selector = NSSelectorFromString(@"objectFromJSONStringWithParseOptions:error:");
    if ([NSString instancesRespondToSelector:selector]) {
      JSONKitSelector = selector;
      JSONKitMutableSelector = NSSelectorFromString(@"mutableObjectFromJSONStringWithParseOptions:error:");
    }
  });

  if (jsonString) {
    // Use JSONKit if available and string is not a fragment
    if (JSONKitSelector) {
      NSInteger length = jsonString.length;
      for (NSInteger i = 0; i < length; i++) {
        unichar c = [jsonString characterAtIndex:i];
        if (strchr("{[", c)) {
          static const int options = (1 << 2); // loose unicode
          SEL selector = mutable ? JSONKitMutableSelector : JSONKitSelector;
          return ((id(*)(id, SEL, int, NSError **))objc_msgSend)(jsonString, selector, options, error);
        }
        if (!strchr(" \r\n\t", c)) {
          break;
        }
      }
    }

    // Use Foundation JSON method
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    if (!jsonData) {
      jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:YES];
      if (jsonData) {
//        RCTLogWarn(
//            @"RCTJSONParse received the following string, which could "
//             "not be losslessly converted to UTF8 data: '%@'",
//            jsonString);
      } else {
        NSString *errorMessage = @"RCTJSONParse received invalid UTF8 data";
        if (error) {
          *error = RCTErrorWithMessage(errorMessage);
        } else {
//          RCTLogError(@"%@", errorMessage);
        }
        return nil;
      }
    }
    NSJSONReadingOptions options = NSJSONReadingAllowFragments;
    if (mutable) {
      options |= NSJSONReadingMutableContainers;
    }
    return [NSJSONSerialization JSONObjectWithData:jsonData options:options error:error];
  }
  return nil;
}

id __nullable RCTJSONParse(NSString *__nullable jsonString, NSError **error)
{
  return _RCTJSONParse(jsonString, NO, error);
}


static NSString *__nullable _RCTJSONStringifyNoRetry(id __nullable jsonObject, NSError **error)
{
  if (!jsonObject) {
    return nil;
  }

  static SEL JSONKitSelector = NULL;
  static NSSet<Class> *collectionTypes;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    SEL selector = NSSelectorFromString(@"JSONStringWithOptions:error:");
    if ([NSDictionary instancesRespondToSelector:selector]) {
      JSONKitSelector = selector;
      collectionTypes = [NSSet setWithObjects:[NSArray class],
                                              [NSMutableArray class],
                                              [NSDictionary class],
                                              [NSMutableDictionary class],
                                              nil];
    }
  });

  @try {
    // Use JSONKit if available and object is not a fragment
    if (JSONKitSelector && [collectionTypes containsObject:[jsonObject classForCoder]]) {
      return ((NSString * (*)(id, SEL, int, NSError **)) objc_msgSend)(jsonObject, JSONKitSelector, 0, error);
    }

    // Use Foundation JSON method
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonObject
                                                       options:(NSJSONWritingOptions)NSJSONReadingAllowFragments
                                                         error:error];

    return jsonData ? [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding] : nil;
  } @catch (NSException *exception) {
    // Convert exception to error
    if (error) {
      *error = [NSError errorWithDomain:RCTErrorDomain
                                   code:0
                               userInfo:@{NSLocalizedDescriptionKey : exception.description ?: @""}];
    }
    return nil;
  }
}

double RCTZeroIfNaN(double value)
{
  return isnan(value) || isinf(value) ? 0 : value;
}

id RCTJSONClean(id object)
{
  static dispatch_once_t onceToken;
  static NSSet<Class> *validLeafTypes;
  dispatch_once(&onceToken, ^{
    validLeafTypes =
        [[NSSet alloc] initWithArray:@ [[NSString class], [NSMutableString class], [NSNumber class], [NSNull class], ]];
  });

  if ([validLeafTypes containsObject:[object classForCoder]]) {
    if ([object isKindOfClass:[NSNumber class]]) {
      return @(RCTZeroIfNaN([object doubleValue]));
    }
    if ([object isKindOfClass:[NSString class]]) {
      if ([object UTF8String] == NULL) {
        return (id)kCFNull;
      }
    }
    return object;
  }

  if ([object isKindOfClass:[NSDictionary class]]) {
    __block BOOL copy = NO;
    NSMutableDictionary<NSString *, id> *values = [[NSMutableDictionary alloc] initWithCapacity:[object count]];
    [object enumerateKeysAndObjectsUsingBlock:^(NSString *key, id item, __unused BOOL *stop) {
      id value = RCTJSONClean(item);
      values[key] = value;
      copy |= value != item;
    }];
    return copy ? values : object;
  }

  if ([object isKindOfClass:[NSArray class]]) {
    __block BOOL copy = NO;
    __block NSArray *values = object;
    [object enumerateObjectsUsingBlock:^(id item, NSUInteger idx, __unused BOOL *stop) {
      id value = RCTJSONClean(item);
      if (copy) {
        [(NSMutableArray *)values addObject:value];
      } else if (value != item) {
        // Converted value is different, so we'll need to copy the array
        values = [[NSMutableArray alloc] initWithCapacity:values.count];
        for (NSUInteger i = 0; i < idx; i++) {
          [(NSMutableArray *)values addObject:object[i]];
        }
        [(NSMutableArray *)values addObject:value];
        copy = YES;
      }
    }];
    return values;
  }

  return (id)kCFNull;
}

NSString *__nullable RCTJSONStringify(id __nullable jsonObject, NSError **error)
{
  if (error) {
    return _RCTJSONStringifyNoRetry(jsonObject, error);
  } else {
    NSError *localError;
    NSString *json = _RCTJSONStringifyNoRetry(jsonObject, &localError);
    if (localError) {
//      RCTLogError(@"RCTJSONStringify() encountered the following error: %@", localError.localizedDescription);
      // Sanitize the data, then retry. This is slow, but it prevents uncaught
      // data issues from crashing in production
      return _RCTJSONStringifyNoRetry(RCTJSONClean(jsonObject), NULL);
    }
    return json;
  }
}

// This is a port of the Android impl, at
// ReactAndroid/src/main/java/com/facebook/react/devsupport/InspectorPackagerConnection.java
// please keep consistent :)

const int RECONNECT_DELAY_MS = 2000;

@implementation RCTBundleStatus
@end

@interface RCTInspectorPackagerConnection () <SRWebSocketDelegate> {
  NSURL *_url;
  NSMutableDictionary<NSString *, RCTInspectorLocalConnection *> *_inspectorConnections;
  SRWebSocket *_webSocket;
  dispatch_queue_t _jsQueue;
  BOOL _closed;
  BOOL _suppressConnectionErrors;
  RCTBundleStatusProvider _bundleStatusProvider;
}
@end

@interface RCTInspectorRemoteConnection () {
  __weak RCTInspectorPackagerConnection *_owningPackagerConnection;
  NSString *_pageId;
}
- (instancetype)initWithPackagerConnection:(RCTInspectorPackagerConnection *)owningPackagerConnection
                                    pageId:(NSString *)pageId;
@end

static NSDictionary<NSString *, id> *makePageIdPayload(NSString *pageId)
{
  return @{@"pageId" : pageId};
}

@implementation RCTInspectorPackagerConnection

//RCT_NOT_IMPLEMENTED(-(instancetype)init)

- (instancetype)initWithURL:(NSURL *)url
{
  if (self = [super init]) {
    _url = url;
    _inspectorConnections = [NSMutableDictionary new];
    _jsQueue = dispatch_queue_create("com.facebook.react.WebSocketExecutor", DISPATCH_QUEUE_SERIAL);
  }
  return self;
}

- (void)setBundleStatusProvider:(RCTBundleStatusProvider)bundleStatusProvider
{
  _bundleStatusProvider = bundleStatusProvider;
}

- (void)handleProxyMessage:(NSDictionary<NSString *, id> *)message
{
  NSString *event = message[@"event"];
  NSDictionary *payload = message[@"payload"];
  if ([@"getPages" isEqualToString:event]) {
    [self sendEvent:event payload:[self pages]];
  } else if ([@"wrappedEvent" isEqualToString:event]) {
    [self handleWrappedEvent:payload];
  } else if ([@"connect" isEqualToString:event]) {
    [self handleConnect:payload];
  } else if ([@"disconnect" isEqualToString:event]) {
    [self handleDisconnect:payload];
  } else {
//    RCTLogError(@"Unknown event: %@", event);
  }
}

- (void)sendEventToAllConnections:(NSString *)event
{
  for (NSString *pageId in _inspectorConnections) {
    [_inspectorConnections[pageId] sendMessage:event];
  }
}

- (void)closeAllConnections
{
  for (NSString *pageId in _inspectorConnections) {
    [[_inspectorConnections objectForKey:pageId] disconnect];
  }
  [_inspectorConnections removeAllObjects];
}

- (void)handleConnect:(NSDictionary *)payload
{
  NSString *pageId = payload[@"pageId"];
  RCTInspectorLocalConnection *existingConnection = _inspectorConnections[pageId];
  if (existingConnection) {
    [_inspectorConnections removeObjectForKey:pageId];
    [existingConnection disconnect];
//    RCTLogWarn(@"Already connected: %@", pageId);
    return;
  }

  RCTInspectorRemoteConnection *remoteConnection =
      [[RCTInspectorRemoteConnection alloc] initWithPackagerConnection:self pageId:pageId];

  RCTInspectorLocalConnection *inspectorConnection = [RCTInspector connectPage:[pageId integerValue]
                                                           forRemoteConnection:remoteConnection];
  _inspectorConnections[pageId] = inspectorConnection;
}

- (void)handleDisconnect:(NSDictionary *)payload
{
  NSString *pageId = payload[@"pageId"];
  RCTInspectorLocalConnection *inspectorConnection = _inspectorConnections[pageId];
  if (inspectorConnection) {
    [self removeConnectionForPage:pageId];
    [inspectorConnection disconnect];
  }
}

- (void)removeConnectionForPage:(NSString *)pageId
{
  [_inspectorConnections removeObjectForKey:pageId];
}

- (void)handleWrappedEvent:(NSDictionary *)payload
{
  NSString *pageId = payload[@"pageId"];
  NSString *wrappedEvent = payload[@"wrappedEvent"];
  RCTInspectorLocalConnection *inspectorConnection = _inspectorConnections[pageId];
  if (!inspectorConnection) {
//    RCTLogWarn(@"Not connected to page: %@ , failed trying to handle event: %@", pageId, wrappedEvent);
    return;
  }
  [inspectorConnection sendMessage:wrappedEvent];
}

- (NSArray *)pages
{
  NSArray<RCTInspectorPage *> *pages = [RCTInspector pages];
  NSMutableArray *array = [NSMutableArray arrayWithCapacity:pages.count];

  RCTBundleStatusProvider statusProvider = _bundleStatusProvider;
  RCTBundleStatus *bundleStatus = statusProvider == nil ? nil : statusProvider();

  for (RCTInspectorPage *page in pages) {
    NSDictionary *jsonPage = @{
      @"id" : [@(page.id) stringValue],
      @"title" : page.title,
      @"app" : [[NSBundle mainBundle] bundleIdentifier],
      @"vm" : page.vm,
      @"isLastBundleDownloadSuccess" : bundleStatus == nil ? [NSNull null]
                                                           : @(bundleStatus.isLastBundleDownloadSuccess),
      @"bundleUpdateTimestamp" : bundleStatus == nil ? [NSNull null]
                                                     : @((long)bundleStatus.bundleUpdateTimestamp * 1000),
    };
    [array addObject:jsonPage];
  }
  return array;
}

- (void)sendWrappedEvent:(NSString *)pageId message:(NSString *)message
{
  NSDictionary *payload = @{
    @"pageId" : pageId,
    @"wrappedEvent" : message,
  };
  [self sendEvent:@"wrappedEvent" payload:payload];
}

- (void)sendEvent:(NSString *)name payload:(id)payload
{
  NSDictionary *jsonMessage = @{
    @"event" : name,
    @"payload" : payload,
  };
  [self sendToPackager:jsonMessage];
}

// analogous to InspectorPackagerConnection.Connection.onFailure(...)
- (void)webSocket:(__unused SRWebSocket *)webSocket didFailWithError:(NSError *)error
{
  if (_webSocket) {
    [self abort:@"Websocket exception" withCause:error];
  }
  if (!_closed && [error code] != ECONNREFUSED) {
    [self reconnect];
  }
}

// analogous to InspectorPackagerConnection.Connection.onMessage(...)
- (void)webSocket:(__unused SRWebSocket *)webSocket didReceiveMessage:(id)opaqueMessage
{
  // warn but don't die on unrecognized messages
  if (![opaqueMessage isKindOfClass:[NSString class]]) {
//    RCTLogWarn(@"Unrecognized inspector message, object is of type: %@", [opaqueMessage class]);
    return;
  }

  NSString *messageText = opaqueMessage;
  NSError *error = nil;
  id parsedJSON = RCTJSONParse(messageText, &error);
  if (error) {
//    RCTLogWarn(@"Unrecognized inspector message, string was not valid JSON: %@", messageText);
    return;
  }

  [self handleProxyMessage:parsedJSON];
}

// analogous to InspectorPackagerConnection.Connection.onClosed(...)
- (void)webSocket:(__unused SRWebSocket *)webSocket
    didCloseWithCode:(__unused NSInteger)code
              reason:(__unused NSString *)reason
            wasClean:(__unused BOOL)wasClean
{
  _webSocket = nil;
  [self closeAllConnections];
  if (!_closed) {
    [self reconnect];
  }
}

- (bool)isConnected
{
  return _webSocket != nil;
}

- (void)connect
{
  if (_closed) {
//    RCTLogError(@"Illegal state: Can't connect after having previously been closed.");
    return;
  }

  // The corresponding android code has a lot of custom config options for
  // timeouts, but it appears the iOS RCTSRWebSocket API doesn't have the same
  // implemented options.
  _webSocket = [[SRWebSocket alloc] initWithURL:_url];
  [_webSocket setDelegateDispatchQueue:_jsQueue];
  _webSocket.delegate = self;
  [_webSocket open];
}

- (void)reconnect
{
  if (_closed) {
//    RCTLogError(@"Illegal state: Can't reconnect after having previously been closed.");
    return;
  }

  if (_suppressConnectionErrors) {
//    RCTLogWarn(@"Couldn't connect to packager, will silently retry");
    _suppressConnectionErrors = true;
  }

  __weak RCTInspectorPackagerConnection *weakSelf = self;
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, RECONNECT_DELAY_MS * NSEC_PER_MSEC), dispatch_get_main_queue(), ^{
    RCTInspectorPackagerConnection *strongSelf = weakSelf;
    if (strongSelf && !strongSelf->_closed) {
      [strongSelf connect];
    }
  });
}

- (void)closeQuietly
{
  _closed = true;
  [self disposeWebSocket];
}

- (void)sendToPackager:(NSDictionary *)messageObject
{
  __weak RCTInspectorPackagerConnection *weakSelf = self;
  dispatch_async(_jsQueue, ^{
    RCTInspectorPackagerConnection *strongSelf = weakSelf;
    if (strongSelf && !strongSelf->_closed) {
      NSError *error;
      NSString *messageText = RCTJSONStringify(messageObject, &error);
      if (error) {
//        RCTLogWarn(@"Couldn't send event to packager: %@", error);
      } else {
        [strongSelf->_webSocket send:messageText];
      }
    }
  });
}

- (void)abort:(NSString *)message withCause:(NSError *)cause
{
  // Don't log ECONNREFUSED at all; it's expected in cases where the server isn't listening.
  if (![cause.domain isEqual:NSPOSIXErrorDomain] || cause.code != ECONNREFUSED) {
//    RCTLogInfo(@"Error occurred, shutting down websocket connection: %@ %@", message, cause);
  }

  [self closeAllConnections];
  [self disposeWebSocket];
}

- (void)disposeWebSocket
{
  if (_webSocket) {
    [_webSocket closeWithCode:1000 reason:@"End of session"];
    _webSocket.delegate = nil;
    _webSocket = nil;
  }
}

@end

@implementation RCTInspectorRemoteConnection

//RCT_NOT_IMPLEMENTED(-(instancetype)init)

- (instancetype)initWithPackagerConnection:(RCTInspectorPackagerConnection *)owningPackagerConnection
                                    pageId:(NSString *)pageId
{
  if (self = [super init]) {
    _owningPackagerConnection = owningPackagerConnection;
    _pageId = pageId;
  }
  return self;
}

- (void)onMessage:(NSString *)message
{
  [_owningPackagerConnection sendWrappedEvent:_pageId message:message];
}

- (void)onDisconnect
{
  RCTInspectorPackagerConnection *owningPackagerConnectionStrong = _owningPackagerConnection;
  if (owningPackagerConnectionStrong) {
    [owningPackagerConnectionStrong removeConnectionForPage:_pageId];
    [owningPackagerConnectionStrong sendEvent:@"disconnect" payload:makePageIdPayload(_pageId)];
  }
}

@end

#endif
