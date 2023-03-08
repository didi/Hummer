//
//  HMImageDownloadOperation.m
//  Hummer
//
//  Created by didi on 2020/11/24.
//

#import "HMImageDownloadOperation.h"
#import "HMUtility.h"
#import "HMImageCoderManager.h"

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
@property (nonatomic, strong) UIImage *image;

@property (nonatomic, strong) NSURLRequest *request;

@property (nonatomic, strong) HMImageLoaderContext *context;

@property (nonatomic, strong) NSMutableArray <HMImageDownloadCallBackPair<NSString *,HMImageDownloaderCompletedBlock> *>*callbackBlocks;
@end


@implementation HMImageDownloadOperation
@synthesize executing = _executing;
@synthesize finished = _finished;

- (instancetype)initWithRequest:(NSURLRequest *)request inSession:(NSURLSession *)session context:(nullable HMImageLoaderContext *)context{
    
    self = [super init];
    if (self) {
        _context = context;
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
// 主线程
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
    
    @synchronized(self) {
        if (self.isFinished) return;
        self.dataTask = nil;
    }
    if (error || self.responseError) {
        self.responseError = self.responseError ? self.responseError : error;
        NSError *err = [self.responseError copy];
        [self notifyComplete:nil UIImage:nil error:err];
        [self done];
    }else{

        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            NSData *data = [self.imageData copy];
            BOOL needDecoder = ![self.context[HMImageContextImageDoNotDecode] boolValue];
            if(needDecoder){
                self.image = HMImageLoaderDecodeImageData(data, self.request.URL ,self.context);
            }
            self.responseError = self.image?nil:HM_IMG_DECODE_ERROR;
            if (self.image || data) {
                UIImage *image = [self.image copy];
                [self notifyComplete:data UIImage:image error:nil];
            }else{
                [self notifyComplete:nil UIImage:nil error:HM_IMG_DECODE_ERROR];
            }
            @synchronized (self) {
                [self done];
            }
        });
    }
}

#pragma mark <public>
// 主线程调用。保证 operation 和主线程
- (nonnull id)addHandlersForCompleted:(nullable HMImageDownloaderCompletedBlock)completedBlock{
    HMImageDownloadCallBackPair *callBackPair = [HMImageDownloadCallBackPair new];
    if (completedBlock) callBackPair[kCompletedCallbackKey] = completedBlock;
    @synchronized (self) {
        [self.callbackBlocks addObject:callBackPair];
        if (self.isFinished) {
//            HMAssert(NO,@"添加已完成的下载任务。");
            NSData *data = [self.imageData copy];
            UIImage *image = [self.image copy];
            NSError *err = [self.responseError copy];
            [self notifyComplete:data UIImage:image error:err];
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
                completedBlock(nil, nil, [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorCancelled userInfo:@{NSLocalizedDescriptionKey : @"Operation cancelled by user during sending the request"}]);
            }
        });
    }
    return shouldCancel;
}

#pragma mark <private>
- (void)callCompletionBlocksWithError:(nullable NSError *)error {
    [self notifyComplete:nil UIImage:nil error:error];
}

- (void)notifyComplete:(nullable NSData *)imageData UIImage:(UIImage *)image error:(nullable NSError *)error {
    NSMutableArray *blocks = nil;
    @synchronized (self) {
        blocks = [self.callbackBlocks mutableCopy];
        [self.callbackBlocks removeAllObjects];
    }
    hm_safe_main_thread(^{
        for (HMImageDownloadCallBackPair *pair in blocks) {
             HMImageDownloaderCompletedBlock callback = pair[kCompletedCallbackKey];
             callback(image, imageData, error);
        }
    });

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
