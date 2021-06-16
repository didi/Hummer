//
//  HMJSCallerIterceptor.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMJSCallerIterceptor <NSObject>

- (void)callWithTarget:(id)target selector:(SEL)selector;

- (void)callWithJSClassName:(NSString *)className functionName:(NSString *)functionName;

@end

NS_ASSUME_NONNULL_END
