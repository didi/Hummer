//
//  HMExportMethod.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportMethod.h"
#import <Hummer/HMFunctionParser.h>

@interface HMExportMethod ()

@property (nonatomic, assign) BOOL parsed;

@end

@implementation HMExportMethod

- (SEL)getTestSelector {
    return self.selector;
}

- (void)setUnparseToken:(NSString *)unparseToken {
    _parsed = NO;
    _unparseToken = unparseToken;
}


- (void)parse {
    
    if (![self optimizable] || self.parsed) {return;}
    self.parsed = YES;
    _methodSignature = HMFunctionParse(self.unparseToken.UTF8String);
    self.selector = NSSelectorFromString(_methodSignature.selector);
    if (jsFieldName.length == 0) {
        self.jsFieldName = _methodSignature.selectorPrefix;
    }
}

- (HMMethodType)methodType {
    if (self.methodSignature) {
        return self.methodSignature.flag;
    }
    if ([self.flag isEqualToString:@"+"]) {
        return HMMethodTypeClass;
    } else if ([self.flag isEqualToString:@"-"]) {
        return HMMethodTypeInstance;
    }
    return HMMethodTypeUnknow;
}


- (BOOL)optimizable {

    return self.unparseToken && self.unparseToken.length > 0;
}


@synthesize jsFieldName;
@synthesize unparseToken = _unparseToken;
@synthesize methodSignature = _methodSignature;
@synthesize flag;

@end
