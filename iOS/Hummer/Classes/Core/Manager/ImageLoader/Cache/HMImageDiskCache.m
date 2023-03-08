//
//  HMImageDiskCache.m
//  Hummer
//
//  Created by didi on 2021/8/30.
//

#import "HMImageDiskCache.h"
#import <CommonCrypto/CommonDigest.h>
#import "NSString+Hummer.h"
#import "NSURL+Hummer.h"
#import "HMUtility.h"

static NSString *const HMImageDiskCacheBasePath = @"com_hummer_image_cache";


@interface NSDate(HMImageHelper)
- (NSDate *)fileAttributeDate;
@end

@implementation NSDate (HMConvertible)

// `Date` in memory is a wrap for `TimeInterval`. But in file attribute it can only accept `Int` number.
// By default the system will `round` it. But it is not friendly for testing purpose.
// So we always `ceil` the value when used for file attributes.

- (NSDate *)fileAttributeDate {
    return self;
}

@end



@implementation HMImageFileMeta

- (HMImageFileMeta *)initWithUrl:(NSURL *)url{
    NSDictionary *res = [url resourceValuesForKeys:@[NSURLContentModificationDateKey, NSURLCreationDateKey, NSURLFileSizeKey] error:nil];
    if (!res) {
        return nil;
    }
    HMImageFileMeta *file = [HMImageFileMeta new];
    file.url = url;
    file.size = [res[NSURLFileSizeKey] unsignedLongLongValue];
    file.lastAccessDate = res[NSURLCreationDateKey];
    file.estimatedExpirationDate = res[NSURLContentModificationDateKey];
    return file;
}

- (BOOL)isExpired:(NSDate *)date {
    return self.estimatedExpirationDate.timeIntervalSince1970 - date.timeIntervalSince1970 <= 0;
}

- (NSData *)accessDataWithFileManager:(NSFileManager *)manager date:(NSDate *)accessDate{
    NSData *data = [NSData dataWithContentsOfURL:[self.url hm_asUrl]];
    
    NSError *error = nil;
    [manager setAttributes:@{NSFileCreationDate:[accessDate fileAttributeDate],
                             NSFileModificationDate : [self.estimatedExpirationDate  fileAttributeDate]} ofItemAtPath:self.url.path error:&error];
    return data;
}
@end



@interface HMImageDiskCacheConfig ()

@property (nonatomic, strong) NSFileManager *fileManager;
@property (nonatomic, copy) NSString *namespace;
@property (nonatomic, copy) NSURL *directoryURL;
@property (nonatomic, assign) NSInteger sizeLimit;

@property(nonatomic, strong) HMStorageExpiration *expiration;
@end

@implementation HMImageDiskCacheConfig

+ (HMImageDiskCacheConfig *)defaultConfig{
    
    HMImageDiskCacheConfig *config = [HMImageDiskCacheConfig new];
    config.expiration = [HMStorageExpiration never];
    config.fileManager = [NSFileManager defaultManager];
    config.namespace = nil;
    NSURL *url = [[config.fileManager URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] firstObject];
    url = [url URLByAppendingPathComponent:HMImageDiskCacheBasePath];
    config.directoryURL = url;
    config.sizeLimit = 300 * 1024 * 1024;
    config.expiration = [HMStorageExpiration never];
    return config;
}
@end



@interface HMImageDiskCache()

@property (nonatomic, strong) HMImageDiskCacheConfig *config;

@property (nonatomic, strong) NSFileManager *fileManager;
@property (nonatomic, copy) NSURL *directoryURL;
@property (nonatomic, strong) NSMutableSet *filesCache;
@property (nonatomic, strong) dispatch_queue_t cacheQueue;

@end

@implementation HMImageDiskCache


- (HMImageDiskCache *)initWithConfig:(HMImageDiskCacheConfig *)config {
    
    self = [super init];
    if (self) {
        _config = config;
        [self prepare];
    }
    return self;
}

