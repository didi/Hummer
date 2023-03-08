//
//  HMUtility.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <objc/runtime.h>
#import <CommonCrypto/CommonDigest.h>
#import "HMConfig.h"
#import "HMConverter.h"
#import "HMSourceParser.h"
#import "HMContainerModel.h"

void _HMAssert(NSString *func, NSString *file, int lineNum, NSString *format, ...) {
    va_list args;
    va_start(args, format);
    NSString *message = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);
    
    [[NSAssertionHandler currentHandler] handleFailureInFunction:func
                                                            file:file
                                                      lineNumber:lineNum
                                                     description:@"%@", message];
}

NSString *_HMMD5String(NSString *input) {
    if (!input || ![input isKindOfClass:[NSString class]] || [input length] <= 0) return nil;
    
    const char* str = [input UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH] = {0};
    CC_MD5(str, (uint32_t)strlen(str), result);
    NSMutableString *ret = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH];
    
    for (int i = 0; i < CC_MD5_DIGEST_LENGTH; i++) {
        [ret appendFormat:@"%02X",result[i]];
    }
    return ret;
}

NSString *_HMMD5Data(NSData *input) {
    if (!input || ![input isKindOfClass:[NSData class]] || [input length] <= 0) return nil;
    
    unsigned char md5Buffer[CC_MD5_DIGEST_LENGTH] = {0};
    CC_MD5(input.bytes, (CC_LONG)input.length, md5Buffer);
    
    NSMutableString* output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH];
    for (int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
        [output appendFormat:@"%02x", md5Buffer[i]];
    
    return output;
}

id _HMObjectFromJSONString(NSString *json) {
    if(!json) return nil;
    NSData *data = [json dataUsingEncoding:NSUTF8StringEncoding];
    if(data){
        NSError *error = nil;
        NSJSONReadingOptions options = NSJSONReadingMutableLeaves |
                                       NSJSONReadingMutableContainers |
                                       NSJSONReadingMutableContainers;
        id object = [NSJSONSerialization JSONObjectWithData:data
                                                    options:options
                                                      error:&error];
        if(error){
            HMLogError(@"json序列化失败, %@", [error description]);
        }
        return object;
    }
    
    return nil;
}

id _HMObjectFromJSONData(NSData *json) {
    if(!json) return nil;
    
    NSError *error = nil;
    NSJSONReadingOptions options = NSJSONReadingMutableLeaves |
                                   NSJSONReadingMutableContainers |
                                   NSJSONReadingMutableContainers;
    id object = [NSJSONSerialization JSONObjectWithData:json
                                                options:options
                                                  error:&error];
    if(error){
        HMLogError(@"json序列化失败, %@", [error description]);
    }
    return object;
}

