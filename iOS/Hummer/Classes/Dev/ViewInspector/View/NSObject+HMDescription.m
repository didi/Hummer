//
//  NSObject+HMDescriptor.m
//  Hummer
//
//  Created by didi on 2021/11/3.
//

#import "NSObject+HMDescription.h"
#import <Hummer/HMExportManager.h>
#import <Hummer/HMExportClass.h>
#import <Hummer/NSObject+Hummer.h>
#import <objc/runtime.h>

@implementation NSObject (HMDescription)

- (NSNumber *)hummerId {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHummerId:(NSNumber *)hummerId {
    objc_setAssociatedObject(self, @selector(hummerId), hummerId, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}


- (nullable NSString *)hm_ID {
    NSNumber *hid = self.hummerId;
    if (hid) {
        return [NSString stringWithFormat:@"%@", hid];
    }
    return nil;
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


- (NSString *)hm_description {
    
    NSString *idDesc = [[self hm_ID] description];
    NSString *objcNameDesc = [[self hm_objcClassName] description];
    NSString *jsNameDesc = [[self hm_jsClassName] description];

   NSString *desc = [NSString stringWithFormat:@"id:%@,\n objcClassName:%@,\n jsClassName:%@,\n",idDesc, objcNameDesc, jsNameDesc];
    return desc;
}
@end
