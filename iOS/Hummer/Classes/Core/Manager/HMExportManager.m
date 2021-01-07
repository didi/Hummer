//
//  HMExportManager.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportManager.h"

#import <dlfcn.h>
#import <mach-o/getsect.h>
#import <objc/runtime.h>
#import "HMExportClass.h"
#import "HMUtility.h"
#import "HMExportMethod.h"
#import <JavaScriptCore/JavaScriptCore.h>

@interface HMExportManager ()

@property (nonatomic, strong) NSMutableDictionary *jsClasses;   // jsclass -> objc_class
@property (nonatomic, strong) NSMutableDictionary *objcClasses; // objc_class -> jsclass
@end

@implementation HMExportManager

static HMExportManager *__sharedInstance = nil;
+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if(__sharedInstance == nil){
            __sharedInstance = [[self alloc] init];
        }
    });
    return __sharedInstance;
}

+ (instancetype)allocWithZone:(struct _NSZone *)zone {
    @synchronized(self){
        if(__sharedInstance == nil){
            __sharedInstance = [super allocWithZone:zone];
        }
    }
    return __sharedInstance;
}

- (NSMutableDictionary *)jsClasses {
    if(!_jsClasses){
        _jsClasses = [NSMutableDictionary dictionary];
    }
    return _jsClasses;
}

- (NSMutableDictionary *)objcClasses {
    if(!_objcClasses){
        _objcClasses = [NSMutableDictionary dictionary];
    }
    return _objcClasses;
}

- (void)loadExportClasses {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Dl_info info; dladdr(&__sharedInstance, &info);
        
#ifdef __LP64__
        uint64_t addr = 0; const uint64_t mach_header = (uint64_t)info.dli_fbase;
        const struct section_64 *section = getsectbynamefromheader_64((void *)mach_header, "__DATA", "hm_export_class");
        
#else
        uint32_t addr = 0; const uint32_t mach_header = (uint32_t)info.dli_fbase;
        const struct section *section = getsectbynamefromheader((void *)mach_header, "__DATA", "hm_export_class");
#endif
        
        if (section == NULL)  return;
        
        for (addr = section->offset; addr < section->offset + section->size; addr += sizeof(HMExportStruct)) {
            HMExportStruct *component = (HMExportStruct *)(mach_header + addr);
            if (!component) continue;
            
            NSString *jsClass = [NSString stringWithUTF8String:component->jsClass];
            NSString *objcClass = [NSString stringWithUTF8String:component->objcClass];
            
            [self bindObjCClass:objcClass jsClass:jsClass];
        }
    });
}

- (void)bindObjCClass:(NSString *)objcClass jsClass:(NSString *)jsClass {
    if(!objcClass || !jsClass) return;
    
    NSString *className = self.jsClasses[objcClass];
    if(!className){
        HMExportClass *exportClass = [[HMExportClass alloc] initWithClassName:objcClass jsClass:jsClass];
        self.jsClasses[jsClass] = exportClass;
        self.objcClasses[objcClass] = exportClass;
    }
}

- (HMExportClass *)exportClassForJS:(NSString *)jsClass {
    if(!jsClass) return nil;
    
    return self.jsClasses[jsClass];
}

- (NSArray *)allExportJSClasses {
    return [self.jsClasses allKeys];
}

- (HMExportClass *)exportClassForObjC:(NSString *)objcClass {
    if(!objcClass) return nil;
    
    return self.objcClasses[objcClass];
}

- (NSArray *)allExportObjCClasses {
    return [self.objcClasses allKeys];
}

- (NSString *)jsClassForObjCClass:(Class)objcClass {
    if (!objcClass) return nil;
    
    NSString *className = NSStringFromClass(objcClass);
    HMExportClass *exportClass = self.objcClasses[className];
    return exportClass.jsClass;
}

@end
