//
//  HMExportMethod.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportMethod.h"

@implementation HMExportMethod

- (SEL)getTestSelector {
    return self.selector;
}




- (void)setUnparseToken:(NSString *)unparseToken {
    
    _unparseToken = unparseToken;
}


- (void)parse {
    
}

@synthesize jsFieldName;
@synthesize unparseToken = _unparseToken;
@synthesize userToken;
@end
