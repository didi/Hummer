//
//  HMLocation.m
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMLocation.h"
#import "HMExportManager.h"
#import <CoreLocation/CoreLocation.h>
#import "HMUtility.h"
#import "HMJSCWeakValue.h"
#import "HMJSCExecutor.h"
#import "NSObject+Hummer.h"

typedef NS_ENUM(NSInteger, HMLocationManagerState) {
    HMLocationManagerStateUnknown   = 0,
    HMLocationManagerStateDisabled  = 1001,             //定位不可用
    HMLocationManagerStateFailued   = 1002,             //定位失败
    HMLocationManagerStateSuccess,                      //定位成功
};

@interface HMLocation () <CLLocationManagerDelegate>

@property (nonatomic, assign) HMLocationManagerState locationState;
@property (nonatomic, strong) CLLocationManager *locationManager;
@property (nonatomic, strong) CLLocation *lastLocation;
@property (nonatomic, strong) dispatch_source_t timer;
@property (nonatomic, copy) HMClosureType errorCallback;
@property (nonatomic, copy) HMClosureType locationCallback;

@end

@implementation HMLocation

#pragma mark - Export

HM_EXPORT_CLASS(Location, HMLocation)

HM_EXPORT_METHOD(onError, __onError:)
HM_EXPORT_METHOD(getLastLocation, __getLastLocation:)
HM_EXPORT_METHOD(startLocation, __startLocation:interval:distance:)
HM_EXPORT_METHOD(stopLocation, __stopLocation)

- (void)__onError:(HMClosureType)errorCallback
{
    self.errorCallback = errorCallback;
}

- (void)__getLastLocation:(HMClosureType)locCallback
{
    HMExecOnMainQueue(^{
        NSDictionary *locInfo = [self dataWithLocation:self.lastLocation];
        HM_SafeRunBlock(locCallback,@[locInfo]);
    });
}

- (void)__startLocation:(HMClosureType)locCallback interval:(HMBaseValue *)jsInterval distance:(HMBaseValue *)jsDistance
{
    self.locationCallback = locCallback;
    double interval = jsInterval.toNumber ? jsInterval.toNumber.doubleValue : 1000 * 60;
    double distance = jsDistance.toNumber ? jsDistance.toNumber.doubleValue : 0;
    [self startLocationTimerWithInterval:interval];
    [self startLocationWithDistance:distance];
}

- (void)__stopLocation
{
    [self stopLocationTimer];
    [self stopLocation];
}

#pragma mark -

- (void)dealloc
{
    [self stopLocationTimer];
    [self stopLocation];
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _locationState = HMLocationManagerStateUnknown;
    }
    return self;
}

#pragma mark - timer

- (void)stopLocationTimer
{
    if (self.timer) {
        dispatch_source_cancel(self.timer);
        self.timer = nil;
    }
}

- (void)startLocationTimerWithInterval:(NSTimeInterval)interval
{
    [self stopLocationTimer];
    
    self.timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, dispatch_get_main_queue());
    dispatch_time_t start = dispatch_walltime(DISPATCH_TIME_NOW, 0);
    uint64_t intervalNanoseconds = interval*1000*1000;
    dispatch_source_set_timer(self.timer, start, intervalNanoseconds, 0);
    
    __weak typeof(self)weakSelf = self;
    dispatch_source_set_event_handler(self.timer, ^() {
        __strong typeof(self) self = weakSelf;
        [self doLocationTimerAction];
    });
    dispatch_resume(self.timer);
}

- (void)doLocationTimerAction
{
    HMExecOnMainQueue(^{
        NSDictionary *locInfo = [self dataWithLocation:self.lastLocation];
        HM_SafeRunBlock(self.locationCallback,@[locInfo]);
    });
}

#pragma mark - location

- (CLLocationManager *)locationManager
{
    if (nil == _locationManager) {
        _locationManager = [[CLLocationManager alloc] init];
    }
    return _locationManager;
}

- (BOOL)isLocationServiceEnabled
{
    CLAuthorizationStatus status = [CLLocationManager authorizationStatus];
    if (status == kCLAuthorizationStatusDenied ||
        status == kCLAuthorizationStatusRestricted) {
        return NO;
    }
    return YES;
}

