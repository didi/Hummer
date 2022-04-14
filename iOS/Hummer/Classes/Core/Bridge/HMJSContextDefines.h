//
//  HMJSContextDefines.h
//  Hummer
//
//  Created by didi on 2022/3/29.
//

#import <Foundation/Foundation.h>

FOUNDATION_EXPORT NSErrorDomain const _Nonnull HMJSContextErrorDomain;

/// HMJSContext error domain and codes
typedef NS_ERROR_ENUM(HMJSContextErrorDomain, HMJSContextError) {
    HMJSContextErrorNotCallRender = 1000, // 没有调用render
    HMJSContextErrorRenderWithInvalidArg = 1001, // render 方法参数错误。
};

