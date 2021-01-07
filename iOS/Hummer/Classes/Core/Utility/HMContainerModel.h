//
//  HMContainerModel.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/9/24.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, HMContainerType) {
    HMContainerTypeNavigation = 0,
    HMContainerTypeModal
};

@interface HMContainerModel : NSObject

@property (nonatomic, assign) HMContainerType containerType;

@property (nonatomic, nullable, weak) UIViewController *viewController;

@end

NS_ASSUME_NONNULL_END
