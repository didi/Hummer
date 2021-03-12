//
//  HMTransform.h
//  Hummer
//
//  Created by didi on 2021/2/22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/* 保存最新的 view transform 状态，在执行动画之后，把状态同步给 view ，保持事件事件响应*/

@interface HMTransform : NSObject<NSCopying>

/* position */
@property (nonatomic, assign, readonly) float translateX;
@property (nonatomic, assign, readonly) float translateY;

/* rotate */
@property (nonatomic, assign, readonly) float rotationX;
@property (nonatomic, assign, readonly) float rotationY;
@property (nonatomic, assign, readonly) float rotationZ;

/* scale */
@property (nonatomic, assign, readonly) float scaleX;
@property (nonatomic, assign, readonly) float scaleY;

/* skew */
@property (nonatomic, assign, readonly) CATransform3D skew;

- (instancetype)initWithKey:(NSString *)key propertyValue:(id)value;

// keyframe
- (instancetype)initWithKey:(NSString *)key propertyValues:(NSArray *)values;

// 同属性覆盖。
- (HMTransform *)mergeTransform:(HMTransform *)transform withKey:(NSString *)key;
@end

NS_ASSUME_NONNULL_END
