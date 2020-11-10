//
//  HMBaseWeakValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Hummer/HMBaseValue.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMBaseWeakValueProtocol <NSObject>

// 必须实现，因为对于 Hummer 来说，是无法获取到 valueRef 属性的，也就是说，实现的时候需要通过 valueRef 做判断
@optional
- (BOOL)isValid;

@end

/**
 * 子类在调用父类构造函数前必须赋值 valueRef，string 无法使用弱指针
 */
@interface HMBaseWeakValue : HMBaseValue <HMBaseWeakValueProtocol>

@end

NS_ASSUME_NONNULL_END
