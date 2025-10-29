//
//  HMLocalImageLoader+Lottie.m
//  Hummer
//
//  Created by didi on 2022/12/28.
//

#import "HMLocalImageLoader+Lottie.h"
#import "HMImageLoader.h"
#import "HMImageLoaderOperation.h"
#import "HMSourceParser.h"

@implementation HMLocalImageLoader (Lottie)

- (id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource context:(HMImageLoaderContext *)context dataCompletion:(HMDataLoaderCompletionBlock)completionBlock {
    
    HMImageLoaderOperation *operation = [HMImageLoaderOperation new];
    id<HMURLConvertible> realSource = [self fixLoadSource:source inJSBundleSource:bundleSource];
    NSString *sourceString = [realSource hm_asString];
    NSData *imageData = nil;
    NSString *filePath = nil;
    HMSourceParser *model = [[HMSourceParser alloc] initWithSource:sourceString];
    if (model.fileName == nil){
        completionBlock(nil, nil, [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorInvalidURL userInfo:@{NSLocalizedDescriptionKey : @"Invalid URL"}]);
        return operation;
    }
    //phase1: bundle+imageName
    if (model.bundle) {
        //1.bundle 可能是自定义bundle或只包含图片名(mainBundle)
        filePath = [model.bundle pathForResource:model.fileName ofType:model.extensionName];
        if(filePath){
            imageData = [NSData dataWithContentsOfFile:filePath];
        }else{
            NSDataAsset *dataAsset = [[NSDataAsset alloc] initWithName:model.fileName bundle:model.bundle];
            imageData = dataAsset.data;
        }
    }else if(model.filePath){
        filePath = model.filePath;
        imageData = [NSData dataWithContentsOfURL:[realSource hm_asFileUrl]];
    }
    if (filePath || imageData) {
        completionBlock(imageData,filePath,nil);
        return operation;
    }
    NSError *error = [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorBadImageData userInfo:@{NSLocalizedDescriptionKey : @"can not fetch image data from local asset"}];
    completionBlock(nil, nil, error);
    return operation;
}
@end
