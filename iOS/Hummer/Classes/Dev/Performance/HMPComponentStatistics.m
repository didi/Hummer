//
//  HMPComponentStatistics.m
//  Hummer
//
//  Created by didi on 2021/11/22.
//

#import "HMPComponentStatistics.h"
#import <Hummer/HMConfigEntryManager.h>
#import <objc/runtime.h>


#import <Hummer/HMCABasicAnimation.h>
#import <Hummer/HMCAKeyframeAnimation.h>
#import <Hummer/HMMemCache.h>
#import <Hummer/HMNavigator.h>
#import <Hummer/HMRequest.h>
#import <Hummer/HMNotifyCenter.h>
#import <Hummer/HMStorage.h>
#import <Hummer/HMTimer.h>
#import <Hummer/HMWebSocket.h>

// UI
#import <Hummer/HMViewPager.h>
//#import <Hummer/HMView.h>
#import <Hummer/HMToast.h>
#import <Hummer/HMInput.h>
#import <Hummer/HMTextArea.h>
#import <Hummer/HMSwitch.h>
#import <Hummer/HMScrollView.h>
#import <Hummer/HMActivityIndicatorView.h>
#import <Hummer/HMRecycleListView.h>
#import <Hummer/HMLabel.h>
#import <Hummer/HMImageView.h>
#import <Hummer/HMDialog.h>
#import <Hummer/HMButton.h>

static NSArray *_internalComponents;
static NSMutableDictionary *_statistics;

@interface HMPComponentStatisticsInfo : NSObject

@property (nonatomic, copy) NSString *componentName;

//内置组件/自定义组件
@property (nonatomic, copy) NSString *type;

@property (nonatomic, assign) NSInteger totalCount;

//组件数量权重
@property (nonatomic, assign) float countWeight;

//组件类型权重
@property (nonatomic, assign) float typeWeight;

- (instancetype)initWithComponent:(id)component;
@end

@implementation HMPComponentStatisticsInfo

- (instancetype)initWithComponent:(id)component {
    
    self = [super init];
    if (self) {
        NSString *clsName =  [NSString stringWithCString:object_getClassName(component) encoding:NSASCIIStringEncoding];
        self.componentName = clsName;
        self.type = [_internalComponents containsObject:clsName] ? @"internal" : @"external";
    }
    return self;
}

- (NSString *)description {
    
    return [NSString stringWithFormat:@"%-30s ｜ %-15s ｜ %-12ld | %-12.2f | %-12.2f \n",self.componentName.UTF8String, self.type.UTF8String,self.totalCount, self.countWeight, self.typeWeight];
}

@end

@implementation HMPComponentStatistics



static inline void _checkInternalCommponets(void){
    
    if (_internalComponents == nil) {
        _internalComponents = @[NSStringFromClass(HMCABasicAnimation.class),
                                 NSStringFromClass(HMCAKeyframeAnimation.class),
                                 NSStringFromClass(HMMemCache.class),
                                 NSStringFromClass(HMNavigator.class),
                                 NSStringFromClass(HMRequest.class),
                                 NSStringFromClass(HMNotifyCenter.class),
                                 NSStringFromClass(HMStorage.class),
                                 NSStringFromClass(HMTimer.class),
                                 NSStringFromClass(HMWebSocket.class),
                                 NSStringFromClass(UIView.class),
                                 NSStringFromClass(HMViewPager.class),
//                                 NSStringFromClass(HMView.class),
                                 NSStringFromClass(HMToast.class),
                                 NSStringFromClass(HMInput.class),
                                 NSStringFromClass(HMTextArea.class),
                                 NSStringFromClass(HMSwitch.class),
                                 NSStringFromClass(HMVerticalScrollView.class),
                                 NSStringFromClass(HMHorizontalScrollView.class),
                                 NSStringFromClass(HMActivityIndicatorView.class),
                                 NSStringFromClass(HMRecycleListView.class),
                                 NSStringFromClass(HMLabel.class),
                                 NSStringFromClass(HMImageView.class),
                                 NSStringFromClass(HMDialog.class),
                                 NSStringFromClass(HMButton.class),
        ];
    }
}

static inline NSMutableDictionary * _checkStatistics(NSString *namespace){
    
    if (_statistics == nil) {
        
        _statistics = [NSMutableDictionary new];
    }
    if (namespace == nil){
        namespace = (NSString *)HMDefaultNamespace;
    }
    if (_statistics[namespace] == nil) {
        _statistics[namespace] = [NSMutableDictionary new];
        [_statistics[namespace] setObject:@0 forKey:@"totalCount"];
        [_statistics[namespace] setObject:@0 forKey:@"totalType"];
        NSMutableDictionary *components = [NSMutableDictionary new];
        [_statistics[namespace] setObject:components forKey:@"components"];

    }
    return _statistics[namespace];
}

+ (void)createNewInstance:(id)instance namespace:(NSString *)namespace {
    
    _checkInternalCommponets();
    NSMutableDictionary *statistics = _checkStatistics(namespace);
    NSMutableDictionary *components = statistics[@"components"];
    
    NSString *clsName =  [NSString stringWithCString:object_getClassName(instance) encoding:NSASCIIStringEncoding];
    HMPComponentStatisticsInfo *s = [components objectForKey:clsName];
    if (s == nil) {
        // new type
        s = [[HMPComponentStatisticsInfo alloc] initWithComponent:instance];
        [components setObject:s forKey:clsName];
    }
    // update totalCount
    s.totalCount++;
    NSInteger totalCount = [statistics[@"totalCount"] integerValue];
    [statistics setObject:@(++totalCount) forKey:@"totalCount"];

    NSInteger totalType = [components allKeys].count;
    [statistics setObject:@(totalType) forKey:@"totalType"];

    //update weight
    [components enumerateKeysAndObjectsUsingBlock:^(NSString  *key, HMPComponentStatisticsInfo *obj, BOOL * _Nonnull stop) {
        
        obj.typeWeight = 1/(float)totalType;
        obj.countWeight = obj.totalCount/(float)totalCount;
    }];
    
    [self formattedStatisticsForNamespace:namespace];
    
}

+ (void)resetStatistic:(NSString *)namespace {

    if (_statistics) {
        [_statistics removeObjectForKey:namespace];
    }
}

+ (NSDictionary *)statisticsForNamespace:(NSString *)namespace {
    
    return _statistics.copy;
}

+ (NSString *)formattedStatisticsForNamespace:(NSString *)namespace {
    
    _checkInternalCommponets();
    NSMutableDictionary *statistics = _checkStatistics(namespace);
    NSMutableDictionary *components = statistics[@"components"];
    
    NSNumber *totalCount = statistics[@"totalCount"];
    NSInteger totalType = [components allKeys].count;
        
    
    NSMutableString *description = [NSMutableString new];
    NSString *colum = [NSString stringWithFormat:@"%-30s ｜ %-15s ｜ %-12s | %-12s | %-12s \n", "ClassName", "Type", "TotalCount", "CountWeight", "TypeWeight"];
    [description appendString:colum];
    [components enumerateKeysAndObjectsUsingBlock:^(NSString  *key, HMPComponentStatisticsInfo *obj, BOOL * _Nonnull stop) {
        
        [description appendString:obj.description];
    }];
    [description appendString:[NSString stringWithFormat:@"总数量：%@    总类型%ld", totalCount, totalType]];

    return description.copy;
}
@end
