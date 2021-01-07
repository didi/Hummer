//
//  HMViewManagerDTOModel.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/12/22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMViewManagerDTOModel : NSObject <NSSecureCoding, NSCopying>

@property (nonatomic, nullable, copy) NSString *viewClassName;

@property (nonatomic, nullable, copy) NSString *parentViewManagerClassName;

@property (nonatomic, nullable, copy) NSArray<NSString *> *propertyList;

@end

NS_ASSUME_NONNULL_END
