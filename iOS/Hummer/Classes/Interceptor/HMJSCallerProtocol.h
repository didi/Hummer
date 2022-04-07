//
//  HMJSCallerProtocol.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMJSCallerProtocol <NSObject>

- (void)callNativeWithClassName:(NSString *)className functionName:(NSString *)functionName objRef:(NSString *)objRef args:(NSArray *)args namespace:(NSString *)namespace;

- (void)callJSWithClassName:(NSString *)className functionName:(NSString *)functionName objRef:(NSString *)objRef args:(NSString *)args namespace:(NSString *)namespace;

@end

NS_ASSUME_NONNULL_END
