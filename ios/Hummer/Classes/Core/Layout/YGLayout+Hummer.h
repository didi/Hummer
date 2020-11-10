//
//  YGLayout+Hummer.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/23.
//

#import <YogaKit/YGLayout.h>
#import <Hummer/HMLayoutStyleProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface YGLayout (Hummer) <HMLayoutStyleProtocol>

@property (nonatomic, weak, readonly) UIView *view;

- (CGSize)sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize;

@end

NS_ASSUME_NONNULL_END
