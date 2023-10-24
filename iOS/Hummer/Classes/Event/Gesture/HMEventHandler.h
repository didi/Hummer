//
//  HMEventHandler.h
//  Hummer
//
//  Created by didi on 2023/3/13.
//

#import <Foundation/Foundation.h>
#import "HMBaseValue.h"
NS_ASSUME_NONNULL_BEGIN

@interface HMEventHandler : NSObject

@property (nonatomic, strong, readonly) NSMutableDictionary<NSString *, NSMutableArray<HMBaseValue *> *> *hm_eventTable;


- (instancetype)initWithView:(UIView *)view;

- (void)addJSEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener;

- (void)removeJSEvent:(HMBaseValue *)eventName withListener:(HMBaseValue *)listener;

- (void)fireEvent:(NSString *)eventName withParams:(NSDictionary *)params;
//- (void)addEvent:(NSString *)eventName withListener:(HMFunctionType)listener;
@end

NS_ASSUME_NONNULL_END
