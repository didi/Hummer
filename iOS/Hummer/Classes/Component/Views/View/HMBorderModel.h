//
//  HMBorderModel.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/4/17.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, HMBorderStyle) {
    HMBorderStyleNone = 0,
    HMBorderStyleSolid,
    HMBorderStyleDotted,
    HMBorderStyleDashed,
};

@interface HMBorderModel : NSObject <NSCopying>

@property (nonatomic, assign) HMBorderStyle borderStyle;

@property (nonatomic, assign) CGFloat borderWidth;

/**
 * @brief 默认不透明的黑色
 */
@property (nonatomic, copy, nullable) UIColor *borderColor;

- (BOOL)isEqualToModel:(HMBorderModel *)other;

- (BOOL)isShowBorder;

@end

NS_ASSUME_NONNULL_END
