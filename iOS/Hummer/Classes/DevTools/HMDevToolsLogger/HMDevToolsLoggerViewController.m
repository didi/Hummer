//
//  HMDevToolsLoggerViewController.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsLoggerViewController.h"
#import "HMJSContext.h"
#import "HMDevToolsLoggerCell.h"
#import "HMDevToolsLogger.h"

@interface HMDevToolsLoggerViewController ()<UITableViewDelegate, UITableViewDataSource>

@property (nonatomic, strong) UITableView *tableView;
@property (nonatomic, copy) NSMutableArray<HMDevToolsLogger *> *dataArray;

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

#pragma mark - Setter

- (void)setContext:(HMJSContext *)context {
    if ([_context isEqual:context]) {
        return;
    }
    _context = context;
    [_dataArray removeAllObjects];
    [_tableView reloadData];
    
    __weak typeof(self) weakSelf = self;
    _context.context.consoleHandler = ^(NSString * _Nullable logString, HMLogLevel logLevel) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        HMDevToolsLogger *logger = HMDevToolsLogger.new;
        static NSDateFormatter *formatter;
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
          formatter = NSDateFormatter.new;
          formatter.dateFormat = @"HH:mm:ss.SSS";
        });
        
        NSString *date = [formatter stringFromDate:NSDate.date];

        logger.logString = [NSString stringWithFormat:@"[%@] %@", date, logString];
        logger.logLevel = logLevel;
        logger.expended = NO;
        [strongSelf.dataArray addObject:logger];
        [strongSelf.tableView reloadData];
    };
}

#pragma mark - UITableViewDataSource & UITableViewDelegate

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.dataArray.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    HMDevToolsLoggerCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Logger"];
    HMDevToolsLogger *data = self.dataArray[indexPath.row];
    [cell renderCellWithLogger:data];
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    HMDevToolsLogger *logger = self.dataArray[indexPath.row];
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
    HMDevToolsLogger *logger = self.dataArray[indexPath.row];
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

- (NSMutableArray *)dataArray {
    if (!_dataArray) {
        _dataArray = NSMutableArray.array;
    }
    return _dataArray;
}

@end