- (void)prepare {
    self.cacheQueue = dispatch_queue_create("com.hummer.imageDisk.cache", DISPATCH_QUEUE_SERIAL);
    self.fileManager = self.config.fileManager;
    self.filesCache = [NSMutableSet new];
    self.directoryURL = self.config.directoryURL;
    NSString *path = self.directoryURL.path;
    if (![self.fileManager fileExistsAtPath:self.directoryURL.path]) {
        NSError *error = nil;
        //todo withIntermediateDirectories
        BOOL res = [self.fileManager createDirectoryAtPath:path withIntermediateDirectories:YES attributes:nil error:&error];
        if (!res || error) {
            HMLogError(@"HMImageDiskCache create cache directory error, path = %@", path);
            return;
        }
    }
    dispatch_async(self.cacheQueue, ^{
        NSDirectoryEnumerator *enumerator = [self.fileManager enumeratorAtPath:path];
        NSString *fileName = [enumerator nextObject];
        while (fileName) {
            [self.filesCache addObject:fileName];
            fileName = [enumerator nextObject];
        }
    });

}

- (nullable NSString *)storeData:(id<HMDataConvertible>)data forKey:(NSString *)key {
   return [self storeData:data expiration:self.config.expiration forKey:key];
}

- (nullable NSString *)storeData:(id<HMDataConvertible>)data expiration:(HMStorageExpiration *)expiration forKey:(NSString *)key {
    NSData *_data = data.hm_asData;
    if (!key || !_data) {
        return nil;
    }
    
    NSString *fileName = HMDiskCacheFileNameForKey(key);
    NSURL *writeUrl = [self.directoryURL URLByAppendingPathComponent:fileName];
    BOOL res = NO;
    res = [_data writeToURL:writeUrl atomically:YES];
    if (!res) {
        HMLogError(@"HMImageDiskCache writeToFile error, path = %@", writeUrl);
        return nil;
    }
    NSError *error = nil;
    NSDate *date = [NSDate new];
    
    res = [self.fileManager setAttributes:@{NSFileCreationDate:[date fileAttributeDate],
                                                 NSFileModificationDate : [[expiration estimatedExpirationSinceNow] fileAttributeDate]} ofItemAtPath:writeUrl.path error:&error];
    if (!res || error) {
        HMLogError(@"HMImageDiskCache writeToFile setAttributes error, path = %@", writeUrl.path);
        return nil;
    }
    dispatch_async(self.cacheQueue, ^{
        [self.filesCache addObject:fileName];
    });
    return [writeUrl hm_asString];
}

- (nullable NSData *)dataForKey:(NSString *)key filePath:(NSString *__autoreleasing *)outFilePath{
    
    if (!key) {
        return nil;
    }
    NSString *fileName = HMDiskCacheFileNameForKey(key);
    //check cache
    __block BOOL hasCache = NO;
    dispatch_sync(self.cacheQueue, ^{
        hasCache = [self.filesCache containsObject:fileName];
    });
    if (!hasCache) {
        return nil;
    }
    
    NSDate *now = [NSDate date];
    NSURL *writeUrl = [self.directoryURL URLByAppendingPathComponent:fileName];
    HMImageFileMeta *fileMeta = [[HMImageFileMeta alloc] initWithUrl:writeUrl];
    if (!fileMeta) {
        return nil;
    }
    if ([fileMeta isExpired:now]) {
        return nil;
    }
    NSData *res = [fileMeta accessDataWithFileManager:self.fileManager date:now];
    if(outFilePath){
        *outFilePath = [writeUrl hm_asString];
    }
    return res;
}

#pragma mark <remove>

- (void)removeCacheForKey:(NSString *)key {
    [self removeCacheForKey:key completion:nil];
}

- (void)removeCacheForKey:(NSString *)key completion:(nullable void (^)(void))completion {
    if (!key) {return;}
    HMImageFileMeta *meta = [self fileMetaForKey:key];
    if (!meta) {return;}
    [self removeFileAtUrl:meta.url completion:completion];
}

- (void)removeFileAtUrl:(NSURL *)url completion:(nullable void (^)(void))completion {
    NSError *error = nil;
    BOOL res = [self.fileManager removeItemAtURL:url error:&error];
    if (error || !res) {
        HMLogError(@"HMImageDiskCache removeFileAtUrl error, url = %@", url);
    }
    dispatch_async(self.cacheQueue, ^{
        [self.filesCache removeObject:url.lastPathComponent];
        if (completion) {
            completion();
        }
    });
};
// todo
- (void)removeExpiredValues{
    
    
}

