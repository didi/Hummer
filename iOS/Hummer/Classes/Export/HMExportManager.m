//
//  HMExportManager.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportManager.h"
#import "HMLogger.h"
#import <dlfcn.h>
#import <mach-o/getsect.h>
#import "HMExportClass.h"
#import <objc/runtime.h>
#import "HMUtility.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMExportManager ()

@property (nonatomic, copy, nullable) NSDictionary<NSString *, HMExportClass *> *jsClasses;

@property (nonatomic, copy, nullable) NSDictionary<NSString *, HMExportClass *> *objcClasses;

@end

NS_ASSUME_NONNULL_END

@implementation HMExportManager

static id _sharedInstance = nil;

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _sharedInstance = [[self alloc] init];
    });

    return _sharedInstance;
}

- (instancetype)init {
    self = [super init];

    return self;
}

- (void)loadAllExportedComponent {
    if (self.jsClasses.count > 0 || self.objcClasses.count > 0) {
        return;
    } else {
        Dl_info info;
        dladdr(&_sharedInstance, &info);

#ifdef __LP64__
        uint64_t addr = 0;
        const uint64_t mach_header = (uint64_t) info.dli_fbase;
        const struct section_64 *section = getsectbynamefromheader_64((void *) mach_header, "__DATA", "hm_export_class");
#else
        uint32_t addr = 0; const uint32_t mach_header = (uint32_t)info.dli_fbase;
        const struct section *section = getsectbynamefromheader((void *)mach_header, "__DATA", "hm_export_class");
#endif
        if (section) {
            NSMutableDictionary<NSString *, HMExportClass *> *jsClassesMutableDictionary = nil;
            NSMutableDictionary<NSString *, HMExportClass *> *objcClassesMutableDictionary = nil;

            // 原因为 UIWebView 从子线程通过 objc_msgSend 访问，实际上不存在危害，属于触发了苹果兜底警告
            // 代码见 HMExportClass -> - loadMethodOrProperty:withSelector: -> objc_msgSend
            HMLogDebug(@"--- 此框内如果出现 WebKit Threading Violation - initial use of WebKit from a secondary thread. 日志可以忽略 ---");
            for (addr = section->offset; addr < section->offset + section->size; addr += sizeof(HMExportStruct)) {
                HMExportStruct *component = (HMExportStruct *) (mach_header + addr);
                if (!component) {
                    continue;
                }

                NSString *jsClass = [NSString stringWithUTF8String:component->jsClass];
                NSString *objcClass = [NSString stringWithUTF8String:component->objcClass];

                HMExportClass *exportClass = [[HMExportClass alloc] init];
                exportClass.className = objcClass;
                exportClass.jsClass = jsClass;
                // 调用方法加载 method property
                [exportClass loadAllExportMethodAndProperty];

                if (jsClassesMutableDictionary.count == 0) {
                    // sizeof 返回 size_t -> unsigned int
                    jsClassesMutableDictionary = [NSMutableDictionary dictionaryWithCapacity:section->size / sizeof(HMExportStruct)];
                }
                if (objcClassesMutableDictionary.count == 0) {
                    objcClassesMutableDictionary = [NSMutableDictionary dictionaryWithCapacity:section->size / sizeof(HMExportStruct)];
                }
                jsClassesMutableDictionary[jsClass] = exportClass;
                objcClassesMutableDictionary[objcClass] = exportClass;
            }
            HMLogDebug(@"--- 结束 ---");
            if (jsClassesMutableDictionary.count > 0) {
                self.jsClasses = jsClassesMutableDictionary.copy;
            }
            if (objcClassesMutableDictionary.count > 0) {
                self.objcClasses = objcClassesMutableDictionary.copy;
            }
            [jsClassesMutableDictionary enumerateKeysAndObjectsUsingBlock:^(NSString *key, HMExportClass *obj, BOOL *stop) {
                NSParameterAssert(obj.className);
                Class clazz = NSClassFromString(obj.className);
                NSParameterAssert(clazz);
                if (!clazz) {
                    return;
                }
                while ((void) (clazz = class_getSuperclass(clazz)), clazz && clazz != NSObject.class) {
                    NSString *className = NSStringFromClass(clazz);
                    HMExportClass *exportClass = objcClassesMutableDictionary[className];
                    if (exportClass) {
                        // 查找到了，停止循环
                        obj.superClassReference = exportClass;
                        break;
                    }
                }
            }];
            NSLog(@"");
        } else {
            HMLogError(@"没有导出组件");
        }
    }
}

@end
