//
//  HMExportProperty.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportProperty.h"

@implementation HMExportProperty

- (SEL)getTestSelector {
    return self.propertyGetterSelector;
}

@synthesize jsFieldName;

@synthesize unparseToken;

@synthesize userToken;

- (void)parse {

}

@end
