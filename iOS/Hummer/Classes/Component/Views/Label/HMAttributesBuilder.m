//
//  HMAttributesBuilder.m
//  Hummer
//
//  Created by didi on 2020/3/1.
//

#import "HMAttributesBuilder.h"
#import "HMConverter.h"
#import "HMUtility.h"
#import "NSString+Hummer.h"
#import "HMAttributesItem.h"

@interface HMAttributesBuilder ()

@property (nonatomic, copy) NSArray<HMAttributesItem *> *items;
@property (nonatomic, strong) NSAttributedString *result;

@end

@implementation HMAttributesBuilder{
    NSNumber *_maxCapHeight;
    bool hasCustomFont;
}

- (instancetype)init {
    return [self initWithFont:[UIFont systemFontOfSize:16] textDecoration:nil letterSpacing:nil paragraphStyle:nil];
}

- (instancetype)initWithFont:(UIFont *)font textDecoration:(NSDictionary *)textDecoration letterSpacing:(nullable NSDictionary *)letterSpacing paragraphStyle:(nullable NSMutableParagraphStyle *)paragraphStyle {
    self = [super init];
    if (self) {
        _font = font;
        _textDecoration = textDecoration;
        _letterSpacing = letterSpacing;
        _paragraphStyle = paragraphStyle;
    }
    return self;
}

- (void)clear {
    _items = nil;
}

- (NSAttributedString *)buildAttributedString:(NSArray *)data {
    if (!data || data.count == 0) {
        return nil;
    }
    
    [self clear];
    
    // map
    __block CGFloat maxCapH = self.font.capHeight;
    NSMutableArray *itemArray = [NSMutableArray arrayWithCapacity:data.count];
    [data enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        HMAttributesItem *item = nil;
        if ([obj isKindOfClass:NSString.class]) {
            item = [HMAttributesItem itemWithString:obj];
        } else if ([obj isKindOfClass:NSDictionary.class]) {
            item = [HMAttributesItem itemWithDictionary:obj];
        } else {
            //
        }
        // 是否有 item 使用自定义大小字体。
        hasCustomFont = item.isCustomizedFont || hasCustomFont;
        UIFont *font = [item copiedFont:self.font];
        maxCapH = MAX(maxCapH, font.capHeight);
        if (item) {
            [itemArray addObject:item];
        }
    }];
    self.items = [itemArray copy];
    _maxCapHeight = @(maxCapH);
    // parse
    NSMutableAttributedString *result = [[NSMutableAttributedString alloc] init];
    [self.items enumerateObjectsUsingBlock:^(HMAttributesItem * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSAttributedString *str = [self attributedStringWithItem:obj];
        if (str) {
            [result appendAttributedString:str];
        }
    }];
    self.result = [result copy];
    return self.result;
}
// 如果没有 item 使用自定义字体。则直接覆盖。否则需要选出最大的字体。
- (void)updateFont:(UIFont *)font {
    _font = font;
    __weak typeof(self) wSelf = self;
    CGFloat maxCapH = font.capHeight;
    _maxCapHeight = hasCustomFont ? @(MAX(maxCapH, _maxCapHeight.floatValue)) : @(maxCapH);
    [self performUpdationWithHandler:^(NSMutableAttributedString *result, HMAttributesItem *item, NSRange range, BOOL *hasChanged) {\
        if (!wSelf) return;
        __strong typeof(wSelf) sself = wSelf;
        if (item.isCustomizedFont) {
            UIFont *copied = [item copiedFont:font];
            if (copied) {
                [result addAttribute:NSFontAttributeName value:copied range:range];
                *hasChanged = YES;
            }
        }
        if (item.image && item.cachedImage && item.imageAlign == HMAttributesImageAlignBaselineCenter) {
            UIImage *image = item.cachedImage;
            NSTextAttachment *imageAttachment = [NSTextAttachment new];
            imageAttachment.image = image;
            imageAttachment.bounds = CGRectMake(0, (sself->_maxCapHeight.floatValue - image.size.height)/2, image.size.width, image.size.height);
            NSAttributedString *imageString = [NSAttributedString attributedStringWithAttachment:imageAttachment];
            NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithAttributedString:imageString];
            [result replaceCharactersInRange:range withAttributedString:string];
            *hasChanged = YES;
        }
    }];
}

- (void)updateTextDecoration:(NSDictionary *)textDecoration {
    _textDecoration = textDecoration;
    
    [self performUpdationWithHandler:^(NSMutableAttributedString *result, HMAttributesItem *item, NSRange range, BOOL *hasChanged) {
        NSDictionary *td = item.textDecoration ? : textDecoration;
        if (td && td.count == 0) {
            td = @{
                NSStrikethroughStyleAttributeName : @(NSUnderlineStyleNone),
                NSUnderlineStyleAttributeName : @(NSUnderlineStyleNone),
            };
        }
        if (td) {
            [result addAttributes:td range:range];
            *hasChanged = YES;
        }
    }];
}

