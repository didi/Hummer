//
//  HMSDWebImageInterceptor.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/9/30.
//

#import "HMSDWebImageInterceptor.h"
#import <SDWebImage/NSData+ImageContentType.h>
#import "HMUtility.h"
#import <SDWebImage/UIImage+MultiFormat.h>
#import <SDWebImage/UIImageView+WebCache.h>
#import <SDWebImage/SDWebImageDefine.h>
#import "HMResourceModel.h"
#import "HMInterceptor.h"

NS_ASSUME_NONNULL_BEGIN

static NSString *const BASE64HEADERPREFIX = @"data:";

NS_ASSUME_NONNULL_END

@implementation HMSDWebImageInterceptor

HM_EXPORT_INTERCEPTOR(HMSDWebImageInterceptor)

- (void)getImageWithUrlOrBase64:(NSString *)urlOrBase64 imageView:(UIImageView *)imageView baseUrl:(nullable NSURL *)baseUrl completionBlock:(void (^_Nullable)(BOOL isSuccess, BOOL isRemoteImage, UIImage *image))completionBlock {
    // 尝试 base64 解码
    // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs
    NSRange prefixRange = [urlOrBase64 rangeOfString:BASE64HEADERPREFIX];
    NSRange commaRange = [urlOrBase64 rangeOfString:@","];
    // 是否有头部，如果有则需要清除
    // 目前头部判断是根据标准做全小写判断，未来如果存在大写情况，可以做兼容支持
    if (prefixRange.location != NSNotFound && commaRange.location != NSNotFound) {
        // 由于 commaRange.location != NSNotFound 因此 commaRange.location + 1 不会造成崩溃
        urlOrBase64 = [urlOrBase64 substringFromIndex:commaRange.location + 1];
    }
    // 如果未来字符串存在换行符，则需要在 option 中加选项支持
    // 苹果系统转换 base64 是需要做 padding 等号补全的，如果需要支持则应当修改
    NSData *imageData = [[NSData alloc] initWithBase64EncodedString:urlOrBase64 options:0];
    UIImage *base64Image = [UIImage sd_imageWithData:imageData scale:UIScreen.mainScreen.scale];
    if (base64Image) {
        hm_safe_main_thread(^{
            completionBlock ? completionBlock(YES, NO, base64Image) : nil;
        });
        
        return;
    }
    
    // 补全相对路径
    NSURL *imageUrl = nil;
    if ([urlOrBase64 hasPrefix:@"."]) {
        if (!baseUrl) {
            HMLogError(@"相对路径解析失败，缺少 baseUrl");
            hm_safe_main_thread(^{
                completionBlock ? completionBlock(NO, NO, nil) : nil;
            });
            
            return;
        }
        // 相对路径
        // 修复 https://www.baidu.com 情况
        // https://www.baidu.com + ./hummer.js -> https://www.baidu.com/./hummer.js
        if (!baseUrl.path.length) {
            NSURLComponents *urlComponents = [NSURLComponents componentsWithURL:baseUrl resolvingAgainstBaseURL:YES];
            if (urlComponents) {
                urlComponents.path = @"/";
            } else {
                HMLogError(@"url 无法分解成 component");
                hm_safe_main_thread(^{
                    completionBlock ? completionBlock(NO, NO, nil) : nil;
                });

                return;
            }
            baseUrl = urlComponents.URL;
        }
        imageUrl = [NSURL URLWithString:urlOrBase64 relativeToURL:baseUrl];
    } else {
        imageUrl = [NSURL URLWithString:urlOrBase64];
    }

    if (!imageUrl) {
        NSAssert(NO, @"图片地址解析失败");
        hm_safe_main_thread(^{
            completionBlock ? completionBlock(NO, NO, nil) : nil;
        });

        return;
    }

    // 只有 resourceSpecifier，没有 scheme，则默认 HTTPS
    // 但是必须判断 host，否则可能将本地地址改成网络地址
    if (imageUrl.host.length && imageUrl.scheme.length == 0) {
        NSURLComponents *urlComponents = [NSURLComponents componentsWithURL:imageUrl resolvingAgainstBaseURL:YES];
        if (urlComponents) {
            urlComponents.scheme = @"https";
            imageUrl = urlComponents.URL;
        } else {
            NSAssert(NO, @"url 格式不正确");
            hm_safe_main_thread(^{
                completionBlock ? completionBlock(NO, NO, nil) : nil;
            });

            return;
        }
    }
    
    if ([imageUrl.scheme hasPrefix:@"http"]) {
        // 网络图片
        CGFloat scale = SDImageScaleFactorForKey(imageUrl.absoluteString);
        [imageView sd_setImageWithURL:imageUrl placeholderImage:nil options:0 context:scale < 2 ? @{SDWebImageContextImageScaleFactor: @(UIScreen.mainScreen.scale)} : nil progress:nil completed:^(UIImage * _Nullable image, NSError * _Nullable error, SDImageCacheType cacheType, NSURL * _Nullable imageURL) {
            if (!error && image) {
                hm_safe_main_thread(^{
                    completionBlock ? completionBlock(YES, YES, image) : nil;
                });
            } else {
                hm_safe_main_thread(^{
                    completionBlock ? completionBlock(NO, YES, nil) : nil;
                });
            }
        }];
    } else {
        // 1. 无路径图片 -> test
        // 1.1 xcassets data gif 图片
        // 1.2 xcassets 图片
        // 1.3 bundle 图片
        // 1.4 bundle gif 图片 -> 这种情况需要转化为绝对路径图片
        // 2. 绝对路径图片
        HMResourceModel *resourceModel = hm_resolveResource(imageUrl.path);
        if (resourceModel.filePath.length > 0 && ![resourceModel.filePath containsString:@"/"]) {
            // 1.1 需要前置判断，1.2/1.3 都使用 imageNamed
            NSDataAsset *dataAsset = [[NSDataAsset alloc] initWithName:resourceModel.filePath bundle:resourceModel.resourceBundle ?: NSBundle.mainBundle];
            if (dataAsset) {
                UIImage *image = [UIImage sd_imageWithData:dataAsset.data scale:UIScreen.mainScreen.scale];
                if (image) {
                    hm_safe_main_thread(^{
                        completionBlock ? completionBlock(YES, NO, image) : nil;
                    });
                    
                    return;
                }
            }
            // 判断文件是否存在，如果存在并且为 gif，则需要特殊处理
            NSString *filePath = [(resourceModel.resourceBundle ?: NSBundle.mainBundle).bundlePath stringByAppendingPathComponent:resourceModel.filePath];
            NSFileHandle *fileHandle = [NSFileHandle fileHandleForReadingAtPath:filePath];
            if (fileHandle) {
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
                        UIImage *image = [UIImage sd_imageWithData:imageData scale:UIScreen.mainScreen.scale];
                        if (image) {
                            hm_safe_main_thread(^{
                                completionBlock ? completionBlock(YES, NO, image) : nil;
                            });
                            
                            return;
                        }
                    }
                }
            }
            
            // 暂时不处理 @2x @3x 文件名
            UIImage *image = [UIImage imageNamed:resourceModel.filePath inBundle:resourceModel.resourceBundle compatibleWithTraitCollection:nil];
            if (image) {
                hm_safe_main_thread(^{
                    completionBlock ? completionBlock(YES, NO, image) : nil;
                });
                
                return;
            }
            if (filePath.pathExtension.length == 0) {
                // 添加 .gif 后缀
                NSString *newFilePath = [filePath stringByAppendingPathExtension:@"gif"];
                NSData *imageData = [NSData dataWithContentsOfFile:newFilePath];
                UIImage *image = [UIImage sd_imageWithData:imageData scale:UIScreen.mainScreen.scale];
                if (image) {
                    hm_safe_main_thread(^{
                        completionBlock ? completionBlock(YES, NO, image) : nil;
                    });
                    
                    return;
                }
            }
        } else if (!resourceModel.resourceBundle && [resourceModel.filePath hasPrefix:@"/"]) {
            // 绝对路径图片
            NSData *imageData = [NSData dataWithContentsOfFile:resourceModel.filePath];
            UIImage *image = [UIImage sd_imageWithData:imageData scale:UIScreen.mainScreen.scale];
            if (image) {
                hm_safe_main_thread(^{
                    completionBlock ? completionBlock(YES, NO, image) : nil;
                });
                
                return;
            }
        }
        
        hm_safe_main_thread(^{
            completionBlock ? completionBlock(NO, NO, nil) : nil;
        });
        
        return;
    }
}

@end
