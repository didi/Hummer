//
//  HMDevToolsHierarchyCell.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsHierarchyCell.h"
#import "HMDevToolsHierarchyHelper.h"

@interface HMDevToolsHierarchyCell ()

/// 视图层级
@property (nonatomic) UIView *depthIndicatorView;
/// 视图标识颜色，为了区分视图
@property (nonatomic) UIImageView *colorCircleImageView;

@end

@implementation HMDevToolsHierarchyCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    if (self = [super initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:reuseIdentifier]) {
        self.contentView.backgroundColor = UIColor.clearColor;
        self.backgroundColor = UIColor.clearColor;
        self.textLabel.font = [UIFont systemFontOfSize:12];
        self.detailTextLabel.font = [UIFont systemFontOfSize:12];
        [self.contentView addSubview:self.depthIndicatorView];
        [self.contentView addSubview:self.colorCircleImageView];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    
    const CGFloat kContentPadding = 6;
    const CGFloat kDepthIndicatorWidthMultiplier = 4;
    const CGFloat kViewColorIndicatorSize = 22;
    
    const CGRect bounds = self.contentView.bounds;
    const CGFloat textLabelCenterY = CGRectGetMidY(self.textLabel.frame);
    
    BOOL hideCheckerView = YES;
    CGFloat maxWidth = CGRectGetMaxX(bounds);
    maxWidth -= (hideCheckerView ? kContentPadding : (kViewColorIndicatorSize + kContentPadding * 2));
    
    CGRect depthIndicatorFrame = self.depthIndicatorView.frame = CGRectMake(
        kContentPadding, 0, self.viewDepth * kDepthIndicatorWidthMultiplier, CGRectGetHeight(bounds)
    );
    
    CGRect circleFrame = self.colorCircleImageView.frame;
    circleFrame.origin.x = CGRectGetMaxX(depthIndicatorFrame) + kContentPadding;
    circleFrame.origin.y = floorf(textLabelCenterY - CGRectGetHeight(circleFrame) / 2.f);
    self.colorCircleImageView.frame = circleFrame;
    
    CGRect textLabelFrame = self.textLabel.frame;
    CGFloat textOriginX = CGRectGetMaxX(circleFrame) + kContentPadding;
    textLabelFrame.origin.x = textOriginX;
    textLabelFrame.size.width = maxWidth - textOriginX;
    self.textLabel.frame = textLabelFrame;
    
    CGRect detailTextLabelFrame = self.detailTextLabel.frame;
    CGFloat detailOriginX = circleFrame.origin.x;
    detailTextLabelFrame.origin.x = detailOriginX;
    detailTextLabelFrame.size.width = maxWidth - detailOriginX;
    self.detailTextLabel.frame = detailTextLabelFrame;
}

#pragma mark - Setter

- (void)setRandomColorTag:(UIColor *)randomColorTag {
    if (![_randomColorTag isEqual:randomColorTag]) {
        _randomColorTag = randomColorTag;
        _colorCircleImageView.image = [HMDevToolsHierarchyHelper circularImageWithColor:randomColorTag radius:6];
    }
}

- (void)setViewDepth:(NSInteger)viewDepth {
    if (_viewDepth != viewDepth) {
        _viewDepth = viewDepth;
        [self setNeedsLayout];
    }
}

#pragma mark - Getter

- (UIView *)depthIndicatorView {
    if (!_depthIndicatorView) {
        _depthIndicatorView = UIView.new;
        _depthIndicatorView.backgroundColor = HMDevToolsHierarchyHelper.hierarchyIndentPatternColor;
    }
    return _depthIndicatorView;
}

- (UIImageView *)colorCircleImageView {
    if (!_colorCircleImageView) {
        UIImage *defaultCircleImage = [HMDevToolsHierarchyHelper circularImageWithColor:UIColor.blackColor radius:5];
        _colorCircleImageView = [[UIImageView alloc] initWithImage:defaultCircleImage];
    }
    return _colorCircleImageView;
}

@end
