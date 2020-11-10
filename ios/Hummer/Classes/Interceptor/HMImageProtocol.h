//
//  HMImageProtocol.h
//  Hummer
//
//  Created by didi on 2020/5/21.
//

#import <UIKit/UIKit.h>

@protocol HMImageProtocol <NSObject>

@required

NS_ASSUME_NONNULL_BEGIN

- (void)getImageWithUrlOrBase64:(NSString *)urlOrBase64 imageView:(UIImageView *)imageView baseUrl:(nullable NSURL *)baseUrl completionBlock:(void (^_Nullable)(BOOL isSuccess, BOOL isRemoteImage, UIImage *image))completionBlock;

NS_ASSUME_NONNULL_END

@end
