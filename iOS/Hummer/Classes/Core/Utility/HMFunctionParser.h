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
    HMParserNonnullable,
};

void HMFunctionParse();

@interface HMMethodArgument : NSObject

@property (nonatomic, copy, readonly) NSString *type;
@property (nonatomic, readonly) HMParserNullability nullability;
@property (nonatomic, readonly) BOOL unused;


- (instancetype)initWithType:(NSString *)type nullability:(HMParserNullability)nullability unused:(BOOL)unused;

@end
