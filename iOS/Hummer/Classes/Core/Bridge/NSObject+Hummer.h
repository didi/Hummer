//
//  NSObject+Hummer.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSObject.h"
#import "HMExportManager.h"

@interface NSObject (Hummer) <HMJSObject>

@property (nonatomic, strong) JSValue *hmValue;
@property (nonatomic, weak) JSContext *hmContext;

- (void)hm_callJSFinalize;
- (void)hm_retainedJSValue;

@end
