//
//  NSObject+HMDescriptor.h
//  Hummer
//
//  Created by didi on 2021/11/3.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMDescription.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSObject (HMDescription)<HMObjectDescription>

@property (nonatomic, strong, nullable) NSNumber *hummerId;

- (NSString *)hm_description;

/// 标准容器展开
- (NSString *)hm_devDescription;

@end

NS_ASSUME_NONNULL_END
