#import <UIKit/UIKit.h>
#import <Hummer/HMBorderModel.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMView : UIView

/// Border radii.
/// Default -1
@property(nonatomic, assign) CGFloat borderRadius;
@property(nonatomic, assign) CGFloat borderTopLeftRadius;
@property(nonatomic, assign) CGFloat borderTopRightRadius;
@property(nonatomic, assign) CGFloat borderTopStartRadius;
@property(nonatomic, assign) CGFloat borderTopEndRadius;
@property(nonatomic, assign) CGFloat borderBottomLeftRadius;
@property(nonatomic, assign) CGFloat borderBottomRightRadius;
@property(nonatomic, assign) CGFloat borderBottomStartRadius;
@property(nonatomic, assign) CGFloat borderBottomEndRadius;

/// Border colors (actually retained)
/// Default nil
@property(nonatomic, copy, nullable) UIColor *borderTopColor;
@property(nonatomic, copy, nullable) UIColor *borderRightColor;
@property(nonatomic, copy, nullable) UIColor *borderBottomColor;
@property(nonatomic, copy, nullable) UIColor *borderLeftColor;
@property(nonatomic, copy, nullable) UIColor *borderStartColor;
@property(nonatomic, copy, nullable) UIColor *borderEndColor;
@property(nonatomic, copy, nullable) UIColor *borderColor;

/// Border widths.
/// Default -1
@property(nonatomic, assign) CGFloat borderTopWidth;
@property(nonatomic, assign) CGFloat borderRightWidth;
@property(nonatomic, assign) CGFloat borderBottomWidth;
@property(nonatomic, assign) CGFloat borderLeftWidth;
@property(nonatomic, assign) CGFloat borderStartWidth;
@property(nonatomic, assign) CGFloat borderEndWidth;
@property(nonatomic, assign) CGFloat borderWidth;

/// Border styles.
/// Default HMBorderStyleSolid
@property(nonatomic, assign) HMBorderStyle borderStyle;

@end

NS_ASSUME_NONNULL_END
