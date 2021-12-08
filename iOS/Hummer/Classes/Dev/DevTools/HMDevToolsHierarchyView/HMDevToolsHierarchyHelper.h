//
//  HMDevToolsHierarchyHelper.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMDevToolsHierarchyHelper : NSObject

@property (readonly, class) UIColor *hierarchyIndentPatternColor;
@property (readonly, class) UIImage *hierarchyIndentPattern;

+ (NSArray<UIView *> *)viewWithRecursiveSubviews:(UIView *)view;

+ (NSMapTable<UIView *, NSNumber *> *)hierarchyDepthsForViews:(NSArray<UIView *> *)views;

+ (NSString *)descriptionForView:(UIView *)view includingFrame:(BOOL)includeFrame;

+ (NSString *)stringForCGRect:(CGRect)rect;

+ (NSString *)detailDescriptionForView:(UIView *)view;

+ (UIViewController *)viewControllerForView:(UIView *)view;

+ (UIColor *)consistentRandomColorForObject:(id)object;

+ (UIImage *)circularImageWithColor:(UIColor *)color radius:(CGFloat)radius;

+ (UIImage *)imageWithBytesNoCopy:(void *)bytes length:(NSUInteger)length scale:(CGFloat)scale;

@end

NS_ASSUME_NONNULL_END
