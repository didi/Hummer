//
//  HMJSComponentLifeCycle.m
//  Hummer
//
//  Created by didi on 2021/12/13.
//

#import "HMRootViewLifeCycle.h"

typedef NS_ENUM(NSUInteger, HMLifeCycleState) {
    HMLifeCycleStateOnCreate = 1,
    HMLifeCycleStateOnAppear,
    HMLifeCycleStateOnDisappear,
    HMLifeCycleStateOnDestroy,
};

static NSString * const _Nonnull __HMLifeCycleStateMap[] = {
    [HMLifeCycleStateOnCreate] = @"onCreate",
    [HMLifeCycleStateOnAppear] = @"onAppear",
    [HMLifeCycleStateOnDisappear] = @"onDisappear",
    [HMLifeCycleStateOnDestroy] = @"onDestroy",
};

@interface HMLifeCycleStack : NSObject

@property (nonatomic, assign, readonly) NSInteger size;
@property (nonatomic, strong) NSMutableArray *stack;
@end

@implementation HMLifeCycleStack

- (instancetype)init {
    self = [super init];
    if (self) {
        _stack = [NSMutableArray new];
    }
    return self;
}
- (void)push:(HMLifeCycleState)state {
    
    HMLifeCycleState lastState = [self top];
    // 保持栈 递增。
    while (lastState > 0 && lastState >= state) {
        [self pop];
        lastState = [self top];
    }
    [self.stack addObject:@(state)];
}

- (void)pop {
    
    if (self.stack.count == 0) {return;}
    [self.stack removeLastObject];
}

- (HMLifeCycleState)top {
    
    return [(NSNumber *)self.stack.lastObject integerValue];
}

- (NSInteger)size {
    return self.stack.count;
}

- (NSArray *)getQueue {
    return [self.stack copy];
}

@end

@interface HMRootViewLifeCycle ()

@property (nonatomic, strong) HMLifeCycleStack *stack;
@property (nonatomic ,strong) HMBaseValue *jsValue;
@end

@implementation HMRootViewLifeCycle


+ (HMRootViewLifeCycle *)create {
    HMRootViewLifeCycle *obj = [HMRootViewLifeCycle new];
    return obj;
}
- (instancetype)init {
    
    self = [super init];
    if (self) {
        _stack = [HMLifeCycleStack new];
        [_stack push:HMLifeCycleStateOnCreate];
    }
    return self;
}

- (void)setJSValue:(HMBaseValue *)value {
    
    
    _jsValue = value;
    // hummer reRender
    if (self.stack.size == 0) {
        [self.stack push:HMLifeCycleStateOnCreate];
    }
    [self checkStack];
}


- (void)onCreate{
    [self.stack push:HMLifeCycleStateOnCreate];
    [self checkStack];
}

- (void)onAppear{
    
    [self.stack push:HMLifeCycleStateOnAppear];
    [self checkStack];
}

- (void)onDisappear{
    [self.stack push:HMLifeCycleStateOnDisappear];
    [self checkStack];
}

- (void)onDestroy{
    [self.stack push:HMLifeCycleStateOnDestroy];
    [self checkStack];
}


- (void)checkStack {
    
    if (self.jsValue == nil) {
        return;
    }
    NSArray *queue = [self.stack getQueue];
    NSInteger index = 0;
    while (self.stack.size > 0) {
        [self.stack pop];
        HMLifeCycleState state = [queue[index] integerValue];
        NSString *sel = __HMLifeCycleStateMap[state];
        [self callJSWithFunc:sel arguments:@[]];
        index++;
    }
    
}
- (void)callJSWithFunc:(NSString *)func arguments:(NSArray *)arguments {
    if ([self.jsValue hasProperty:func]) {
        [self.jsValue invokeMethod:func withArguments:arguments];
    }
}

@end
