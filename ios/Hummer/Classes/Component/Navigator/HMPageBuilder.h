//
//  HMPageBuilder.h
//  Pods
//
//  Created by didi on 2020/7/13.
//

#ifndef HMPageBuilder_h
#define HMPageBuilder_h
NS_ASSUME_NONNULL_BEGIN

/**
* @brief 构造器
*
* @param url NSURL absoluteString，可用于构造 NSURL
* @param parameterDictionary 参数字典
* @param pageId 废弃字段，一定为 nil
* @param callback 回调
*
* @return UIViewController 视图控制器
*/
typedef UIViewController *_Nullable (^HMPageBuilder)(NSString *url,
                                                     NSDictionary *_Nullable parameterDictionary,
                                                     NSString *_Nullable pageId,
                                                     void(^callback)(id _Nullable userInfo));

NS_ASSUME_NONNULL_END
#endif /* HMPageBuilder_h */
