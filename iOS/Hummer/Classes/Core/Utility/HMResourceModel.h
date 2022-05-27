//
//  HMResourceModel.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/5/7.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN


/**
 * framework 内的 bundle ，需要先获取 framework 路径，再获取bundle 内的 资源。目前暂时不考虑 framework 内的资源。
 *
 * 目前只支持 mainbundle 内的 资源查找，包括 mainbundle 下，二级 bundle 内的资源
 */


@interface HMLocalResourceModel : NSObject

@property (nonatomic, strong) NSBundle *bundle;

/// sandbox 路径，和 bundle 互斥
@property (nonatomic, copy) NSString *filePath;

/// 不包括扩展名部分
@property (nonatomic, copy) NSString *sourceName;

/// 扩展名部分
@property (nonatomic, copy) NSString *extensionName;


/**
 * 解析支持格式如下：
 *  sourceName -> 
 * "xxx.bundle/sourceName"
 * "/xxx/xxx/xxx/xx.bundle/sourceName"
 * "/sandbox/xxx/xxx/xx/sourceName"
 *
 *  ⚠️ sourceName 中不可以包含"/"
 */

/// @param source 待解析路径
- (instancetype)initWithSource:(NSString *)source;
@end

NS_ASSUME_NONNULL_END
