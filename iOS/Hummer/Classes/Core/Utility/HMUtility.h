//
//  HMUtility.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HMLogger.h"
#import "HMAssertUtils.h"
#import "HMAssertDefine.h"

@class HMSourceParser, HMContainerModel;

#define OBJC_STRING(a)       @#a
#define OBJC_JSClass(jsClass)   [NSString stringWithFormat:@"OBJC_%@", (jsClass)]

NSError * _Nullable HMError(NSInteger code, NSString *_Nullable fmt, ...);


NSString * _Nullable _HMMD5String(NSString * _Nonnull input);

NSString * _Nullable _HMMD5Data(NSData * _Nonnull input);

CGFloat HMPointWithString(NSString * _Nonnull string);

BOOL HMValidPoint(CGPoint point);

#define HMMD5Encode(input)  ([input isKindOfClass:[NSString class]] ? _HMMD5String((NSString *)input) : _HMMD5Data((NSData *)input))

id _Nullable _HMObjectFromJSONString(NSString * _Nonnull json);

id _Nullable _HMObjectFromJSONData(NSData * _Nonnull json);

#define HMJSONDecode(json) [json isKindOfClass:[NSString class]] ? _HMObjectFromJSONString((NSString *)json) : _HMObjectFromJSONData((NSData *)json)

NSString * _Nullable _HMJSONStringWithObject(id _Nonnull object);

#define HMJSONEncode(obj) _HMJSONStringWithObject(obj)

#define HMNullIfNil(value) (value ?: (id)kCFNull)

#pragma mark <image asset>

UIImage * _Nullable HMImageFromLocalAssetName(NSString * _Nonnull imageName);
UIImage * _Nullable HMImageFromLocalAssetURL(NSURL * _Nonnull imageURL);
UIImage * _Nullable HMImageFromLocalAssetURLAndOutNamed(NSURL *_Nonnull imageURL, BOOL * _Nullable isNamed);
UIImage * _Nullable HMImageFromBase64String(NSString * _Nonnull base64String);

void HMNetImageFromImageURL(NSString * _Nullable imageURL,void(^ _Nullable completeBlock)(UIImage * _Nullable image,NSError * _Nullable error));

#pragma mark <main queue>
BOOL HMIsMainQueue(void);

void HMExecOnMainQueue(dispatch_block_t _Nonnull block);

void hm_safe_main_thread(dispatch_block_t _Nullable block);

#define HM_SafeRunBlock(block,...)       ((block)?(block(__VA_ARGS__)):nil)

#define HM_SafeRunBlockAtMainThread(block,...)   \
        if(block){  \
            hm_safe_main_thread(^{ \
                block(__VA_ARGS__); \
            }); \
        }


#pragma mark <ViewController>
UIViewController * _Nullable HMRootViewController(void);
UIViewController * _Nullable HMCurrentViewController(UIView * _Nullable view);

NS_ASSUME_NONNULL_BEGIN

UIViewController *_Nullable HMTopViewController(void);

UIViewController *_Nullable HMTopViewControllerWithRootVC(UIViewController *_Nullable viewController);

UIViewController *_Nullable HMTopRootViewController(void);

HMContainerModel *_Nullable hm_nearest_container(UIViewController *_Nullable viewController);

HMContainerModel *_Nullable hm_strip_single_child_navigation(HMContainerModel *_Nullable containerModel);

UIWindow *_Nullable hm_key_window(void);

double HMTimestampMilliSeconds(void);

void hm_method_swizzling(Class _Nullable clazz, SEL originalSelector, SEL swizzledSelector);

BOOL hm_doubleEqual(double numberOne, double numberTwo);

double HMZeroIfNaN(double value);

NSString *hm_availableFontName(NSString *names);

NSString *hm_availableFontName(NSString *names);


#pragma mark <Block>

typedef NS_OPTIONS(int, HMBlockFlags) {
    HMBlockFlagsHasCopyDisposeHelpers = (1 << 25),
    HMBlockFlagsHasSignature = (1 << 30)
};

/**
 * 大量做空指针判断
 */
typedef struct _HMBlockLayout {
    __unused Class isa;
    HMBlockFlags flags; // 引用计数等
    __unused int reserved;
    
    void (__unused *_Nullable invoke)(struct _HMBlockLayout *_Nullable block, ...);
    
    struct {
        unsigned long int reserved;
        unsigned long int size;
        
        // requires HMBlockFlagsHasCopyDisposeHelpers
        void (*_Nullable copy)(void *dst, const void *src);
        
        void (*_Nullable dispose)(const void *);
        
        // requires HMBlockFlagsHasSignature
        const char *_Nullable signature;
        const char *_Nullable layout;
    } *_Nullable descriptor;
    // imported variables
} HMBlockLayout;

typedef HMBlockLayout *HMBlockRef;

NSMethodSignature *_Nullable HMExtractMethodSignatureFromBlock(id _Nullable block);

NS_ASSUME_NONNULL_END