NSString *_HMJSONStringWithObject(id object) {
    if([NSJSONSerialization isValidJSONObject:object]){
        NSError *error = nil;
        // no exception
        NSData *data = [NSJSONSerialization dataWithJSONObject:object options:0 error:&error];
        if(error || !data){
            HMLogError(@"json反序列化失败, %@", [error description]);
        } else {
            return [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        }
    }
    return nil;
}

#pragma mark - Image funcs

static NSString *HMRelativePathForURL(NSString *basePath, NSURL *__nullable URL) {
    if (!URL.fileURL) {
        return nil;
    }
    NSString *path = [NSString stringWithUTF8String:[URL fileSystemRepresentation]];
    if (![path hasPrefix:basePath]) {
        return nil;
    }
    path = [path substringFromIndex:basePath.length];
    if ([path hasPrefix:@"/"]) {
        path = [path substringFromIndex:1];
    }
    return path;
}
/**
 * bundle 路径转换，获取mainbundle 之后的部分：
 * xxxx/data/Containers/Bundle/Application/FEFEAE8F-E6BF-4094-85FF-EE938BDEF5C3/Example.app/resource.bundle/bundleImg.png    ->
 * resource.bundle/bundleImg.png
 */
NSString *HMBundlePathForURL(NSURL *__nullable URL) {
    return HMRelativePathForURL([[NSBundle mainBundle] resourcePath], URL);
    
}

static NSString *bundleName(NSBundle *bundle) {
    NSString *name = bundle.infoDictionary[@"CFBundleName"];
    if (!name) {
        name = [[bundle.bundlePath lastPathComponent] stringByDeletingPathExtension];
    }
    return name;
}

static NSBundle *bundleForPath(NSString *key) {
    static NSMutableDictionary *bundleCache;
    if (!bundleCache) {
        bundleCache = [NSMutableDictionary new];
        bundleCache[@"main"] = [NSBundle mainBundle];
        
        for (NSString *path in [[NSBundle mainBundle] pathsForResourcesOfType:@"bundle"
                                                                  inDirectory:nil]) {
            [NSBundle bundleWithPath:path];
        }
    
        for (NSBundle *bundle in [NSBundle allBundles]) {
            bundleCache[bundleName(bundle)] = bundle;
        }
    }
    
    return bundleCache[key];
}

UIImage *HMImageFromLocalAssetURL(NSURL *imageURL) {
    //获取bundle部分。
    NSString *imageName = HMBundlePathForURL(imageURL);
    NSBundle *bundle = nil;
    NSArray *imgPathComponents = [imageName pathComponents];
    if ([imgPathComponents count] > 1 &&
        [[[imgPathComponents firstObject] pathExtension] isEqualToString:@"bundle"]) {
        NSString *bundlePath = [imgPathComponents firstObject];
        //获取bundle
        bundle = bundleForPath([bundlePath stringByDeletingPathExtension]);
        //获取图片名称
        imageName = [imageName substringFromIndex:(bundlePath.length + 1)];
    }
    
    UIImage *image = nil;
    if (bundle) {
        //读取对应bundle的图片
        image = [UIImage imageNamed:imageName
                           inBundle:bundle
      compatibleWithTraitCollection:nil];
    } else {
        //直接读取：mainBundle.  .app等
        image = [UIImage imageNamed:imageName];
    }
    
    if (!image) {
        // 本地file sys加载
        NSData *fileData;
        if (imageURL.pathExtension.length == 0) {
            fileData = [NSData dataWithContentsOfURL:[imageURL URLByAppendingPathExtension:@"png"]];
        } else {
            fileData = [NSData dataWithContentsOfURL:imageURL];
        }
        image = [UIImage imageWithData:fileData];
    }
    
    if (!image && !bundle) {
        // mainBundle未找到, 从frameworks查找
        NSArray<NSURL *> *tmpFrameworks = [[NSFileManager defaultManager] contentsOfDirectoryAtURL:[[NSBundle mainBundle] privateFrameworksURL]
                                                                        includingPropertiesForKeys:@[]
                                                                                           options:0
                                                                                             error:nil];
        for (NSURL *frameworkURL in tmpFrameworks) {
            bundle = [NSBundle bundleWithURL:frameworkURL];
            image = [UIImage imageNamed:imageName inBundle:bundle compatibleWithTraitCollection:nil];
            if (image) {
                HMLogWarning(@"Image %@ not found in mainBundle, but found in %@", imageName, bundle);
                break;
            }
        }
    }
    return image;
}

UIImage *HMImageFromLocalAssetName(NSString *imageName) {
    // get image with file path
    for (NSString * path in [HMConfig sharedInstance].resourcePathList) {
        NSString *fileName = [NSString stringWithFormat:@"%@/%@", path, imageName];
        UIImage *image = [UIImage imageWithContentsOfFile:fileName];
        if (image) { return image; }
    }
    // get mainBundle
    NSString *basePath = [NSBundle mainBundle].resourcePath;
    NSURL *imageURL = [NSURL URLWithString:[[NSString stringWithFormat:@"file://%@/%@", basePath, imageName] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    return HMImageFromLocalAssetURL(imageURL);
}

UIImage *HMImageFromBase64String(NSString * base64String) {
    if (!base64String) {
        return nil;
    }
    NSData * data  = nil;
    if ([base64String containsString:@"data"]) {
        NSURL * url = [NSURL URLWithString:[base64String stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
        data = [NSData dataWithContentsOfURL:url];
    }else {
        data = [[NSData alloc]initWithBase64EncodedString:base64String options:NSDataBase64DecodingIgnoreUnknownCharacters];
    }
    if (!data) {
        return nil;
    }
    return [UIImage imageWithData:data scale:[UIScreen mainScreen].scale];
}

void HMNetImageFromImageURL(NSString * _Nullable imageURL,void(^ _Nullable completeBlock)(UIImage * _Nullable image,NSError * error)) {
    NSURL * url = [NSURL URLWithString:[imageURL stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    if (!url) {
        if (completeBlock) {
            completeBlock(nil, [NSError errorWithDomain:@"parameter" code:-1 userInfo:nil]);
        }
    }
    NSURLSessionDataTask *dataTask = [[NSURLSession sharedSession] dataTaskWithURL:url
                                                                 completionHandler:^(NSData * _Nullable data,
                                                                                     NSURLResponse * _Nullable response,
                                                                                     NSError * _Nullable error) {
        UIImage *image = [UIImage imageWithData:data];
        HMExecOnMainQueue(^{
            if (completeBlock) {
                completeBlock(image, nil);
            }
        });
    }];
    [dataTask resume];
}

#pragma mark - Main Queue Func

BOOL HMIsMainQueue(void) {
    static void *mainQKey = &mainQKey;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        dispatch_queue_set_specific(dispatch_get_main_queue(),
                                    mainQKey, mainQKey, NULL);
    });
    return dispatch_get_specific(mainQKey) == mainQKey;
}

void HMExecOnMainQueue(dispatch_block_t block) {
    if (HMIsMainQueue()) {
        block();
    } else {
        dispatch_async(dispatch_get_main_queue(), ^{
            block();
        });
    }
}

#pragma mark - value

CGFloat px2pt(NSString* value) {
    return value.doubleValue / UIScreen.mainScreen.scale;
}

CGFloat hm2pt(NSString* value) {
    return value.doubleValue * [UIScreen mainScreen].bounds.size.width / (HMConfig.sharedInstance.pixel / HMConfig.sharedInstance.scale);
}

CGFloat HMPointWithString(NSString *string) {
    if ([string hasSuffix:@"px"]) {
        return px2pt(string);
    } else if ([string hasSuffix:@"hm"]){
        return hm2pt(string);
    } else {
        return string.floatValue;
    }
}

BOOL HMValidPoint(CGPoint point) {
    return !(isnan(point.x)) && !(isnan(point.y));
}

#pragma mark - View Controller

UIWindow *_Nullable hm_key_window(void)
{
    // Normal 0
    // StatusBar 1000
    // Alert 2000
    __block UIWindow *keyWindow = nil;
    if (@available(iOS 13, *)) {
        [UIApplication.sharedApplication.connectedScenes enumerateObjectsUsingBlock:^(UIScene * _Nonnull obj, BOOL * _Nonnull stop) {
            // 支持权限弹框情况
            if ((obj.activationState == UISceneActivationStateForegroundActive || obj.activationState == UISceneActivationStateForegroundInactive || obj.activationState == UISceneActivationStateBackground) && [obj isKindOfClass:UIWindowScene.class]) {
                UIWindowScene *windowScene = (UIWindowScene *) obj;
                [windowScene.windows enumerateObjectsUsingBlock:^(UIWindow * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                    if (obj.isKeyWindow) {
                        keyWindow = obj;
                        *stop = YES;
                    }
                }];
                if (keyWindow.windowLevel >= UIWindowLevelAlert) {
                    keyWindow = nil;
                    [windowScene.windows enumerateObjectsUsingBlock:^(UIWindow * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                        if (obj.windowLevel >= UIWindowLevelAlert) {
                            return;
                        }
                        if (obj.rootViewController && obj.hidden == NO) {
                            keyWindow = obj;
                            *stop = YES;
                        }
                    }];
                }
                if (keyWindow) {
                    *stop = YES;
                }
            }
        }];
    } else {
        keyWindow = UIApplication.sharedApplication.keyWindow;
        if (keyWindow.windowLevel >= UIWindowLevelAlert) {
            [UIApplication.sharedApplication.windows enumerateObjectsUsingBlock:^(__kindof UIWindow * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                if (obj.windowLevel >= UIWindowLevelAlert) {
                    return;
                }
                if (obj.rootViewController && obj.hidden == NO) {
                    keyWindow = obj;
                    *stop = YES;
                }
            }];
        }
    }
    
    return keyWindow;
}

HMContainerModel *_Nullable hm_nearest_container(UIViewController *_Nullable viewController)
{
    // 最后处理 presentingViewController
    UIViewController *parentViewController = viewController.parentViewController;
    if ([parentViewController isKindOfClass:UINavigationController.class]) {
        HMContainerModel *containerModel = [[HMContainerModel alloc] init];
//        containerModel.containerType = HMContainerTypeNavigation;
        containerModel.viewController = parentViewController;
        
        return containerModel;
    } else if ([parentViewController isKindOfClass:UITabBarController.class]) {
        return hm_nearest_container(parentViewController);
    } else if (viewController.presentingViewController) {
        HMContainerModel *containerModel = [[HMContainerModel alloc] init];
        containerModel.containerType = HMContainerTypeModal;
        containerModel.viewController = viewController.presentingViewController;
        
        return containerModel;
    }
    
    return nil;
}

HMContainerModel *_Nullable hm_strip_single_child_navigation(HMContainerModel *_Nullable containerModel)
{
    while (containerModel.containerType == HMContainerTypeNavigation && ((UINavigationController *) containerModel.viewController).viewControllers.count == 1) {
            containerModel = hm_nearest_container(containerModel.viewController);
    }
    
    return containerModel;
}

UIViewController *HMTopViewControllerWithRootVC(UIViewController *viewController)
{
    // 必须先查询 modal 页面
    if (viewController.presentedViewController) {
        return HMTopViewControllerWithRootVC(viewController.presentedViewController);
    } else if ([viewController isKindOfClass:UINavigationController.class] && ((UINavigationController *) viewController).topViewController) {
        return HMTopViewControllerWithRootVC(((UINavigationController *) viewController).topViewController);
    } else if ([viewController isKindOfClass:UITabBarController.class] && ((UITabBarController *) viewController).selectedViewController) {
        return HMTopViewControllerWithRootVC(((UITabBarController *) viewController).selectedViewController);
    }
    
    return viewController;
}

UIViewController * HMRootViewController(){
    id<UIApplicationDelegate> delegate= [UIApplication sharedApplication].delegate;
    if([delegate respondsToSelector:@selector(window)]){
        UIWindow *window = [(NSObject *)delegate valueForKey:@"window"];
        return window.rootViewController;
    }
    return nil;
}

UIViewController * HMCurrentViewController(UIView *view) {
    for (UIResponder* next = view.nextResponder; next; next = next.nextResponder){
        if ([next isKindOfClass:[UIViewController class]]){
            return (UIViewController *)next;
        }
    }
    return nil;
}

UIViewController *HMTopRootViewController(void)
{
    UIViewController *rootViewController = hm_key_window().rootViewController;
    
    return rootViewController;
}

UIViewController *HMTopViewController(void)
{
    UIViewController *rootViewController = HMTopRootViewController();
    
    return HMTopViewControllerWithRootVC(rootViewController);
}

#pragma mark - Error

NSError *HMError(NSInteger code, NSString *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    NSString *message = [[NSString alloc] initWithFormat:fmt arguments:args];
    va_end(args);
    
    return [NSError errorWithDomain:@"HummerError"
                               code:code
                           userInfo:@{@"msg":message}];
}

void hm_method_swizzling(Class clazz, SEL originalSelector, SEL swizzledSelector) {
    Method originalMethod = class_getInstanceMethod(clazz, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(clazz, swizzledSelector);
    if (originalMethod && swizzledMethod) {
        BOOL didAddMethod = class_addMethod(clazz, originalSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
        if (didAddMethod) {
            class_replaceMethod(clazz, swizzledSelector, method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));
        } else {
            method_exchangeImplementations(originalMethod, swizzledMethod);
        }
    } else {
        // 交换方法失败，可能是原始方法不存在或者混淆方法不存在
        assert(false);
    }
}

BOOL hm_doubleEqual(double numberOne, double numberTwo) {
    return fabs(numberOne - numberTwo) <= 0.0001;
}


void hm_safe_main_thread(dispatch_block_t block) {
    if (NSThread.isMainThread) {
        block ? block() : nil;
    } else {
        dispatch_async(dispatch_get_main_queue(), block);
    }
}

NSString *hm_availableFontName(NSString *names) {
    if (!names || names.length < 1) {
        return nil;
    }
    __block NSString *name = nil;
    NSArray<NSString *> *comps = [names componentsSeparatedByString:@","];
    [comps enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSString *n = [obj stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceCharacterSet];
        UIFont *f = [UIFont fontWithName:n size:16];
        if (f) {
            name = n;
            *stop = YES;
        }
    }];
    return name;
}

NSMethodSignature *HMExtractMethodSignatureFromBlock(id block) {
    // 强依赖 struct Block_Layout 内存布局，如果发生了改变，可能导致 crash
    if (![block isKindOfClass:NSClassFromString(@"NSBlock")]) {
        return nil;
    }
    HMBlockRef blockRef = (__bridge void *) block;
    if (!(blockRef->flags & HMBlockFlagsHasSignature)) {
        HMLogError(@"Block 没有方法签名");

        return nil;
    }
    if (!blockRef->descriptor) {
        HMLogError(@"blockRef->descriptor 空指针");

        return nil;
    }
    void *desc = blockRef->descriptor;
    desc += 2 * sizeof(unsigned long int);
    if (blockRef->flags & HMBlockFlagsHasCopyDisposeHelpers) {
        desc += 2 * sizeof(void *);
    }
    const char *signature = (*(const char **) desc);
    if (!signature) {
        HMLogError(@"signature == NULL");

        return nil;
    }

    return [NSMethodSignature signatureWithObjCTypes:signature];
}