- (void)startLocationWithDistance:(CGFloat)distance accuracy:(CGFloat)accuracy
{
    if ([self isLocationServiceEnabled]) {
        self.locationManager.delegate = self;
        self.locationManager.desiredAccuracy = accuracy;
        self.locationManager.distanceFilter = distance;
#ifdef __IPHONE_8_0
        if ([self.locationManager respondsToSelector:@selector(requestAlwaysAuthorization)]) {
            [self.locationManager requestAlwaysAuthorization];
        }
#endif
#ifdef __IPHONE_9_0
        if ([self.locationManager respondsToSelector:@selector(setAllowsBackgroundLocationUpdates:)]) {
            if(!self.locationManager.allowsBackgroundLocationUpdates) {
#if !TARGET_IPHONE_SIMULATOR
                @try{
                    [self.locationManager setAllowsBackgroundLocationUpdates:YES];
                } @catch (NSException *exception) {
                }
#endif
            }
        }
#endif
        [self.locationManager startUpdatingLocation];
        [self notifyWithState:HMLocationManagerStateSuccess message:nil];
    } else {
        self.locationState = HMLocationManagerStateUnknown;
        [self notifyWithState:HMLocationManagerStateDisabled message:@"无定位权限"];
    }
}

- (void)startLocationWithDistance:(CGFloat)distance
{
    [self startLocationWithDistance:distance accuracy:kCLLocationAccuracyBest];
}

- (void)stopLocation
{
    if (self.locationManager) {
        self.locationManager.delegate = nil;
        [self.locationManager stopUpdatingLocation];
        self.locationManager = nil;
    }
    self.locationState = HMLocationManagerStateUnknown;
}

- (void)notifyWithState:(HMLocationManagerState)state message:(NSString *)message
{
    if (state == HMLocationManagerStateDisabled) {
        [self stopLocationTimer];
    } else if (state == HMLocationManagerStateFailued) {
        HMExecOnMainQueue(^{
//            NSArray *errorData = @[@(state),message?:@""];
            HM_SafeRunBlock(self.errorCallback, @[@(state), message ?: @""]);
        });
    }
    
    if (state != self.locationState) {
        self.locationState = state;
        HMExecOnMainQueue(^{
            [[NSNotificationCenter defaultCenter] postNotificationName:@"kHMNotificationLocationStateChange" object:@(self.locationState)];
        });
    }
}

- (NSDictionary *)dataWithLocation:(CLLocation *)location
{
    if (nil == location) {
        return @{};
    }
    
    NSMutableDictionary *locInfo = [NSMutableDictionary dictionary];
    locInfo[@"latitude"] = @(location.coordinate.latitude);
    locInfo[@"longitude"] = @(location.coordinate.longitude);
    locInfo[@"altitude"] = @(location.altitude);
    locInfo[@"accuracy"] = @(location.horizontalAccuracy);
    locInfo[@"speed"] = @(location.speed);
    locInfo[@"bearing"] = @(location.course);
    locInfo[@"timestamp"] = @([location.timestamp timeIntervalSince1970] * 1000);
    return locInfo;
}

#pragma mark - CLLocationManagerDelegate

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
    switch (status) {
        case kCLAuthorizationStatusNotDetermined:
        {
#ifdef __IPHONE_8_0
            if ([self.locationManager respondsToSelector:@selector(requestAlwaysAuthorization)]) {
                [self.locationManager requestAlwaysAuthorization];
            }
#endif
            [self.locationManager startUpdatingLocation];
        }
            break;
            
        default:
            break;
    }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
    if (locations.count > 0) {
        CLLocation *theLocation = locations.lastObject;
        self.lastLocation = theLocation;
        
        HMExecOnMainQueue(^{
            NSDictionary *locInfo = [self dataWithLocation:self.lastLocation];
            HM_SafeRunBlock(self.locationCallback,@[locInfo]);
        });
    }
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
    NSString *msg = HMJSONEncode(error.userInfo) ?: @"无定位服务";
    [self notifyWithState:HMLocationManagerStateFailued message:msg];
}

@end
