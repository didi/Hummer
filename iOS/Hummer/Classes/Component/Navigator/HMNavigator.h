//
//  HMImageView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Hummer/HMExportManager.h>
#import "HMUtility.h"
#import "HMViewController.h"
#import "HMPageBuilder.h"
#import "HMNavigatorPageInfo.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMNavigator : NSObject

+ (void)openPage:(HMBaseValue *)params callback:(nullable HMFuncCallback)callback;

/**
 * @brief 注册 scheme，用于解决 hummer://Unipay 这样的路径解析，默认会处理以下内容
 * 1. ws -> 会传入到 HMViewController 中，等待后续解析，解析后会重新设置 url
 * 2. 相对路径 -> 根据唤起的 HMViewController url 做相对路径解析
 * 3. 以 js 结尾的网络文件和本地文件，例如 https://localhost:8080/main.js file://path/to/main.js
 * @param scheme 协议名
 * @param pageBuilder 构造闭包
 */
+ (void)registerScheme:(NSString *)scheme pageBuilder:(HMPageBuilder)pageBuilder DEPRECATED_MSG_ATTRIBUTE("使用 + registerScheme:nameSpace:pageBuilder: 替代");

/**
 * @brief 注册 scheme，用于解决 hummer://Unipay 这样的路径解析，默认会处理以下内容
 * 1. ws -> 会传入到 HMViewController 中，等待后续解析，解析后会重新设置 url
 * 2. 相对路径 -> 根据唤起的 HMViewController url 做相对路径解析
 * 3. 以 js 结尾的网络文件和本地文件，例如 https://localhost:8080/main.js file://path/to/main.js
 * @param scheme 协议名
 * @param nameSpace 业务线命名空间
 * @param pageBuilder 构造闭包
 *
 * @note 既然使用了这个API，意味着已经升级到了使用命名空间的版本，当使用
 */
+ (void)registerScheme:(NSString *)scheme nameSpace:(NSString *)nameSpace pageBuilder:(HMPageBuilder)pageBuilder;

+ (void)registerPages:(NSDictionary<NSString *, HMPageBuilder> *)pages DEPRECATED_MSG_ATTRIBUTE("使用 + registerScheme:nameSpace:pageBuilder: 替代");

+ (void)registerPage:(NSString *)route builder:(HMPageBuilder)builder DEPRECATED_MSG_ATTRIBUTE("使用 + registerScheme:pageBuilder: 替代");

+ (void)removePage:(NSString *)route DEPRECATED_MSG_ATTRIBUTE("使用 + removePageBuilderForScheme: 替代");

/**
 * @brief 移除注册的 scheme
 * @param scheme 协议名
 */
+ (void)removePageBuilderForScheme:(NSString *)scheme DEPRECATED_MSG_ATTRIBUTE("使用 + removePageBuilderForScheme:nameSpace: 替代");;
+ (void)removePageBuilderForScheme:(NSString *)scheme nameSpace:(nullable NSString *)nameSpace;


+ (instancetype)sharedInstance;

// MARK: Native

+ (void)pushPage:(NSURL *)url params:(nullable NSDictionary *)parameterDictionary pageId:(NSString *)pageId animated:(BOOL)animated callback:(HMVoidIDBlock)callback;

+ (void)pushPageWithInfo:(HMNavigatorPageInfo *)info;

NS_ASSUME_NONNULL_END

@end
