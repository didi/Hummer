//
//  HMImageFrame.m
//  Hummer
//
//  Created by didi on 2021/9/1.
//

#import "HMImageFrame.h"


@interface HMImageFrame ()

@property (nonatomic, strong, readwrite, nonnull) UIImage *image;
@property (nonatomic, readwrite, assign) NSTimeInterval duration;

@end

@implementation HMImageFrame

+ (instancetype)frameWithImage:(UIImage *)image duration:(NSTimeInterval)duration {
    HMImageFrame *frame = [[HMImageFrame alloc] init];
    frame.image = image;
    frame.duration = duration;
    
    return frame;
}
@end
