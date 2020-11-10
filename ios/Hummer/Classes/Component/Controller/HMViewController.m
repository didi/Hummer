//
//  HMViewController.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMViewController.h"
#import "Hummer.h"
#import "HMJSGlobal.h"
#import "HMJSContext.h"
#import "HMBaseValue.h"
#import "HMBaseWeakValue.h"

#if __has_include("SRWebSocket.h")
#import "SRWebSocket.h"
#endif

NSString *const onCreateFunc = @"onCreate";
NSString *const onAppearFunc = @"onAppear";
NSString *const onDisappearFunc = @"onDisappear";
NSString *const onDestroyFunc = @"onDestroy";

@interface HMViewController ()

@property (nonatomic, strong) UIView *naviView;
@property (nonatomic, strong) UIView *hmRootView;

@property (nonatomic, weak) HMJSContext  *context;
@property (nonatomic, weak) UIView * pageView;

@property (nonatomic, assign) BOOL calledMountedFunc;

@property (nonatomic, strong) NSMutableArray *mountedFunc;

@end

@implementation HMViewController

+ (instancetype)hmxPageControllerWithURL:(NSString *)URL
                                  params:(NSDictionary *)params {
    if (!URL) {
        return nil;
    }
    return [[self alloc] initWithURL:URL params:params];
}

- (instancetype)initWithURL:(NSString *)URL
                     params:(NSDictionary *)params {
    if (self = [super init]) {
        self.URL = URL ;
        self.params = params;
    }
    return self;
}

- (void)addCustomNavigationView:(UIView *)customNaviView {
    if (nil == customNaviView) {
        return;
    }
    
    [self.naviView removeFromSuperview];
    [self.view addSubview:customNaviView];
    self.naviView = customNaviView;
    
    CGFloat naviHeight = self.naviView ? CGRectGetHeight(self.naviView.frame) : 0;
    CGFloat hmHeight = CGRectGetHeight(self.view.bounds) - naviHeight;
    CGFloat hmWidth = CGRectGetWidth(self.view.bounds);
    
    CGRect containerFrame = CGRectMake(0, naviHeight, hmWidth, hmHeight);
    self.hmRootView.frame = containerFrame;
}

- (void)initHMRootView {
    /** hummer渲染view */
    self.hmRootView = [[UIView alloc] initWithFrame:self.view.bounds];
    self.hmRootView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    [self.view addSubview:self.hmRootView];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.mountedFunc = [[NSMutableArray alloc] init];
    [self.mountedFunc addObject:onCreateFunc];
    [self.mountedFunc addObject:onAppearFunc];
    self.view.backgroundColor = [UIColor whiteColor];
    self.automaticallyAdjustsScrollViewInsets = NO;
    
    [self initHMRootView];
    
    if (!self.hm_pageID.length) {
        self.hm_pageID = @([self hash]).stringValue;
    }
    
    if ([[NSURL URLWithString:self.URL].pathExtension containsString:@"js"] && ([self.URL hasPrefix:@"http"] ||[self.URL hasPrefix:@"https"]))
    {// hummer js 模式加载
        __weak typeof(self)weakSelf = self;
        [HMJavaScriptLoader loadBundleWithURL:[NSURL URLWithString:self.URL] onProgress:^(HMLoaderProgress *progressData) {
        } onComplete:^(NSError *error, HMDataSource *source) {
            __strong typeof(self) self = weakSelf;
            if (!error) {
                HMExecOnMainQueue(^{
                    NSString *script = [[NSString alloc] initWithData:source.data encoding:NSUTF8StringEncoding];
                    [self renderWithScript:script];
                });
            }
        }];
    }else {  //hummer 离线包模式加载
        NSString * script = HM_SafeRunBlock(self.loadBundleJSBlock,self.URL);
        [self renderWithScript:script];
    }
}

#pragma mark -渲染脚本

