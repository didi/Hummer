//
//  HMLottieLoaderManager.m
//  Hummer
//
//  Created by didi on 2022/12/27.
//

#import "HMLottieLoaderManager.h"
#import "HMImageLoaderManager.h"
#import "HMImageCacheManager.h"
#import "HMLocalImageLoader.h"
#import "HMZipArchive.h"
#import "HMFileManager.h"
#import "HMWebImageLoader+Lottie.h"
#import "HMLocalImageLoader+Lottie.h"
#import "NSError+Hummer.h"


@implementation HMLottieLoaderManager

/**
 * 为保持原有解码器入参清晰 data<-->image。lottie 复用 设计：
 * 1. 完全服用 webloader，callback，并不做自动解码
 * 2. 复用 imageCache 缓存下载原始文件：json/zip, zip 调用 lottie 解码器 解压缩，存入sandbox/tmp
 * 3. localLoader 改造 返回
 *
 * 缓存模式：lottie 内存缓存 + 磁盘，解码之后文件和lottie lru缓存，重启后失效。
 *
 */
+ (nullable id<HMImageLoaderOperation>)load:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource context:(nullable HMImageLoaderContext *)context completion:(nonnull HMLottieCompletionBlock)completionBlock {
    
    HMImageCombinedOperation *operation = [HMImageCombinedOperation new];
    id<HMLottieLoader> loader = [self getLoaderWithSource:source inJSBundleSource:bundleSource context:context];
    NSString *cacheUrlString = [source hm_asString];
    if ([loader respondsToSelector:@selector(fixLoadSource:inJSBundleSource:)]) {
        cacheUrlString = [[loader fixLoadSource:source inJSBundleSource:bundleSource] hm_asString];
    }
    __weak typeof(operation) wOperation = operation;
    operation.cacheOperation = [[HMImageCacheManager sharedManager] queryImageWithSource:cacheUrlString context:context result:^(UIImage * _Nullable image, NSData * _Nullable data, NSString *filePath, HMImageCacheType cacheType, NSError * _Nullable error) {
        //HMImageCacheManager 必定返回 解压之后的image
        if (!wOperation || wOperation.isCancel) {
            // Image combined operation cancelled by user
            completionBlock(nil, HMImageCacheTypeNone, [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorCancelled userInfo:@{NSLocalizedDescriptionKey : @"Operation cancelled by user during querying the cache"}]);
            return;
        }
        if(filePath){
            [self checkUnzipWithOperation:wOperation source:source filePath:filePath cacheKey:cacheUrlString completion:^(NSString *result, NSError *error) {
                completionBlock(result, HMImageCacheTypeDisk, error);
            }];
            return;
        }
        [self callLoader:loader operation:operation sourace:source inJSBundleSource:bundleSource cacheKey:cacheUrlString context:context completion:completionBlock];
    }];
    return operation;
}

