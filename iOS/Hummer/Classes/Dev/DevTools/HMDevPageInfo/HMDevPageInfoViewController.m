//
//  HMDevPageInfoViewController.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevPageInfoViewController.h"
#import "HMBaseExecutorProtocol.h"
#import "HMJSGlobal.h"
#import "HMInterceptor.h"
#import "HMDevToolsJSCallerExecutor.h"
#import <objc/runtime.h>

const static NSString * FORMAT_STRING_LEFT_TOP = @"┌─";
const static NSString * FORMAT_STRING_LEFT_CENTER = @"├─";
const static NSString * FORMAT_STRING_LEFT_BOTTOM = @"└─";
const static NSString * FORMAT_STRING_LEFT_TOP_VIRTUAL = @"┌x";
const static NSString * FORMAT_STRING_LEFT_CENTER_VIRTUAL = @"├";
const static NSString * FORMAT_STRING_LEFT_BOTTOM_VIRTUAL = @"└x";
const static NSString * FORMAT_STRING_NORMAL_H = @"─";
const static NSString * FORMAT_STRING_NORMAL_V = @"｜";

@interface HMDevPageInfoViewController ()

@property (nonatomic, strong) UITextView *textView;

@end

@implementation HMDevPageInfoViewController
@synthesize context = _context;

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.view addSubview:self.textView];
    
    UILayoutGuide *guide = self.view.layoutMarginsGuide;
    [NSLayoutConstraint activateConstraints:@[
        [self.textView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
        [self.textView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
        [self.textView.topAnchor constraintEqualToAnchor:guide.topAnchor],
        [self.textView.bottomAnchor constraintEqualToAnchor:guide.bottomAnchor]
    ]];
}

- (void)setContext:(HMJSContext *)context {
    _context = context;
    self.textType = _textType;
}
- (void)refresh {
    if (self.textType == HMDevToolsTextTypePageInfo) {
        NSString *pageInfoTitle = [self contentTextWithConten:@"页面参数" indent:0];
        NSString *pageInfoContent= [self contentTextWithConten:_context.pageInfo.description?:@"" indent:1];
        
        NSString *envTitle = [self contentTextWithConten:@"环境" indent:0];
        NSString *envContent = [self contentTextWithConten:HMJSGlobal.globalObject.getEnvironmentInfo.description?:@"" indent:1];
        
        NSString *textContent = [NSString stringWithFormat:@"%@%@%@%@", pageInfoTitle, pageInfoContent, envTitle, envContent];
        self.textView.text = textContent;
    }
}

- (void)setTextType:(HMDevToolsTextType)textType {
    [self refresh];
}

#pragma mark - Getter

- (UITextView *)textView {
    if (!_textView) {
        _textView = UITextView.new;
        _textView.translatesAutoresizingMaskIntoConstraints = NO;
        _textView.backgroundColor = [UIColor.whiteColor colorWithAlphaComponent:0.9];
        _textView.font = [UIFont systemFontOfSize:12];
        _textView.textColor = [UIColor colorWithRed:0.173 green:0.243 blue:0.314 alpha:1];
    }
    return _textView;
}

- (NSString *)headerTextWithTitle:(NSString *)title subTitle:(NSString *)subTitle {
    NSMutableArray *hLineTexts = NSMutableArray.array;
    for (int i = 0; i < 20; i++) {
        [hLineTexts addObject:FORMAT_STRING_NORMAL_H];
    }
    NSString *hLine = [hLineTexts componentsJoinedByString:@""];
    NSString *beiginText = [FORMAT_STRING_LEFT_TOP stringByAppendingFormat:@"%@\n", hLine];
    NSString *secondLine = [FORMAT_STRING_NORMAL_V stringByAppendingFormat:@"  %@\n", title];
    NSString *thirdLine = [FORMAT_STRING_LEFT_CENTER stringByAppendingFormat:@"%@\n", hLine];
    NSString *forthLine = [FORMAT_STRING_NORMAL_V stringByAppendingFormat:@" %@\n", subTitle];
    return [NSString stringWithFormat:@"%@%@%@%@%@", beiginText, secondLine, thirdLine, forthLine, thirdLine];
}

- (NSString *)contentTextWithConten:(NSString *)content indent:(NSUInteger)indent {
    if (indent == 0) {
        return content;
    }
    NSMutableArray *vLineTexts = NSMutableArray.array;
    for (int i = 0; i < indent - 1; i++) {
        [vLineTexts addObject:FORMAT_STRING_NORMAL_V];
    }
    NSString *hLine = [vLineTexts componentsJoinedByString:@" "];
    return [NSString stringWithFormat:@"%@ %@ %@\n", hLine, FORMAT_STRING_LEFT_CENTER, content];
}

@end
