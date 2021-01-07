//
//  HMRecycleListView+CallJS.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRecycleListView+CallJS.h"
#import <objc/runtime.h>

@implementation HMRecycleListView (CallJS)

HM_EXPORT_PROPERTY(onRegister, getCellTypeCallback, setCellTypeCallback:)
HM_EXPORT_PROPERTY(onCreate, getDidViewCreated, setDidViewCreated:)
HM_EXPORT_PROPERTY(onUpdate, getDidUpadte, setDidUpadte:)

////////////////////////////////////////////////////////////////////////

- (HMFuncCallback)getCellTypeCallback {
    return objc_getAssociatedObject(self, @selector(getCellTypeCallback));
}

- (void)setCellTypeCallback:(HMFuncCallback)func {
    objc_setAssociatedObject(self,
                             @selector(getCellTypeCallback),
                             func,
                             OBJC_ASSOCIATION_COPY_NONATOMIC);
}

////////////////////////////////////////////////////////////////////////

- (HMFuncCallback)getDidViewCreated {
    return objc_getAssociatedObject(self, @selector(getDidViewCreated));
}

- (void)setDidViewCreated:(HMFuncCallback)func {
    objc_setAssociatedObject(self,
                             @selector(getDidViewCreated),
                             func,
                             OBJC_ASSOCIATION_COPY_NONATOMIC);
}

////////////////////////////////////////////////////////////////////////

- (HMFuncCallback)getDidUpadte {
    return objc_getAssociatedObject(self, @selector(getDidUpadte));
}

- (void)setDidUpadte:(HMFuncCallback)func {
    objc_setAssociatedObject(self,
                             @selector(getDidUpadte),
                             func,
                             OBJC_ASSOCIATION_COPY_NONATOMIC);
}

@end
