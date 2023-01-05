//
//  HMLocalImageLoader.m
//  Hummer
//
//  Created by didi on 2020/11/18.
//

#import "HMLocalImageLoader.h"
#import "NSURL+Hummer.h"
#import "NSString+Hummer.h"
#import "HMUtility.h"
#import "HMSourceParser.h"
#import "HMImageCoderManager.h"

@implementation HMLocalImageLoader

- (BOOL)canLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource{
    
    return YES;
}

// 相对路径处理
//
- (id<HMURLConvertible>)fixLoadSource:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource{

    NSString *sourceString = [source hm_asString];
    if([sourceString hasPrefix:@"."]){
        //2 相对对路径。相对于.当前js工作目录开始
        NSURL *jsUrl = [bundleSource hm_asFileUrl];
        NSURL *newImageUrl = [NSURL URLWithString:sourceString relativeToURL:jsUrl];
        return newImageUrl;
    }else if([sourceString hasPrefix:@"/"]){
        return [sourceString hm_asFileUrl];
    } else{
        //image named
        return source;
    }
    return sourceString;
}

/**
 * Native资源图片：
 * 示例：
 * "test"
 * "xxx.bundle/imageName"
 * "/xxx/xxx/xxx/xx.bundle/imageName"
 * "/sandbox/xxx/xxx/xx/imageName"
 * prepare(fix url && parse bundle)：
 * 1. 图片名-->imageName
 * 2. 相对路径-->绝对路径
 * 3. 绝对路径或xxx.bundle/imageName
 *    1. 解析bundle
 *    2. sandbox
 *
 * load:
 * phase1: bundle+imageName
 * phase2: sandbox
 */

- (nullable id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source
                           inJSBundleSource:(id<HMURLConvertible>)bundleSource
                                    context:(nullable HMImageLoaderContext *)context
                                 completion:(nonnull HMImageLoaderCompletionBlock)completionBlock{

    HMImageLoaderOperation *operation = [HMImageLoaderOperation new];
    id<HMURLConvertible> realSource = [self fixLoadSource:source inJSBundleSource:bundleSource];
    NSString *sourceString = [realSource hm_asString];
    UIImage *image = nil;
    NSData *imageData = nil;
    BOOL isGif = context[HMImageManagerContextAnimatedImageClass];
    HMSourceParser *model = [[HMSourceParser alloc] initWithSource:sourceString];
    if (model.extensionName == nil){
        completionBlock(nil, nil, [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorInvalidURL userInfo:@{NSLocalizedDescriptionKey : @"Invalid URL"}]);
        return operation;
    }
    //phase1: bundle+imageName
    if (model.bundle) {
        //1.bundle 可能是自定义bundle或只包含图片名(mainBundle)
        if (isGif) {
            NSString *path = [model.bundle pathForResource:model.extensionName ofType:@"gif"];
            if (path) {
                imageData = [NSData dataWithContentsOfFile:path];
            }else{
                NSDataAsset *dataAsset = [[NSDataAsset alloc] initWithName:model.extensionName bundle:model.bundle];
                imageData = dataAsset.data;
            }
        }else{
            image = [UIImage imageNamed:model.extensionName inBundle:model.bundle compatibleWithTraitCollection:nil];
        }
    }else if(model.filePath){
        //phase2: sandbox
        if (isGif) {
            imageData = [NSData dataWithContentsOfURL:[realSource hm_asFileUrl]];
        }else{
            image = HMImageFromLocalAssetURL([realSource hm_asFileUrl]);
        }
    }
    BOOL needDecoder = ![context[HMImageContextImageDoNotDecode] boolValue];
    if(needDecoder == false){
        HM_SafeRunBlockAtMainThread(completionBlock, image, imageData, nil);
        return operation;
    }
    if (imageData && image == nil && needDecoder) {
        dispatch_async(dispatch_get_global_queue(0, 0), ^{           
            UIImage *image = HMImageLoaderDecodeImageData(imageData, [realSource hm_asUrl], context);
            hm_safe_main_thread(^{
                completionBlock(image, imageData, image?nil:HM_IMG_DECODE_ERROR);
            });
        });
        return operation;
    }
    
    if (image) {
        completionBlock(image, nil, nil);
        return operation;
    }
    NSError *error = [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorBadImageData userInfo:@{NSLocalizedDescriptionKey : @"can not fetch image data from local asset"}];
    completionBlock(nil, nil, error);
    return operation;
}

@end


