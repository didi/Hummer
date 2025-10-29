//
//  HMMemCache.h
//  Hummer
//
//  Created by UJOY on 2020/2/6.
//  Copyright © 2020 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMMemoryComponent.h>
/**
 * 内部会根据 js 上下文查找 对应 namespace 的 memory 组件
 * 注意： 如果native侧直接调用，需要通过 HMMemoryAdaptor 获取对应 namespace 的 memory 组件。见 HMConfigEntryManager.h
 *
 * 存储方式：key为文件名，value为对应文件
 */

@interface HMMemCache : NSObject

@end


@interface HMMemoryComponent : NSObject<HMMemoryComponent>
@property (nonatomic, strong, readonly) NSString *namespace;

- (instancetype)initWithNamespace:(NSString *)namespace;
@end
