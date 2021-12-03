//
//  HMJavaScriptLoader.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJavaScriptLoader.h"

#import "HMUtility.h"

NSString *const HMJSLoaderErrorDomain = @"HMJSLoaderErrorDomain";

static void syncJsBundleAtURL(NSURL *url,
                              HMLoaderProgressBlock progressBlock,
                              HMLoaderCompleteBlock completeBlock);

@implementation HMLoaderProgress

@end

@implementation HMDataSource

+ (HMDataSource *) dataSourceCreateWithURL:(NSURL*)url
                                      data:(NSData*)data
                                    lenght:(NSNumber*)length {
    HMDataSource *dataSource = [HMDataSource new];
    dataSource.url = url;
    dataSource.length = length;
    dataSource.data = data;
    
    return dataSource;
}

@end

@implementation HMJavaScriptLoader

+ (void)loadBundleWithURL:(NSURL*)url
                  onProgress:(HMLoaderProgressBlock)progressBlock
                  onComplete:(HMLoaderCompleteBlock)completeBlock {
    unsigned int sourceLen;
    NSError *error;
    NSData *data = [self syncJsBundleAtURL:url
                              sourceLength:&sourceLen
                                     error:&error];
    
    if (data) {
        completeBlock(nil,[HMDataSource dataSourceCreateWithURL:url
                                                           data:data
                                                         lenght:@(sourceLen)]);
        return;
    }
    
    syncJsBundleAtURL(url, progressBlock, completeBlock);
    return;
}

+ (NSData *)syncJsBundleAtURL:(NSURL *)scriptURL
                 sourceLength:(unsigned int *)sourceLength
                        error:(NSError **)error {
    if (!scriptURL) {
        if (error) {
            NSString *desc = [NSString stringWithFormat:@"Url is nil. "
                              @"unsanitizedScriptURLString = %@", scriptURL.absoluteString];
            *error = [NSError errorWithDomain:HMJSLoaderErrorDomain
                                         code:HMJSLoaderErrorNoScriptURL
                                     userInfo:@{NSLocalizedDescriptionKey: desc}];
        }
        
        return nil;
    }
    
    if (!scriptURL.fileURL) {
        if (error) {
            *error = [NSError errorWithDomain:HMJSLoaderErrorDomain
                                         code:HMJSLoaderErrorCannotBeLoadedSynchronously
                                     userInfo:@{NSLocalizedDescriptionKey:[NSString stringWithFormat:@"Cannot load %@ URLs synchronously",
                                                scriptURL.scheme]}];
        }
        
        return nil;
    }
    
    FILE *bundle = fopen(scriptURL.path.UTF8String, "r");
    if (!bundle) {
        if (error) {
            NSString *errorString = [NSString stringWithFormat:@"Error opening bundle %@", scriptURL.path];
            NSDictionary *userInfo = @{NSLocalizedDescriptionKey:errorString};
            *error = [NSError errorWithDomain:HMJSLoaderErrorDomain
                                         code:HMJSLoaderErrorFailedOpeningFile
                                     userInfo:userInfo];
        }
        return nil;
    }
    
    NSData *source = [NSData dataWithContentsOfFile:scriptURL.path
                                            options:NSDataReadingMappedIfSafe
                                              error:error];
    if (sourceLength && source != nil) {
        *sourceLength = (unsigned int)source.length;
    }
    return source;
}

+ (BOOL)loadWithSource:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource completion:(HMJSLoaderCompleteBlock)completion {
    
    NSString *sourceString = [source hm_asString];
    NSURL *url = [source hm_asUrl];
    if([sourceString hasPrefix:@"."]){
        url = [NSURL URLWithString:[source hm_asString] relativeToURL:[bundleSource hm_asUrl]];
    }
    [self loadBundleWithURL:url onProgress:nil onComplete:^(NSError *error, HMDataSource *source) {
        if (completion) {
            NSString *script = [[NSString alloc] initWithData:source.data encoding:NSUTF8StringEncoding];
            completion(error, script);
        }
    }];
    return YES;
    
}

@end

static void syncJsBundleAtURL(NSURL *url,
                              __unused HMLoaderProgressBlock progressBlock,
                              HMLoaderCompleteBlock completeBlock) {
    if (url.fileURL) {
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            NSError *error = nil;
            NSData *source = [NSData dataWithContentsOfFile:url.path
                                                    options:NSDataReadingMappedIfSafe
                                                      error:&error];
            HMExecOnMainQueue(^{
                completeBlock(error,[HMDataSource dataSourceCreateWithURL:url
                                                                     data:source
                                                                   lenght:@(source.length)]);
            });
        });
        return;
    }
    
    NSURLSessionDataTask *dataTask = [[NSURLSession sharedSession] dataTaskWithURL:url
                                                                 completionHandler:^(NSData * _Nullable data,
                                                                                     NSURLResponse * _Nullable response,
                                                                                     NSError * _Nullable error) {
        HMExecOnMainQueue(^{
            HMDataSource *dataSource = [HMDataSource dataSourceCreateWithURL:url
                                                                        data:data
                                                                      lenght:@(data.length)];
            completeBlock(error, dataSource);
        });
    }];
    [dataTask resume];
}

