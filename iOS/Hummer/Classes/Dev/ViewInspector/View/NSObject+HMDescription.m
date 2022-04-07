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

- (NSString *)hm_devDescription {
    
    return [self hm_descriptionWithIndent:0];
}

- (NSString *)hm_descriptionWithIndent:(NSUInteger)level {
    return [self description];
}
@end


static NSString *indentUnit = @"    ";
static inline NSString * appendStrings(NSString *string, NSUInteger level) {
    for (int i = 0; i<level; i++) {
        string = [string stringByAppendingString:indentUnit];
    }
    return string;
}
@implementation NSDictionary (HMDescription)

// Specifies a level of indentation, to make the output more readable: the indentation is (4 spaces) * level.
- (NSString *)hm_descriptionWithIndent:(NSUInteger)level {

    NSUInteger  nextLevel = level;
    NSString    *iBaseString = @"";
    iBaseString = appendStrings(iBaseString, level);
    NSString    *iSizeString = iBaseString;
    nextLevel++;
    iSizeString = [iSizeString stringByAppendingString:indentUnit];
    
    NSMutableString *res = [NSMutableString stringWithString:@"{\n"];
    [self enumerateKeysAndObjectsUsingBlock:^(NSObject *key, NSObject *obj, BOOL * _Nonnull stop) {
        [res appendString:iSizeString];//indent
        //key
        NSString *keySubDescriptionStr = [key hm_descriptionWithIndent:nextLevel];
        [res appendString:keySubDescriptionStr];
        [res appendString:@" = "];
        //value
        NSString *valSubDescriptionStr = [obj hm_descriptionWithIndent:nextLevel];
        [res appendString:valSubDescriptionStr ? : @"nil"];
        [res appendString:@";\n"];
    }];
    [res appendString:iBaseString];//indent
    [res appendString:@"}"];

    return res;
}

@end

@implementation NSArray (HMDescription)

- (NSString *)hm_descriptionWithIndent:(NSUInteger)level {
    
    NSUInteger count = [self count];
    NSUInteger last = count - 1;
    
    NSUInteger  nextLevel = level;
    NSString    *iBaseString = @"";
    iBaseString = appendStrings(iBaseString, nextLevel);
    NSString    *iSizeString = iBaseString;
    nextLevel++;
    iSizeString = [iSizeString stringByAppendingString:indentUnit];
    
    
    NSMutableString *res = [NSMutableString stringWithString:@"(\n"];
    [self enumerateObjectsUsingBlock:^(NSObject  *obj, NSUInteger idx, BOOL * _Nonnull stop) {
        
        [res appendString:iSizeString];//indent
        NSString *subDescriptionStr = [obj hm_descriptionWithIndent:nextLevel];
        [res appendString:subDescriptionStr ? : @"nil"];
        if (idx == last) {
            [res appendString:@"\n"];
        }else{
            [res appendString:@",\n"];
        }
    }];
    [res appendString:iBaseString];//indent
    [res appendString:@")"];

    return res;
}

@end
@implementation HMBaseValue (HMDescription)

- (NSString *)hm_descriptionWithIndent:(NSUInteger)level {
    NSObject *ocObject = [self toObject];
    //case 1: js function

    if (self.isFunction) {
        return @"匿名函数";
    }
    //case 2: external object
    if (self.isNativeObject) {
        return [NSString stringWithFormat:@"%@<%p>", [ocObject hm_jsClassName], ocObject];
    }
    //case 3: standard container
    return [ocObject hm_descriptionWithIndent:level];
}
@end