- (nullable NSMutableArray<NSURL *> *)removeSizeExceededValues{
    
    if (self.config.sizeLimit == 0) {
        return nil;
    }
    
    unsigned long long totalSize = 0;
    NSMutableArray<HMImageFileMeta *> *files = [self getAllFilesAndTotalSize:&totalSize];
    if (totalSize < self.config.sizeLimit) {
        return nil;
    }
    [files sortUsingComparator:^NSComparisonResult(HMImageFileMeta  *obj1, HMImageFileMeta  *obj2) {
        if (obj1.lastAccessDate > obj2.lastAccessDate) {
            return NSOrderedAscending;
        }else if (obj1.lastAccessDate < obj2.lastAccessDate) {
            return NSOrderedDescending;
        }
        return NSOrderedSame;
    }];
    
    unsigned long long targetSize = self.config.sizeLimit/3;
    NSInteger index = 0;
    
    //for debug
    NSMutableArray<NSURL *> *deleteFiles = [NSMutableArray new];
    while (totalSize > targetSize && index < files.count) {
        HMImageFileMeta *deleteFile = files[index];
        totalSize -= deleteFile.size;
        [deleteFiles addObject:deleteFile.url];
        [self removeFileAtUrl:deleteFile.url completion:nil];
        index ++;
    }

    return deleteFiles;
}

- (void)removeAll {
        
    NSError *error;
    NSInteger index = 0;
    unsigned long long totalSize = 0;
    NSMutableArray<HMImageFileMeta *> *files = [self getAllFilesAndTotalSize:&totalSize];
    while (index < files.count) {
        HMImageFileMeta *deleteFile = files[index];
        [self removeFileAtUrl:deleteFile.url completion:nil];
        index ++;
    }
}

- (NSMutableArray *)getAllFilesAndTotalSize:(unsigned long long *)size {
    
    __block unsigned long long totalSize = 0;
    NSDirectoryEnumerator *enumerator = [self.fileManager enumeratorAtURL:self.directoryURL includingPropertiesForKeys:@[NSFileCreationDate,NSFileModificationDate, NSFileSize] options:NSDirectoryEnumerationSkipsHiddenFiles errorHandler:nil];
    NSArray<NSURL *> *fileUrls = [enumerator allObjects];
    NSMutableArray *metas = [NSMutableArray new];
    if (fileUrls) {
        [fileUrls enumerateObjectsUsingBlock:^(NSURL * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            HMImageFileMeta *meta = [[HMImageFileMeta alloc] initWithUrl:obj];
            totalSize += meta.size;
            [metas addObject:meta];
        }];
    }
    *size = totalSize;
    return metas;
}

- (HMImageFileMeta *)fileMetaForKey:(NSString *)key {
    
    if (!key) {
        return nil;
    }
    NSString *fileName = HMDiskCacheFileNameForKey(key);
    NSURL *writeUrl = [self.directoryURL URLByAppendingPathComponent:fileName];
    HMImageFileMeta *fileMeta = [[HMImageFileMeta alloc] initWithUrl:writeUrl];
    return fileMeta;
}

#pragma mark - Hash

#define HM_MAX_FILE_EXTENSION_LENGTH (NAME_MAX - CC_MD5_DIGEST_LENGTH * 2 - 1)

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
static inline NSString * _Nonnull HMDiskCacheFileNameForKey(NSString * _Nullable key) {
    const char *str = key.UTF8String;
    if (str == NULL) {
        str = "";
    }
    unsigned char r[CC_MD5_DIGEST_LENGTH];
    CC_MD5(str, (CC_LONG)strlen(str), r);
    NSURL *keyURL = [NSURL URLWithString:key];
    NSString *ext = keyURL ? keyURL.pathExtension : key.pathExtension;
    // File system has file name length limit, we need to check if ext is too long, we don't add it to the filename
    if (ext.length > HM_MAX_FILE_EXTENSION_LENGTH) {
        ext = nil;
    }
    NSString *filename = [NSString stringWithFormat:@"%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%@",
                          r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10],
                          r[11], r[12], r[13], r[14], r[15], ext.length == 0 ? @"" : [NSString stringWithFormat:@".%@", ext]];
    return filename;
}
#pragma clang diagnostic pop


@end

