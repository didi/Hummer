//
//  HMResourceModel.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/5/7.
//

#import "HMResourceModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMResourceModel ()
- (BOOL)isEqualToModel:(HMResourceModel *)other;
@end

NS_ASSUME_NONNULL_END

@implementation HMResourceModel
- (id)copyWithZone:(NSZone *)zone {
    HMResourceModel *copy = (HMResourceModel *) [[self.class allocWithZone:zone] init];

    if (copy != nil) {
        copy.resourceBundle = [self.resourceBundle copy];
        copy.filePath = self.filePath;
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

- (BOOL)isEqualToModel:(HMResourceModel *)model {
    if (self == model)
        return YES;
    if (model == nil)
        return NO;
    if (self.resourceBundle != model.resourceBundle && ![self.resourceBundle isEqual:model.resourceBundle])
        return NO;
    if (self.filePath != model.filePath && ![self.filePath isEqualToString:model.filePath])
        return NO;
    return YES;
}

- (NSUInteger)hash {
    NSUInteger hash = [self.resourceBundle hash];
    hash = hash * 31u + [self.filePath hash];
    return hash;
}

- (NSString *)description {
    NSMutableString *description = [NSMutableString stringWithFormat:@"<%@: ", NSStringFromClass([self class])];
    [description appendFormat:@"self.resourceBundle=%@", self.resourceBundle];
    [description appendFormat:@", self.filePath=%@", self.filePath];
    [description appendString:@">"];
    return description;
}

@end
