//
//  HMDevToolsLoggerCell.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsLoggerCell.h"

@interface HMDevToolsLoggerCell ()

@property (nonatomic, strong) UILabel *logTextLabel;
@property (nonatomic, strong) UIImageView *arrowImage;

@end

@implementation HMDevToolsLoggerCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
        self.backgroundView.backgroundColor = UIColor.clearColor;
        self.backgroundColor = UIColor.clearColor;
        self.contentView.backgroundColor = UIColor.clearColor;
        self.contentView.translatesAutoresizingMaskIntoConstraints = NO;
        
        _logTextLabel = UILabel.new;
        _logTextLabel.translatesAutoresizingMaskIntoConstraints = NO;
        _logTextLabel.font = [UIFont systemFontOfSize:12];
        [self.contentView addSubview:_logTextLabel];
            
        _arrowImage = UIImageView.new;
        _arrowImage.contentMode = UIViewContentModeCenter;
        _arrowImage.translatesAutoresizingMaskIntoConstraints = NO;
        if (@available(iOS 13.0, *)) {
            UIImageSymbolConfiguration *config = [UIImageSymbolConfiguration configurationWithFont:[UIFont systemFontOfSize:12] scale:UIImageSymbolScaleDefault];
            _arrowImage.image = [UIImage systemImageNamed:@"chevron.right" withConfiguration:config];
        }
        [self.contentView addSubview:_arrowImage];
        
        NSDictionary *viewsDict = NSDictionaryOfVariableBindings(_logTextLabel, _arrowImage);
        [self.contentView addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|[_arrowImage]-5-[_logTextLabel]-5-|" options:0 metrics:nil views:viewsDict]];
        [self.contentView addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|-5-[_logTextLabel]-5-|" options:0 metrics:nil views:viewsDict]];
        [self.contentView addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-8-[_arrowImage(==20)]" options:0 metrics:nil views:viewsDict]];
        [self.contentView addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|-5-[_arrowImage(==20)]" options:0 metrics:nil views:viewsDict]];
        [self addConstraints:@[
            [NSLayoutConstraint constraintWithItem:self.contentView attribute:NSLayoutAttributeTrailing relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeTrailing multiplier:1 constant:0],
            [NSLayoutConstraint constraintWithItem:self.contentView attribute:NSLayoutAttributeLeading relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeLeading multiplier:1 constant:0],
            [NSLayoutConstraint constraintWithItem:self.contentView attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeTop multiplier:1 constant:0],
            [NSLayoutConstraint constraintWithItem:self.contentView attribute:NSLayoutAttributeBottom relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeBottom multiplier:1 constant:0],
        ]];
    }
    return self;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
}

- (void)renderCellWithLogger:(HMDevToolsLogger *)logger {
    self.logTextLabel.textColor = [self textColorWithLevel:logger.logLevel];
    if (@available(iOS 13.0, *)) {
        UIImageSymbolConfiguration *config = [UIImageSymbolConfiguration configurationWithFont:[UIFont systemFontOfSize:12] scale:UIImageSymbolScaleDefault];
        
        NSString *imageName = logger.expended ? @"chevron.down" : @"chevron.right";
        self.arrowImage.image = [UIImage systemImageNamed:imageName withConfiguration:config];
    }
    self.logTextLabel.numberOfLines = logger.expended ? 0 : 1;
    self.logTextLabel.text = logger.logString;
}

- (UIColor *)textColorWithLevel:(HMLogLevel)level {
    if (level == HMLogLevelError || level == HMLogLevelFatal) {
        return [UIColor colorWithRed:0.906 green:0.298 blue:0.235 alpha:1];
    }
    
    if (level == HMLogLevelWarning) {
        return [UIColor colorWithRed:0.945 green:0.769 blue:0.0588 alpha:1];
    }
    
    return [UIColor colorWithRed:0.173 green:0.243 blue:0.314 alpha:1];
}

@end
