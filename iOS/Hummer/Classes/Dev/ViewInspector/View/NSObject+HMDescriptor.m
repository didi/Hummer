//
//  NSObject+HMDescriptor.m
//  Hummer
//
//  Created by didi on 2021/11/3.
//

#import "NSObject+HMDescriptor.h"
#import <Hummer/HMExportManager.h>
#import <Hummer/HMExportClass.h>
#import <Hummer/NSObject+Hummer.h>

@implementation NSObject (HMDescriptor)

- (nullable NSString *)hm_ID {
    
    return @"";
}

- (NSString *)hm_objcClassName {
    return NSStringFromClass(self.class);
}

- (NSString *)hm_jsClassName {
    
    HMExportClass *cls = [[HMExportManager sharedInstance].objcClasses objectForKey:self.hm_objcClassName];
    if (cls) {
        return cls.jsClass;
    }
    return @"";
}

- (nullable HMBaseValue *)hm_jsObject {
    return self.hmValue;
}


- (BOOL)isHMObject {
    
    return [self hm_ID];
}

@end
