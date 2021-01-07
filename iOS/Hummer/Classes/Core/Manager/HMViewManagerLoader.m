//
//  HMViewManagerLoader.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/12/18.
//

#import <dlfcn.h>
#import <mach-o/getsect.h>
#import "HMViewManagerLoader.h"
#import "HMViewManagerDTOModel.h"
#import "HMLogger.h"

NS_ASSUME_NONNULL_BEGIN

const char *const HMExportViewManagerString = "__DATA, hm_export_view_manager";

static id _Nullable _sharedInstance = nil;

@interface HMViewManagerLoader ()

@property (nonatomic, nullable, copy) NSDictionary<NSString *, HMViewManagerDTOModel *> *viewManagerDTOModelDictionary;

@end

NS_ASSUME_NONNULL_END

@implementation HMViewManagerLoader

- (NSDictionary<NSString *, NSDictionary<NSString *, id <NSCoding>> *> *)jsonDictionary {
    // TODO(唐佳诚): jsonDictionary
    return nil;
}

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _sharedInstance = [[self alloc] init];
    });

    return _sharedInstance;
}

- (HMViewManagerDTOModel *)loadWithViewManagerObjcClass:(Class)viewManagerObjcClass {
    // TODO(唐佳诚): 校验 Class
    // TODO(唐佳诚): 读取 propertyList
    HMViewManagerDTOModel *viewManagerDTOModel = [[HMViewManagerDTOModel alloc] init];

    return viewManagerDTOModel;
}

- (void)loadAllComponent {
    // TODO(唐佳诚): 加载组件，如果已经加载完毕则直接返回
    if (self.viewManagerDTOModelDictionary.count > 0) {
        return;
    }
    Dl_info info;
    dladdr(&_sharedInstance, &info);
#ifdef __LP64__
    uint64_t addr = 0;
    const uint64_t mach_header = (uint64_t) info.dli_fbase;
    const struct section_64 *section = getsectbynamefromheader_64((void *) mach_header, "__DATA", "hm_export_view_manager");
#else
    uint32_t addr = 0;
    const uint32_t mach_header = (uint32_t) info.dli_fbase;
    const struct section *section = getsectbynamefromheader((void *) mach_header, "__DATA", "hm_export_view_manager");
#endif
    if (!section) {
        HMLogError(@"没有导出 ViewManager");

        return;
    }
    for (addr = section->offset; addr < section->offset + section->size; addr += sizeof(HMViewManagerStruct)) {
        HMViewManagerStruct *component = (HMViewManagerStruct *) (mach_header + addr);
        if (!component) {
            continue;
        }

        NSString *objcClassName = [NSString stringWithUTF8String:component->viewManagerClassName];
        if (objcClassName.length == 0) {
            continue;
        }
        Class objcClass = NSClassFromString(objcClassName);
        if (!objcClass) {
            continue;
        }

        HMViewManagerDTOModel *viewManagerDTOModel = [self loadWithViewManagerObjcClass:objcClass];
        if (!viewManagerDTOModel) {
            continue;
        }
        NSMutableDictionary<NSString *, HMViewManagerDTOModel *> *mutableDictionary = self.viewManagerDTOModelDictionary.mutableCopy;
        self.viewManagerDTOModelDictionary = nil;
        if (!mutableDictionary) {
            mutableDictionary = NSMutableDictionary.dictionary;
        }
        mutableDictionary[objcClassName] = viewManagerDTOModel;
        self.viewManagerDTOModelDictionary = mutableDictionary;
    }
}

@end
