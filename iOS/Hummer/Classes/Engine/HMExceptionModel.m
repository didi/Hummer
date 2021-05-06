//
//  HMExceptionModel.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/10.
//

#import "HMExceptionModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMExceptionModel ()

- (BOOL)isEqualToModel:(nullable HMExceptionModel *)other;

@end

NS_ASSUME_NONNULL_END

@implementation HMExceptionModel

- (instancetype)initWithParams:(NSDictionary *)params {
    self = [super init];
    if (self) {
        self.column = params[@"column"];
        self.line = params[@"line"];
        self.message = params[@"message"];
        self.name = params[@"name"];
        self.stack = params[@"stack"];
    }
    return self;
}

+ (BOOL)supportsSecureCoding {
    return YES;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    self = [super init];
    if (self) {
        self.column = [coder decodeObjectForKey:@"self.column"];
        self.line = [coder decodeObjectForKey:@"self.line"];
        self.message = [coder decodeObjectForKey:@"self.message"];
        self.name = [coder decodeObjectForKey:@"self.name"];
        self.stack = [coder decodeObjectForKey:@"self.stack"];
    }

    return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
    [coder encodeObject:self.column forKey:@"self.column"];
    [coder encodeObject:self.line forKey:@"self.line"];
    [coder encodeObject:self.message forKey:@"self.message"];
    [coder encodeObject:self.name forKey:@"self.name"];
    [coder encodeObject:self.stack forKey:@"self.stack"];
}

- (id)copyWithZone:(NSZone *)zone {
    HMExceptionModel *copy = (HMExceptionModel *) [[[self class] allocWithZone:zone] init];

    if (copy != nil) {
        copy.column = self.column;
        copy.line = self.line;
        copy.message = self.message;
        copy.name = self.name;
        copy.stack = self.stack;
    }

    return copy;
}

- (BOOL)isEqual:(id)other {
    if (other == self)
        return YES;
    if (!other || ![[other class] isEqual:[self class]])
        return NO;

    return [self isEqualToModel:other];
}

- (BOOL)isEqualToModel:(HMExceptionModel *)model {
    if (self == model)
        return YES;
    if (model == nil)
        return NO;
    if (self.column != model.column && ![self.column isEqualToNumber:model.column])
        return NO;
    if (self.line != model.line && ![self.line isEqualToNumber:model.line])
        return NO;
    if (self.message != model.message && ![self.message isEqualToString:model.message])
        return NO;
    if (self.name != model.name && ![self.name isEqualToString:model.name])
        return NO;
    if (self.stack != model.stack && ![self.stack isEqualToString:model.stack])
        return NO;
    return YES;
}

- (NSUInteger)hash {
    NSUInteger hash = [self.column hash];
    hash = hash * 31u + [self.line hash];
    hash = hash * 31u + [self.message hash];
    hash = hash * 31u + [self.name hash];
    hash = hash * 31u + [self.stack hash];
    return hash;
}

- (NSString *)description {
    NSMutableString *description = [NSMutableString stringWithFormat:@"<%@: ", NSStringFromClass([self class])];
    [description appendFormat:@"self.column=%@", self.column];
    [description appendFormat:@", self.line=%@", self.line];
    [description appendFormat:@", self.message=%@", self.message];
    [description appendFormat:@", self.name=%@", self.name];
    [description appendFormat:@", self.stack=%@", self.stack];
    [description appendString:@">"];
    return description;
}

@end
