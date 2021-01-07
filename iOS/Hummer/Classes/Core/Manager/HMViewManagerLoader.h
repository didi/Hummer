//
//  HMViewManagerLoader.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/12/18.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef struct {
    // Objc 类名
    const char *const viewManagerClassName;
} HMViewManagerStruct;

extern const char *const HMExportViewManagerString;

#define CONCAT(a, b) a##b
//#define CONCAT(a, b) _CONCAT(a, b)
#define UNUSED_UNIQUE_ID CONCAT(_unused, __COUNTER__)

#define HM_EXPORT_VIEW_MANAGER(objcClass) \
__attribute__((used, section(HMExportViewManagerString))) \
static const HMExportStruct UNUSED_UNIQUE_ID = {#objcClass};

#define HM_EXPORT_VIEW_PROPERTY(name, type) \
+ (NSArray<NSString *> *)propConfig_##name { \
    return @[@#type]; \
}

@interface HMViewManagerLoader : NSObject

@property (nonatomic, nullable, readonly, copy) NSDictionary<NSString *, NSDictionary<NSString *, id <NSCoding>> *> *jsonDictionary;

+ (instancetype)sharedInstance;

- (void)loadAllComponent;

@end

NS_ASSUME_NONNULL_END