- (void)renderWithScript:(NSString *)script {
    if (script.length == 0) {
        return;
    }
    
    //设置页面参数
    NSMutableDictionary * pData = [NSMutableDictionary dictionary];
    if (self.URL) {
        pData[@"url"]=self.URL;
    }
    pData[@"params"] = self.params ?: @{};
    HMJSGlobal.globalObject.pageInfo = pData;
    
    //渲染脚本之前 注册bridge
    HMJSContext *context = [HMJSContext contextInRootView:self.hmRootView];
    __weak typeof(self) wSelf = self;
    context.renderCompletion = ^{
        //发送加载完成消息
        wSelf.pageView = wSelf.hmRootView.subviews.firstObject;
        wSelf.context = [[HMJSGlobal globalObject] currentContext:wSelf.pageView.hm_value.executor];
        [wSelf checkMountedFunc];
    };

    HM_SafeRunBlock(self.registerJSBridgeBlock,context);
    
    //执行脚本
    [context evaluateScript:script fileName:self.URL];
    

}

- (void)checkMountedFunc {
    while (self.mountedFunc.count>0) {
        
        NSString *funcName = self.mountedFunc.firstObject;
        [self callJSWithFunc:funcName arguments:@[]];
        [self.mountedFunc removeObjectAtIndex:0];
    }
}

#pragma mark - View 生命周期管理
/**
 * onAppear onCreate的调用需要依赖js环境。
 * 但是onDisappear 和 onDestroy 不需要
 */
- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    [self checkMountedFunc];
}

- (void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];
    if (self.context.componentView) {
        if (![self.mountedFunc containsObject:onAppearFunc]) {
            [self.mountedFunc addObject:onAppearFunc];
        }
    }
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    [self callJSWithFunc:onDisappearFunc arguments:@[]];
}

- (void)didMoveToParentViewController:(UIViewController *)parent {
    if (!parent) {
        id pageResult = nil;
        HMBaseValue *jsPageResult = [self.context evaluateScript:@"Hummer.pageResult" fileName:nil];
        pageResult = [jsPageResult.executor convertValueToPortableObject:jsPageResult];
        HM_SafeRunBlock(self.hm_dismissBlock,pageResult);
    }
}

- (void)dealloc {
    [self callJSWithFunc:onDestroyFunc arguments:@[]];
}

#pragma mark - Call Hummer

- (nullable HMBaseValue *)callJSWithFunc:(NSString *)func arguments:(NSArray *)arguments{
    HMBaseValue * page = (HMBaseValue *)self.pageView.hm_value;
    return [page callWithFunctionName:func arguments:arguments];
}

#ifdef DEBUG
#if __has_include("SRWebSocket.h")

- (void)openWebSocketWithUrl:(NSString *)wsURLStr
{
    if (wsURLStr.length == 0) {
        return;
    }
    
    NSURL *wsURL = [NSURL URLWithString:wsURLStr];
    if (wsURL) {
        SRWebSocket *webSocket = [[SRWebSocket alloc] initWithURL:wsURL];
        webSocket.delegate = self;
        [webSocket open];
    }
}

#pragma mark - SRWebSocketDelegate

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message {
    id object = _HMObjectFromJSONString(message);
    if ([object isKindOfClass:[NSDictionary class]]) {
        NSString *URLString = [object valueForKey:@"params"];
        NSURL * URL  = [NSURL URLWithString:URLString];
        if (!URL) {
            return;
        }
        
        [self callJSWithFunc:@"onDestroy" arguments:@[]];
        [self.hmRootView.subviews enumerateObjectsUsingBlock:^(__kindof UIView * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            [obj removeFromSuperview];
        }];
        
        __weak typeof(self)weakSelf = self;
        [HMJavaScriptLoader loadBundleWithURL:URL onProgress:^(HMLoaderProgress *progressData) {
        } onComplete:^(NSError *error, HMDataSource *source) {
            __strong typeof(self) self = weakSelf;
            if (!error) {
                HMExecOnMainQueue(^{
                    NSString *script = [[NSString alloc] initWithData:source.data encoding:NSUTF8StringEncoding];
                    [self renderWithScript:script];
                });
            }
        }];
    }
    NSLog(@"----->>> %@", message);
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket {
    NSLog(@"----->>> %@", @"webSocketDidOpen");
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error {
    NSLog(@"----->>> %@", error.localizedFailureReason);
}

#endif
#endif

@end
