//
//  HMStorageAdaptor.h
//  Hummer
//
//  Created by GY on 2024/10/28.
//

#import <Foundation/Foundation.h>
NS_ASSUME_NONNULL_BEGIN

@protocol HMStorage <NSObject>

- (BOOL)saveData:(id<NSCoding>)data forKey:(NSString *)key;
- (id<NSCoding>)ObjectForKey:(NSString *)key;
- (BOOL)existForKey:(NSString *)key;
- (BOOL)removeForKey:(NSString *)key;

- (NSArray <NSString *> *)allKeys;

- (NSDictionary *)getAll;


- (BOOL)removeAll;
@end


@interface HMStorageAdaptor : NSObject

/**
 * 业务线实例隔离。架构如下：
 *       HMConfigEntryManager : namespace <---> id<HMStorage>
 *         HMStorageAdaptor   : namespace <--> id<HMStorage>(HMStorageImp)
 *
 * js->call(Storage.removeAll):
 * HMConfigEntryManager.storageForNamespace(namespace) != nil ----> storage.removeAll
 * HMStorageAdaptor.storageForNamespace(namespace)            ----> storage.removeAll
 *
 * 由适配器根据业务线分配 storage 分配实例。规则如下：
 * 1. namespace 为空，则不区分业务线(使用hummer默认文件目录)，removeall 会删除默认文件目录下所有文件。
 * 2. namespace 存在，则区分业务线，removeall 只删除默认对应业务线 文件。
 * 3. namespace 存在且注册了适配器，则由对应 业务线的拦截器自己负责处理。
 */
+ (id<HMStorage>)storageWithNamespace:(nullable NSString *)namespace;

@end

/**
 * 内部会根据 js 上下文查找 对应 namespace 的 Storage 组件
 * 注意： 如果native侧直接调用，需要通过HMStorageAdaptor 获取对应 namespace 的 Storage 组件。见 HMConfigEntryManager.h
 *
 * 存储方式：key为文件名，value为对应文件
 * 例如: sandbox/namespace/key -> value
 * 注意：不支持带有"/"的文件名(key)
 *
 * 内部为 文件读写：NSFileManager、NSKeyedArchiver 。天然线程安全
 */

@interface HMStorageTS : NSObject<HMStorage>
@property (nonatomic, strong, readonly) NSString *path;

- (instancetype)initWithPath:(NSString *)path;
@end

NS_ASSUME_NONNULL_END
