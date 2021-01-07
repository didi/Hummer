//
//  HMImageDecoder.m
//  Hummer
//
//  Created by didi on 2020/11/25.
//

#import "HMImageDecoder.h"
#import "UIImage+Hummer.h"
@implementation HMImageDecoder

- (BOOL)canDecodeImageData:(NSData *)imageData {
    return YES;
}

- (void)decodeImageData:(NSData *)imageData
                context:(HMImageDecoderContext *)context
             completion:(HMImageDecoderCompletionBlock)completionBlock {
    
    CGSize destSize = [context[HMImageManagerContextImageResize] CGSizeValue];
    CGFloat scale = [context[HMImageManagerContextImageScaleFactor] floatValue];
    HMResizeMode mode = [context[HMImageManagerContextImageResizeMode] integerValue];
    UIImage *image = [UIImage hm_decodeImageWithData:imageData size:destSize scale:scale resizeMode:mode];
    if (image) {
        completionBlock(image, nil);
    }else{
        NSError *error = [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorBadImageData userInfo:@{NSLocalizedDescriptionKey : @"decode image fail"}];
        completionBlock(nil,error);

    }
}



@end
