//
//  HMDevToolsLoggerViewController.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsLoggerViewController.h"
#import "HMJSContext.h"
#import "HMExceptionModel.h"
#import "HMDevToolsLoggerCell.h"
#import "HMDevToolsLogger.h"
#import "HMDevToolsLoggerVCModel.h"

@interface HMDevToolsLoggerViewController ()<UITableViewDelegate, UITableViewDataSource>
@property (nonatomic, strong) UITableView *tableView;
@end

@implementation HMDevToolsLoggerViewController
@synthesize context = _context;

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.view addSubview:self.tableView];
    UILayoutGuide *guide = self.view.layoutMarginsGuide;
    [NSLayoutConstraint activateConstraints:@[
        [self.tableView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
        [self.tableView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
        [self.tableView.topAnchor constraintEqualToAnchor:guide.topAnchor],
        [self.tableView.bottomAnchor constraintEqualToAnchor:guide.bottomAnchor]
    ]];
}

- (void)reloadData {
    // 可优化
    
    [_tableView reloadData];
    
    NSIndexPath *path = [NSIndexPath indexPathForRow:self.vcModel.dataArray.count - 1  inSection:0];
    if (!path) {
        return;
    }
    
    [_tableView scrollToRowAtIndexPath:path atScrollPosition:UITableViewScrollPositionBottom animated:NO];
          
}

#pragma mark - Setter

- (void)setContext:(HMJSContext *)context {
    if ([_context isEqual:context]) {
        return;
    }
    
    _context = context;
    
    [self.vcModel reset];
    [self reloadData];
}

#pragma mark - UITableViewDataSource & UITableViewDelegate

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.vcModel.dataArray.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    HMDevToolsLoggerCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Logger"];
    HMDevToolsLogger *data = self.vcModel.dataArray[indexPath.row];
    [cell renderCellWithLogger:data];
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    HMDevToolsLogger *logger = self.vcModel.dataArray[indexPath.row];
    logger.expended = !logger.expended;
    [tableView reloadData];
}

- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    return YES;
}

- (NSString *)tableView:(UITableView *)tableView titleForDeleteConfirmationButtonForRowAtIndexPath:(NSIndexPath *)indexPath {
    return @"复制";
}

- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    HMDevToolsLogger *logger = self.vcModel.dataArray[indexPath.row];
    NSString *content = logger.logString;
    if (content.length > 0) {
        UIPasteboard *pboard = UIPasteboard.generalPasteboard;
        pboard.string = content;
    }
}

#pragma mark - Getter

- (UITableView *)tableView {
    if (!_tableView) {
        _tableView = UITableView.new;
        _tableView.delegate = self;
        _tableView.dataSource = self;
        _tableView.translatesAutoresizingMaskIntoConstraints = NO;
        _tableView.backgroundColor = [UIColor.whiteColor colorWithAlphaComponent:0.9];
        _tableView.tableFooterView = UIView.new;
        [_tableView registerClass:HMDevToolsLoggerCell.class forCellReuseIdentifier:@"Logger"];
    }
    return _tableView;
}

@end
