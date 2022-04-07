//
//  HMViewDescriptor.h
//  Hummer
//
//  Created by didi on 2021/11/3.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMBaseValue.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMObjectDescription <NSObject>

@optional
- (nullable NSString *)hm_ID;

- (NSString *)hm_objcClassName;

- (NSString *)hm_jsClassName;

- (nullable HMBaseValue *)hm_jsObject;

- (NSString *)hm_devDescription;

@end

/**
 * view 原始结构，描述
 */
@protocol HMViewDescription <HMObjectDescription>

@optional
- (nullable NSArray<UIView *> *)hm_children;

// 组件内容（非 obj.decription）
- (nullable NSString *)hm_content;

// 含有 js 对象的 视图层级关系。
// 如 含有两个 子 view，但其中 子view1 没有 对于的 js 对象，则 hm_jsChildren 不会包含 view1
- (nullable NSArray<HMBaseValue *> *)hm_jsChildren;

- (nullable HMBaseValue *)hm_jsViewValue;

@end



/**
 * 面向 view inspector 结构，描述。
 * 可能会忽略一些原始节点，如：
 * scroller：忽略 HMRefreshFooterView等
 */
@protocol HMViewInspectorDescription <HMViewDescription>

// 节点别名。如 View -> header
- (nullable NSString *)hm_displayAlias;

// js 对象id，默认实现为 hm_ID
- (nullable NSString *)hm_displayID;

// js 类名，默认实现为 hm_jsClassName
- (nullable NSString *)hm_displayTagName;

// js 对象，默认实现为 hm_jsViewValue
- (nullable HMBaseValue *)hm_displayJsElement;

// 默认实现为 hm_content
- (nullable id)hm_displayContent;

// 默认实现为 hm_jsChildren
// HMViewInspectorDescription 可为 UIView 子类，或可以转化为 view 的 jsValue。
- (nullable NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren;


@end

NS_ASSUME_NONNULL_END
