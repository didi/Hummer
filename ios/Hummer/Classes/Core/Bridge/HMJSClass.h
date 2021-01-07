//
//  HMJSClass.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>

@interface HMJSClass : NSObject

@property (nonatomic, strong, readonly) NSString *className;

- (instancetype)initWithJSClass:(NSString *)className;

- (JSClassRef)classRef;
- (void)registerJSClassRef;

@end
