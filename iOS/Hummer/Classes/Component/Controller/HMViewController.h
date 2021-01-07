//
//  HMViewController.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "HMUtility.h"
#import "HMJSGlobal.h"
#import <Hummer/HummerContainerProtocol.h>

typedef NSString *(^HMLoadBundleJS)(NSString *URL);

typedef void(^HMRegisterJSBridge)(HMJSContext *context);

NS_ASSUME_NONNULL_BEGIN

typedef void(^HMVoidIDBlock)(id _Nullable userInfo);

NS_ASSUME_NONNULL_END

@interface HMViewController : UIViewController <HummerContainerProtocol>

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, copy, nullable) NSString *URL;

@property (nonatomic, copy, nullable) NSDictionary *params;

/**
 * @brief 页面唯一标识
 */
@property (nonatomic, copy, nullable) NSString *hm_pageID;

/**
 * @brief 页面消失回调
 */
@property (nonatomic, copy, nullable) HMVoidIDBlock hm_dismissBlock;

NS_ASSUME_NONNULL_END

/// 初始化Hummer页面
/// @param URL Hummer包地址
/// @param params 参数
+ (instancetype)hmxPageControllerWithURL:(NSString *)URL
                                  params:(NSDictionary *)params;

/// 初始化Hummer页面
/// @param URL URL Hummer包地址
/// @param params params 参数
- (instancetype)initWithURL:(NSString *)URL
                     params:(NSDictionary *)params;

///  添加自定义顶部导航view，默认没有导航
/// @param customNaviView 外部自定义的导航view
- (void)addCustomNavigationView:(UIView *)customNaviView;

 ///  加载Bundle脚本
 @property(nonatomic,copy) HMLoadBundleJS loadBundleJSBlock;

 ///  渲染脚本之前注册bridge
 @property(nonatomic,copy) HMRegisterJSBridge registerJSBridgeBlock;

 /// 渲染脚本
 /// @param script 脚本内容
 - (void)renderWithScript:(NSString *)script;

 ///  通过context设置自定义bridge
 @property (nonatomic, weak, readonly) HMJSContext *context;

 #pragma mark - Call Hummer

 ///  调用JS方法
 - (JSValue *)callJSWithFunc:(NSString *)func arguments:(NSArray *)arguments;



#ifdef DEBUG

 #pragma mark - ⚠️注意：以下为Debug模式下的内测逻辑

 ///  通过WebSocket实时渲染JS效果
 /// @param wsURLStr WebSocket地址，例如：NSString *wsURLStr = @"ws://192.168.3.102:9000/";
 - (void)openWebSocketWithUrl:(NSString *)wsURLStr;

#endif

@end
