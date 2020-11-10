//
//  HMResourceModel.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/5/7.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMResourceModel : NSObject <NSCopying>

// 为空说明是 mainBundle
@property (nonatomic, strong, nullable) NSBundle *resourceBundle;

@property (nonatomic, nullable, copy) NSString *filePath;

@end

NS_ASSUME_NONNULL_END
