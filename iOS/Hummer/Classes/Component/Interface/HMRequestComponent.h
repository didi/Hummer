//
//  HMRequestComponent.h
//  Hummer
//
//  Created by didi on 2022/3/8.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMBaseExecutorProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMRequestComponent <NSObject>

@property (nonatomic, copy) NSString *url;
@property (nonatomic, copy) NSString *method;           // default POST
@property (nonatomic, assign) NSTimeInterval timeout;
@property (nonatomic, strong) NSDictionary *header;
@property (nonatomic, strong) NSDictionary *param;

// 下载参数
@property (nonatomic, copy) NSString *filePath;

+ (id<HMRequestComponent>)create;
- (void)send:(HMFuncCallback)callback;

@optional
// 注意保存路径
- (void)download:(HMFuncCallback)callback;
@end

NS_ASSUME_NONNULL_END
