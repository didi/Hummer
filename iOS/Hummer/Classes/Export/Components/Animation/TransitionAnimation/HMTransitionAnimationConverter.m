//
//  HMTransitionAnimationConverter.m
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import "HMTransitionAnimationConverter.h"
#import "HMUtility.h"
#import "HMConverter.h"
#import "HMAnimationConverter.h"

#pragma mark - HMTransitionAnimationTransfromFunc

@interface HMTransitionAnimationTransfromFunc : NSObject

@property (nonatomic, copy) NSString *name;
@property (nonatomic, assign) CGFloat x;
@property (nonatomic, assign) CGFloat y;
@property (nonatomic, assign) CGFloat z;

@end

@implementation HMTransitionAnimationTransfromFunc

- (instancetype)init
{
    if (self = [super init]) {
        _name = @"";
        _x = NSNotFound;
        _y = NSNotFound;
        _z = NSNotFound;
    }
    
    return self;
}

@end

#pragma mark - HMTransitionAnimationKeyPathValue

@interface HMTransitionAnimationKeyPathValue : NSObject

@property (nonatomic, copy) NSString *key;
@property (nonatomic, strong) id value;

@end

@implementation HMTransitionAnimationKeyPathValue


@end


#pragma mark - HMTransitionAnimationConverter

@implementation HMTransitionAnimationConverter

+ (NSDictionary <NSString *, NSString *> *)transitionAnimationProperties
{
    return @{
        @"transform":@"transform3D",
        @"opacity":@"alpha",
        @"backgroundColor":@"backgroundColor",
        @"width":@"bounds",
        @"height":@"bounds",
    };
}

// key: css style func name
// value: basicanimation func name
+ (NSDictionary <NSString *, NSString *> *)transformBasicAnimationMap
{
    return @{
        @"translate": @"position",
        @"scale": @"scale",
        @"scaleX": @"scaleX",
        @"scaleY": @"scaleY",
        @"rotateX": @"rotationX",
        @"rotateY": @"rotationY",
        @"rotateZ": @"rotationZ",
        @"rotate": @"rotationZ",
        @"skew": @"skew",
    };
}


+ (HMTransitionAnimationTransfromFunc *)convertTransformFunc:(NSString *)transformFuncStr
{
    HMTransitionAnimationTransfromFunc *func = [[HMTransitionAnimationTransfromFunc alloc] init];
    
    transformFuncStr = [transformFuncStr stringByReplacingOccurrencesOfString:@" " withString:@""];
    NSError *error = nil;
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:@"^(translate|(scale(X|Y)?)|(rotate(X|Y|Z)?)|skew)" options:NSRegularExpressionCaseInsensitive error:&error];
    if (error) {
        HMLogError(@"HMTransitionAnimationTransfromFunc generate regex error!");
    }
    NSRange rang = [regex rangeOfFirstMatchInString:transformFuncStr options:0 range:NSMakeRange(0, transformFuncStr.length)];
    if (rang.location == NSNotFound) {
        HMLogError(@"HMTransitionAnimationTransfromFunc transform function name error!");
        return nil;
    }
    NSString *funcName = [transformFuncStr substringWithRange:rang];
    NSString *paramsStr = [[[transformFuncStr stringByReplacingOccurrencesOfString:funcName withString:@""] stringByReplacingOccurrencesOfString:@"(" withString:@""] stringByReplacingOccurrencesOfString:@")" withString:@""];
    NSArray <NSString *> *params = [paramsStr componentsSeparatedByString:@","];
    func.name = funcName;
    if (params.count > 0) {
        if ([funcName isEqualToString:@"translate"]) {
            func.x = HMPointWithString(params[0]);
        } else {
            func.x = params[0].floatValue;
        }
    }
    
    if (params.count > 1) {
        if ([funcName isEqualToString:@"translate"]) {
            func.y = HMPointWithString(params[1]);
        } else {
            func.y = params[1].floatValue;
        }
    }
    
    if (params.count > 2) {
        if ([funcName isEqualToString:@"translate"]) {
            func.z = HMPointWithString(params[2]);
        } else {
            func.z = params[2].floatValue;
        }
    }
    return func;
}

+ (NSDictionary <NSString *, NSNumber *> *)convertProperties:(NSString *)propertiesStr durations:(NSString *)durationsStr
{
    if ([propertiesStr isEqualToString:@"all"]) {
        propertiesStr = [[[HMTransitionAnimationConverter transitionAnimationProperties] allKeys] componentsJoinedByString:@","];
    }
    NSArray *properties = [self converStyleStringToArray:propertiesStr];
    NSArray *durations = [self converStyleStringToArray:durationsStr];
    
    NSMutableDictionary *animations = [[NSMutableDictionary alloc] initWithCapacity:properties.count];
    NSArray *allValidProperties = [[self transitionAnimationProperties] allKeys];
    [properties enumerateObjectsUsingBlock:^(NSString *  _Nonnull property, NSUInteger idx, BOOL * _Nonnull stop) {
        HMAssert([allValidProperties containsObject:property], @"HMTransitionAnimation do not support %@ !!!", property);
        if (durations.count > idx) {
            [animations setValue:[self convertStyleStringToNumber:durations[idx]] forKey:property];
        } else {
            NSInteger index = idx % (durations.count);
            [animations setValue:[self convertStyleStringToNumber:durations[index]] forKey:property];
        }
    }];
    
    return [animations copy];
}



