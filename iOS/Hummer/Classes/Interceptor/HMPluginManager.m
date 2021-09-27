#import "HMPluginManager.h"
#import "HMExceptionModel.h"
#import <Hummer/HMBaseExecutorProtocol.h>
#import <mach-o/dyld.h>
#import <mach-o/getsect.h>
#import <objc/runtime.h>

NS_ASSUME_NONNULL_BEGIN

const char *const HUMMER_CLOCK_GET_TIME_ERROR = "clock_gettime() error";

//static inline void *_Nullable getSectionData(const struct mach_header *machHeader, const char *section, unsigned long *size);
//
//static char *const WEAK_SELF_MUST_BE_VALID = "weakSelf must not be nil";
//
//@interface HMPluginManager ()
//
//@property(nonatomic, nullable, strong) dispatch_queue_t pluginLoadSerialQueue;
//
//@property(nonatomic, copy, nullable) NSArray<id <HMPluginProtocol>> *globalPluginArray;
//
//@property(nonatomic, copy, nullable) NSDictionary<NSString *, NSArray<id <HMPluginProtocol>> *> *localPluginDictionary;
//
//- (void)loadAllPluginWithCompletionBlock:(void (^)(void))completionBlock;
//
//@end

NS_ASSUME_NONNULL_END

//void *_Nullable getSectionData(const struct mach_header *machHeader, const char *section, unsigned long *size) {
//    // movq %rax, (%rcx)，因此 size 不能为 nil
//#ifdef __LP32__
//    return getsectiondata(machHeader, SEG_DATA, section, size);
//#elif defined(__LP64__)
//    return getsectiondata((const struct mach_header_64 *) machHeader, SEG_DATA, section, size);
//#else
//#error 无效平台
//#endif
//}

//@implementation HMPluginManager
//
//+ (instancetype)sharedInstance {
//    static id _sharedInstance = nil;
//    static dispatch_once_t onceToken;
//    dispatch_once(&onceToken, ^{
//        _sharedInstance = [[self alloc] init];
//    });
//
//    return _sharedInstance;
//}
//
//- (void)enumeratePluginWithPluginType:(HMPluginType)pluginType nameSpace:(nullable NSString *)nameSpace usingBlock:(void (^)(id <HMPluginProtocol> obj))block {
//    __weak typeof(self) weakSelf = self;
//    [self loadAllPluginWithCompletionBlock:^() {
//        Protocol *aProtocol = nil;
//        switch (pluginType) {
//            case HMPluginTypeTrackEvent:
//                aProtocol = @protocol(HMTrackEventPluginProtocol);
//                break;
//        }
//        assert(aProtocol && "aProtocol cannot be nil");
//        assert(weakSelf && WEAK_SELF_MUST_BE_VALID);
//        typeof(weakSelf) strongSelf = weakSelf;
//        if (nameSpace) {
//            [strongSelf.localPluginDictionary[nameSpace] enumerateObjectsUsingBlock:^(id <HMPluginProtocol> obj, NSUInteger idx, BOOL *stop) {
//                if ([obj conformsToProtocol:aProtocol]) {
//                    block(obj);
//                }
//            }];
//        }
//        [strongSelf.globalPluginArray enumerateObjectsUsingBlock:^(id <HMPluginProtocol> obj, NSUInteger idx, BOOL *stop) {
//            if ([obj conformsToProtocol:aProtocol]) {
//                block(obj);
//            }
//        }];
//    }];
//}
//
//- (void)loadAllPluginWithCompletionBlock:(void (^)(void))completionBlock {
//    HMAssertMainQueue();
//    __weak typeof(self) weakSelf = self;
//    if (self.pluginLoadSerialQueue) {
//        dispatch_async(self.pluginLoadSerialQueue, ^{
//            dispatch_async(dispatch_get_main_queue(), ^() {
//                completionBlock();
//            });
//        });
//    }
//    self.pluginLoadSerialQueue = dispatch_queue_create("Hummer Plugin", nil);
//    dispatch_async(self.pluginLoadSerialQueue, ^{
//        assert(weakSelf && WEAK_SELF_MUST_BE_VALID);
//        NSMutableArray<id <HMPluginProtocol>> *globalPluginArray = nil;
//        NSMutableDictionary<NSString *, NSArray<id <HMPluginProtocol>> *> *localPluginDictionary = nil;
//        // 遍历 image
//        for (uint32_t i = 0; i < _dyld_image_count(); ++i) {
//            // 注意，这个函数非线程安全，dladdr 是线程安全的
//            const struct mach_header *machHeader = _dyld_get_image_header(i);
//            if (!machHeader) {
//                assert(false && "_dyld_get_image_header return nil");
//                continue;
//            }
//            if (machHeader->filetype == MH_DYLIB) {
//                // 动态库
//                const char *utf8CString = _dyld_get_image_name(i);
//                if (!utf8CString) {
//                    assert(false && "_dyld_get_image_name return nil");
//                    continue;
//                }
//                NSString *imageName = [NSString stringWithUTF8String:utf8CString];
//                if (![imageName containsString:@".app/Frameworks"]) {
//                    continue;
//                }
//            } else if (machHeader->filetype != MH_EXECUTE) {
//                assert(false);
//                continue;
//            }
//            unsigned long size = 0;
//            // nullable return value
//            const HMPluginDeclaration *data = (const HMPluginDeclaration *) getSectionData(machHeader, "__hummer_plugin", &size);
//            for (unsigned long j = 0; j < size / sizeof(*data); ++j) {
//                if (!data[j].objcClass) {
//                    assert(false && "__DATA, __hummer_plugin -> data[i].objcClass store nil UTF-8 C String");
//                    continue;
//                }
//                NSString *inlineNameSpace = nil;
//                if (data[j].nameSpace) {
//                    inlineNameSpace = [NSString stringWithUTF8String:data[j].nameSpace];
//                }
//                Class aClass = objc_getClass(data[j].objcClass);
//                if (!aClass || class_conformsToProtocol(aClass, @protocol(HMPluginProtocol))) {
//                    assert(false && "Plugin not found");
//                    continue;
//                }
//                id <HMPluginProtocol> plugin = (id <HMPluginProtocol>) [[aClass alloc] init];
//                if (!inlineNameSpace) {
//                    // 全局插件
//                    if (!globalPluginArray) {
//                        globalPluginArray = NSMutableArray.array;
//                    }
//                    [globalPluginArray addObject:plugin];
//                } else {
//                    // 局部插件
//                    NSMutableArray<id <HMPluginProtocol>> *localPluginArray = localPluginDictionary[inlineNameSpace].mutableCopy;
//                    localPluginDictionary[inlineNameSpace] = nil;
//
//                    if (!localPluginArray) {
//                        localPluginArray = NSMutableArray.array;
//                    }
//                    [localPluginArray addObject:plugin];
//
//                    localPluginDictionary[inlineNameSpace] = localPluginArray.copy;
//                }
//            }
//        }
//        // 主线程执行回调
//        dispatch_async(dispatch_get_main_queue(), ^{
//            assert(weakSelf && WEAK_SELF_MUST_BE_VALID);
//            typeof(weakSelf) inlineStrongSelf = weakSelf;
//            inlineStrongSelf.globalPluginArray = globalPluginArray;
//            inlineStrongSelf.localPluginDictionary = localPluginDictionary;
//            completionBlock();
//        });
//    });
//}
//
//@end
