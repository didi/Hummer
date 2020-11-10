//
//  HMJavaScriptLoader.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, HMJSLoaderError) {
    HMJSLoaderErrorNoScriptURL = 1,
    HMJSLoaderErrorFailedOpeningFile = 2,
    HMJSLoaderErrorCannotBeLoadedSynchronously = 1000,
};

@interface HMLoaderProgress : NSObject

@property (nonatomic, strong) NSNumber *done;
@property (nonatomic, strong) NSNumber *total;
@property (nonatomic, copy) NSString *status;

@end

@interface HMDataSource : NSObject

@property (nonatomic, copy) NSURL *url;
@property (nonatomic, strong) NSData *data;
@property (nonatomic, strong) NSNumber *length;

@end

typedef void (^HMLoaderProgressBlock)(HMLoaderProgress *progressData);
typedef void (^HMLoaderCompleteBlock)(NSError *error, HMDataSource *source);

@interface HMJavaScriptLoader : NSObject

+ (void)loadBundleWithURL:(NSURL*)url
               onProgress:(HMLoaderProgressBlock)progressBlock
               onComplete:(HMLoaderCompleteBlock)completeBlock;

+ (NSData *)syncJsBundleAtURL:(NSURL *)scriptURL
                 sourceLength:(unsigned int *)sourceLength
                        error:(NSError **)error;

@end
