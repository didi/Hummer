//
//  HMWebImageLoader.m
//  Hummer
//
//  Created by didi on 2020/11/18.
//

#import "HMWebImageLoader.h"
#import "NSURL+Hummer.h"
#import "HMUtility.h"
#import "HMImageDownloadOperation.h"
#import "HMImageDownLoadToken.h"

@interface HMWebImageLoader()<NSURLSessionTaskDelegate>

@property (nonatomic, strong) NSURLSession *session;
@property (nonatomic, strong) NSOperationQueue *downloadQueue;
@property (strong, nonatomic) NSMutableDictionary<NSURL *, HMImageDownloadOperation *> *URLOperations;

@property (strong, nonatomic, nullable) NSMutableDictionary<NSString *, NSString *> *HTTPHeaders;
@property (nonatomic, strong) dispatch_semaphore_t lock;

@end

@implementation HMWebImageLoader

- (instancetype)init {
    self = [super init];
    if (self) {
        [self setup];
    }
    return self;
}

- (void)setup {
    
    NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
    self.session = [NSURLSession sessionWithConfiguration:config delegate:self delegateQueue:nil];
    self.downloadQueue = [[NSOperationQueue alloc] init];
    self.downloadQueue.maxConcurrentOperationCount = 5;
    self.downloadQueue.name = @"com.hummer.imagedownload.queue";
    self.lock = dispatch_semaphore_create(1);
    
    NSMutableDictionary<NSString *, NSString *> *headerDictionary = [NSMutableDictionary dictionary];
    NSString *userAgent = nil;
    // User-Agent Header; see http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.43
    userAgent = [NSString stringWithFormat:@"%@/%@ (iPhone; iOS %@; Scale/%0.2f)", [[NSBundle mainBundle] infoDictionary][(__bridge NSString *)kCFBundleExecutableKey] ?: [[NSBundle mainBundle] infoDictionary][(__bridge NSString *)kCFBundleIdentifierKey], [[NSBundle mainBundle] infoDictionary][@"CFBundleShortVersionString"] ?: [[NSBundle mainBundle] infoDictionary][(__bridge NSString *)kCFBundleVersionKey], [[UIDevice currentDevice] systemVersion], [[UIScreen mainScreen] scale]];
    
    if (userAgent) {
        if (![userAgent canBeConvertedToEncoding:NSASCIIStringEncoding]) {
            NSMutableString *mutableUserAgent = [userAgent mutableCopy];
            if (CFStringTransform((__bridge CFMutableStringRef)(mutableUserAgent), NULL, (__bridge CFStringRef)@"Any-Latin; Latin-ASCII; [:^ASCII:] Remove", false)) {
                userAgent = mutableUserAgent;
            }
        }
        headerDictionary[@"User-Agent"] = userAgent;
    }
    headerDictionary[@"Accept"] = @"image/*,*/*;q=0.8";
    self.HTTPHeaders = headerDictionary;
    self.URLOperations = [NSMutableDictionary new];
}

- (id<HMURLConvertible>)fixLoadSource:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource{
    
    NSURL *url = [source hm_asUrl];
    if (!url) {return nil;}
    if ((url.host.length > 0) && (url.scheme.length <= 0)) {
        NSURLComponents *urlComponents = [NSURLComponents componentsWithURL:url resolvingAgainstBaseURL:YES];
        if (urlComponents) {
            urlComponents.scheme = @"https";
            url = urlComponents.URL;
        }
    }
    if ([[source hm_asString] hasPrefix:@"."] && [[bundleSource hm_asString] hasPrefix:@"http"]) {
        NSURL *bundleUrl = [bundleSource hm_asUrl];
        NSURL *newImageUrl = [NSURL URLWithString:[source hm_asString] relativeToURL:bundleUrl];
        return newImageUrl;
    }
    return url;
}

- (BOOL)canLoad:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource{
    NSURL *url = [source hm_asUrl];
    //http or https
    if ([url.scheme hasPrefix:@"http"]) {
        return YES;
    }
    // //host.com/....   http without scheme
    if ((url.host.length > 0) && (url.scheme.length <= 0)) {
        return YES;
    }
    // relative url
    if ([[source hm_asString] hasPrefix:@"."] && [[bundleSource hm_asString] hasPrefix:@"http"]) {
        return YES;
    }
    return NO;
}

