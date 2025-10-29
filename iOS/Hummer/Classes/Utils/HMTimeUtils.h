//
//  HMTimeUtils.h
//  Hummer
//
//  Created by GY on 2024/10/29.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

static inline void HMClockGetTime(struct timespec *timespec) {
    if (@available(iOS 10.0, *)) {
        int status = clock_gettime(CLOCK_REALTIME, timespec);
        assert(!status && "clock_gettime() error");
    } else {
        timespec->tv_sec = 0;
        timespec->tv_nsec = 0;
    }
}

static inline void HMDiffTime(const struct timespec *beforeTimespec, const struct timespec *afterTimespec, struct timespec *resultTimeSpec) {
    resultTimeSpec->tv_sec = afterTimespec->tv_sec - beforeTimespec->tv_sec;
    resultTimeSpec->tv_nsec = afterTimespec->tv_nsec - beforeTimespec->tv_nsec;
    if (resultTimeSpec->tv_nsec < 0) {
        --resultTimeSpec->tv_sec;
        resultTimeSpec->tv_nsec += 1000000000;
    }
}

double HMCalculateBlockTimeMS(dispatch_block_t block);

@interface HMTimestamp : NSObject

+ (HMTimestamp *)create;
- (double)calculateIntervalInMS;
- (unsigned long long)getMilliseconds;
@end

@interface HMTimeUtils : NSObject

+ (HMTimestamp *)createTimestamp;

@end

NS_ASSUME_NONNULL_END
