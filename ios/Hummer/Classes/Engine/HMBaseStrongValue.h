//
//  HMBaseStrongValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Hummer/HMBaseValue.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * 子类在调用父类构造函数前必须赋值 valueRef
 */
@interface HMBaseStrongValue : HMBaseValue

@end

NS_ASSUME_NONNULL_END
