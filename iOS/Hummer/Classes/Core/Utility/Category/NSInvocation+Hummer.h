//
//  NSInvocation+Hummer.h
//  AfantySDK
//
//  Created by didi on 2020/9/9.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMEncoding.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSInvocation (Hummer)

- (void)hm_setArgument:(nullable id)argumentLocation atIndex:(NSInteger)idx encodingType:(HMEncodingType)type;

- (nullable id)hm_getReturnValueObject;

@end

NS_ASSUME_NONNULL_END
