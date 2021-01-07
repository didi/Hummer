//
//  HMJSGlobal.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>
#import "HMJSContext.h"
#import "HMNotifyCenter.h"

@protocol HMGlobalExport <JSExport>

JSExportAs(render, - (JSValue *)render:(JSValue *)page);

JSExportAs(setBasicWidth, - (void)setBasicWidth:(JSValue *)basicWidth);

@property (nonatomic, copy) NSDictionary *env;

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, copy, nullable) NSDictionary<NSString *, id> *pageInfo;

//- (void)setTitle:(NSString *)title;

@property (nonatomic, copy, nullable) void(^setTitle)(NSString *title);

NS_ASSUME_NONNULL_END

@property (nonatomic, getter=getNofityCenter, setter=setNotifyCenter:) JSValue *notifyCenter;

JSExportAs(callFunc, - (JSValue *)callFunc:(JSValue *)cls
                                    method:(JSValue *)method
                                 arguments:(JSValue *)arguments);

@end

@interface HMJSGlobal : NSObject<HMGlobalExport>

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, copy, nullable) NSDictionary<NSString *, id> *pageInfo;

@property (nonatomic, copy, nullable) void(^setTitle)(NSString *title);

NS_ASSUME_NONNULL_END

+ (instancetype)globalObject;

- (HMJSContext *)currentContext:(JSContext *)context;

- (void)weakReference:(HMJSContext *)context;

- (void)addGlobalEnviroment:(NSDictionary *)params;

@end