- (void)updateLetterSpacing:(NSDictionary *)letterSpacing {
    _letterSpacing = letterSpacing;
    
    [self performUpdationWithHandler:^(NSMutableAttributedString *result, HMAttributesItem *item, NSRange range, BOOL *hasChanged) {
        NSDictionary *td = item.letterSpacing ? : letterSpacing;
        if (td && td.count == 0) {
            td = @{
                NSKernAttributeName : @(0),
            };
        }
        if (td) {
            [result addAttributes:td range:range];
            *hasChanged = YES;
        }
    }];
}

- (void)updateParagraphStyle:(NSMutableParagraphStyle *)paragraphStyle {
    _paragraphStyle = paragraphStyle;
    
    [self performUpdationWithHandler:^(NSMutableAttributedString *result, HMAttributesItem *item, NSRange range, BOOL *hasChanged) {
        NSMutableParagraphStyle *td = item.paragraphStyle ? : paragraphStyle;
        if (td) {
            [result addAttributes:@{
                NSParagraphStyleAttributeName : td,
            } range:range];
            *hasChanged = YES;
        }
    }];
}

- (NSString *)linkAtIndex:(NSUInteger)index {
    if (!self.items || self.items.count == 0 || !self.result) {
        return nil;
    }
    NSUInteger position = 0;
    for (HMAttributesItem *i in self.items) {
        if (i.href) {
            NSRange range = NSMakeRange(position, i.length);
            if (NSLocationInRange(index, range)) {
//                因为系统返回了相邻的索引，导致最后一个字符总是被返回；这里可以直接让最后一个字符失效。
//                if (i.length > 1) {
//                    if (index < position + i.length - 1) {
//                        return i.href;
//                    }
//                } else {
//                    return i.href;
//                }
                return i.href;
            }
        }
        position += i.length;
    }
    return nil;
}

// MARK: - helper

#define notEmpty(str) (str && [str stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceAndNewlineCharacterSet].length > 0)

- (NSAttributedString *)attributedStringWithItem:(HMAttributesItem *)item {
    // image (include text, href)
    if (notEmpty(item.image)) {
        return [self attributedImageStringWithItem:item];
    }
    
    // text or href
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:item.characters];
    [self attributedString:string appendStyles:item];
    
    // update length
    item.length = string.length;

    return string;
}

#undef notEmpty

- (NSAttributedString *)attributedImageStringWithItem:(HMAttributesItem *)item {
    if (item.image.hm_isHTTPURLString && !item.cachedImage) {
        NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:item.characters];
        [self attributedString:string appendStyles:item];

        // update length
        item.length = string.length;

        __weak typeof(self) wself = self;
        HMNetImageFromImageURL(item.image, ^(UIImage * _Nullable image, NSError * _Nullable error) {
            __strong typeof(wself) sself = wself;
            if (!sself) {
                return;
            }
            [sself updateItem:item image:image];
        });
        
        return string;
    }
    UIImage *image = item.cachedImage;
    if (!image) {
        if (item.image.pathComponents.count > 0) {
            image = HMImageFromLocalAssetName(item.image);
        } else {
            image = HMImageFromBase64String(item.image);
        }
        if (image && item.isCustomizedImageSize) {
            CGFloat imageWidth = item.imageWidth > 0 ? item.imageWidth : image.size.width;
            CGFloat imageHeight = item.imageHeight > 0 ? item.imageHeight : image.size.height;
            image = [self fragmentImage:image width:imageWidth height:imageHeight];
        }
        if (image) {
            // cache the image
            item.cachedImage = image;
        }
    }
    NSMutableAttributedString *string = nil;
    if (image) {
        NSTextAttachment *imageAttachment = [[NSTextAttachment alloc] initWithData:nil ofType:nil];
        if (item.imageAlign == HMAttributesImageAlignBaselineCenter) {
            imageAttachment.bounds = CGRectMake(0, (_maxCapHeight.floatValue - image.size.height)/2, image.size.width, image.size.height);
        }
        imageAttachment.image = image;
        NSAttributedString *imageString = [NSAttributedString attributedStringWithAttachment:imageAttachment];
        string = [[NSMutableAttributedString alloc] initWithAttributedString:imageString];
    } else {
        string = [[NSMutableAttributedString alloc] initWithString:item.characters];
    }
    
    [self attributedString:string appendStyles:item];
    
    // update length
    item.length = string.length;
    
    return string;
}

