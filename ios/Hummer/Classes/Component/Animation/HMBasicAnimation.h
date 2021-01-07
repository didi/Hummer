//
//  HMBasicAnimation.h
//  Hummer
//
//  Created by didi on 2020/10/22.
//

#import <Foundation/Foundation.h>
#import "HMViewAnimation.h"
NS_ASSUME_NONNULL_BEGIN

@interface HMBasicAnimationProperty : NSObject

- (instancetype)initWithKey:(NSString *)key propertyValue:(id)value;

@end

@interface HMBasicAnimation : NSObject<HMViewAnimation>

@property (nonatomic, strong)UIView *animatedView;
@property (nonatomic, copy)NSString *animationKeyPath;
@property (nonatomic, strong)HMBasicAnimationProperty *property;

@end

NS_ASSUME_NONNULL_END
