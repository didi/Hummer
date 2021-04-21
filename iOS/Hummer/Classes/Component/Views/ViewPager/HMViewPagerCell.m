//
//  HMViewPagerCell.m
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import "HMViewPagerCell.h"
#import "UIView+HMRenderObject.h"
#import <Hummer/HMBaseExecutorProtocol.h>
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "UIImageView+HMImageLoader.h"
#import <Hummer/UIView+HMDom.h>

@interface HMViewPagerCell ()

@property (nonatomic, strong) UIImageView *imageView;

@end

@implementation HMViewPagerCell

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _imageView = [[UIImageView alloc] initWithFrame:self.bounds];
        _imageView.isHmLayoutEnabled = NO;
        [self.contentView addSubview:self.imageView];
        
        self.clipsToBounds = YES;
        self.isHmLayoutEnabled = NO;
        [self.contentView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.flexDirection = YOGA_TYPE_WRAPPER(YGFlexDirectionColumn);
            layout.justifyContent = YOGA_TYPE_WRAPPER(YGJustifyCenter);
            layout.alignItems = YOGA_TYPE_WRAPPER(YGAlignStretch);
        }];
    }
    return self;
}

- (void)setImageURL:(NSString *)url
{
    if (!url || ![url isKindOfClass:NSString.class] || ![url containsString:@"http"]) {
        return;
    }
    self.imageView.hidden = NO;
    [self.imageView hm_setImageWithURL:url];
}

- (void)setJSView:(UIView *)view
{
    if (!view || ![view isKindOfClass:UIView.class]) {
        return;
    }
    self.imageView.hidden = YES;
    [self.contentView addSubview:view];
    [self.contentView hm_markDirty];
}

@end
