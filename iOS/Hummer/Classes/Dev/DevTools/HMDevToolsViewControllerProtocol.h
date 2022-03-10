//
//  HMDevToolsViewControllerProtocol.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class HMJSContext;
@protocol HMDevToolsViewControllerProtocol <NSObject>

@property (nonatomic, strong) HMJSContext *context;

@optional
- (void)refresh;
@end

NS_ASSUME_NONNULL_END
