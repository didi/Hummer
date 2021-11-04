//
//  HMViewDescriptor.h
//  Hummer
//
//  Created by didi on 2021/11/3.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMBaseValue.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMObjectDescriptor <NSObject>

- (nullable NSString *)hm_ID;

- (NSString *)hm_objcClassName;

- (NSString *)hm_jsClassName;

- (nullable HMBaseValue *)hm_jsObject;

@end


@protocol HMViewDescriptor <HMObjectDescriptor>

- (nullable NSString *)hm_content;

- (nullable NSArray<UIView *> *)hm_children;

- (nullable NSArray<HMBaseValue *> *)hm_jsChildren;

@end
NS_ASSUME_NONNULL_END
