//
//  HMCornerRadiusModel.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/4/16.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMCornerRadiusModel : NSObject <NSCopying>

@property (nonatomic, assign) double topLeft;

@property (nonatomic, assign) double topRight;

@property (nonatomic, assign) double bottomLeft;

@property (nonatomic, assign) double bottomRight;

@end

NS_ASSUME_NONNULL_END
