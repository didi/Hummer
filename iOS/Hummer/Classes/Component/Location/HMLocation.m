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

NS_ASSUME_NONNULL_BEGIN

static const CLLocationDegrees RANGE_LON_MAX = 137.8347;

static const CLLocationDegrees RANGE_LON_MIN = 72.004;

static const CLLocationDegrees RANGE_LAT_MAX = 55.8271;

static const CLLocationDegrees RANGE_LAT_MIN = 0.8293;

static const CLLocationDegrees jzEE = 0.00669342162296594323;

static const CLLocationDegrees jzA = 6378245.0;

static BOOL isOutOfChina(CLLocationDegrees latitude, CLLocationDegrees longitude) {
    if (longitude < RANGE_LON_MIN || longitude > RANGE_LON_MAX)
        return true;
    if (latitude < RANGE_LAT_MIN || latitude > RANGE_LAT_MAX)
        return true;
    
    return false;
}

static CLLocationDegrees LAT_OFFSET_0(CLLocationDegrees x, CLLocationDegrees y) {
    return -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * sqrt(fabs(x));
}

static CLLocationDegrees LAT_OFFSET_1(CLLocationDegrees x) {
    return (20.0 * sin(6.0 * x * M_PI) + 20.0 * sin(2.0 * x * M_PI)) * 2.0 / 3.0;
}

static CLLocationDegrees LAT_OFFSET_2(CLLocationDegrees y) {
    return (20.0 * sin(y * M_PI) + 40.0 * sin(y / 3.0 * M_PI)) * 2.0 / 3.0;
}

static CLLocationDegrees LAT_OFFSET_3(CLLocationDegrees y) {
    return (160.0 * sin(y / 12.0 * M_PI) + 320 * sin(y * M_PI / 30.0)) * 2.0 / 3.0;
}

static CLLocationDegrees LON_OFFSET_0(CLLocationDegrees x, CLLocationDegrees y) {
    return 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * sqrt(fabs(x));
}

static CLLocationDegrees LON_OFFSET_1(CLLocationDegrees x) {
    return (20.0 * sin(6.0 * x * M_PI) + 20.0 * sin(2.0 * x * M_PI)) * 2.0 / 3.0;
}

static CLLocationDegrees LON_OFFSET_2(CLLocationDegrees x) {
    return (20.0 * sin(x * M_PI) + 40.0 * sin(x / 3.0 * M_PI)) * 2.0 / 3.0;
}

static CLLocationDegrees LON_OFFSET_3(CLLocationDegrees x) {
    return (150.0 * sin(x / 12.0 * M_PI) + 300.0 * sin(x / 30.0 * M_PI)) * 2.0 / 3.0;
}

static CLLocationDegrees transformLatLon(CLLocationDegrees x, CLLocationDegrees y) {
    CLLocationDegrees ret = LAT_OFFSET_0(x, y);
    ret += LAT_OFFSET_1(x);
    ret += LAT_OFFSET_2(y);
    ret += LAT_OFFSET_3(y);
    
    return ret;
}

static CLLocationDegrees transformLonLon(CLLocationDegrees x, CLLocationDegrees y) {
    CLLocationDegrees ret = LON_OFFSET_0(x, y);
    ret += LON_OFFSET_1(x);
    ret += LON_OFFSET_2(x);
    ret += LON_OFFSET_3(x);
    
    return ret;
}

static CLLocationCoordinate2D convertWGS84ToGCJ02(CLLocationCoordinate2D location) {
    CLLocationCoordinate2D resPoint;
    double mgLat;
    double mgLon;
    if (isOutOfChina(location.latitude, location.longitude)) {
        resPoint.latitude = location.latitude;
        resPoint.longitude = location.longitude;
        
        return resPoint;
    }
    CLLocationDegrees dLat = transformLatLon(location.longitude - 105.0, location.latitude - 35);
    CLLocationDegrees dLon = transformLonLon(location.longitude - 105, location.latitude - 35);
    CLLocationDegrees radLat = location.latitude / 180.0 * M_PI;
    CLLocationDegrees magic = sin(radLat);
    magic = 1 - jzEE * magic * magic;
    CLLocationDegrees sqrtMagic = sqrt(magic);
    dLat = (dLat * 180.0) / ((jzA * (1 - jzEE)) / (magic * sqrtMagic) * M_PI);
    dLon = (dLon * 180.0) / (jzA / sqrtMagic * cos(radLat) * M_PI);
    mgLat = location.latitude + dLat;
    mgLon = location.longitude + dLon;
    
    resPoint.latitude = mgLat;
    resPoint.longitude = mgLon;
    
    return resPoint;
}

NS_ASSUME_NONNULL_END

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
@property (nonatomic, copy) HMFunctionType errorCallback;
@property (nonatomic, copy) HMFunctionType locationCallback;

@end

@implementation HMLocation

#pragma mark - Export

HM_EXPORT_CLASS(Location, HMLocation)

HM_EXPORT_METHOD(onError, __onError:)
HM_EXPORT_METHOD(getLastLocation, __getLastLocation:)
HM_EXPORT_METHOD(startLocation, __startLocation:interval:distance:)
HM_EXPORT_METHOD(stopLocation, __stopLocation)

- (void)__onError:(HMFunctionType)errorCallback
{
    self.errorCallback = errorCallback;
}

- (void)__getLastLocation:(HMFunctionType)locCallback
{
    HMExecOnMainQueue(^{
        NSDictionary *locInfo = [self dataWithLocation:self.lastLocation];
        HM_SafeRunBlock(locCallback,@[locInfo]);
    });
}

- (void)__startLocation:(HMFunctionType)locCallback interval:(HMBaseValue *)jsInterval distance:(HMBaseValue *)jsDistance
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
    CLLocationCoordinate2D locationCoordinate2D = convertWGS84ToGCJ02(location.coordinate);
    locInfo[@"latitude"] = @(locationCoordinate2D.latitude);
    locInfo[@"longitude"] = @(locationCoordinate2D.longitude);
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
