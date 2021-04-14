//
//  HMJSLoadInterceptor.h
//  Hummer
//
//  Created by didi on 2021/4/6.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMJSLoadInterceptor <NSObject>
- (void)handleUrlString:(NSString *)urlString completion:(void(^)(NSString *))completion;
@end

NS_ASSUME_NONNULL_END
