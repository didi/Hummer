//
//  HMRequestComponent.h
//  Hummer
//
//  Created by didi on 2022/3/8.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMRequestComponent <NSObject>

@property (nonatomic, copy) NSString *url;
@property (nonatomic, copy) NSString *method;           // default POST
@property (nonatomic, assign) NSTimeInterval timeout;
@property (nonatomic, strong) NSDictionary *header;
@property (nonatomic, strong) NSDictionary *param;

+ (id<HMRequestComponent>)create;
- (void)send:(HMFuncCallback)callback;
@end

NS_ASSUME_NONNULL_END
