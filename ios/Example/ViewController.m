//
//  ViewController.m
//  Demo
//
//  Created by huangjy on 2018/5/11.
//  Copyright © 2018年 didi. All rights reserved.
//

#import "ViewController.h"
#import <Hummer/HMViewController.h>
#import "Hummer.h"

@interface ViewController () <UITableViewDelegate, UITableViewDataSource>
@property (nonatomic, strong) UITableView* tableView;
@property (nonatomic, strong) NSArray* dataSource;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // this is not app store safe, so do not include this in your release build!
    UITableView* tableView = [[UITableView alloc] initWithFrame:self.view.frame];
    tableView.dataSource = self;
    tableView.delegate = self;
    [self.view addSubview:tableView];
    self.tableView = tableView;
    
    [self loadFiles];
}

- (void)viewDidLayoutSubviews {
    self.tableView.frame = self.view.bounds;
}
- (void)loadFiles
{
    __weak typeof(self) weakSelf = self;
    [self getFilesWithCompletion:^(NSError *error, NSArray *files) {
        NSMutableArray *array = [NSMutableArray array];
        for(NSString *file in files){
            NSString *url = [NSString stringWithFormat:@"http://localhost:9292/%@",file];
            NSString *name = [[file componentsSeparatedByString:@"."] firstObject];
            [array addObject:@[name, url]];
        }
        weakSelf.dataSource = array;
        [weakSelf.tableView reloadData];
    }];
}

- (void)getFilesWithCompletion:(void(^)(NSError *error, NSArray *files))completion
{
    [HMJavaScriptLoader loadBundleWithURL:[NSURL URLWithString:@"http://localhost:9292/all_files"] onProgress:nil onComplete:^(NSError *error, HMDataSource *source) {
        NSArray *files = nil;
        if(!error) files = [NSJSONSerialization JSONObjectWithData:source.data options:0 error:nil];
        if(completion) completion(error, files);
    }];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return  self.dataSource.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString* identifier = @"identify";
    UITableViewCell *cell = [self.tableView dequeueReusableCellWithIdentifier:identifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:identifier];
        cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    }
    
    cell.textLabel.text = self.dataSource[indexPath.row][0];
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    HMViewController *vc = [[HMViewController alloc] initWithURL:self.dataSource[indexPath.row][1] params:nil];    
    [self.navigationController pushViewController:vc animated:YES];
}

@end
