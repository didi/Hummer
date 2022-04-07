//
//  HummerContainerProtocol.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/4/23.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HummerContainerProtocol <NSObject>

/**
 * @brief 页面唯一标识
 */
@property (nonatomic, copy, nullable) NSString *hm_pageID;

@optional
/**
 * @brief 触发 onBack 回调，可用于拦截 js onBack 事件，使用tenon router 的容器需要实现该方法，用于通知 tenon 处理返回事件
 */
- (BOOL)hm_didClickGoBack;

/**
 * @brief 当 hm_didClickGoBack(js 侧 onBack) 返回 NO 时被调用，表示此时应该由 native 控制返回行为，如不实现，默认使用 pop 方式。
 */
- (void)hm_triggerNativeGoBack;

/**
 * @brief 配置 context namespace，注意需要和 HMConfigEntryManager 保持一致。
 */

- (nonnull NSString *)hm_namespace;
@end

NS_ASSUME_NONNULL_END
