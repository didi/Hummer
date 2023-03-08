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
#import "HMImageView.h"

#import <Hummer/UIView+HMDom.h>

#import <Hummer/UIView+HMInspector.h>

@interface HMViewPagerCell ()<HMViewInspectorDescription>

@property (nonatomic, strong) HMImageView *imageView;
@property (nonatomic, strong) UIView *jsContentView;

@property (nonatomic, copy, nullable) NSString *imageHref;
@end

@implementation HMViewPagerCell

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _imageView = [[HMImageView alloc] initWithFrame:self.bounds];
//        _imageView.isHmLayoutEnabled = NO;
        [self.contentView addSubview:self.imageView];
        
        self.clipsToBounds = YES;
        self.isHmLayoutEnabled = NO;
        [self.contentView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.flexDirection = YOGA_TYPE_WRAPPER(YGFlexDirectionColumn);
            layout.justifyContent = YOGA_TYPE_WRAPPER(YGJustifyCenter);
            layout.alignItems = YOGA_TYPE_WRAPPER(YGAlignStretch);
            layout.alignContent = YOGA_TYPE_WRAPPER(YGAlignStretch);
                        
            layout.width = YOGA_TYPE_WRAPPER(HMPointValueMake(self.bounds.size.width));
            layout.height = YOGA_TYPE_WRAPPER(HMPointValueMake(self.bounds.size.height));
        }];
    }
    return self;
}
- (void)setImageURL:(NSString *)url{
    if (!url || ![url isKindOfClass:NSString.class] || ![url containsString:@"http"]) {
        return;
    }
    self.imageView.hidden = NO;
    self.imageHref = url;
    self.contentViewValue = nil;
    self.jsContentView = nil;
    [self.contentView hm_removeAllSubviews];
    [self.contentView addSubview:self.imageView];
    [self.imageView setSrc:url];
}

- (void)setJSView:(UIView *)view
{
    if (!view || ![view isKindOfClass:UIView.class]) {
        return;
    }
    self.imageView.hidden = YES;
    self.imageHref = nil;
    self.jsContentView = view;
    [self.contentView hm_removeAllSubviews];
    [self.contentView addSubview:view];
    [view hm_markDirty];
}

- (void)setContentViewValue:(HMBaseValue *)contentViewValue {
    _contentViewValue = contentViewValue;
    [self setJSView:(UIView *)contentViewValue.toNativeObject];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    
    //固定和 contentView 大小相同
    [self.jsContentView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
        layout.width = YOGA_TYPE_WRAPPER(HMPointValueMake(self.contentView.bounds.size.width));
        layout.height = YOGA_TYPE_WRAPPER(HMPointValueMake(self.contentView.bounds.size.height));
    }];


    NSHashTable<id<HMLayoutStyleProtocol>> *affectedShadowViews = NSHashTable.weakObjectsHashTable;
    [self.contentView hm_applyLayoutPreservingOrigin:NO affectedShadowViews:affectedShadowViews];
    if (affectedShadowViews.count > 0) {
        NSEnumerator<id<HMLayoutStyleProtocol>> *enumerator = affectedShadowViews.objectEnumerator;
        id<HMLayoutStyleProtocol> value = nil;
        while ((value = enumerator.nextObject)) {
            [value.view hm_layoutBackgroundColorImageBorderShadowCornerRadius];
        }
    }
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
