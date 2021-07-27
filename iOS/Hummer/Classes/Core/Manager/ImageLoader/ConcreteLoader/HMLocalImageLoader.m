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
#import "HMResourceModel.h"

@interface HMInternalSourceModel : NSObject

@property (nonatomic, strong) NSBundle *bundle;
@property (nonatomic, copy) NSString *filePath;
@property (nonatomic, copy) NSString *imageNameWithoutExtension;
@property (nonatomic, copy) NSString *extensionName;
@end

@implementation HMInternalSourceModel{
    NSString *_source;
}

- (instancetype)initWithSource:(NSString *)source {
    
    self = [super init];
    if (self) {
        _source = source;
        [self parse];
    }
    return self;
}
/**
 * 解析图片路径：
 * test"
 * "xxx.bundle/imageName"
 * "/xxx/xxx/xxx/xx.bundle/imageName"
 * "/sandbox/xxx/xxx/xx/imageName"
 * 解析流程：
 * 1. 获取图片名称
 * 2. 获取bundle(在bundle中的图片分为两种方式读取：)
 *    1. [imageName: inBundle] -> 读取assets中的资源
 *    2. contentFile方式        -> 读取bundle中不再asset中的资源
 * 3. 保存完整file路径，用于兜底读取。
 *
 */
- (void)parse {
    
    NSArray *pathComponents = [_source pathComponents];
    //xx/xx/xx/xxx.png -> xxx.png
    NSString *imageName = pathComponents.lastObject;
    NSArray *compoundNames = [imageName componentsSeparatedByString:@"."];
    NSString *imageWithoutEx = compoundNames.firstObject;
    if (![imageWithoutEx isEqualToString:@"/"]) {
        // iOS13之前 如果imageName为"/"或触发 _UIImageCollectImagePathsForPath进行路径处理，
        // 导致attempt to insert nil object from objects 类型的crash
        
        //phase1 image name
        self.imageNameWithoutExtension = imageWithoutEx;
    }
    if (compoundNames.count>1) {
        self.extensionName = compoundNames.lastObject;
    }
    
    //phase2  get bundle
    NSBundle *mainBundle = [NSBundle mainBundle];
    [pathComponents enumerateObjectsUsingBlock:^(NSString *obj, NSUInteger idx, BOOL *stop) {
        if ([obj.pathExtension.lowercaseString isEqualToString:@"bundle"]) {
            
            NSString *bundlePath = obj;
            NSURL *bundleUrl = [mainBundle URLForResource:bundlePath withExtension:nil];
            if (bundleUrl) {
                self.bundle = [NSBundle bundleWithURL:bundleUrl];
                *stop = YES;
            }
        }
    }];
    
    //phase3  file
    if ([_source hasPrefix:@"file"]) {
        self.filePath = _source;
    }else{
        //只有imagename 默认读取mainbundle
        if (!self.bundle && self.imageNameWithoutExtension) {
            self.bundle = mainBundle;
        }
    }

}
@end


@implementation HMLocalImageLoader

- (BOOL)canLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource{
    
    return YES;
}

// 相对路径处理
//
- (id<HMURLConvertible>)fixLoadSource:(id<HMURLConvertible>)source withJSBundleSource:(id<HMURLConvertible>)bundleSource{

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
    id<HMURLConvertible> realSource = [self fixLoadSource:source withJSBundleSource:bundleSource];
    NSString *sourceString = [realSource hm_asString];
    UIImage *image = nil;
    NSData *imageData = nil;
    BOOL isGif = context[HMImageManagerContextAnimatedImageClass];
    HMInternalSourceModel *model = [[HMInternalSourceModel alloc] initWithSource:sourceString];
    if (model.imageNameWithoutExtension == nil){
        completionBlock(nil, NO, HMImageCacheTypeDisk, [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorInvalidURL userInfo:@{NSLocalizedDescriptionKey : @"Invalid URL"}]);
        return operation;
    }
    //phase1: bundle+imageName
    if (model.bundle) {
        //1.bundle 可能是自定义bundle或只包含图片名(mainBundle)
        if (isGif) {
            NSString *path = [model.bundle pathForResource:model.imageNameWithoutExtension ofType:@"gif"];
            if (path) {
                imageData = [NSData dataWithContentsOfFile:path];
            }else{
                NSDataAsset *dataAsset = [[NSDataAsset alloc] initWithName:model.imageNameWithoutExtension bundle:model.bundle];
                imageData = dataAsset.data;
            }
        }else{
            image = [UIImage imageNamed:model.imageNameWithoutExtension inBundle:model.bundle compatibleWithTraitCollection:nil];
        }
    }else if(model.filePath){
        //phase2: sandbox
        if (isGif) {
            imageData = [NSData dataWithContentsOfURL:[realSource hm_asFileUrl]];
        }else{
            image = HMImageFromLocalAssetURL([realSource hm_asFileUrl]);
        }
    }

    if (imageData) {
        completionBlock(imageData, YES, HMImageCacheTypeDisk, nil);
        return operation;
    }
    
    if (image) {
        completionBlock(image, NO, HMImageCacheTypeDisk, nil);
        return operation;
    }
    NSError *error = [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorBadImageData userInfo:@{NSLocalizedDescriptionKey : @"can not fetch image data from local asset"}];
    completionBlock(nil, NO, HMImageCacheTypeDisk, error);
    return operation;
}

- (id<HMURLConvertible>)cacheKeyForSource:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource {
    return [self fixLoadSource:source withJSBundleSource:bundleSource];
}
@end


