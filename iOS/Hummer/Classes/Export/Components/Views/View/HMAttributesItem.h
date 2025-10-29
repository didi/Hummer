//
//  HMAttributesItem.h
//  Hummer
//
//  Created by didi on 2020/3/3.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, HMAttributesImageAlign) {
    HMAttributesImageAlignBaseline = 0,
    HMAttributesImageAlignBaselineTop,
    HMAttributesImageAlignBaselineCenter,
    HMAttributesImageAlignBaselineBottom,
};

typedef NS_ENUM(NSUInteger, HMAttributesTextVerticalAlign) {
    HMAttributesTextVerticalAlignCenter = 0,
    HMAttributesTextVerticalAlignTop,
    HMAttributesTextVerticalAlignBottom,
};

@interface HMAttributesItem : NSObject

@property (nonatomic, copy, nullable) NSString *text;
@property (nonatomic, strong, nullable) UIColor *color;
@property (nonatomic, strong, nullable) UIColor *backgroundColor;
@property (nonatomic, copy, nullable) NSDictionary *textDecoration;
@property (nonatomic, copy, nullable) NSDictionary *letterSpacing;
@property (nonatomic, strong, nullable) NSMutableParagraphStyle *paragraphStyle;
@property (nonatomic, copy, nullable) NSString *fontFamily;
@property (nonatomic, copy, nullable) NSString *fontWeight;
@property (nonatomic, copy, nullable) NSString *fontStyle;
@property (nonatomic) UIFontDescriptorSymbolicTraits fontTraits;
@property (nonatomic) CGFloat fontSize;
@property (nonatomic, copy, nullable) NSString *image;
@property (nonatomic) CGFloat imageWidth;
@property (nonatomic) CGFloat imageHeight;
@property (nonatomic) HMAttributesImageAlign imageAlign;
@property (nonatomic, copy, nullable) NSString *href;
@property (nonatomic, strong, nullable) UIColor *hrefColor;
@property (nonatomic, assign) HMAttributesTextVerticalAlign textVerticalAlign;

@property (nonatomic) NSUInteger length;
@property (nonatomic, strong, nullable) UIImage *cachedImage;
@property (nonatomic, strong, nullable) UIFont *cachedFont;

@property (nonatomic, readonly) BOOL isCustomizedFont;
@property (nonatomic, readonly) BOOL isCustomizedImageSize;
@property (nonatomic, readonly) NSString *characters;

+ (nullable instancetype)itemWithString:(NSString *)string;
+ (nullable instancetype)itemWithDictionary:(NSDictionary *)dictionary;

/// 基于已经存在的字体`font`，结合自身属性，创建一份新的字体实例
- (UIFont *)copiedFont:(UIFont *)font;

@end

NS_ASSUME_NONNULL_END
