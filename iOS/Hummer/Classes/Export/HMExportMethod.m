//
//  HMExportMethod.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportMethod.h"

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
    
}

- (BOOL)optimizable {

    return self.unparseToken && self.unparseToken.length > 0;
}


@synthesize jsFieldName;
@synthesize unparseToken = _unparseToken;
@synthesize flag;

@end
