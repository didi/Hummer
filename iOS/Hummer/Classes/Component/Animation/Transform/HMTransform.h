//
//  HMTransform.h
//  Hummer
//
//  Created by didi on 2021/2/22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

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


- (instancetype)initWithKey:(NSString *)key propertyValue:(id)value;

// 同属性覆盖。
- (HMTransform *)mergeTransform:(HMTransform *)transform withKey:(NSString *)key;
@end

NS_ASSUME_NONNULL_END
