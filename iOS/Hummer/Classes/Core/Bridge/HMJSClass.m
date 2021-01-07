 //
//  HMJSClass.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSClass.h"

#import "HMUtility.h"
#import "HMJSObject.h"
#import "HMExportManager.h"
#import "HMExportClass.h"
#import "HMExportMethod.h"
#import "HMExportProperty.h"
#import "HMInvocation.h"
#import "NSObject+Hummer.h"

@interface HMJSClass ()

@property (nonatomic, assign) JSClassRef classRef;
@property (nonatomic, strong) NSArray *jsMethods;
@property (nonatomic, strong) NSArray *jsProperties;
@property (nonatomic, assign) JSStaticFunction *staticFuncs;
@property (nonatomic, assign) JSStaticValue *staticVals;

@end

@implementation HMJSClass

@synthesize classRef = _classRef;

- (instancetype)initWithJSClass:(NSString *)className {
    self = [self init];
    if (self) {
        _className = className;
        [self loadJSClassExports];
    }
    return self;
}

- (void)dealloc {
    if (self.staticFuncs) {
        NSInteger count = self.jsMethods.count;
        for (NSInteger idx = 0; idx < count; idx++) {
            JSStaticFunction *staticFunc = self.staticFuncs + idx;
            if (staticFunc->name) free((void *)(staticFunc->name));
        }
        free(self.staticFuncs);
    }
    
    if (self.staticVals) {
        NSInteger count = self.jsProperties.count;
        for (NSInteger idx = 0; idx < count + 2; idx++) {
            JSStaticValue *staticVal = self.staticVals + idx;
            if(staticVal->name) free((void *)(staticVal->name));
        }
        free(self.staticVals);
    };
}

- (void)registerJSClassRef {
    JSClassDefinition classDefinition = kJSClassDefinitionEmpty;
    classDefinition.className = self.className.UTF8String;
    classDefinition.initialize = HMJSObjectInitialize;
    classDefinition.finalize = HMJSObjectFinalize;
    
    self.staticFuncs = [self createStaticJSFunctions:self.jsMethods];
    classDefinition.staticFunctions = self.staticFuncs;
    
    self.staticVals = [self createStaticJSValues:self.jsProperties];
    classDefinition.staticValues = self.staticVals;
    
    self.classRef = JSClassCreate(&classDefinition);
}

- (JSStaticFunction *)createStaticJSFunctions:(NSArray *)jsMethods {
    if (!jsMethods || jsMethods.count <= 0) return NULL;
    
    JSStaticFunction *staticFuncs = malloc(sizeof(JSStaticFunction)*(jsMethods.count + 1));
    memset(staticFuncs, 0, sizeof(JSStaticFunction)*(jsMethods.count + 1));
    for (NSInteger idx = 0; idx < jsMethods.count; idx++) {
        JSStaticFunction *staticFunc = staticFuncs + idx;
        NSString *jsMethod = jsMethods[idx];
        staticFunc->name = strdup(jsMethod.UTF8String);
        staticFunc->callAsFunction = HMJSCallStaticFunction;
        staticFunc->attributes = kJSPropertyAttributeReadOnly |
                                 kJSPropertyAttributeDontEnum |
                                 kJSPropertyAttributeDontDelete;
    }
    return staticFuncs;
}

- (JSStaticValue *)createStaticJSValues:(NSArray *)jsProps {
    JSStaticValue *staticVals = malloc(sizeof(JSStaticValue)*(jsProps.count + 3));
    memset(staticVals, 0, sizeof(JSStaticValue)*(jsProps.count + 3));
    for (NSInteger idx = 0; idx < jsProps.count + 2; idx++) {
        JSStaticValue *staticVal = staticVals + idx;
        if (idx < jsProps.count) {
            NSString *jsProp = jsProps[idx];
            staticVal->name = strdup(jsProp.UTF8String);
            staticVal->getProperty = HMJSGetStaticValue;
            staticVal->setProperty = HMJSSetStaticValue;
            staticVal->attributes = kJSPropertyAttributeDontDelete;
        } else {
            if (idx == jsProps.count) {
                staticVal->name = strdup("methods");
            } else if (idx == jsProps.count + 1) {
                staticVal->name = strdup("variables");
            }
            staticVal->getProperty = HMJSGetStaticValue;
            staticVal->attributes = kJSPropertyAttributeReadOnly |
                                    kJSPropertyAttributeDontEnum |
                                    kJSPropertyAttributeDontDelete;
        }
    }
    return staticVals;
}