+ (void)checkUnzipWithOperation:(HMImageCombinedOperation *)operation source:(nonnull id<HMURLConvertible>)source filePath:(NSString *)filePath cacheKey:(NSString *)cacheKey completion:(void(^)(NSString *result, NSError *error))completionBlock  {
    NSString *srcString = [source hm_asString];
    HMImageLoaderOperation *oper = [HMImageLoaderOperation new];
    operation.coderOperation = oper;
    __weak typeof(operation) wOperation = operation;
    if(!operation || operation.isCancel){
        completionBlock(nil, [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorCancelled userInfo:@{NSLocalizedDescriptionKey : @"Operation cancelled by user during querying the cache"}]);
        return;
    }
    
    BOOL isZip = [srcString hasSuffix:@".zip"];
    if(isZip){
        NSString *temp = [NSString stringWithFormat:@"%@/%@",@"lottie", [cacheKey hm_md5String]];
        temp = [[HMFileManager sharedManager] createDirectoryAtTmpRoot:temp];
        temp = [temp hm_asFilePath];
        filePath = [filePath hm_asFilePath];
        [[HMZipArchive sharedInstance] unzipFileAtPath:filePath toDestination:temp overwrite:YES password:nil result:^(BOOL success) {
            if (!wOperation || wOperation.isCancel) {
                // Image combined operation cancelled by user
                completionBlock(nil, [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorCancelled userInfo:@{NSLocalizedDescriptionKey : @"Operation cancelled by user during querying the cache"}]);
                return;
            }
            if(success){
                NSDirectoryEnumerator *enumerator = [[NSFileManager defaultManager] enumeratorAtURL:[temp hm_asFileUrl] includingPropertiesForKeys:@[] options:NSDirectoryEnumerationSkipsHiddenFiles errorHandler:nil];
                NSArray <NSURL *> *filePaths = [enumerator allObjects];
                __block NSString *jsonPath = nil;
                [filePaths enumerateObjectsUsingBlock:^(NSURL * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                    if([obj.pathExtension isEqualToString:@"json"]){
                        *stop = YES;
                        jsonPath = [obj hm_asFilePath];
                    }
                }];
                if(jsonPath == nil){
                
                    completionBlock(nil, [NSError hm_errorWithDomain:@"com.lottie.loader" code:HMWebImageErrorInvalidDownloadResponse description:@"找不到 json 文件"]);
                }else{
                    completionBlock(jsonPath, nil);
                }
            }else{
                completionBlock(nil, [NSError hm_errorWithDomain:@"com.lottie.loader" code:HMWebImageErrorInvalidFormat description:@"解压失败"]);
            }
        }];
    }else{
        //callback
        completionBlock(filePath, nil);
    }
}

+ (void)callLoader:(id<HMLottieLoader>)loader operation:(HMImageCombinedOperation *)operation sourace:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nullable id<HMURLConvertible>)bundleSource cacheKey:(NSString *)cacheKey context:(nullable HMImageLoaderContext *)context completion:(nonnull HMLottieCompletionBlock)completionBlock {
    
    __weak typeof(operation) wOperation = operation;
    operation.loaderOperation = [loader load:source inJSBundleSource:bundleSource context:context dataCompletion:^(NSData * _Nullable data, NSString * _Nullable filePath, NSError * _Nullable error) {
        
        if (!wOperation || wOperation.isCancel) {
            
            // Image combined operation cancelled by user
            return;
        }
        // webloader 返回data
        // localLoader 返回data|filepath, data->storeCache, filepath->unzip
        if (filePath || data) {
            // 应该在 HMImageLoaderCompletionBlock 添加 缓存控制，但考虑到拦截器可能已经有使用场景。
            // 此处 hack 处理下，HMLocalImageLoader 只做内存缓存
            NSMutableDictionary *_ctx = context.mutableCopy;
            if(filePath){
                [self checkUnzipWithOperation:wOperation source:source filePath:filePath cacheKey:cacheKey completion:^(NSString *result, NSError *error) {
                    completionBlock(result, HMImageCacheTypeNone, error);
                }];
            }else{
                [[HMImageCacheManager sharedManager] storeImage:nil data:data source:source context:_ctx result:^(NSString * _Nullable filePath) {
                    [self checkUnzipWithOperation:wOperation source:source filePath:filePath cacheKey:cacheKey completion:^(NSString *result, NSError *error) {
                        completionBlock(result, HMImageCacheTypeNone, error);
                    }];
                }];
            }
        }else{
            completionBlock(nil,HMImageCacheTypeNone,error);
        }
    }];
}
+ (id<HMLottieLoader>)getLoaderWithSource:(nonnull id<HMURLConvertible>)source inJSBundleSource:(nonnull id<HMURLConvertible>)bundleSource context:(nullable HMImageLoaderContext *)context{
    
    if([[[HMImageLoaderManager sharedManager] webLoader] canLoad:source inJSBundleSource:bundleSource]){
        return (id<HMLottieLoader>)[[HMImageLoaderManager sharedManager] webLoader];
    }
    return (id<HMLottieLoader>)[[HMImageLoaderManager sharedManager] localLoader];
}
@end
