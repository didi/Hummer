//
//  NSError+Hummer.h
//  Hummer
//
//  Created by didi on 2022/11/9.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
FOUNDATION_EXPORT NSString *HMErrorDomain;

@interface NSError (Hummer)

+ (instancetype)hm_errorWithDomain:(nullable NSString*)domain
                              code:(NSInteger)code
                       description:(nullable NSString*)desc
                     failureReason:(nullable NSString*)failureReason;

+ (instancetype)hm_errorWithDomain:(nullable NSString*)domain
                              code:(NSInteger)code
                       description:(NSString*)desc;

+ (instancetype)hm_errorWithDomain:(nullable NSString*)domain
                              code:(NSInteger)code
                     failureReason:(NSString*)failureReason;



- (NSString *)hm_descriptionOrReason;

@end

NS_ASSUME_NONNULL_END