+ (NSArray <NSObject *> *)converStyleStringToArray:(NSString *)style
{
    NSString *trimmingStyle = [style stringByReplacingOccurrencesOfString:@" " withString:@""];
    return  [trimmingStyle componentsSeparatedByString:@","];
}

+ (NSNumber *)convertStyleStringToNumber:(NSString *)style
{
    return @(style.doubleValue);
}

+ (NSDictionary *)convertTransform:(NSString *)funcStr
{
    HMTransitionAnimationTransfromFunc *transformFunc = [self convertTransformFunc:funcStr];
    if (!transformFunc) {
        return nil;
    }
    NSString *convertKey = [[self transformBasicAnimationMap] objectForKey:transformFunc.name];
    NSObject *convertValue;
    if ([transformFunc.name isEqualToString:@"translate"]) {
        if (transformFunc.x != NSNotFound && transformFunc.y != NSNotFound) {
            convertValue = @{@"x": @(transformFunc.x), @"y": @(transformFunc.y)};
        }
    } else if ([transformFunc.name hasPrefix:@"scale"]) {
        if (transformFunc.x != NSNotFound) {
            convertValue = @(transformFunc.x);
        }
    } else if ([transformFunc.name hasPrefix:@"rotate"]) {
        convertValue = @(transformFunc.x);
    } else if ([transformFunc.name isEqualToString:@"skew"]) {
        if (transformFunc.x != NSNotFound && transformFunc.y != NSNotFound) {
            convertValue = @{@"x": @(transformFunc.x), @"y": @(transformFunc.y)};
        }
    }
    if (convertKey && convertValue) {
        return @{convertKey: convertValue};
    }
    
    return nil;
}

/// 重新排序transform funcs 顺序
/// @param transformStrFuns 解析获得的原始transform funcs
+ (NSArray *)reOrderTransformFuns:(NSArray <NSString *>*)transformStrFuns
{
    NSArray *transformfunsOrder = @[@"skew", @"scale", @"rotate", @"translate"];
    NSMutableArray *funs = [[NSMutableArray alloc] initWithCapacity:transformStrFuns.count];
    [transformfunsOrder enumerateObjectsUsingBlock:^(NSString * _Nonnull funcName, NSUInteger idx, BOOL * _Nonnull stop) {
        NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF BEGINSWITH[cd] %@", funcName];
        NSArray *filterTransformFuncs = [transformStrFuns filteredArrayUsingPredicate:predicate];
        if (filterTransformFuncs) {
            [funs addObjectsFromArray:filterTransformFuncs];
        }
    }];
    return funs.copy;
}

#pragma mark - public methods
+ (NSDictionary <NSString *, NSObject *> *)convertStyleToAnimations:(NSDictionary <NSString *, NSObject *> *)animations
{
    NSMutableDictionary *convertAnimations = [[NSMutableDictionary alloc] initWithCapacity:animations.count];
    
    [animations enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, NSObject * _Nonnull value, BOOL * _Nonnull stop) {
        if ([key isEqualToString:@"transform"]) {
            NSArray *transformStrFuns;
            if ([value isKindOfClass:[NSArray class]]) {
                transformStrFuns = (NSArray *)value;
            } else if ([value isKindOfClass:[NSString class]]) {
                NSString *transformFunsStr = (NSString *)value;
                transformFunsStr = [transformFunsStr stringByReplacingOccurrencesOfString:@" " withString:@""];
                transformFunsStr = [transformFunsStr stringByReplacingOccurrencesOfString:@")," withString:@");"];
                transformStrFuns = [transformFunsStr componentsSeparatedByString:@";"];
            } else {
                HMAssert(NO, @"Transform only suporrt NSArray and NSString!!!");
            }
            transformStrFuns = [self reOrderTransformFuns:transformStrFuns];
            [transformStrFuns enumerateObjectsUsingBlock:^(id  _Nonnull transformFuncStr, NSUInteger idx, BOOL * _Nonnull stop) {
                if ([transformFuncStr isKindOfClass:[NSString class]]) {
                    NSDictionary *transformFuncDic = [self convertTransform:transformFuncStr];
                    if (transformFuncDic) {
                        [convertAnimations addEntriesFromDictionary:transformFuncDic];
                    }
                }
            }];
        } else {
            [convertAnimations addEntriesFromDictionary:@{key: value}];
        }
    }];
    
    return convertAnimations.copy;
}

@end
