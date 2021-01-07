//
//  HMInvocation.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface HMInvocation : NSObject

- (instancetype)initWithTarget:(id)target;
- (void)setSelecor:(SEL)selector;
- (void)setArguments:(NSArray *)arguments;
- (id)invokeAndReturn;

@end
