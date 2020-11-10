//
//  UIView+HMEventTrack.m
//  AFDownloadRequestOperation
//
//  Created by didi on 2020/8/13.
//

#import "UIView+HMEventTrack.h"
#import "UIView+HMDom.h"

@implementation UIView (HMEventTrack)

- (nullable NSString *)hm_elementId{
    
    if (self.viewID && self.viewID.length > 0) {
        return self.viewID;
    }
    return nil;
}

- (NSString *)hm_elementType {
    return NSStringFromClass(self.class);
}

- (nullable NSString *)hm_elementContent {
    return nil;
}
@end


@implementation UIButton (HMEventTrack)

- (nullable NSString *)hm_elementContent {
    NSString *text = self.titleLabel.text;
    if (text) {
        return text;
    }else{
        UIImageView *imageView = self.imageView;
        text = imageView.hm_elementContent;
        if (text) {
            return text;
        }
    }
    return super.hm_elementContent;
}
@end

@implementation UILabel (HMEventTrack)

- (nullable NSString *)hm_elementContent {
    NSString *text = self.text;
    if (text) {
        return text;
    }
    return super.hm_elementContent;
}

@end

@implementation UIImageView (HMEventTrack)

- (nullable NSString *)hm_elementContent {
    if (![self isKindOfClass:NSClassFromString(@"HMImageView")]) {
        return super.hm_elementContent;
    }
    SEL sel = NSSelectorFromString(@"src");
    if ([self respondsToSelector:sel]) {
        NSString *url = [self performSelector:sel];
        if (url) {
            return url;
        }
    }
    return super.hm_elementContent;
}

@end

@implementation UIControl (HMEventTrack)


@end
