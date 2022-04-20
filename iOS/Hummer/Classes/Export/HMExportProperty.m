//
//  HMExportProperty.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportProperty.h"

@interface HMExportProperty()

@property (nonatomic, assign) BOOL needParsed;
@end

@implementation HMExportProperty

- (void)setUnparseToken:(NSString *)unparseToken {
    
    _needParsed = YES;
    _unparseToken = unparseToken;
}

- (SEL)getTestSelector {
    return self.propertyGetterSelector;
}



- (void)parse {

}



@synthesize jsFieldName;

@synthesize unparseToken = _unparseToken;

@synthesize flag;

@end
