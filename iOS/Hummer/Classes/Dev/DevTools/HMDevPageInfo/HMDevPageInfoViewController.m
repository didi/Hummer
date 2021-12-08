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
#import "HMDevToolsJSCallerExcutor.h"
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

- (void)setTextType:(HMDevToolsTextType)textType {
    if (textType == HMDevToolsTextTypePageInfo) {
        self.textView.text = HMJSGlobal.globalObject.pageInfo.description;
    }
    else if (textType == HMDevToolsTextTypeCallerTree) {
        self.textView.text = [self headerTextWithTitle:@"函数调用树" subTitle:@"<<JSContext>>"];
        NSArray *inspectors = [HMInterceptor interceptor:HMInterceptorTypeJSCaller];
        if (inspectors.count < 1) {
            return;
        }
        
        static NSDateFormatter *formatter;
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
          formatter = NSDateFormatter.new;
          formatter.dateFormat = @"HH:mm:ss.SSS";
        });
                
        HMDevToolsJSCallerExcutor *jsCallerExcutor = (HMDevToolsJSCallerExcutor *)inspectors[0];
        __weak typeof(self) weakself = self;
        jsCallerExcutor.callerInfo = ^(NSString * _Nonnull className, NSString * _Nonnull funtionName) {
            __strong typeof(self) strongself = weakself;
            NSString *date = [formatter stringFromDate:NSDate.date];
            NSString *showString = strongself.textView.text ?: @"";
            NSString *content = [NSString stringWithFormat:@"[%@] %@.%@", date, className, funtionName];
            NSString *current = [self contentTextWithConten:content indent:2];
            strongself.textView.text = [showString stringByAppendingFormat:@"%@", current];
        };
    }
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
