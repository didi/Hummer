//
//  WeakPointerWrapper.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/4/23.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface WeakPointerWrapper<__covariant ObjectType> : NSObject

@property (nonatomic, nullable, weak) ObjectType value;

@end

NS_ASSUME_NONNULL_END
