//
//  HMZipArchive.m
//  Hummer
//
//  Created by didi on 2022/12/23.
//

#import "HMZipArchive.h"
#import <SSZipArchive/SSZipArchive.h>
#import "HMUtility.h"

@interface HMZipArchive()

@property (nonatomic, strong) dispatch_queue_t zipQueue;

@end

@implementation HMZipArchive

+ (HMZipArchive *)sharedInstance {
    static HMZipArchive *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [HMZipArchive new];
        [manager setup];
    });
    return manager;
}

- (void)setup {
    
    self.zipQueue = dispatch_queue_create("com.hummer.zip.queue", DISPATCH_QUEUE_SERIAL);
}

- (void)unzipFileAtPath:(NSString *)path toDestination:(NSString *)destination overwrite:(BOOL)overwrite password:(NSString *)password result:(nonnull void (^)(BOOL))result {
    
    dispatch_async(self.zipQueue, ^{
        NSError *err = nil;
        BOOL res = [SSZipArchive unzipFileAtPath:path toDestination:destination overwrite:overwrite password:password error:&err];
        HM_SafeRunBlockAtMainThread(result, res);
    });
}
@end
