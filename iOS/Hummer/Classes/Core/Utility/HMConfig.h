//
//  HMConfig.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "Hummer.h"

@interface HMConfig : NSObject <HMConfigBuilder>
/// hm 单位设计稿大小，默认 750 px
@property (nonatomic, assign) CGFloat pixel;
/// px 单位设计稿转换缩放程度，默认 1x
@property (nonatomic, assign) CGFloat scale;
/// 资源路径：涉及资源的目录路径
@property (nonatomic, copy) NSArray *resourcePathList;
/// 新增资源目录
- (void)addResourcePath:(NSString *)resourcePath;

+ (instancetype)sharedInstance;

@end
