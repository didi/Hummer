//
//  HMJSValue.h
//  Pods
//
//  Created by 唐佳诚 on 2021/8/9.
//

#import <Foundation/Foundation.h>
#import <napi/js_native_api.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMJSValue

@required

@property (nonatomic, nullable, assign, readonly) NAPIValue valueRef;

@end

NS_ASSUME_NONNULL_END
