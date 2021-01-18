//
//  JSValue+Hummer.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>

NS_ASSUME_NONNULL_BEGIN

@interface JSValue (Hummer)

- (nullable id)hm_toObjCObject DEPRECATED_MSG_ATTRIBUTE("废弃接口，换用 HMBaseValue *");

- (BOOL)hm_isArray DEPRECATED_MSG_ATTRIBUTE("废弃接口，换用 HMBaseValue *");

- (nullable NSArray *)hm_toObjcArray DEPRECATED_MSG_ATTRIBUTE("废弃接口，换用 HMBaseValue *");;

@end

NS_ASSUME_NONNULL_END