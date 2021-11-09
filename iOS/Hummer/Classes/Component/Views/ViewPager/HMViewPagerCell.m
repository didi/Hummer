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

#import <Hummer/UIView+HMInspector.h>

@interface HMViewPagerCell ()<HMViewInspectorDescription>

@property (nonatomic, strong) UIImageView *imageView;

@property (nonatomic, copy, nullable) NSString *imageHref;
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
//            layout.flexDirection = YOGA_TYPE_WRAPPER(YGFlexDirectionColumn);
//            layout.justifyContent = YOGA_TYPE_WRAPPER(YGJustifyCenter);
//            layout.alignItems = YOGA_TYPE_WRAPPER(YGAlignStretch);
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
    self.imageHref = url;
    self.contentViewValue = nil;
    [self.imageView hm_setImageWithURL:url];
}

- (void)setJSView:(UIView *)view
{
    if (!view || ![view isKindOfClass:UIView.class]) {
        return;
    }
    self.imageView.hidden = YES;
    self.imageHref = nil;
    [self.contentView addSubview:view];
    [self.contentView hm_markDirty];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    [self.contentView hm_applyLayoutPreservingOrigin:YES affectedShadowViews:nil];
}


#pragma mark <HMViewInspectorDescription>

- (nullable NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    if (self.contentViewValue) {
        UIView *view = (UIView *)[self.contentViewValue toNativeObject];
        return [view hm_displayJsChildren];
    }
    return nil;
}

- (HMBaseValue *)hm_displayJsElement {
    return self.contentViewValue;
}

- (NSString *)hm_displayID {
    if (!self.contentViewValue) {
        return nil;
    }
    UIView *view = (UIView *)[self.contentViewValue toNativeObject];
    return [view hm_ID];
}

- (id)hm_displayContent {
    
    if (self.contentViewValue) {
        UIView *view = (UIView *)[self.contentViewValue toNativeObject];
        [view hm_displayContent];
    }
    return self.imageHref;
}

- (NSString *)hm_displayTagName {
    
    if (self.contentViewValue) {
        UIView *view = (UIView *)[self.contentViewValue toNativeObject];
        return [view hm_displayTagName];
    }
    return @"Image";
}


- (NSString *)hm_displayAlias {
    return [NSString stringWithFormat:@"%ld",self.indexPath.row];
}


@end