/// 更新指定模型的图片资源
- (void)updateItem:(HMAttributesItem *)item image:(UIImage *)image {
    if (!item || !item || !self.items || self.items.count == 0) {
        return;
    }
    
    // `self.items`中的模型是特定的，一个默认的唯一标识符就是模型的内存地址。
    // 如果此时已经无法在当前的集合中查找到这个模型，很可能意味着该模型以及其对应的集合已经被彻底更新。
    //
    if (![self.items containsObject:item]) {
        return;
    }
    
    // 计算该模型所对应的字符串在总的字符串中的起点位置，
    // 也就是其之前的模型的字符串的长度和:
    //
    //      p(n) = ∑i.length, i = 0 ..< n;
    //
    NSUInteger position = 0;
    for (HMAttributesItem *i in self.items) {
        if ([i isEqual:item]) {
            break;
        }
        position += i.length;
    }
    
    // parse
    UIImage *img = image;
    if (item.imageWidth > 0 || item.imageHeight > 0) {
        CGFloat imageWidth = item.imageWidth > 0 ? item.imageWidth : image.size.width;
        CGFloat imageHeight = item.imageHeight > 0 ? item.imageHeight : image.size.height;
        img = [self fragmentImage:image width:imageWidth height:imageHeight];
    }
    NSTextAttachment *imageAttachment = [[NSTextAttachment alloc] initWithData:nil ofType:nil];
    imageAttachment.image = img;
    if (item.imageAlign == HMAttributesImageAlignBaselineCenter) {
        imageAttachment.bounds = CGRectMake(0, (_maxCapHeight.floatValue - img.size.height)/2, img.size.width, img.size.height);
    }
    NSAttributedString *_imageString = [NSAttributedString attributedStringWithAttachment:imageAttachment];
    NSMutableAttributedString *imageString = [[NSMutableAttributedString alloc] initWithAttributedString:_imageString];
    if (self.paragraphStyle) {
        [imageString addAttributes:@{NSParagraphStyleAttributeName:self.paragraphStyle} range:NSMakeRange(0, 1)];
    }
    // replace
    NSRange range = NSMakeRange(position, item.length);
    NSMutableAttributedString *result = [[NSMutableAttributedString alloc] initWithAttributedString:self.result];
    [result replaceCharactersInRange:range withAttributedString:imageString];
    self.result = [result copy];

    // cache the image
    item.cachedImage = img;
    
    // update length
    item.length = imageString.length;
    
    [self notifyDelegator];
}

- (UIImage *)fragmentImage:(UIImage *)image width:(CGFloat)width height:(CGFloat)height {
    UIGraphicsBeginImageContextWithOptions(CGSizeMake(width, height), NO, 2);
    [image drawInRect:CGRectMake(0, 0, width, height)];
    UIImage *result = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return result;
}

/// Add common attributes.
- (NSMutableAttributedString *)attributedString:(NSMutableAttributedString *)source appendStyles:(HMAttributesItem *)item {
    if (!source || !item) {
        return source;
    }
    NSRange range = NSMakeRange(0, source.length);

    if (item.color) {
        [source addAttribute:NSForegroundColorAttributeName value:item.color range:range];
    }
    if (item.backgroundColor) {
        [source addAttribute:NSBackgroundColorAttributeName value:item.backgroundColor range:range];
    }
    NSDictionary *textDecoration = item.textDecoration ? : self.textDecoration;
    if (textDecoration) {
        [source addAttributes:textDecoration range:range];
    }
    if (item.isCustomizedFont) {
        UIFont *font = [item copiedFont:self.font];
        if (font) {
            [source addAttribute:NSFontAttributeName value:font range:range];
        }
    }
    NSDictionary *lettetSpacing = item.letterSpacing ? : self.letterSpacing;
    if (lettetSpacing) {
        [source addAttributes:lettetSpacing range:range];
    }
    if (item.href) {
        [source addAttribute:NSLinkAttributeName value:item.href range:range];
        
        // override item.color with item.hrefColor
        if (item.hrefColor) {
            [source addAttribute:NSForegroundColorAttributeName value:item.hrefColor range:range];
        }
        // here, we can set the underline color.
    }
    return source;
}

/// 为每一项模型检查特定的更新内容，当发生变化后，通知代理。
- (void)performUpdationWithHandler:(void(^)(NSMutableAttributedString *result, HMAttributesItem *item, NSRange range, BOOL *hasChanged))handler {
    if (!self.items || self.items.count == 0 || !self.result) {
        return;
    }
    NSMutableAttributedString *result = [[NSMutableAttributedString alloc] initWithAttributedString:self.result];
    BOOL hasChanged = NO;
    NSUInteger position = 0;
    for (HMAttributesItem *i in self.items) {
        if (handler) {
            handler(result, i, NSMakeRange(position, i.length), &hasChanged);
        }
        position += i.length;
    }
    if (!hasChanged) {
        return;
    }
    
    self.result = [result copy];
    
    [self notifyDelegator];
}

/// 通知代理
- (void)notifyDelegator {
    if (self.delegate && [self.delegate respondsToSelector:@selector(attributesBuilder:didUpdateAttributedString:)]) {
        [self.delegate attributesBuilder:self didUpdateAttributedString:self.result];
    }
}

@end
