//
//  UIView+HMDom.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "UIView+HMDom.h"
#import "HMExportManager.h"
#import "HMConverter.h"
#import "UIView+Hummer.h"
#import <objc/runtime.h>
#import "HMUtility.h"
#import "NSObject+Hummer.h"
#import "HMCornerRadiusModel.h"
#import "HMBorderModelCollection.h"
#import "HMResourceModel.h"
#import <Hummer/HMBorderModel.h>
#import <SDWebImage/SDWebImageOperation.h>
#import <SDWebImage/NSData+ImageContentType.h>
#import <SDWebImage/SDImageGIFCoder.h>
#import <SDWebImage/SDWebImageDefine.h>
#import <SDWebImage/SDImageCacheDefine.h>
#import <SDWebImage/SDWebImageManager.h>
#import "HMJSGlobal.h"
#import "WeakPointerWrapper.h"
#import "HMAttrManager.h"
#import "HMYogaConfig.h"
#import "HMGradientColor.h"
#import "UIView+HMEvent.h"
#import "HMBaseValue.h"
#import "UIView+HMRenderObject.h"

NS_ASSUME_NONNULL_BEGIN

static NSString *const BASE64HEADERPREFIX = @"data:";

NS_ASSUME_NONNULL_END

@implementation UIView (HMDom)

HM_EXPORT_PROPERTY(style, hm_style, hm_setStyle:)

HM_EXPORT_PROPERTY(viewID, hm_viewID, hm_setViewID:)

HM_EXPORT_PROPERTY(enabled, hm_enabled, hm_setEnabled:)

HM_EXPORT_METHOD(appendChild, hm_addSubview:)

HM_EXPORT_METHOD(removeChild, hm_removeSubview:)

HM_EXPORT_METHOD(removeAll, hm_removeAllSubviews)

HM_EXPORT_METHOD(insertBefore, hm_insertBefore:
    withNode:)

HM_EXPORT_METHOD(replaceChild, hm_replaceSubview:
    withNode:)

HM_EXPORT_METHOD(getElementById, hm_getSubViewByID:)

HM_EXPORT_METHOD(layout, hm_layoutRootView)

- (void)hm_dealloc {
    [self hm_dealloc];
}

