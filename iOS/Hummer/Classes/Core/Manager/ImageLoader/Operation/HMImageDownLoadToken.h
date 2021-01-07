//
//  HMImageDownLoadToken.h
//  Hummer
//
//  Created by didi on 2020/11/26.
//

#import <Foundation/Foundation.h>
#import "HMImageLoaderOperation.h"
#import "HMImageDownloadOperation.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMImageDownLoadToken : NSObject<HMImageLoaderOperation>

@property (nonatomic, strong, nullable)id token;
@property (nonatomic, strong )HMImageDownloadOperation *downLoadOperation;
@end

NS_ASSUME_NONNULL_END
