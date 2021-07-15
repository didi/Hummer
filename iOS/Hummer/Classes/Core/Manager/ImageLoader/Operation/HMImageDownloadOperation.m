//
//  HMImageDownloadOperation.m
//  Hummer
//
//  Created by didi on 2020/11/24.
//

#import "HMImageDownloadOperation.h"
#import "HMUtility.h"

static NSString *const kCompletedCallbackKey = @"completed";

@interface HMImageDownloadOperation()

//kvo
@property (assign, nonatomic, getter = isExecuting) BOOL executing;
@property (assign, nonatomic, getter = isFinished) BOOL finished;

@property (nonatomic, weak) NSURLSession *session;
@property (strong, nonatomic, readwrite, nullable) NSURLSessionTask *dataTask;

//for progress
@property (nonatomic, assign) long long expectedSize; // may be 0
@property (nonatomic, assign) long long receivedSize;

@property (nonatomic, strong) NSURLResponse *response;
@property (strong, nonatomic, nullable) NSError *responseError;

@property (nonatomic, strong) NSMutableData *imageData;
@property (nonatomic, strong) NSURLRequest *request;

@property (nonatomic, strong) NSMutableArray <HMImageDownloadCallBackPair<NSString *,HMImageDownloaderCompletedBlock> *>*callbackBlocks;
@end


@implementation HMImageDownloadOperation
@synthesize executing = _executing;
@synthesize finished = _finished;

- (instancetype)initWithRequest:(NSURLRequest *)request inSession:(NSURLSession *)session {
    
    self = [super init];
    if (self) {
        _session = session;
        _request = request;
        _expectedSize = 0;
        _receivedSize = 0;
        _callbackBlocks = [NSMutableArray new];
    }
    return self;
}

- (void)start {
    @synchronized (self) {
        if (self.isCancelled) {
            self.finished = YES;
            // Operation cancelled by user before sending the request
            [self callCompletionBlocksWithError:[NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorCancelled userInfo:@{NSLocalizedDescriptionKey : @"Operation cancelled by user before sending the request"}]];
            [self reset];
            return;
        }
        self.dataTask = [self.session dataTaskWithRequest:self.request];
        self.executing = YES;
        
        if (self.dataTask) {
            [self.dataTask resume];
        } else {
            [self callCompletionBlocksWithError:[NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorInvalidDownloadOperation userInfo:@{NSLocalizedDescriptionKey : @"Task can't be initialized"}]];
            [self done];
        }
    }
}

- (void)cancel {
    @synchronized (self) {
        [self cancelInternal];
    }
}

- (void)cancelInternal {
    
    if (self.isFinished) return;
    [super cancel];
    if (self.dataTask) {
        [self.dataTask cancel];
        // As we cancelled the task, its callback won't be called and thus won't
        // maintain the isFinished and isExecuting flags.
        if (self.isExecuting) self.executing = NO;
        if (!self.isFinished) self.finished = YES;
    } else {
        // Operation cancelled by user during sending the request
        [self callCompletionBlocksWithError:[NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorCancelled userInfo:@{NSLocalizedDescriptionKey : @"Operation cancelled by user during sending the request"}]];
    }
    [self reset];
}

- (void)setFinished:(BOOL)finished {
    [self willChangeValueForKey:@"isFinished"];
    _finished = finished;
    [self didChangeValueForKey:@"isFinished"];
}

- (void)setExecuting:(BOOL)executing {
    [self willChangeValueForKey:@"isExecuting"];
    _executing = executing;
    [self didChangeValueForKey:@"isExecuting"];
}

#pragma mark NSURLSessionDataDelegate

- (void)URLSession:(__unused NSURLSession *)session
          dataTask:(__unused NSURLSessionDataTask *)dataTask
