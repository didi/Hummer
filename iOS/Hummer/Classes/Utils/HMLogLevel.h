//
//  HMLogLevel.h
//  Pods
//
//  Created by GY on 2024/10/25.
//

#ifndef HMLogLevel_h
#define HMLogLevel_h

typedef NS_ENUM(NSUInteger, HMLogLevel) {
  HMLogLevelTrace = 0,
  HMLogLevelInfo,
  HMLogLevelWarning,
  HMLogLevelError,
  HMLogLevelFatal
};


typedef NS_ENUM(NSUInteger, HMConsoleLevel) {
    HMConsoleLevelLog = 0,
    HMConsoleLevelDebug,
    HMConsoleLevelInfo,
    HMConsoleLevelWarning,
    HMConsoleLevelError,
};

#endif /* HMLogLevel_h */
