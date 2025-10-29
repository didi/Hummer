//
//  HMStorage.h
//  Hummer
//
//  Created by UJOY on 2020/2/6.
//  Copyright © 2020 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Hummer/HMStorageProtocol.h>


NS_ASSUME_NONNULL_BEGIN

/**
 * 内部会根据 js 上下文查找 对应 namespace 的 Storage 组件
 * 注意： 如果native侧直接调用，需要通过HMStorageAdaptor 获取对应 namespace 的 Storage 组件。见 HMConfigEntryManager.h
 *
 * 存储方式：key为文件名，value为对应文件
 * 例如: sandbox/namespace/key -> value
 * 注意：不支持带有"/"的文件名(key)
 */


@interface HMStorageImp : NSObject<HMStorage>
@property (nonatomic, strong, readonly) NSString *path;

- (instancetype)initWithPath:(NSString *)path;
@end


@interface HMStorage : NSObject


@end

NS_ASSUME_NONNULL_END