didReceiveResponse:(NSURLResponse *)response
 completionHandler:(void (^)(NSURLSessionResponseDisposition disposition))completionHandler {
    
    NSURLSessionResponseDisposition disposition = NSURLSessionResponseAllow;
    BOOL valid = YES;
    NSInteger statusCode = [response respondsToSelector:@selector(statusCode)] ? ((NSHTTPURLResponse *)response).statusCode : 200;
    // Status code should between [200,400)
    BOOL statusCodeValid = statusCode >= 200 && statusCode < 400;
    if (!statusCodeValid) {
        valid = NO;
        self.responseError = [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorInvalidDownloadStatusCode userInfo:@{NSLocalizedDescriptionKey : @"Download marked as failed because response status code is not in 200-400", HMWebImageErrorDownloadStatusCodeKey : @(statusCode)}];
    }
    if (!valid) {
        disposition = NSURLSessionResponseCancel;
    }
    NSInteger expected = (NSInteger)response.expectedContentLength;
    expected = expected > 0 ? expected : 0;
    self.expectedSize = expected;
    self.response = response;
    if (completionHandler) {
        completionHandler(disposition);
    }
}

- (void)URLSession:(__unused NSURLSession *)session dataTask:(__unused NSURLSessionDataTask *)dataTask didReceiveData:(NSData *)data {
    if (!self.imageData) {
        self.imageData = [NSMutableData new];
    }
    [self.imageData appendData:data];
    /* for progress callback*/
}

- (void)URLSession:(__unused NSURLSession *)session task:(nonnull NSURLSessionDataTask *)task didCompleteWithError:(nullable NSError *)error {
    
    if (self.isFinished) return;    
    @synchronized(self) {
        self.dataTask = nil;
    }
    if (error || self.responseError) {
        self.responseError = self.responseError ? self.responseError : error;
        NSError *err = [self.responseError copy];
        [self notifyComplete:nil error:err];
    }else{
        
        NSData *data = [self.imageData copy];
        [self notifyComplete:data error:nil];
    }
    [self done];
}

#pragma mark <public>
- (nonnull id)addHandlersForCompleted:(nullable HMImageDownloaderCompletedBlock)completedBlock{
    HMImageDownloadCallBackPair *callBackPair = [HMImageDownloadCallBackPair new];
    if (completedBlock) callBackPair[kCompletedCallbackKey] = completedBlock;
    @synchronized (self) {
        [self.callbackBlocks addObject:callBackPair];
        if (self.isFinished) {
//            HMAssert(NO,@"添加已完成的下载任务。");
            NSData *data = [self.imageData copy];
            NSError *err = [self.responseError copy];
            [self notifyComplete:data error:err];
        }
    }
    return callBackPair;
}

- (BOOL)cancel:(id)token {
    
    BOOL shouldCancel = NO;
    @synchronized (self) {
        [self.callbackBlocks removeObjectIdenticalTo:token];
        if (self.callbackBlocks.count == 0) {
            shouldCancel = YES;
        }
    }
    if (shouldCancel) {
        // Cancel operation running and callback last token's completion block
        [self cancel];
    }else{
        // Only callback this token's completion block
        HMImageDownloaderCompletedBlock completedBlock = [token valueForKey:kCompletedCallbackKey];
        hm_safe_main_thread(^{
            if (completedBlock) {
                completedBlock(nil, nil, HMImageCacheTypeNone, [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorCancelled userInfo:@{NSLocalizedDescriptionKey : @"Operation cancelled by user during sending the request"}]);
            }
        });
    }
    return shouldCancel;
}

#pragma mark <private>
- (void)callCompletionBlocksWithError:(nullable NSError *)error {
    [self notifyComplete:nil error:error];
}

- (void)notifyComplete:(nullable NSData *)imageData error:(nullable NSError *)error {
    NSMutableArray *blocks = nil;
    @synchronized (self) {
        blocks = [self.callbackBlocks mutableCopy];
        [self.callbackBlocks removeAllObjects];
    }
    for (HMImageDownloadCallBackPair *pair in blocks) {
         HMImageDownloaderCompletedBlock callback = pair[kCompletedCallbackKey];
         callback(imageData, imageData?YES:NO, HMImageCacheTypeNone, error);
    }
}

- (void)done {
    self.finished = YES;//operation completion block
    self.executing = NO;//session queue 继续执行
    [self reset];
}

- (void)reset {
    @synchronized (self) {
        self.dataTask = nil;
    }
}

@end
