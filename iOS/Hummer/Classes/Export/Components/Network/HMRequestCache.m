//
//  HMRequestCache.m
//  Hummer
//
//  Created by didi on 2022/11/28.
//

#import "HMRequestCache.h"
#import "NSString+Hummer.h"
#import "HMFileManager.h"

@implementation HMRequestCache

+ (NSString *)generateCachePath:(NSString *)url namespace:(NSString *)namespace filePath:(nullable NSString *)filePath {

    NSString *fileName = [url hm_md5String];
    NSString *pathExtension = nil;
    NSString *relativePath = nil;
    if(filePath) {
        NSDictionary *parseResult = [filePath hm_parsePath];
        fileName = parseResult[HMParsePathKey_Name] ? parseResult[HMParsePathKey_Name] : fileName;
        pathExtension = parseResult[HMParsePathKey_Extension];
        relativePath = parseResult[HMParsePathKey_Path];
    }
    NSString *entirePath = [NSString stringWithFormat:@"%@/%@", namespace, @"hm_request"];
    if(relativePath){
        entirePath = [entirePath stringByAppendingPathComponent:relativePath];
    }
    entirePath = [[HMFileManager sharedManager] createDirectoryAtHMDocumentRoot:entirePath];
    
    if(pathExtension){
        /// case 1
        entirePath = [entirePath stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.%@",fileName, pathExtension]];
    }else{
        /// case 2 + case 3
        entirePath = [entirePath stringByAppendingPathComponent:fileName];
    }
    return entirePath;
}

+ (NSString *)generatedPath:(NSString *)path appendExtension:(NSString *)pathExtension {
    
    if(path.pathExtension == nil || path.pathExtension.length <= 0){
        //无扩展名 case2 + case 3
        if(pathExtension && pathExtension.length > 0){
            return [path stringByAppendingPathExtension:pathExtension];
        }
    }
    return path;
}

+ (BOOL)saveCache:(id<HMURLConvertible>)fromURL to:(id<HMURLConvertible>)toURL {
    NSError *inOutError = nil;
    BOOL res = [[NSFileManager defaultManager] moveItemAtURL:[fromURL hm_asFileUrl] toURL:[toURL hm_asFileUrl] error:&inOutError];
    return res && inOutError == nil;
}

+ (BOOL)saveCacheData:(NSData *)cacheData to:(id<HMURLConvertible>)toURL {
    
    BOOL res = [cacheData writeToURL:[toURL hm_asFileUrl] atomically:YES];
    return res;
}


@end
