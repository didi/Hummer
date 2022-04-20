//
//  HMFunctionParser.h
//  Hummer
//
//  Created by didi on 2022/4/13.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSUInteger, HMParserFunctionType) {
    HMParserFunctionTypeUnknow,
    HMParserFunctionTypeClass,
    HMParserFunctionTypeInstance,
};

typedef NS_ENUM(NSUInteger, HMParserNullability) {
    HMParserNullabilityUnspecified,
    HMParserNullable,
    HMParserNonnull,
};


NS_ASSUME_NONNULL_BEGIN

@interface HMMethodArgument : NSObject

@property (nonatomic, copy, readonly) NSString *type;
@property (nonatomic, readonly) HMParserNullability nullability;
@property (nonatomic, readonly) BOOL unused;

- (BOOL)isVoid;
- (instancetype)initWithType:(NSString *)type nullability:(HMParserNullability)nullability unused:(BOOL)unused;

@end


@interface HMMethodSignature : NSObject

@property (nonatomic, assign) HMParserFunctionType flag;
@property (nonatomic, strong) HMMethodArgument *retVal;
@property (nonatomic, strong) NSArray<HMMethodArgument *> *arguments;

@property (nonatomic, copy) NSString *selector;


- (instancetype)initWithFlag:(HMParserFunctionType)flag returnValue:(nullable HMMethodArgument *)retVal arguments:(nullable NSArray<HMMethodArgument *> *)arguments selector:(nonnull NSString *)selector;

@end


/**
 * 支持的参数类型：
 * 1. 所有 C 类型，指针除外。
 * 2. OC：
 *    a. 基本类型：NSInteger, NSUInteger, CGFloat.
 *    b. 对象类型：NSNumber, NSString, NSArray, NSMutableArray, NSDictionary, NSMutableDictionary.
 *
 */
HMMethodSignature * HMFunctionParse(const char *input);

NS_ASSUME_NONNULL_END
