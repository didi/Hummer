//
//  HMAssertDefine.h
//  Pods
//
//  Created by GY on 2024/10/29.
//

#ifndef HMAssertDefine_h
#define HMAssertDefine_h

#import "HMAssertUtils.h"

#if DEBUG
#define HMAssert(condition, ...) \
do{ \
if(!(condition)){ \
_HMAssert(@(__func__), @(__FILE__), __LINE__, __VA_ARGS__); \
} \
}while(0)
#else
#define HMAssert(condition, ...)
#endif

#endif /* HMAssertDefine_h */
