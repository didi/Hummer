//
//  JSValue+Hummer.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>

@interface JSValue(Hummer)

- (id)hm_toObjCObject;

- (int)hm_isArray;

- (NSArray *)hm_toObjcArray;

+ (instancetype)hm_valueWithClass:(Class)objcClass
                        inContext:(JSContext *)context;

@end