- (void)loadJSClassExports {
    if (!self.className) return;
    
    HMExportManager *exportMgr = [HMExportManager sharedInstance];
    HMExportClass *exportClass = [exportMgr exportClassForJS:self.className];
    
    self.jsMethods = [exportClass allExportMethodList];
    self.jsProperties = [exportClass allExportPropertyList];
}

#pragma mark - JS Call OC

JSValueRef _HMJSCallFunc(id target,
                         NSString *jsFunc,
                         NSArray *args,
                         JSContext *context) {
    if (!jsFunc) { return nil;}
    
    NSString *objcClass = NSStringFromClass([target class]);
    HMExportManager *exportMgr = [HMExportManager sharedInstance];
    HMExportClass *exportClass = [exportMgr exportClassForObjC:objcClass];
    if (!exportClass) {
        HMLogError(@"Objective-c class [%@] which export can not be found!", objcClass);
        return nil;
    }
    
    HMExportMethod *exportMethod = [exportClass methodForFuncName:jsFunc];
    if (!exportMethod) {
        HMLogError(@"JS method [%@] which export can not be found!", jsFunc);
        return nil;
    }
    
    HMInvocation *executor = [[HMInvocation alloc] initWithTarget:target];
    [executor setSelecor:exportMethod.selector];
    [executor setArguments:args];
    
    id retValue = [executor invokeAndReturn];
    if (retValue && ![retValue isKindOfClass:[JSValue class]]) {
        retValue = [JSValue valueWithObject:retValue inContext:context];
    }
    return [(JSValue *)retValue JSValueRef];
}

void _HMJSCallSetter(id target,
                     NSString *jsProp,
                     JSValueRef value,
                     JSContext *context) {
    if (!jsProp) { return; }
    
    NSString *objcClass = NSStringFromClass([target class]);
    HMExportManager *exportMgr = [HMExportManager sharedInstance];
    HMExportClass *exportClass = [exportMgr exportClassForObjC:objcClass];
    if (!exportClass) {
        HMLogError(@"Objective-c class [%@] which export can not be found!", objcClass);
        return;
    }
    
    HMExportProperty *exportProp = [exportClass propertyForName:jsProp];
    if (!exportProp) {
        HMLogError(@"JS property [%@] which export can not be found!", jsProp);
        return;
    }
    
    HMInvocation *executor = [[HMInvocation alloc] initWithTarget:target];
    [executor setSelecor:exportProp.propSetter];
    [executor setArguments:@[[JSValue valueWithJSValueRef:value inContext:context]]];
    [executor invokeAndReturn];
}

JSValueRef _HMJSCallGetter(id target,
                           NSString *jsProp,
                           JSContext *context) {
    if (!jsProp) { return nil; }
    
    NSString *objcClass = NSStringFromClass([target class]);
    HMExportManager *exportMgr = [HMExportManager sharedInstance];
    HMExportClass *exportClass = [exportMgr exportClassForObjC:objcClass];
    if (!exportClass) {
        HMLogError(@"Objective-c class [%@] which export can not be found!", objcClass);
        return nil;
    }
    
    HMExportProperty *exportProp = [exportClass propertyForName:jsProp];
    if (!exportProp) {
        HMLogError(@"JS property [%@] which export can not be found!", jsProp);
        return nil;
    }
    
    HMInvocation *executor = [[HMInvocation alloc] initWithTarget:target];
    [executor setSelecor:exportProp.propGetter];
    id retValue = [executor invokeAndReturn];
    
    if (retValue && ![retValue isKindOfClass:[JSValue class]]) {
        retValue = [JSValue valueWithObject:retValue inContext:context];
    }
    return [(JSValue *)retValue JSValueRef];
}

#pragma mark - JSClassRef Method

void HMJSObjectInitialize(__unused JSContextRef ctx, JSObjectRef object) {
    CFTypeRef objectRef = JSObjectGetPrivate(object);
    if (objectRef) CFRetain(objectRef);
}

