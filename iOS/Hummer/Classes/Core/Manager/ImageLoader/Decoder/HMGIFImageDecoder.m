//
//  HMGIFImageDecoder.m
//  Hummer
//
//  Created by didi on 2020/11/25.
//

#import "HMGIFImageDecoder.h"
#import "HMAnimatedImage.h"

@implementation HMGIFImageDecoder


- (BOOL)canDecodeImageData:(NSData *)imageData {
    
    char header[7] = {};
    [imageData getBytes:header length:6];
    
    return !strcmp(header, "GIF87a") || !strcmp(header, "GIF89a");
}
- (void)decodeImageData:(NSData *)imageData context:(HMImageDecoderContext *)context completion:(HMImageDecoderCompletionBlock)completionBlock {
    
    CGFloat scale = [[context objectForKey:HMImageManagerContextImageScaleFactor] floatValue];
    HMAnimatedImage *image = [[HMAnimatedImage alloc] initWithData:imageData scale:scale];
    if (image) {
        completionBlock(image,nil);
    }    
}


@end
