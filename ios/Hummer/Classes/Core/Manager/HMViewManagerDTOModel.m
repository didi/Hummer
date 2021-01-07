//
//  HMViewManagerDTOModel.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/12/22.
//

#import "HMViewManagerDTOModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMViewManagerDTOModel ()

- (BOOL)isEqualToModel:(HMViewManagerDTOModel *)other;

@end

NS_ASSUME_NONNULL_END

@implementation HMViewManagerDTOModel

+ (BOOL)supportsSecureCoding {
    return YES;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    self = [super init];
    if (self) {
        self.viewClassName = [coder decodeObjectForKey:@"self.viewClassName"];
        self.parentViewManagerClassName = [coder decodeObjectForKey:@"self.parentViewManagerClassName"];
        self.propertyList = [coder decodeObjectForKey:@"self.propertyList"];
    }

    return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
    [coder encodeObject:self.viewClassName forKey:@"self.viewClassName"];
    [coder encodeObject:self.parentViewManagerClassName forKey:@"self.parentViewManagerClassName"];
    [coder encodeObject:self.propertyList forKey:@"self.propertyList"];
}

- (id)copyWithZone:(NSZone *)zone {
    HMViewManagerDTOModel *copy = (HMViewManagerDTOModel *) [[[self class] allocWithZone:zone] init];

    if (copy != nil) {
        copy.viewClassName = self.viewClassName;
        copy.parentViewManagerClassName = self.parentViewManagerClassName;
        copy.propertyList = self.propertyList;
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

- (BOOL)isEqualToModel:(HMViewManagerDTOModel *)model {
    if (self == model)
        return YES;
    if (model == nil)
        return NO;
    if (self.viewClassName != model.viewClassName && ![self.viewClassName isEqualToString:model.viewClassName])
        return NO;
    if (self.parentViewManagerClassName != model.parentViewManagerClassName && ![self.parentViewManagerClassName isEqualToString:model.parentViewManagerClassName])
        return NO;
    if (self.propertyList != model.propertyList && ![self.propertyList isEqualToArray:model.propertyList])
        return NO;
    return YES;
}

- (NSUInteger)hash {
    NSUInteger hash = [self.viewClassName hash];
    hash = hash * 31u + [self.parentViewManagerClassName hash];
    hash = hash * 31u + [self.propertyList hash];
    return hash;
}

- (NSString *)description {
    NSMutableString *description = [NSMutableString stringWithFormat:@"<%@: ", NSStringFromClass([self class])];
    [description appendFormat:@"self.viewClassName=%@", self.viewClassName];
    [description appendFormat:@", self.parentViewManagerClassName=%@", self.parentViewManagerClassName];
    [description appendFormat:@", self.propertyList=%@", self.propertyList];
    [description appendString:@">"];
    return description;
}

@end
