//
//  HMTimeUtils.m
//  Hummer
//
//  Created by GY on 2024/10/29.
//

#import "HMTimeUtils.h"

double HMCalculateBlockTimeMS(dispatch_block_t block) {
    
    struct timespec beforeTimespec;
    HMClockGetTime(&beforeTimespec);

    block();
    
    struct timespec afterTimespec;
    HMClockGetTime(&afterTimespec);
    struct timespec resultTimespec;
    HMDiffTime(&beforeTimespec, &afterTimespec, &resultTimespec);

    return resultTimespec.tv_sec * 1000 + resultTimespec.tv_nsec / 1000000;
}


@interface HMTimestamp()

@property(nonatomic, assign) struct timespec timespec;

@end

@implementation HMTimestamp

static NSDateFormatter *_HMTimestamp_dataFormatter = nil;
+ (void)initialize {
    _HMTimestamp_dataFormatter = [[NSDateFormatter alloc] init];
    [_HMTimestamp_dataFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss.SSS"];
    [_HMTimestamp_dataFormatter setTimeZone:[NSTimeZone new]];
}

- (instancetype)init{
    self = [super init];
    if (self) {
        HMClockGetTime(&_timespec);
    }
    return self;
}
+ (HMTimestamp *)create {
    return [[HMTimestamp alloc] init];
}

- (unsigned long long)getMilliseconds{
    return (_timespec.tv_sec * 1000 + _timespec.tv_nsec / 1000000);
}

- (double)calculateIntervalInMS {
    
    struct timespec afterTimespec;
    HMClockGetTime(&afterTimespec);
    struct timespec resultTimespec;
    HMDiffTime(&_timespec, &afterTimespec, &resultTimespec);
    return resultTimespec.tv_sec * 1000 + resultTimespec.tv_nsec / 1000000;
}

- (NSString *)description {

    double ms = (double)self.getMilliseconds/1000.000f;
    NSDate *date = [NSDate dateWithTimeIntervalSince1970:ms];
    NSString *msString = [_HMTimestamp_dataFormatter stringFromDate:date];
    NSString *des = [NSString stringWithFormat:@"时间：%@，时间戳：%ld", msString, self.getMilliseconds];
    return des;
}

@end

@implementation HMTimeUtils

+ (HMTimestamp *)createTimestamp {
    return [HMTimestamp create];
}
@end
