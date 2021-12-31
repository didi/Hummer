//
//  HMDevToolsHierarchyViewController.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsHierarchyViewController.h"
#import "HMDevToolsHierarchyCell.h"
#import "HMJSContext.h"
#import "HMDevToolsHierarchyHelper.h"

@interface HMDevToolsHierarchyViewController ()

@property (nonatomic) UIView *rootView;
@property (nonatomic) NSArray<UIView *> *allViews;
@property (nonatomic) NSMapTable<UIView *, NSNumber *> *depthsForViews;
@property (nonatomic) NSArray<UIView *> *viewsAtTap;
@property (nonatomic) NSArray<UIView *> *displayedViews;

@end

@implementation HMDevToolsHierarchyViewController
@synthesize context = _context;

+ (instancetype)hierarchyViewWithRootView:(UIView *)rootView {
    return [[self alloc] initWithRootView:rootView];
}

- (instancetype)initWithRootView:(UIView *)rootView {
    if (self = [super initWithStyle:UITableViewStylePlain]) {
        _rootView = rootView;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.clearsSelectionOnViewWillAppear = NO;
    [self.tableView registerClass:HMDevToolsHierarchyCell.class forCellReuseIdentifier:@"HierarchyCell"];
    self.tableView.rowHeight = 50.f;
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    self.tableView.separatorInset = UIEdgeInsetsZero;
    self.tableView.backgroundColor = [UIColor.whiteColor colorWithAlphaComponent:0.9];
}

- (void)setContext:(HMJSContext *)context {
    _context = context;
    _rootView = context.rootView;
}

- (void)refresh {
    [self configData];
    [self.tableView reloadData];
}

#pragma mark - private
- (void)configData {
    _allViews = [HMDevToolsHierarchyHelper viewWithRecursiveSubviews:_rootView];
    _depthsForViews = [HMDevToolsHierarchyHelper hierarchyDepthsForViews:_allViews];
    _displayedViews = _allViews.copy;
}
#pragma mark - Table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.displayedViews.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    HMDevToolsHierarchyCell *cell = [tableView dequeueReusableCellWithIdentifier:@"HierarchyCell" forIndexPath:indexPath];
    
    UIView *view = self.displayedViews[indexPath.row];

    cell.textLabel.text = [HMDevToolsHierarchyHelper descriptionForView:view includingFrame:NO];
    cell.detailTextLabel.text = [HMDevToolsHierarchyHelper detailDescriptionForView:view];
    cell.randomColorTag = [HMDevToolsHierarchyHelper consistentRandomColorForObject:view];
    cell.viewDepth = [self.depthsForViews objectForKey:view].integerValue;
    cell.indicatedViewColor = view.backgroundColor;

    if (@available(iOS 13.0, *)) {
        if (view.isHidden || view.alpha < 0.01) {
            cell.textLabel.textColor = UIColor.secondaryLabelColor;
            cell.detailTextLabel.textColor = UIColor.secondaryLabelColor;
        } else {
            cell.textLabel.textColor = UIColor.labelColor;
            cell.detailTextLabel.textColor = UIColor.labelColor;
        }
    }
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    // 点击后行为
}

@end
