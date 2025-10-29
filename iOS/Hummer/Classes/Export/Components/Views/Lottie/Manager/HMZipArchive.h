//
//  HMZipArchive.h
//  Hummer
//
//  Created by didi on 2022/12/23.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMZipArchive : NSObject

+ (HMZipArchive *)sharedInstance;

- (void)unzipFileAtPath:(NSString *)path toDestination:(NSString *)destination overwrite:(BOOL)overwrite password:(nullable NSString *)password result:(void(^)(BOOL))result;

@end

NS_ASSUME_NONNULL_END
