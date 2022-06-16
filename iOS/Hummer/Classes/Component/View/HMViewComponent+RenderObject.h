//
//  HMViewComponent+RenderObject.h
//  Hummer
//
//  Created by didi on 2022/6/6.
//

#import "HMViewComponent.h"
#import <Hummer/HMLayout.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMViewComponent (RenderObject)
- (void)hm_configureLayoutWithBlock:(nullable HMLayoutConfigurationBlock)block;

@end

NS_ASSUME_NONNULL_END
