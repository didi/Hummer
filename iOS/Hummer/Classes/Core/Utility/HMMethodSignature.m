//
//  HMMethodSignature.m
//  Hummer
//
//  Created by didi on 2022/4/21.
//

#import "HMMethodSignature.h"


@implementation HMMethodArgument

- (instancetype)initWithType:(NSString *)type nullability:(HMArgumentNullability)nullability unused:(BOOL)unused {
    if (self = [super init]) {
        _type = [type copy];
        _nullability = nullability;
        _unused = unused;
    }
    return self;
}

- (BOOL)isVoid {
    
    return [self.type isEqualToString:@"void"];
}
@end

@interface HMMethodSignature()
@property (nonatomic, strong, readwrite, nullable) HMMethodArgument *methodReturnType;
@end
@implementation HMMethodSignature

- (instancetype)initWithFlag:(HMMethodType)flag returnValue:(nullable HMMethodArgument *)retVal arguments:(nullable NSArray<HMMethodArgument *> *)arguments selector:(nonnull NSString *)selector selectorPrefix:(nonnull NSString *)selectorPrefix{

    if (self = [super init]) {
        _flag = flag;
        _methodReturnType = retVal;
        _arguments = arguments;
        _selector = selector;
        _selectorPrefix = selectorPrefix;
        _numberOfArguments = arguments.count + 2;
    }
    return self;
}

- (HMMethodArgument *)getArgumentTypeAtIndex:(NSUInteger)idx {
    
    if ((NSInteger)idx-2 < 0) return nil;
    NSUInteger _idx = idx-2;
    if (_idx < self.arguments.count) {
        return self.arguments[_idx];
    }
    return nil;
}

@end
