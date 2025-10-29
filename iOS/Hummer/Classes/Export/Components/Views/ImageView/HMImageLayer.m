//
//  HMImageView.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMImageLayer.h"
#import "HMUtility.h"

@implementation HMImageLayer

- (void)setImageURL:(NSString *)imageURL {
    _imageURL = imageURL;
    if ([imageURL hasPrefix:@"http"] ||
        [imageURL hasPrefix:@"https"] ) {
         HMNetImageFromImageURL(imageURL, ^(UIImage * _Nullable image, NSError * _Nullable error) {
             if (image) {
                 self.contents = (__bridge id)image.CGImage;
             }else {
                 [self removeFromSuperlayer];
             }
         });
    }else {
        UIImage * backedImg ;
        if(self.imageURL.pathComponents.count) {
            backedImg = HMImageFromLocalAssetName(self.imageURL);
        }else {
            backedImg =HMImageFromBase64String(self.imageURL);
        }
        if (backedImg) {
            HMExecOnMainQueue(^{
                self.contents = (__bridge id)backedImg.CGImage;
            });
        }else {
            HMExecOnMainQueue(^{
                [self removeFromSuperlayer];
            });
        }
    }
}

@end
