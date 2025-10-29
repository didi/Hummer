//
//  HMBorderModelCollection.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/4/17.
//

#import "HMBorderModelCollection.h"
#import "HMBorderModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMBorderModelCollection ()
- (BOOL)isEqualToCollection:(HMBorderModelCollection *)other;
@end

NS_ASSUME_NONNULL_END

@implementation HMBorderModelCollection

- (id)copyWithZone:(nullable NSZone *)zone {
    HMBorderModelCollection *copy = (HMBorderModelCollection *) [[[self class] allocWithZone:zone] init];

    if (copy != nil) {
        copy.left = self.left;
        copy.top = self.top;
        copy.bottom = self.bottom;
        copy.right = self.right;
    }

    return copy;
}

- (BOOL)isEqual:(id)other {
    if (other == self)
        return YES;
    if (!other || ![[other class] isEqual:[self class]])
        return NO;

    return [self isEqualToCollection:other];
}

- (BOOL)isEqualToCollection:(HMBorderModelCollection *)collection {
    if (self == collection)
        return YES;
    if (collection == nil)
        return NO;
    if (self.left != collection.left && ![self.left isEqualToModel:collection.left])
        return NO;
    if (self.top != collection.top && ![self.top isEqualToModel:collection.top])
        return NO;
    if (self.bottom != collection.bottom && ![self.bottom isEqualToModel:collection.bottom])
        return NO;
    if (self.right != collection.right && ![self.right isEqualToModel:collection.right])
        return NO;
    return YES;
}

- (NSUInteger)hash {
    NSUInteger hash = [self.left hash];
    hash = hash * 31u + [self.top hash];
    hash = hash * 31u + [self.bottom hash];
    hash = hash * 31u + [self.right hash];
    return hash;
}

- (NSString *)description {
    NSMutableString *description = [NSMutableString stringWithFormat:@"<%@: ", NSStringFromClass([self class])];
    [description appendFormat:@"self.left=%@", self.left];
    [description appendFormat:@", self.top=%@", self.top];
    [description appendFormat:@", self.bottom=%@", self.bottom];
    [description appendFormat:@", self.right=%@", self.right];
    [description appendString:@">"];
    return description;
}


@end
