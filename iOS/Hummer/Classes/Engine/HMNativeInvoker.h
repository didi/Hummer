//
//  HMNativeInvoker.h
//  Hummer
//
//  Created by didi on 2022/4/1.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMExportManager.h>
#import <Hummer/HMBaseValue.h>
NS_ASSUME_NONNULL_BEGIN

struct HMNativeCallInfo {
    
    HMExportClass *exportCls;
    id <HMBaseExecutorProtocol> executor;
    id target;
    NSString *functionName;
    NSArray <HMBaseValue *> *args;
};

typedef struct CG_BOXABLE HMNativeCallInfo HMNativeCallInfo;

// JS Call Native
// 
@interface HMNativeInvoker : NSObject
+ (nullable HMBaseValue *)invoke:(HMNativeCallInfo)info;
@end

NS_ASSUME_NONNULL_END