- (nullable id<HMImageLoaderOperation>)load:(id<HMURLConvertible>)source
                           inJSBundleSource:(id<HMURLConvertible>)bundleSource
                                    context:(nullable HMImageLoaderContext *)context
                                 completion:(nonnull HMImageLoaderCompletionBlock)completionBlock{
    
    NSURL *imageUrl = [[self fixLoadSource:source inJSBundleSource:bundleSource] hm_asUrl];
    if (!imageUrl) {return nil;}
    id cancelToken = nil;
    /**
     * 保证 下载任务+解码任务 完成之前，operation 处于进行中状态。
     * 除此之外，保证在写入缓存之前，下一次同url 任务不被下载：在主线程 触发下载回调
     * 1. 下一次同url 执行，晚于异步主线程回调，此为正常现象。
     * 2. 下一次同url 执行，早于异步主线程回调，而 completionBlock 在异步触发，则可能导致重复下载。
     * 由于2的缘故，需要把 finish 操作也放在主线程。但实际 operation.completionBlock 仍在子线程，只不过保证了缓存设置早于 finish。
     */
    HM_LOCK(self.lock);
    HMImageDownloadOperation *operation = [self.URLOperations objectForKey:imageUrl];
    if (!operation || operation.isFinished || operation.isCancelled) {
        operation = [self createOperationForUrl:imageUrl context:context];
        self.URLOperations[imageUrl] = operation;
        __weak typeof(self) wself = self;
        operation.completionBlock = ^{
            HM_LOCK(self.lock);
            [wself.URLOperations removeObjectForKey:imageUrl];
            HM_UNLOCK(self.lock);
        };
        cancelToken = [operation addHandlersForCompleted:completionBlock];
        [self.downloadQueue addOperation:operation];
    }else{
        @synchronized (operation) {
            cancelToken = [operation addHandlersForCompleted:completionBlock];
        }
    }
    HM_UNLOCK(self.lock);
    HMImageDownLoadToken *token = [[HMImageDownLoadToken alloc] init];
    token.token = cancelToken;
    token.downLoadOperation = operation;
    return token;
}

#pragma mark <NSURLSessionTaskDelegate>

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveResponse:(NSURLResponse *)response completionHandler:(void (^)(NSURLSessionResponseDisposition disposition))completionHandler {
    
    HMImageDownloadOperation *operation = [self operationForTask:dataTask];
    [operation URLSession:session dataTask:dataTask didReceiveResponse:response completionHandler:completionHandler];
}

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveData:(NSData *)data {
    HMImageDownloadOperation *operation = [self operationForTask:dataTask];
    [operation URLSession:session dataTask:dataTask didReceiveData:data];
}

- (void)URLSession:(NSURLSession *)session task:(nonnull NSURLSessionTask *)task didCompleteWithError:(nullable NSError *)error {
    HMImageDownloadOperation *operation = [self operationForTask:task];
    [operation URLSession:session task:task didCompleteWithError:error];
}

#pragma mark <private>
- (nullable HMImageDownloadOperation *)operationForTask:(NSURLSessionTask *)task{
    
    NSArray *operations = [self.downloadQueue operations];
    HMImageDownloadOperation *target = nil;
    for (HMImageDownloadOperation *operation in operations) {
        @synchronized (operation) {
            if (operation.dataTask.taskIdentifier == task.taskIdentifier) {
                target = operation;
                break;
            }
        }
    }
    return target;
}

- (HMImageDownloadOperation *)createOperationForUrl:(NSURL *)url context:(nullable HMImageLoaderContext *)context {

    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url];
    request.allHTTPHeaderFields = self.HTTPHeaders;
    request.HTTPShouldUsePipelining = YES;
    HMImageDownloadOperation *operation = [[HMImageDownloadOperation alloc] initWithRequest:request inSession:self.session context:context];
    return operation;
}
@end
