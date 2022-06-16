//
//  HMMethodSignature.h
//  Hummer
//
//  Created by didi on 2022/4/21.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN


typedef NS_ENUM(NSUInteger, HMMethodType) {
    HMMethodTypeUnknow,
    HMMethodTypeClass,
    HMMethodTypeInstance,
};

typedef NS_ENUM(NSUInteger, HMArgumentNullability) {
    HMArgumentNullabilityUnspecified,
    HMArgumentNullable,
    HMArgumentNonnull,
};

@interface HMMethodArgument : NSObject

@property (nonatomic, copy, readonly) NSString *type;
@property (nonatomic, readonly) HMArgumentNullability nullability;
@property (nonatomic, readonly) BOOL unused;

- (BOOL)isVoid;
- (instancetype)initWithType:(NSString *)type nullability:(HMArgumentNullability)nullability unused:(BOOL)unused;

@end


@interface HMMethodSignature : NSObject

@property (nonatomic, strong, readonly, nullable) HMMethodArgument *methodReturnType;
@property (nonatomic, assign,readonly) NSUInteger numberOfArguments;
@property (nonatomic, assign) HMMethodType flag;
@property (nonatomic, strong) NSArray<HMMethodArgument *> *arguments;

@property (nonatomic, copy) NSString *selector;
@property (nonatomic, copy) NSString *selectorPrefix;

- (instancetype)initWithFlag:(HMMethodType)flag returnValue:(nullable HMMethodArgument *)retVal arguments:(nullable NSArray<HMMethodArgument *> *)arguments selector:(nonnull NSString *)selector selectorPrefix:(nonnull NSString *)selectorPrefix;


- (nullable HMMethodArgument *)getArgumentTypeAtIndex:(NSUInteger)idx;

@end

NS_ASSUME_NONNULL_END