- (id <SDWebImageOperation>)hm_webImageOperation {
    WeakPointerWrapper *weakPointerWrapper = objc_getAssociatedObject(self, _cmd);

    if (!weakPointerWrapper.value) {
        objc_setAssociatedObject(self, _cmd, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }

    return weakPointerWrapper.value;
}
/**
 * 声明周期管理 hummerStrongValue -> js -> oc对象(View)
 * 要保留hummerStrongValue 对象的存活，将其挂载到View 的父视图
 */
- (NSMutableSet *)hm_hummerValueHandle {
    if (!objc_getAssociatedObject(self, _cmd)) {
        objc_setAssociatedObject(self, _cmd, [NSMutableSet new], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_webImageOperation:(id <SDWebImageOperation>)hmWebImageOperation {
    if (!hmWebImageOperation) {
        objc_setAssociatedObject(self, @selector(hm_webImageOperation), nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    } else {
        WeakPointerWrapper<id <SDWebImageOperation>> *weakPointerWrapper = objc_getAssociatedObject(self, @selector(hm_webImageOperation));
        if (!weakPointerWrapper) {
            weakPointerWrapper = [[WeakPointerWrapper alloc] init];
            objc_setAssociatedObject(self, @selector(hm_webImageOperation), weakPointerWrapper, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        }
        weakPointerWrapper.value = hmWebImageOperation;
    }
}

- (CAShapeLayer *)hm_borderTopLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderTopLayer:(CAShapeLayer *)hm_borderTopLayer {
    objc_setAssociatedObject(self, @selector(hm_borderTopLayer), hm_borderTopLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_borderRightLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderRightLayer:(CAShapeLayer *)hm_borderRightLayer {
    objc_setAssociatedObject(self, @selector(hm_borderRightLayer), hm_borderRightLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_borderBottomLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderBottomLayer:(CAShapeLayer *)hm_borderBottomLayer {
    objc_setAssociatedObject(self, @selector(hm_borderBottomLayer), hm_borderBottomLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_borderLeftLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderLeftLayer:(CAShapeLayer *)hm_borderLeftLayer {
    objc_setAssociatedObject(self, @selector(hm_borderLeftLayer), hm_borderLeftLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (BOOL)hm_isMasksToBoundsOptimization {
    NSNumber *isMasksToBoundsOptimization = objc_getAssociatedObject(self, _cmd);

    return isMasksToBoundsOptimization.boolValue;
}

- (void)setHm_isMasksToBoundsOptimization:(BOOL)hm_isMasksToBoundsOptimization {
    objc_setAssociatedObject(self, @selector(hm_isMasksToBoundsOptimization), hm_isMasksToBoundsOptimization ? @YES : nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (BOOL)hm_isFixedPosition {
    NSNumber *isFixedPosition = objc_getAssociatedObject(self, _cmd);

    return isFixedPosition.boolValue;
}

- (void)setHm_isFixedPosition:(BOOL)hm_isFixedPosition {
    objc_setAssociatedObject(self, @selector(hm_isFixedPosition), hm_isFixedPosition ? @YES : nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (UIView *)hm_fixedPositionLastContainerView {
    WeakPointerWrapper *weakPointerWrapper = objc_getAssociatedObject(self, _cmd);

    if (!weakPointerWrapper.value) {
        objc_setAssociatedObject(self, _cmd, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }

    return weakPointerWrapper.value;
}

- (void)setHm_fixedPositionLastContainerView:(UIView *)hm_fixedPositionLastContainerView {
    if (!hm_fixedPositionLastContainerView) {
        objc_setAssociatedObject(self, @selector(hm_fixedPositionLastContainerView), nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    } else {
        WeakPointerWrapper<UIView *> *weakPointerWrapper = objc_getAssociatedObject(self, @selector(hm_fixedPositionLastContainerView));
        if (!weakPointerWrapper) {
            weakPointerWrapper = [[WeakPointerWrapper alloc] init];
            objc_setAssociatedObject(self, @selector(hm_fixedPositionLastContainerView), weakPointerWrapper, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        }
        weakPointerWrapper.value = hm_fixedPositionLastContainerView;
    }
}

- (CAShapeLayer *)hm_backgroundColorShapeLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_backgroundColorShapeLayer:(CAShapeLayer *)hm_backgroundColorShapeLayer {
    objc_setAssociatedObject(self, @selector(hm_backgroundColorShapeLayer), hm_backgroundColorShapeLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_backgroundColorMaskLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_backgroundColorMaskLayer:(CAShapeLayer *)hm_backgroundColorMaskLayer {
    objc_setAssociatedObject(self, @selector(hm_backgroundColorMaskLayer), hm_backgroundColorMaskLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSDictionary<NSString *, NSObject *> *)hm_styleStore {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_styleStore:(NSDictionary<NSString *, NSObject *> *)hmStyleStore {
    objc_setAssociatedObject(self, @selector(hm_styleStore), hmStyleStore, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAShapeLayer *)hm_maskLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_maskLayer:(CAShapeLayer *)hm_maskLayer {
    objc_setAssociatedObject(self, @selector(hm_maskLayer), hm_maskLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (CAGradientLayer *)hm_gradientLayer {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_gradientLayer:(CAGradientLayer *)hm_gradientLayer {
    objc_setAssociatedObject(self, @selector(hm_gradientLayer), hm_gradientLayer, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (HMBorderModelCollection *)hm_borderModelCollection {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_borderModelCollection:(HMBorderModelCollection *)hm_borderModelCollection {
    objc_setAssociatedObject(self, @selector(hm_borderModelCollection), hm_borderModelCollection, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (HMCornerRadiusModel *)hm_cornerRadiusModel {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_cornerRadiusModel:(HMCornerRadiusModel *)hm_cornerRadiusModel {
    objc_setAssociatedObject(self, @selector(hm_cornerRadiusModel), hm_cornerRadiusModel, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (void)hm_fallbackWithBorderModelCollection:(HMBorderModelCollection *)borderModelCollection {
    // 回退机制
    if ([borderModelCollection.top isEqualToModel:borderModelCollection.right] && [borderModelCollection.right isEqualToModel:borderModelCollection.bottom] && [borderModelCollection.bottom isEqualToModel:borderModelCollection.left]) {
        if (borderModelCollection.top.borderStyle == HMBorderStyleSolid && borderModelCollection.top.borderWidth > 0) {
            self.layer.borderColor = borderModelCollection.top.borderColor.CGColor;
            self.layer.borderWidth = borderModelCollection.top.borderWidth;
            self.hm_borderModelCollection = nil;

            return;
        } else if (borderModelCollection.top.borderStyle == HMBorderStyleNone && borderModelCollection.top.borderWidth == 0) {
            self.hm_borderModelCollection = nil;
            self.layer.borderColor = borderModelCollection.top.borderColor.CGColor;
            self.layer.borderWidth = 0;

            return;
        }
    }
    self.hm_borderModelCollection = borderModelCollection;
    self.layer.borderWidth = 0;
    self.layer.borderColor = nil;
}

- (void)hm_saveBorderStyleWithTop:(NSNumber *)top right:(NSNumber *)right bottom:(NSNumber *)bottom left:(NSNumber *)left {
    HMBorderModelCollection *borderModelCollection = self.hm_borderModelCollection;
    if (!borderModelCollection) {
        borderModelCollection = [self hm_createBorderModelCollection];
    }
    if (top) {
        borderModelCollection.top.borderStyle = (HMBorderStyle) top.unsignedIntegerValue;
    }
    if (right) {
        borderModelCollection.right.borderStyle = (HMBorderStyle) right.unsignedIntegerValue;
    }
    if (bottom) {
        borderModelCollection.bottom.borderStyle = (HMBorderStyle) bottom.unsignedIntegerValue;
    }
    if (left) {
        borderModelCollection.left.borderStyle = (HMBorderStyle) left.unsignedIntegerValue;
    }
    [self hm_fallbackWithBorderModelCollection:borderModelCollection];
    [self hm_updateBorder];
}

- (void)hm_saveBorderColorWithTop:(UIColor *)top right:(UIColor *)right bottom:(UIColor *)bottom left:(UIColor *)left {
    HMBorderModelCollection *borderModelCollection = self.hm_borderModelCollection;
    if (!borderModelCollection) {
        borderModelCollection = [self hm_createBorderModelCollection];
    }
    if (top) {
        borderModelCollection.top.borderColor = top;
    }
    if (right) {
        borderModelCollection.right.borderColor = right;
    }
    if (bottom) {
        borderModelCollection.bottom.borderColor = bottom;
    }
    if (left) {
        borderModelCollection.left.borderColor = left;
    }
    [self hm_fallbackWithBorderModelCollection:borderModelCollection];
    [self hm_updateBorder];
}

- (void)hm_saveBorderWidthWithTop:(NSNumber *)top right:(NSNumber *)right bottom:(NSNumber *)bottom left:(NSNumber *)left {
    HMBorderModelCollection *borderModelCollection = self.hm_borderModelCollection;
    if (!borderModelCollection) {
        borderModelCollection = [self hm_createBorderModelCollection];
    }
    if (top) {
        borderModelCollection.top.borderWidth = top.doubleValue;
    }
    if (right) {
        borderModelCollection.right.borderWidth = right.doubleValue;
    }
    if (bottom) {
        borderModelCollection.bottom.borderWidth = bottom.doubleValue;
    }
    if (left) {
        borderModelCollection.left.borderWidth = left.doubleValue;
    }
    [self hm_fallbackWithBorderModelCollection:borderModelCollection];
    [self hm_updateBorder];
}

- (void)hm_saveCornerRadiusWithTopLeft:(NSNumber *)topLeft topRight:(NSNumber *)topRight bottomLeft:(NSNumber *)bottomLeft bottomRight:(NSNumber *)bottomRight {
    HMCornerRadiusModel *cornerRadiusModel = nil;
    if (self.hm_cornerRadiusModel) {
        // 原先已经是多角
        cornerRadiusModel = self.hm_cornerRadiusModel;
    } else {
        // 原先是单角
        cornerRadiusModel = [[HMCornerRadiusModel alloc] init];
        cornerRadiusModel.topLeft = self.layer.cornerRadius;
        cornerRadiusModel.topRight = self.layer.cornerRadius;
        cornerRadiusModel.bottomLeft = self.layer.cornerRadius;
        cornerRadiusModel.bottomRight = self.layer.cornerRadius;
    }

    if (topLeft) {
        cornerRadiusModel.topLeft = topLeft.doubleValue;
    }
    if (topRight) {
        cornerRadiusModel.topRight = topRight.doubleValue;
    }
    if (bottomLeft) {
        cornerRadiusModel.bottomLeft = bottomLeft.doubleValue;
    }
    if (bottomRight) {
        cornerRadiusModel.bottomRight = bottomRight.doubleValue;
    }

    if (hm_doubleEqual(cornerRadiusModel.topLeft, cornerRadiusModel.topRight) && hm_doubleEqual(cornerRadiusModel.topRight, cornerRadiusModel.bottomRight) && hm_doubleEqual(cornerRadiusModel.bottomRight, cornerRadiusModel.bottomLeft)) {
        // 转单角
        self.layer.cornerRadius = cornerRadiusModel.topLeft;
        self.hm_cornerRadiusModel = nil;
    } else {
        // 转多角
        self.layer.cornerRadius = 0;
        self.hm_cornerRadiusModel = cornerRadiusModel;
    }
    // 不使用 setNeedsLayout
    [self hm_updateMasksToBounds];
    [self hm_updateBackgroundColor];
    [self hm_updateShadow];
    [self hm_updateBorder];
}

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        hm_method_swizzling(UIView.class, @selector(layoutSubviews), @selector(hm_layoutSubviews));
        hm_method_swizzling(UIView.class, NSSelectorFromString(@"dealloc"), @selector(hm_dealloc));
    });
}

- (void)hm_performBackgroundColorWithBackgroundColor:(nullable UIColor *)backgroundColor {
    if (backgroundColor) {
        // 有颜色
        // 1. 有 layer 更新 layer 颜色
        // 2. 没有则更新 backgroundColor
        if (self.hm_backgroundColorShapeLayer) {
            self.hm_backgroundColorShapeLayer.fillColor = backgroundColor.CGColor;
        } else {
            self.backgroundColor = backgroundColor;
        }
        // 3. 移除渐变色
        [self.hm_gradientLayer removeFromSuperlayer];
        self.hm_gradientLayer = nil;
    } else {
        // 没有颜色
        // 1. 移除 layer
        [self.hm_backgroundColorShapeLayer removeFromSuperlayer];
        self.hm_backgroundColorShapeLayer = nil;
        // 2. 设置 nil 背景色
        self.backgroundColor = nil;
    }

    // 不使用 setNeedsLayout
    [self hm_updateBackgroundColor];
}

- (void)hm_performGradientColorWithGradientColor:(nullable HMGradientColor *)gradientColor {
    if (gradientColor) {
        self.backgroundColor = nil;
        [self.hm_backgroundColorShapeLayer removeFromSuperlayer];
        self.hm_backgroundColorShapeLayer = nil;
        if (!self.hm_gradientLayer) {
            self.hm_gradientLayer = CAGradientLayer.layer;
            [self.layer insertSublayer:self.hm_gradientLayer atIndex:0];
        }
        self.hm_gradientLayer.colors = @[(id) gradientColor.beginColor.CGColor, (id) gradientColor.endColor.CGColor];
        self.hm_gradientLayer.startPoint = gradientColor.beginPoint;
        self.hm_gradientLayer.endPoint = gradientColor.endPoint;
    } else {
        [self.hm_gradientLayer removeFromSuperlayer];
        self.hm_gradientLayer = nil;
    }
    // 不使用 setNeedsLayout
    [self hm_updateBackgroundColor];
}

- (void)hm_updateImageWithString:(NSString *)imageUrlString completionBlock:(void (^)(UIImage *_Nullable image))completionBlock {
    if (self.hm_webImageOperation) {
        [self.hm_webImageOperation cancel];
        self.hm_webImageOperation = nil;
    }
    // 尝试 base64 解码
    // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs
    NSRange prefixRange = [imageUrlString rangeOfString:BASE64HEADERPREFIX];
    NSRange commaRange = [imageUrlString rangeOfString:@","];
    // 是否有头部，如果有则需要清除
    // 目前头部判断是根据标准做全小写判断，未来如果存在大写情况，可以做兼容支持
    if (prefixRange.location != NSNotFound && commaRange.location != NSNotFound) {
        // 由于 commaRange.location != NSNotFound 因此 commaRange.location + 1 不会造成崩溃
        imageUrlString = [imageUrlString substringFromIndex:commaRange.location + 1];
    }
    // 如果未来字符串存在换行符，则需要在 option 中加选项支持
    // 苹果系统转换 base64 是需要做 padding 等号补全的，如果需要支持则应当修改
    NSData *imageData = [[NSData alloc] initWithBase64EncodedString:imageUrlString options:0];
    if (imageData) {
        SDImageFormat imageFormat = [NSData sd_imageFormatForImageData:imageData];
        if (imageFormat != SDImageFormatUndefined) {
            // 注意，base64 目前转换固定两倍图
            if (imageFormat == SDImageFormatGIF) {
                // gif 图片
                hm_safe_main_thread(^{
                    completionBlock ? completionBlock([[SDImageGIFCoder sharedCoder] decodedImageWithData:imageData options:@{SDImageCoderDecodeScaleFactor: @2}]) : nil;
                });
            } else {
                hm_safe_main_thread(^{
                    completionBlock ? completionBlock([UIImage imageWithData:imageData scale:2]) : nil;
                });
            }

            return;
        }
    }

    NSURL *imageUrl = [NSURL URLWithString:imageUrlString];
    if (!imageUrl) {
        NSAssert(NO, @"图片地址无法解析");
        hm_safe_main_thread(^{
            completionBlock ? completionBlock(nil) : nil;
        });

        return;
    }

    // 只有资源定位符，没有 scheme，则默认 HTTPS
    if (imageUrl.host.length && !imageUrl.scheme.length) {
        NSURLComponents *urlComponents = [NSURLComponents componentsWithURL:imageUrl resolvingAgainstBaseURL:YES];
        if (urlComponents) {
            urlComponents.scheme = @"https";
            imageUrl = urlComponents.URL;
        } else {
            NSAssert(NO, @"url 格式不正确");
            hm_safe_main_thread(^{
                completionBlock ? completionBlock(nil) : nil;
            });

            return;
        }
    }

    if ([imageUrl.scheme hasPrefix:@"http"]) {
        // 网络图片
        SDWebImageContext *webImageContext = nil;
        if (![imageUrl.lastPathComponent containsString:@"@2x"] && ![imageUrl.lastPathComponent containsString:@"@3x"]) {
            // 默认两倍图
            webImageContext = @{SDWebImageContextImageScaleFactor: @2};
        }
        self.hm_webImageOperation = [SDWebImageManager.sharedManager loadImageWithURL:imageUrl options:0 context:webImageContext progress:nil completed:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, SDImageCacheType cacheType, BOOL finished, NSURL * _Nullable imageURL) {
            hm_safe_main_thread(^{
                completionBlock ? completionBlock(image) : nil;
            });
        }];
    } else {
        // 修复 https://www.baidu.com 情况
        if (!imageUrl.path.length) {
            NSURLComponents *urlComponents = [NSURLComponents componentsWithURL:imageUrl resolvingAgainstBaseURL:YES];
            if (urlComponents) {
                urlComponents.path = @"/";
            } else {
                NSAssert(NO, @"url 格式不正确");
                hm_safe_main_thread(^{
                    completionBlock ? completionBlock(nil) : nil;
                });

                return;
            }
        }
        // 1. 相对路径图片 -> 绝对路径图片
        if ([imageUrl.path hasPrefix:@"."] && ((HMBaseValue*)self.hm_value).executor) {
            HMJSContext *hummerJSContext = [HMJSGlobal.globalObject currentContext:((HMBaseValue*)self.hm_value).executor];
            NSURL *newImageUrl = [NSURL URLWithString:imageUrl.path relativeToURL:hummerJSContext.url];
            if (newImageUrl) {
                imageUrl = newImageUrl;
                // 递归处理
                [self hm_updateImageWithString:imageUrl.absoluteString completionBlock:completionBlock];
            } else {
                // 相对路径无法解析则直接返回
                NSAssert(NO, @"相对路径无法解析");
                hm_safe_main_thread(^{
                    completionBlock ? completionBlock(nil) : nil;
                });
            }

            return;
        }
        // 2. 本地图片根据路径解析图片
        HMResourceModel *resourceModel = hm_resolveResource(imageUrl.path);
        if (resourceModel.filePath.length) {
            UIImage *image = nil;
            NSString *filePath = nil;
            if (![resourceModel.filePath hasPrefix:@"/"] || resourceModel.resourceBundle) {
                // 2.1 path/to/file 相对于 mainBundle 的绝对路径图片
                // 先查找 NSDataSet
                NSDataAsset *dataAsset = [[NSDataAsset alloc] initWithName:resourceModel.filePath bundle:resourceModel.resourceBundle ?: NSBundle.mainBundle];
                if (dataAsset) {
                    // gif 图片
                    image = [[SDImageGIFCoder sharedCoder] decodedImageWithData:dataAsset.data options:@{SDImageCoderDecodeScaleFactor: @2}];
                } else {
                    // 普通图片
                    image = [UIImage imageNamed:resourceModel.filePath inBundle:resourceModel.resourceBundle compatibleWithTraitCollection:nil];
                    if (!image && resourceModel.filePath.pathExtension.length == 0) {
                        // 添加 .gif 后缀
                        NSString *newFilePath = [resourceModel.filePath stringByAppendingPathExtension:@"gif"];
                        image = [UIImage imageNamed:newFilePath inBundle:resourceModel.resourceBundle compatibleWithTraitCollection:nil];
                        if (image) {
                            resourceModel.filePath = newFilePath;
                        }
                    }
                    filePath = [(resourceModel.resourceBundle ?: NSBundle.mainBundle).bundlePath stringByAppendingPathComponent:resourceModel.filePath];
                }
            } else {
                // 2.2 file:///root/path/to/file 和 /path/to/file 绝对路径图片
                image = [UIImage imageWithContentsOfFile:resourceModel.filePath];
                filePath = resourceModel.filePath;
            }
            if (filePath) {
                NSFileHandle *fileHandle = [NSFileHandle fileHandleForReadingAtPath:filePath];
                if (fileHandle && image) {
                    // 真实存在的文件
                    NSData *magicNumberData = nil;
                    if (@available(iOS 13.0, *)) {
                        magicNumberData = [fileHandle readDataUpToLength:1 error:nil];
                    } else {
                        magicNumberData = [fileHandle readDataOfLength:1];
                    }
                    if (magicNumberData) {
                        SDImageFormat imageFormat = [NSData sd_imageFormatForImageData:magicNumberData];
                        if (imageFormat == SDImageFormatGIF) {
                            // 注意，这种转换损耗性能
                            NSData *imageData = [NSData dataWithContentsOfFile:filePath];

                            image = [[SDImageGIFCoder sharedCoder] decodedImageWithData:imageData options:@{SDImageCoderDecodeScaleFactor: @(image.scale)}];
                        }
                    }
                }
            }
            hm_safe_main_thread(^{
                completionBlock ? completionBlock(image) : nil;
            });
        } else {
            HMLogError(@"filePath 应当不为空");
            hm_safe_main_thread(^{
                completionBlock ? completionBlock(nil) : nil;
            });
        }
    }
}

- (HMBorderModelCollection *)hm_createBorderModelCollection {
    HMBorderModelCollection *borderModelCollection = [[HMBorderModelCollection alloc] init];
    borderModelCollection.top = [[HMBorderModel alloc] init];
    borderModelCollection.top.borderColor = self.layer.borderColor ? [UIColor colorWithCGColor:self.layer.borderColor] : nil;
    borderModelCollection.top.borderStyle = HMBorderStyleSolid;
    borderModelCollection.top.borderWidth = self.layer.borderWidth;

    borderModelCollection.right = [[HMBorderModel alloc] init];
    borderModelCollection.right.borderColor = self.layer.borderColor ? [UIColor colorWithCGColor:self.layer.borderColor] : nil;
    borderModelCollection.right.borderStyle = HMBorderStyleSolid;
    borderModelCollection.right.borderWidth = self.layer.borderWidth;

    borderModelCollection.bottom = [[HMBorderModel alloc] init];
    borderModelCollection.bottom.borderColor = self.layer.borderColor ? [UIColor colorWithCGColor:self.layer.borderColor] : nil;
    borderModelCollection.bottom.borderStyle = HMBorderStyleSolid;
    borderModelCollection.bottom.borderWidth = self.layer.borderWidth;

    borderModelCollection.left = [[HMBorderModel alloc] init];
    borderModelCollection.left.borderColor = self.layer.borderColor ? [UIColor colorWithCGColor:self.layer.borderColor] : nil;
    borderModelCollection.left.borderStyle = HMBorderStyleSolid;
    borderModelCollection.left.borderWidth = self.layer.borderWidth;

    self.layer.borderColor = nil;
    self.layer.borderWidth = 0;

    return borderModelCollection;
}

- (UIBezierPath *)hm_createCornerRadiusPath {
    if (!self.hm_cornerRadiusModel) {
        return [UIBezierPath bezierPathWithRoundedRect:self.layer.bounds cornerRadius:self.layer.cornerRadius];
    } else {
        // 多角路径
        // 需要考虑高度是否够，宽度是否够
        // startAngle 是 PI + asin(delta_h / r)
        // endAngle 是 1.5 PI - asin(delta_w / r)
        UIBezierPath *bezierPath = UIBezierPath.bezierPath;
        double topLeftStartAngle = M_PI;
        double topLeftEndAngle = M_PI_2 * 3;
        double topRightStartAngle = M_PI_2 * 3;
        double topRightEndAngle = M_PI * 2;
        double bottomRightStartAngle = 0;
        double bottomRightEndAngle = M_PI_2;
        double bottomLeftStartAngle = M_PI_2;
        double bottomLeftEndAngle = M_PI;
        // 左
        double deltaLeft = self.bounds.size.height - self.hm_cornerRadiusModel.topLeft - self.hm_cornerRadiusModel.bottomLeft;
        if (deltaLeft < 0) {
            double topLeftRate = self.hm_cornerRadiusModel.topLeft / (self.hm_cornerRadiusModel.topLeft + self.hm_cornerRadiusModel.bottomLeft);
            double bottomLeftRate = self.hm_cornerRadiusModel.bottomLeft / (self.hm_cornerRadiusModel.topLeft + self.hm_cornerRadiusModel.bottomLeft);
            double topLeftDeltaHeight = topLeftRate * -deltaLeft;
            double bottomLeftDeltaHeight = bottomLeftRate * -deltaLeft;
            topLeftStartAngle += asin(topLeftDeltaHeight / self.hm_cornerRadiusModel.topLeft);
            bottomLeftEndAngle -= asin(bottomLeftDeltaHeight / self.hm_cornerRadiusModel.bottomLeft);
        }
        // 上
        double deltaTop = self.bounds.size.width - self.hm_cornerRadiusModel.topLeft - self.hm_cornerRadiusModel.topRight;
        if (deltaTop < 0) {
            double topLeftRate = self.hm_cornerRadiusModel.topLeft / (self.hm_cornerRadiusModel.topLeft + self.hm_cornerRadiusModel.topRight);
            double topRightRate = self.hm_cornerRadiusModel.topRight / (self.hm_cornerRadiusModel.topLeft + self.hm_cornerRadiusModel.topRight);
            double topLeftDeltaWidth = -deltaTop * topLeftRate;
            double topRightDeltaWidth = -deltaTop * topRightRate;
            topLeftEndAngle -= asin(topLeftDeltaWidth / self.hm_cornerRadiusModel.topLeft);
            topRightStartAngle += asin(topRightDeltaWidth / self.hm_cornerRadiusModel.topRight);
        }
        // 上左角
        [bezierPath addArcWithCenter:CGPointMake(self.hm_cornerRadiusModel.topLeft, self.hm_cornerRadiusModel.topLeft) radius:self.hm_cornerRadiusModel.topLeft startAngle:topLeftStartAngle endAngle:topLeftEndAngle clockwise:YES];
        // 右
        double deltaRight = self.bounds.size.height - self.hm_cornerRadiusModel.topRight - self.hm_cornerRadiusModel.bottomRight;
        if (deltaRight < 0) {
            double bottomRightRate = self.hm_cornerRadiusModel.bottomRight / (self.hm_cornerRadiusModel.topRight + self.hm_cornerRadiusModel.bottomRight);
            double topRightRate = self.hm_cornerRadiusModel.topRight / (self.hm_cornerRadiusModel.topRight + self.hm_cornerRadiusModel.bottomRight);
            double topRightDeltaHeight = topRightRate * -deltaRight;
            double bottomRightDeltaHeight = bottomRightRate * -deltaRight;
            topRightEndAngle -= asin(topRightDeltaHeight / self.hm_cornerRadiusModel.topRight);
            bottomRightStartAngle += asin(bottomRightDeltaHeight / self.hm_cornerRadiusModel.bottomRight);
        }
        // 上右角
        [bezierPath addArcWithCenter:CGPointMake(self.bounds.size.width - self.hm_cornerRadiusModel.topRight, self.hm_cornerRadiusModel.topRight) radius:self.hm_cornerRadiusModel.topRight startAngle:topRightStartAngle endAngle:topRightEndAngle clockwise:YES];
        // 下
        double deltaBottom = self.bounds.size.width - self.hm_cornerRadiusModel.bottomLeft - self.hm_cornerRadiusModel.bottomRight;
        if (deltaBottom < 0) {
            double bottomRightRate = self.hm_cornerRadiusModel.bottomRight / (self.hm_cornerRadiusModel.bottomLeft + self.hm_cornerRadiusModel.bottomRight);
            double bottomLeftRate = self.hm_cornerRadiusModel.bottomLeft / (self.hm_cornerRadiusModel.bottomLeft + self.hm_cornerRadiusModel.bottomRight);
            double bottomLeftDeltaWidth = bottomLeftRate * -deltaBottom;
            double bottomRightDeltaWidth = bottomRightRate * -deltaBottom;
            bottomRightEndAngle -= asin(bottomRightDeltaWidth / self.hm_cornerRadiusModel.bottomRight);
            bottomLeftStartAngle += asin(bottomLeftDeltaWidth / self.hm_cornerRadiusModel.bottomLeft);
        }
        // 右下角
        [bezierPath addArcWithCenter:CGPointMake(self.bounds.size.width - self.hm_cornerRadiusModel.bottomRight, self.bounds.size.height - self.hm_cornerRadiusModel.bottomRight) radius:self.hm_cornerRadiusModel.bottomRight startAngle:bottomRightStartAngle endAngle:bottomRightEndAngle clockwise:YES];
        // 左下角
        [bezierPath addArcWithCenter:CGPointMake(self.hm_cornerRadiusModel.bottomLeft, self.bounds.size.height - self.hm_cornerRadiusModel.bottomLeft) radius:self.hm_cornerRadiusModel.bottomLeft startAngle:bottomLeftStartAngle endAngle:bottomLeftEndAngle clockwise:YES];

        return bezierPath;
    }
}

#pragma clang diagnostic push
#pragma ide diagnostic ignored "InfiniteRecursion"

- (void)hm_layoutSubviews {
    // 调用 iOS 库 layoutSubviews
    [self hm_layoutSubviews];
    [self hm_layoutYogaRootView];
}

#pragma clang diagnostic pop

- (void)hm_layoutYogaRootView {
    // 如果本视图位于 Yoga 视图树中
    // isYogaEnabled 防止多余 YGLayout 创建
    if (self.isHmLayoutEnabled && (!self.superview.isHmLayoutEnabled)) {
        // 根视图才布局
        [self hm_applyLayoutPreservingOrigin:YES];
    }
    if (self.isHmLayoutEnabled) {
        [self hm_layoutBackgroundColorImageBorderShadowCornerRadius];
    }
}

- (void)hm_updateMasksToBounds {
    // 针对 Hummer overflow attribute 的优化支持
    // TODO(唐佳诚): 缺少 remove 机制，后续优化，不确定是否 clipsToBounds 是否会触发 layoutSubviews，但是实际上不碍事，猜测应当是不会触发的
    if (self.clipsToBounds && !self.layer.mask) {
        self.hm_maskLayer = CAShapeLayer.layer;
        self.layer.mask = self.hm_maskLayer;
        self.clipsToBounds = NO;
        self.hm_isMasksToBoundsOptimization = YES;
    }
    [self hm_layoutMaskView];
}

- (void)hm_updateBorder {
    // 1. 多角情况，一个边框 -> 多个边框
    if (self.hm_cornerRadiusModel && self.layer.borderWidth > 0 && self.layer.borderColor) {
        self.hm_borderModelCollection = [self hm_createBorderModelCollection];
        self.layer.borderWidth = 0;
        self.layer.borderColor = nil;
    }
    // 2. 多个边框，实际上等同，并且为 HMBorderStyleSolid，单角情况 -> 回退为一个边框
    if ([self.hm_borderModelCollection.top isEqualToModel:self.hm_borderModelCollection.right] && [self.hm_borderModelCollection.right isEqualToModel:self.hm_borderModelCollection.bottom] && [self.hm_borderModelCollection.bottom isEqualToModel:self.hm_borderModelCollection.left] && self.hm_borderModelCollection.top.borderStyle == HMBorderStyleSolid && !self.hm_cornerRadiusModel) {
        self.layer.borderWidth = self.hm_borderModelCollection.top.borderWidth;
        self.layer.borderColor = self.hm_borderModelCollection.top.borderColor.CGColor;
    }

    if (self.hm_borderModelCollection) {
        if ([self.hm_borderModelCollection.top isShowBorder] && !self.hm_borderTopLayer) {
            self.hm_borderTopLayer = CAShapeLayer.layer;
            self.hm_borderTopLayer.fillColor = nil;
            [self.layer addSublayer:self.hm_borderTopLayer];
        }
        if (self.hm_borderTopLayer) {
            self.hm_borderTopLayer.lineWidth = self.hm_borderModelCollection.top.borderWidth;
            self.hm_borderTopLayer.strokeColor = self.hm_borderModelCollection.top.borderColor.CGColor;
            self.hm_borderTopLayer.lineCap = kCALineCapButt;
            switch (self.hm_borderModelCollection.top.borderStyle) {
                case HMBorderStyleDashed:
                    self.hm_borderTopLayer.lineDashPattern = @[@(self.hm_borderModelCollection.top.borderWidth * 3), @(self.hm_borderModelCollection.top.borderWidth)];
                    break;
                case HMBorderStyleDotted:
                    self.hm_borderTopLayer.lineDashPattern = @[@0, @(self.hm_borderModelCollection.top.borderWidth * 2)];
                    self.hm_borderTopLayer.lineCap = kCALineCapRound;
                    break;

                default:
                    break;
            }
        }
        if (![self.hm_borderModelCollection.top isShowBorder] && self.hm_borderTopLayer) {
            [self.hm_borderTopLayer removeFromSuperlayer];
            self.hm_borderTopLayer = nil;
        }
        if ([self.hm_borderModelCollection.right isShowBorder] && !self.hm_borderRightLayer) {
            self.hm_borderRightLayer = CAShapeLayer.layer;
            self.hm_borderRightLayer.fillColor = nil;
            [self.layer addSublayer:self.hm_borderRightLayer];
        }
        if (self.hm_borderRightLayer) {
            self.hm_borderRightLayer.lineWidth = self.hm_borderModelCollection.right.borderWidth;
            self.hm_borderRightLayer.strokeColor = self.hm_borderModelCollection.right.borderColor.CGColor;
            self.hm_borderRightLayer.lineCap = kCALineCapButt;
            switch (self.hm_borderModelCollection.right.borderStyle) {
                case HMBorderStyleDashed:
                    self.hm_borderRightLayer.lineDashPattern = @[@(self.hm_borderModelCollection.right.borderWidth * 3), @(self.hm_borderModelCollection.right.borderWidth)];
                    break;
                case HMBorderStyleDotted:
                    self.hm_borderRightLayer.lineDashPattern = @[@0, @(self.hm_borderModelCollection.right.borderWidth * 2)];
                    self.hm_borderRightLayer.lineCap = kCALineCapRound;
                    break;

                default:
                    break;
            }
        }
        if (![self.hm_borderModelCollection.right isShowBorder] && self.hm_borderRightLayer) {
            [self.hm_borderRightLayer removeFromSuperlayer];
            self.hm_borderRightLayer = nil;
        }
        if ([self.hm_borderModelCollection.bottom isShowBorder] && !self.hm_borderBottomLayer) {
            self.hm_borderBottomLayer = CAShapeLayer.layer;
            self.hm_borderBottomLayer.fillColor = nil;
            [self.layer addSublayer:self.hm_borderBottomLayer];
        }
        if (self.hm_borderBottomLayer) {
            self.hm_borderBottomLayer.lineWidth = self.hm_borderModelCollection.bottom.borderWidth;
            self.hm_borderBottomLayer.strokeColor = self.hm_borderModelCollection.bottom.borderColor.CGColor;
            self.hm_borderBottomLayer.lineCap = kCALineCapButt;
            switch (self.hm_borderModelCollection.bottom.borderStyle) {
                case HMBorderStyleDashed:
                    self.hm_borderBottomLayer.lineDashPattern = @[@(self.hm_borderModelCollection.bottom.borderWidth * 3), @(self.hm_borderModelCollection.bottom.borderWidth)];
                    break;
                case HMBorderStyleDotted:
                    self.hm_borderBottomLayer.lineCap = kCALineCapRound;
                    self.hm_borderBottomLayer.lineDashPattern = @[@0, @(self.hm_borderModelCollection.bottom.borderWidth * 2)];
                    break;

                default:
                    break;
            }
        }
        if (![self.hm_borderModelCollection.bottom isShowBorder] && self.hm_borderBottomLayer) {
            [self.hm_borderBottomLayer removeFromSuperlayer];
            self.hm_borderBottomLayer = nil;
        }
        if ([self.hm_borderModelCollection.left isShowBorder] && !self.hm_borderLeftLayer) {
            self.hm_borderLeftLayer = CAShapeLayer.layer;
            self.hm_borderLeftLayer.fillColor = nil;
            [self.layer addSublayer:self.hm_borderLeftLayer];
        }
        if (self.hm_borderLeftLayer) {
            self.hm_borderLeftLayer.lineWidth = self.hm_borderModelCollection.left.borderWidth;
            self.hm_borderLeftLayer.strokeColor = self.hm_borderModelCollection.left.borderColor.CGColor;
            self.hm_borderLeftLayer.lineCap = kCALineCapButt;
            switch (self.hm_borderModelCollection.left.borderStyle) {
                case HMBorderStyleDashed:
                    self.hm_borderLeftLayer.lineDashPattern = @[@(self.hm_borderModelCollection.left.borderWidth * 3), @(self.hm_borderModelCollection.left.borderWidth)];
                    break;
                case HMBorderStyleDotted:
                    self.hm_borderLeftLayer.lineCap = kCALineCapRound;
                    self.hm_borderLeftLayer.lineDashPattern = @[@0, @(self.hm_borderModelCollection.left.borderWidth * 2)];
                    break;

                default:
                    break;
            }
        }
        if (![self.hm_borderModelCollection.left isShowBorder] && self.hm_borderLeftLayer) {
            [self.hm_borderLeftLayer removeFromSuperlayer];
            self.hm_borderLeftLayer = nil;
        }
    } else {
        if (self.hm_borderTopLayer) {
            [self.hm_borderTopLayer removeFromSuperlayer];
            self.hm_borderTopLayer = nil;
        }
        if (self.hm_borderRightLayer) {
            [self.hm_borderRightLayer removeFromSuperlayer];
            self.hm_borderRightLayer = nil;
        }
        if (self.hm_borderBottomLayer) {
            [self.hm_borderBottomLayer removeFromSuperlayer];
            self.hm_borderBottomLayer = nil;
        }
        if (self.hm_borderLeftLayer) {
            [self.hm_borderLeftLayer removeFromSuperlayer];
            self.hm_borderLeftLayer = nil;
        }
    }

    [self hm_layoutBorder];
}

- (void)hm_layoutBorder {
    if (self.hm_borderTopLayer) {
        [self.hm_borderLeftLayer removeFromSuperlayer];
        [self.layer insertSublayer:self.hm_borderLeftLayer atIndex:(unsigned int) self.layer.sublayers.count];
    }
    if (self.hm_borderRightLayer) {
        [self.hm_borderRightLayer removeFromSuperlayer];
        [self.layer insertSublayer:self.hm_borderRightLayer atIndex:(unsigned int) self.layer.sublayers.count];
    }
    if (self.hm_borderBottomLayer) {
        [self.hm_borderBottomLayer removeFromSuperlayer];
        [self.layer insertSublayer:self.hm_borderBottomLayer atIndex:(unsigned int) self.layer.sublayers.count];
    }
    if (self.hm_borderLeftLayer) {
        [self.hm_borderLeftLayer removeFromSuperlayer];
        [self.layer insertSublayer:self.hm_borderLeftLayer atIndex:(unsigned int) self.layer.sublayers.count];
    }
    if (self.hm_borderModelCollection) {
        CGFloat topLeftRadius = self.hm_cornerRadiusModel ? self.hm_cornerRadiusModel.topLeft : self.layer.cornerRadius;
        CGFloat topRightRadius = self.hm_cornerRadiusModel ? self.hm_cornerRadiusModel.topLeft : self.layer.cornerRadius;
        CGFloat bottomRightRadius = self.hm_cornerRadiusModel ? self.hm_cornerRadiusModel.bottomRight : self.layer.cornerRadius;
        CGFloat bottomLeftRadius = self.hm_cornerRadiusModel ? self.hm_cornerRadiusModel.bottomLeft : self.layer.cornerRadius;
        if (self.hm_borderTopLayer) {
            CGFloat topBorderWidth = self.hm_borderModelCollection ? self.hm_borderModelCollection.top.borderWidth : self.layer.borderWidth;
            // 直线
            double deltaTop = self.bounds.size.width - topLeftRadius - topRightRadius;
            if (deltaTop > 0) {
                UIBezierPath *bezierPath = UIBezierPath.bezierPath;
                [bezierPath moveToPoint:CGPointMake(topLeftRadius, topBorderWidth / 2)];
                [bezierPath addLineToPoint:CGPointMake(topLeftRadius + deltaTop, topBorderWidth / 2)];
                self.hm_borderTopLayer.path = bezierPath.CGPath;
            }
        }
        if (self.hm_borderRightLayer) {
            CGFloat rightBorderWidth = self.hm_borderModelCollection ? self.hm_borderModelCollection.right.borderWidth : self.layer.borderWidth;
            // 直线
            double deltaRight = self.bounds.size.height - topRightRadius - bottomRightRadius;
            if (deltaRight > 0) {
                UIBezierPath *bezierPath = UIBezierPath.bezierPath;
                [bezierPath moveToPoint:CGPointMake(self.bounds.size.width - rightBorderWidth / 2, topRightRadius)];
                [bezierPath addLineToPoint:CGPointMake(self.bounds.size.width - rightBorderWidth / 2, topRightRadius + deltaRight)];
                self.hm_borderRightLayer.path = bezierPath.CGPath;
            }
        }
        if (self.hm_borderBottomLayer) {
            CGFloat bottomBorderWidth = self.hm_borderModelCollection ? self.hm_borderModelCollection.bottom.borderWidth : self.layer.borderWidth;
            // 直线
            double deltaBottom = self.bounds.size.width - bottomRightRadius - bottomLeftRadius;
            if (deltaBottom > 0) {
                UIBezierPath *bezierPath = UIBezierPath.bezierPath;
                [bezierPath moveToPoint:CGPointMake(bottomLeftRadius + deltaBottom, self.bounds.size.height - bottomBorderWidth / 2)];
                [bezierPath addLineToPoint:CGPointMake(bottomLeftRadius, self.bounds.size.height - bottomBorderWidth / 2)];
                self.hm_borderBottomLayer.path = bezierPath.CGPath;
            }
        }
        if (self.hm_borderLeftLayer) {
            CGFloat leftBorderWidth = self.hm_borderModelCollection ? self.hm_borderModelCollection.left.borderWidth : self.layer.borderWidth;
            // 直线
            double deltaLeft = self.bounds.size.height - topLeftRadius - bottomLeftRadius;
            if (deltaLeft > 0) {
                UIBezierPath *bezierPath = UIBezierPath.bezierPath;
                [bezierPath moveToPoint:CGPointMake(leftBorderWidth / 2, topLeftRadius + deltaLeft)];
                [bezierPath addLineToPoint:CGPointMake(leftBorderWidth / 2, topLeftRadius)];
                self.hm_borderLeftLayer.path = bezierPath.CGPath;
            }
        }
    }
}

- (void)hm_layoutMaskView {
    if (self.hm_maskLayer) {
        // TODO(唐佳诚): 性能优化
        self.hm_maskLayer.path = [self hm_createCornerRadiusPath].CGPath;
    }
}

- (void)hm_layoutBackgroundColorImageBorderShadowCornerRadius {
    [self hm_updateMasksToBounds];
    [self hm_layoutBackgroundColor];
    [self hm_updateShadow];
    [self hm_layoutBorder];
}

- (void)hm_layoutBackgroundColor {
    if (self.hm_gradientLayer) {
        self.hm_gradientLayer.frame = self.bounds;
    }
    if (self.hm_backgroundColorShapeLayer) {
        if (self.layer.sublayers.firstObject != self.hm_backgroundColorShapeLayer) {
            [self.hm_backgroundColorShapeLayer removeFromSuperlayer];
            [self.layer insertSublayer:self.hm_backgroundColorShapeLayer atIndex:0];
        }
        // TODO(唐佳诚): 性能优化
        self.hm_backgroundColorShapeLayer.path = [self hm_createCornerRadiusPath].CGPath;
    }
    if (self.hm_backgroundColorMaskLayer) {
        // TODO(唐佳诚): 性能优化
        self.hm_backgroundColorMaskLayer.path = [self hm_createCornerRadiusPath].CGPath;
    }
}

- (void)hm_updateBackgroundColor {
    // 没有渐变色的时候移除渐变色背景的 hm_maskLayer
    if (!self.hm_gradientLayer && self.hm_backgroundColorMaskLayer) {
        [self.hm_backgroundColorMaskLayer removeFromSuperlayer];
        self.hm_backgroundColorMaskLayer = nil;
    }
    // 1. 纯色 + cornerRadius -> 不需要处理
    // 2. 纯色 + path -> CAShapeLayer
    // 2.1 创建条件 -> backgroundColor 转化 layer 情况
    if (self.hm_cornerRadiusModel && self.backgroundColor && !self.hm_backgroundColorShapeLayer) {
        CAShapeLayer *backgroundColorShapeLayer = CAShapeLayer.layer;
        backgroundColorShapeLayer.fillColor = self.backgroundColor.CGColor;
        self.hm_backgroundColorShapeLayer = backgroundColorShapeLayer;
        self.backgroundColor = nil;
        [self.layer insertSublayer:backgroundColorShapeLayer atIndex:0];
    }
    // 2.2 其他销毁条件 -> hm_cornerRadiusModel 消失 -> 需要回退到 backgroundColor
    if (!self.hm_cornerRadiusModel && self.hm_backgroundColorShapeLayer) {
        self.backgroundColor = [UIColor colorWithCGColor:self.hm_backgroundColorShapeLayer.fillColor];
        [self.hm_backgroundColorShapeLayer removeFromSuperlayer];
        self.hm_backgroundColorShapeLayer = nil;
    }
    // 3. 渐变色 + cornerRadius -> CAGradientLayer + cornerRaidus
    if (self.hm_gradientLayer) {
        self.hm_gradientLayer.cornerRadius = self.layer.cornerRadius;
    }
    // 4. 渐变色 + path -> CAGradientLayer + MaskLayer
    // 4.1 创建 -> 有 CAGradientLayer，没有对应 MaskLayer，
    if (self.hm_gradientLayer && !self.hm_gradientLayer.mask) {
        self.hm_backgroundColorMaskLayer = CAShapeLayer.layer;
        self.hm_gradientLayer.mask = self.hm_backgroundColorMaskLayer;
    }
    // 4.2 销毁 -> 当前的 hm_maskLayer 和 hm_gradientLayer.mask 不同，或者没有 hm_cornerRadiusModel 了（不需要圆角了）
    if (self.hm_backgroundColorMaskLayer && (self.hm_gradientLayer.mask != self.hm_backgroundColorMaskLayer || !self.hm_cornerRadiusModel)) {
        [self.hm_backgroundColorMaskLayer removeFromSuperlayer];
        self.hm_backgroundColorMaskLayer = nil;
    }
    // 5. 纯色但是不是 CALayer，则需要 mask
    if (self.layer.class != CALayer.class) {
        if (self.backgroundColor && (self.hm_cornerRadiusModel || !hm_doubleEqual(self.layer.cornerRadius, 0))) {
            if (!self.hm_maskLayer) {
                self.hm_maskLayer = CAShapeLayer.layer;
                self.layer.mask = self.hm_maskLayer;
            }
        }
        if ((!self.backgroundColor || (!self.hm_cornerRadiusModel && hm_doubleEqual(self.layer.cornerRadius, 0))) && !self.hm_isMasksToBoundsOptimization && self.hm_maskLayer) {
            // 移除机制
            // 1. 没有背景色，并且这个 mask 不是优化添加的则移除
            // 2. 没有圆角并且不是优化添加
            [self.hm_maskLayer removeFromSuperlayer];
            self.hm_maskLayer = nil;
        }
        [self hm_layoutMaskView];
    }
    [self hm_layoutBackgroundColor];
}

- (void)hm_updateShadow {
    // 阴影离屏渲染
    if (!hm_doubleEqual(self.layer.shadowOpacity, 0)) {
        // 每次都需要重新设置 path
        // TODO(唐佳诚): 无法判断重新设置相同路径是否会触发渲染脏标记，未来需要优化实现，只有当页面布局为脏节点时候才需要重新渲染
        self.layer.shadowPath = [self hm_createCornerRadiusPath].CGPath;
    } else {
        self.layer.shadowPath = nil;
    }
}

- (NSArray<NSString *> *)hm_layoutInfoKeys {
    return @[@"top",
            @"left",
            @"bottom",
            @"right",
            @"margin",
            @"marginTop",
            @"marginLeft",
            @"marginBottom",
            @"marginRight",
            @"padding",
            @"paddingTop",
            @"paddingLeft",
            @"paddingBottom",
            @"paddingRight",
            @"width",
            @"height",
            @"minWidth",
            @"minHeight",
            @"maxWidth",
            @"maxHeight",
            @"flexDirection",
            @"flexWrap",
            @"flexFlow",
            @"justifyContent",
            @"alignItems",
            @"alignContent",
            @"order",
            @"flexGrow",
            @"flexShrink",
            @"flexBasis",
            @"flex",
            @"display",
            @"alignSelf",
            @"position",
    ];
}

- (void)hm_layoutRootView {
    UIView *rootView = hm_yoga_get_root_view(self);
    [rootView setNeedsLayout];
    [rootView layoutIfNeeded];
}

#pragma mark - Export Property

- (NSNumber *)hm_enabled {
    return @(self.userInteractionEnabled);
}

- (void)hm_setEnabled:(BOOL)enabledValue {
    self.userInteractionEnabled = enabledValue;
}

- (nullable NSDictionary<NSString *, NSObject *> *)hm_style {
    return self.hm_styleStore;
}

- (void)hm_setStyle:(HMBaseValue *)style {
    id styleObject = style.toDictionary;
    NSDictionary *styleDic = nil;
    if ([styleObject isKindOfClass:NSDictionary.class]) {
        styleDic = styleObject;
    }
    if (styleDic.count == 0) {
        HMLogError(@"style 必须有键值对");

        return;
    }
    NSMutableDictionary<NSString *, NSObject *> *layoutInfo = NSMutableDictionary.dictionary;
    NSMutableDictionary<NSString *, NSObject *> *attributes = NSMutableDictionary.dictionary;
    [styleDic enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
        if (![key isKindOfClass:NSString.class]) {
            return;
        }
        if ([[self hm_layoutInfoKeys] containsObject:key]) {
            layoutInfo[key] = obj;
        } else {
            attributes[key] = obj;
        }
    }];

    NSMutableDictionary<NSString *, NSObject *> *mutableStyleDictionary = self.hm_styleStore.mutableCopy;
    if (!mutableStyleDictionary) {
        mutableStyleDictionary = [NSMutableDictionary dictionaryWithCapacity:layoutInfo.count + attributes.count];
    }
    self.hm_styleStore = nil;
    [mutableStyleDictionary addEntriesFromDictionary:layoutInfo];
    [mutableStyleDictionary addEntriesFromDictionary:attributes];
    self.hm_styleStore = mutableStyleDictionary;

    // 转换样式
    id positionObject = layoutInfo[@"position"];
    if ([positionObject isKindOfClass:NSString.class]) {
        if ([((NSString *) positionObject).lowercaseString isEqualToString:@"fixed"]) {
            NSMutableDictionary *mutableDomStyleDictionary = layoutInfo.mutableCopy;
            layoutInfo = nil;
            mutableDomStyleDictionary[@"position"] = @"absolute";
            layoutInfo = mutableDomStyleDictionary.copy;
            self.hm_isFixedPosition = YES;
        } else {
            self.hm_isFixedPosition = NO;
        }
    }

    [self hm_processFixedPositionWithContext:[HMJSGlobal.globalObject currentContext:style.executor]];

    [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
        [layoutInfo enumerateKeysAndObjectsUsingBlock:^(NSString *key, NSObject *obj, BOOL *stop) {
            [self hm_configureWithTarget:layout cssAttribute:key value:obj converterManager:HMYogaConfig.defaulfConfig];
        }];
    }];

    [attributes enumerateKeysAndObjectsUsingBlock:^(NSString *key, NSObject *obj, BOOL *stop) {
        [self hm_configureWithTarget:self cssAttribute:key value:obj converterManager:HMAttrManager.sharedManager];
    }];
    [self hm_markDirty];
}

- (void)hm_configureWithTarget:(id)target cssAttribute:(NSString *)cssAttribute value:(id)value converterManager:(id)converterManager {
    // TODO(唐佳诚): 未来改成协议
    if (![converterManager respondsToSelector:@selector(converterWithCSSAttr:)]) {
        NSAssert(NO, @"必须响应对应内容");

        return;
    }
    SEL converter = [converterManager converterWithCSSAttr:cssAttribute];
    NSMethodSignature *signature = [HMConverter.class methodSignatureForSelector:converter];
    if (signature.numberOfArguments != 3 ||
            *(signature.methodReturnType) == 'v') {
        HMLogError(@"Converter [%@] method signature error!, cssAttribute [%@]",
                NSStringFromSelector(converter), cssAttribute);

        return;
    }

    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setTarget:[HMConverter class]];
    [invocation setSelector:converter];
    [invocation setArgument:(void *) &value atIndex:2];
    [invocation invoke];

    NSString *property = nil;
    // TODO(唐佳诚): 未来改成协议
    if ([converterManager isKindOfClass:HMYogaConfig.class]) {
        HMYogaConfig *yogaConfig = converterManager;
        property = [yogaConfig ygPropertyWithCSSAttr:cssAttribute];
    } else if ([converterManager isKindOfClass:HMAttrManager.class]) {
        HMAttrManager *attrManager = converterManager;
        property = [attrManager viewPropWithCSSAttr:cssAttribute];
    }

    SEL selector = [self hm_setterSelectorForPropertyName:property];
    if (!property.length || ![target respondsToSelector:selector]) {
        HMLogError(@"视图或者 YGLayout can not found selector [%@]",
                NSStringFromSelector(converter));

        return;
    }

    void *returnVal = malloc(signature.methodReturnLength);
    [invocation getReturnValue:returnVal];

    signature = [target methodSignatureForSelector:selector];
    invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setTarget:target];
    [invocation setSelector:selector];
    [invocation setArgument:returnVal atIndex:2];
    [invocation invoke];

    if (returnVal) {
        free(returnVal);
    }
}

- (SEL)hm_setterSelectorForPropertyName:(NSString *)propertyName {
    if (!propertyName || propertyName.length <= 0) {
        return nil;
    }
    if (propertyName.length < 1) {
        NSAssert(NO, @"propertyName 必须至少一个字符");

        return nil;
    }

    NSString *setterSel = [NSString stringWithFormat:@"set%@%@:", [propertyName substringToIndex:1].uppercaseString,
                                                     [propertyName substringFromIndex:1]];

    return NSSelectorFromString(setterSel);
}

- (void)hm_processFixedPositionWithContext:(HMJSContext *)context {
    if (self.hm_isFixedPosition && self.superview) {
        // superview -> rootView
        self.hm_fixedPositionLastContainerView = self.superview;
        [self removeFromSuperview];
        [self.hm_fixedPositionLastContainerView hm_markDirty];
        [context.rootView addSubview:self];
        [context.rootView hm_markDirty];
    } else if (!self.hm_isFixedPosition && self.hm_fixedPositionLastContainerView) {
        // superview(rootView) -> superview
        UIView *superView = self.superview;
        [self removeFromSuperview];
        [superView hm_markDirty];
        [self.hm_fixedPositionLastContainerView addSubview:self];
        [self.hm_fixedPositionLastContainerView hm_markDirty];
        self.hm_fixedPositionLastContainerView = nil;
    }
}

- (void)hm_markDirty {
//    if (!self.isYogaEnabled || !self.yoga.isEnabled || !self.yoga.isIncludedInLayout) {
//        return;
//    }
    if (!self.isHmLayoutEnabled) {
        return;
    }
    

    // 1. 叶节点 -> 叶节点（脏），需要 markDirty + setNeedsLayout
    // 2. 容器节点 -> 容器节点（脏），只需要 setNeedsLayout
    // 3. 叶节点 -> 容器节点（脏），只需要 setNeedsLayout
    // 4. 容器节点 -> 叶节点（脏），只需要 setNeedsLayout
    // YGAttachNodesFromViewHierarchy 会针对 2 3 4 情况自行做出标记脏节点的动作
    if (self.hm_renderObject.numberOfChildren == 0 && self.hm_renderObject.isLeaf) {
        // 原先是叶节点，现在也是叶节点
        [self.hm_renderObject markDirty];
    }
    [hm_yoga_get_root_view(self) setNeedsLayout];
}

- (NSString *)hm_viewID {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)hm_setViewID:(id)viewID {
    if (!viewID) {return;}
    NSString *vid = nil;
    if ([viewID isKindOfClass:NSString.class]) {
        vid = viewID;
    } else if ([viewID isKindOfClass:HMBaseValue.class]) {
        HMBaseValue *jsv = (HMBaseValue *) viewID;
        if (jsv.isString) {
            vid = jsv.toString;
        }
    }
    objc_setAssociatedObject(self, @selector(hm_viewID), vid, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

#pragma mark - Export Method

- (void)hm_addSubview:(HMBaseValue *)subview {
    id viewObject = subview.toNativeObject;
    UIView *view = nil;
    if ([viewObject isKindOfClass:UIView.class]) {
        view = viewObject;
    }
    if (!view) {
        HMLogError(@"参数必须为视图");

        return;
    }

    if (view.superview) {
        UIView *parent = view.superview;
        [view removeFromSuperview];
        //移除原来的父视图持有的 hummerValue.
        [[parent hm_hummerValueHandle] removeObject:subview];
        [parent hm_hummerValueHandle];
        [parent hm_markDirty];
    }
    [[self hm_hummerValueHandle] addObject:subview];
    [self addSubview:view];
    [self hm_markDirty];

    [view hm_processFixedPositionWithContext:[[HMJSGlobal globalObject] currentContext:subview.executor]];
}

- (void)hm_removeSubview:(HMBaseValue *)child {
    id viewObject = child.toNativeObject;
    UIView *view = nil;
    if ([viewObject isKindOfClass:UIView.class]) {
        view = viewObject;
    }
    if (!view) {
        HMLogError(@"参数必须为视图");

        return;
    }
    if (view.superview) {
        UIView *superView = view.superview;
        [view removeFromSuperview];
        //移除当前视图child 对应的 hummerValue。
        [[superView hm_hummerValueHandle] removeObject:child];
        [superView hm_markDirty];
    }
    /* a -> a0 -> a00(with height), remove a00, a0's height not change.
    UIView *superView = view.superview;
    if (superView) {
        [view removeFromSuperview];
        [superView hm_markDirty];
    }
    if (superView.subviews.count > 0) {
        return;
    }
    superView = superView.superview;
    while (superView && superView.subviews.count < 2) {
        superView = superView.superview;
    }
    [superView hm_markDirty];
    [superView.superview hm_markDirty];
     */
}

- (void)hm_removeAllSubviews {
    [self.subviews enumerateObjectsUsingBlock:^(__kindof UIView *_Nonnull obj,
            NSUInteger idx,
            BOOL *_Nonnull stop) {
        [obj removeFromSuperview];
    }];
    [[self hm_hummerValueHandle] removeAllObjects];
    [self hm_markDirty];
}

- (void)hm_replaceSubview:(HMBaseValue *)newChild withNode:(HMBaseValue *)oldChild {
    id newViewObject = newChild.toNativeObject;
    id oldViewObject = oldChild.toNativeObject;
    UIView *newView = nil;
    UIView *oldView = nil;
    if ([newViewObject isKindOfClass:UIView.class]) {
        newView = newViewObject;
    }
    if ([oldViewObject isKindOfClass:UIView.class]) {
        oldView = oldViewObject;
    }
    if (!newView || !oldView) {
        HMLogError(@"参数必须为视图");

        return;
    }
    NSInteger index = [self.subviews indexOfObject:oldView];
    if (index == NSNotFound) {
        return;
    }
    [[oldView.superview hm_hummerValueHandle] removeObject:oldChild];
    if (newView.superview != self) {
        UIView *parent = newView.superview;
        [newView removeFromSuperview];
        //移除原来的父视图持有的 hummerValue.
        [[parent hm_hummerValueHandle] removeObject:newChild];
        [parent hm_markDirty];
    }
    [oldView removeFromSuperview];
    [[self hm_hummerValueHandle] addObject:newChild];
    [self insertSubview:newView atIndex:index];
    [self hm_markDirty];
}

- (void)hm_insertBefore:(HMBaseValue *)newChild withNode:(HMBaseValue *)oldChild {
    id newViewObject = newChild.toNativeObject;
    id oldViewObject = oldChild.toNativeObject;
    UIView *newView = nil;
    UIView *oldView = nil;
    if ([newViewObject isKindOfClass:UIView.class]) {
        newView = newViewObject;
    }
    if ([oldViewObject isKindOfClass:UIView.class]) {
        oldView = oldViewObject;
    }
    if (!newView || !oldView) {
        HMLogError(@"参数必须为视图");

        return;
    }
    [[oldView.superview hm_hummerValueHandle] removeObject:oldChild];
    if (newView.superview && newView.superview != self) {
        UIView *parent = newView.superview;
        [newView removeFromSuperview];
        //移除原来的父视图持有的 hummerValue.
        [[parent hm_hummerValueHandle] removeObject:newChild];
        [parent hm_markDirty];
    }
    [[self hm_hummerValueHandle] addObject:newChild];
    [self insertSubview:newView belowSubview:oldView];
    [self hm_markDirty];
}

- (HMBaseValue *)hm_getSubViewByID:(HMBaseValue *)viewID {
    for (UIView *view in self.subviews) {
        if ([view.viewID isEqualToString:viewID.toString]) {
            return (HMBaseValue *)view.hm_value;
        }
        [view hm_getSubViewByID:viewID];
    }
    return nil;
}

- (void)hummerSetFrame:(CGRect)frame {
    // These frames are in terms of anchorPoint = topLeft, but internally the
    // views are anchorPoint = center for easier scale and rotation animations.
    // Convert the frame so it works with anchorPoint = center.
    CGPoint position = {CGRectGetMidX(frame), CGRectGetMidY(frame)};
    CGRect bounds = {CGPointZero, frame.size};
    
    // Avoid crashes due to nan coords
    if (isnan(position.x) || isnan(position.y) || isnan(bounds.origin.x) || isnan(bounds.origin.y) ||
        isnan(bounds.size.width) || isnan(bounds.size.height)) {
        HMLogError(@"Invalid layout for %@. position: %@. bounds: %@",
                   self,
                   NSStringFromCGPoint(position),
                   NSStringFromCGRect(bounds));
        
        return;
    }
    
    self.center = position;
    self.bounds = bounds;
}

@end
