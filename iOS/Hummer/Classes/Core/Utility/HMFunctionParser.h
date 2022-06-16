//
//  HMFunctionParser.h
//  Hummer
//
//  Created by didi on 2022/4/13.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMMethodSignature.h>


NS_ASSUME_NONNULL_BEGIN


/**
 * 支持的参数类型：
 * 1. 所有 C 类型，指针除外。
 * 2. OC：
 *    a. 基本类型：NSInteger, NSUInteger, CGFloat.
 *    b. 对象类型：NSNumber, NSString, NSArray, NSMutableArray, NSDictionary, NSMutableDictionary.
 *
 */
HMMethodSignature * HMFunctionParse(const char *input);

HMMethodArgument * HMArgumentParse(const char *input);
NS_ASSUME_NONNULL_END
