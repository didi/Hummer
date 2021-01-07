//
//  HMBorderModelCollection.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/4/17.
//

#import <Foundation/Foundation.h>

@class HMBorderModel;

NS_ASSUME_NONNULL_BEGIN

@interface HMBorderModelCollection : NSObject <NSCopying>

@property (nonatomic, nullable, copy) HMBorderModel *left;

@property (nonatomic, nullable, copy) HMBorderModel *top;

@property (nonatomic, nullable, copy) HMBorderModel *bottom;

@property (nonatomic, nullable, copy) HMBorderModel *right;

@end

NS_ASSUME_NONNULL_END
