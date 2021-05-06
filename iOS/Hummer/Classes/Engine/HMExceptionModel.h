//
//  HMExceptionModel.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/10.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMExceptionModel : NSObject <NSSecureCoding, NSCopying>

@property (nonatomic, nullable, copy) NSNumber *column;

@property (nonatomic, nullable, copy) NSNumber *line;

// Can't find variable: view
@property (nonatomic, nullable, copy) NSString *message;

// ReferenceError
@property (nonatomic, nullable, copy) NSString *name;

// eval code
// eval@[native code]
// global code
// evaluateWithScopeExtension@[native code]
//
// _wrapCall
@property (nonatomic, nullable, copy) NSString *stack;

@end

@interface HMExceptionModel ()

- (instancetype)initWithParams:(NSDictionary *)params;
@end

NS_ASSUME_NONNULL_END
