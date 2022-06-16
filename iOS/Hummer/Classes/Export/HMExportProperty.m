//
//  HMExportProperty.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportProperty.h"
#import <Hummer/HMFunctionParser.h>

@interface HMExportProperty()

@property (nonatomic, assign) BOOL parsed;
@end

@implementation HMExportProperty

- (void)setUnparseToken:(NSString *)unparseToken {
    
    _parsed = NO;
    _unparseToken = unparseToken;
}

- (SEL)getTestSelector {
    return self.propertyGetterSelector;
}

- (void)parse {
    
    if (![self optimizable] || self.parsed) {return;}
    self.parsed = YES;
    HMMethodArgument *arg = HMArgumentParse([NSString stringWithFormat:@"(%@)",self.unparseToken].UTF8String);
    //getter
    _methodSignature = [[HMMethodSignature alloc] initWithFlag:[self methodType] returnValue:arg arguments:@[arg] selector:NSStringFromSelector(self.propertyGetterSelector) selectorPrefix:self.jsFieldName];
    
    //setter
    
    
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
