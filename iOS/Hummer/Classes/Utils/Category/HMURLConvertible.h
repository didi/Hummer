//
//  HMURLConvertible.h
//  Hummer
//
//  Created by didi on 2020/11/16.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMURLConvertible <NSObject>
/**
 * @brief 转换为 url 对象。如果已经是 url 对象(不论是 local/remote)
 */
- (nullable NSURL *)hm_asUrl;

/**
 * @brief 转换为 fileUrl 对象。强制转换为 file:///
 */
- (nullable NSURL *)hm_asFileUrl;

/**
 * @brief 转换为 string 对象。absolute string
 */
- (nullable NSString *)hm_asString;

/**
 * @brief 转换为 path 格式，会移除 url scheme, http 格式讲返回 nil
 */
- (nullable NSString *)hm_asFilePath;

@end

NS_ASSUME_NONNULL_END