void HMJSObjectFinalize(JSObjectRef object) {
    CFTypeRef objectRef = JSObjectGetPrivate(object);
    HMLogDebug(@"----- >>> js/oc objct release [%@]", [(__bridge NSObject *)objectRef class]);
    if (objectRef) {
        JSObjectSetPrivate(object, NULL);
        dispatch_async(dispatch_get_main_queue(), ^{
            CFRelease(objectRef);
        });
    }
}

JSValueRef HMJSCallStaticFunction (JSContextRef contextRef,
                                   JSObjectRef functionRef,
                                   JSObjectRef thisObject,
                                   size_t argumentCount,
                                   const JSValueRef arguments[],
                                   __unused JSValueRef *exception) {
    JSContext *context = [JSContext contextWithJSGlobalContextRef:JSContextGetGlobalContext(contextRef)];

    id<HMJSObject> thisObj = (__bridge __kindof id<HMJSObject>)(JSObjectGetPrivate(thisObject));
    
    JSValueRef funcNameRef = JSObjectGetProperty(contextRef,
                                                 functionRef,
                                                 JSStringCreateWithUTF8CString("name"),
                                                 NULL);
    JSValue *funcNameStr = [JSValue valueWithJSValueRef:funcNameRef inContext:context];

    NSMutableArray<JSValue *> *mutableArguments = [NSMutableArray arrayWithCapacity:argumentCount];
    for (size_t index = 0; index < argumentCount; index++) {
        mutableArguments[index] = [JSValue valueWithJSValueRef:arguments[index]
                                                     inContext:context];
    }
    
    if (thisObj) {
        return _HMJSCallFunc(thisObj,
                             [funcNameStr toString],
                             mutableArguments.copy,
                             context);
    }
    
    return JSValueMakeUndefined(contextRef);
}

JSValueRef HMJSGetStaticValue(JSContextRef contextRef,
                              JSObjectRef objectRef,
                              JSStringRef propertyName,
                              __unused JSValueRef *exception) {
    JSContext *context = [JSContext contextWithJSGlobalContextRef:JSContextGetGlobalContext(contextRef)];
    NSString *jsProperty = (NSString *)CFBridgingRelease(JSStringCopyCFString(CFAllocatorGetDefault(), propertyName));
    
    id<HMJSObject> thisObj = (__bridge __kindof id<HMJSObject>)(JSObjectGetPrivate(objectRef));
    if ([jsProperty isEqualToString:@"methods"]) {
        NSString *className = NSStringFromClass([thisObj class]);
        HMExportClass *exportClass = [[HMExportManager sharedInstance] exportClassForObjC:className];
        NSArray *allMethods = [exportClass allExportMethodList];
        if (allMethods) {
            return [JSValue valueWithObject:allMethods
                                  inContext:context].JSValueRef;
        }
    } else if ([jsProperty isEqualToString:@"variables"]) {
        NSString *className = NSStringFromClass([thisObj class]);
        HMExportClass *exportClass = [[HMExportManager sharedInstance] exportClassForObjC:className];
        NSArray *allProps = [exportClass allExportPropertyList];
        if (allProps) {
            return [JSValue valueWithObject:allProps
                                  inContext:context].JSValueRef;
        }
    } else if (thisObj) {
        return _HMJSCallGetter(thisObj, jsProperty, context);
    }
    
    return JSValueMakeUndefined(contextRef);
}

bool HMJSSetStaticValue(JSContextRef contextRef,
                        JSObjectRef objectRef,
                        JSStringRef propertyName,
                        JSValueRef value,
                        JSValueRef *exception) {
    JSContext *context = [JSContext contextWithJSGlobalContextRef:JSContextGetGlobalContext(contextRef)];
    NSString *jsProperty = (NSString *)CFBridgingRelease(JSStringCopyCFString(CFAllocatorGetDefault(), propertyName));
    
    id<HMJSObject> thisObj = (__bridge __kindof id<HMJSObject>)(JSObjectGetPrivate(objectRef));
    if (thisObj) {
        _HMJSCallSetter(thisObj, jsProperty, value, context);
        return true;
    }
    return false;
}

@end
