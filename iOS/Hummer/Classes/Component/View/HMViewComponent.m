//
//  HMViewComponent.m
//  Hummer
//
//  Created by didi on 2022/6/1.
//

#import "HMViewComponent.h"
#import "HMExportManager.h"
#import "HMViewComponent+RenderObject.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "HMYogaConfig.h"
#import "HMLogger.h"
#import "NSObject+Hummer.h"
#import "HMUIManager.h"
#import "HMCompatibleRenderObject.h"

@interface HMViewComponent ()

@property (nonatomic, strong, nonnull,readwrite) UIView *view;
@property (nonatomic, strong) NSDictionary *styleStore;
@property (nonatomic, copy) NSString *viewId;
@property (nonatomic, strong, nullable, readwrite) HMViewComponent *supercomponent;
@end

@implementation HMViewComponent{
    NSMutableArray *_subcomponents;
}

HM_EXPORT_CLASS(View, HMViewComponent)

#pragma mark <export property>

HM_DEFINE_CUSTOM_PROPERTY(style, NSDictionary *, {
    if (!style) return;
    [self applyStyle:style];
}, {
    return self.styleStore;
})


HM_DEFINE_CUSTOM_PROPERTY(viewId, NSString *, {
    self.viewId = viewId;
}, {
    return self.viewId;
})


#pragma mark <export method>

HM_EXPORT_METHOD_OPT(dbg_getDescription:(HMFunctionType)callBack depth:(NSInteger)depth){
    
}

HM_EXPORT_METHOD_OPT(appendChild:(HMBaseValue *)child){
    [self _hm_insertNode:child beforeNode:nil];
}

- (instancetype)initWithHMValues:(NSArray<HMBaseValue *> *)values {
    
    self = [self init];
    if (self) {
        _viewId = values.count > 0 ? [values[0] toString] : nil;
        [[HMAttrManager sharedManager] loadViewAttrForClass:[self class]];
        _jsValueLifeContainer = [NSMapTable mapTableWithKeyOptions:NSPointerFunctionsWeakMemory valueOptions:NSPointerFunctionsStrongMemory];
        _subcomponents = [NSMutableArray new];
        [self hm_configureLayoutWithBlock:nil];

    }
    return self;
}

#pragma mark <export attribute >
HM_EXPORT_ATTRIBUTE(backgroundColor, __backgroundColor, HMStringToColor:)


#pragma mark <public>

- (instancetype)init {
    self = [super init];
    if (self) {
        _layout = [[HMCompatibleRenderObject alloc] init];
        _layout.view = self;
    }
    return self;
}
 
- (UIView *)view {
    
    if (!_view) {
        _view = [[UIView alloc] init];
    }
    return _view;
}

- (void)removeFromSuperview {
    
    HMAssertMainQueue();
    [self.view removeFromSuperview];
}
- (void)markDirty {
    
    if (!self.layout) {
        return;
    }

    // 1. 叶节点 -> 叶节点（脏），需要 markDirty + setNeedsLayout
    // 2. 容器节点 -> 容器节点（脏），只需要 setNeedsLayout
    // 3. 叶节点 -> 容器节点（脏），只需要 setNeedsLayout
    // 4. 容器节点 -> 叶节点（脏），只需要 setNeedsLayout
    // YGAttachNodesFromViewHierachy 会针对 2 3 4 情况自行做出标记脏节点的动作
    if (self.layout.numberOfChildren == 0 && self.layout.isLeaf) {
        // 原先是叶节点，现在也是叶节点
        [self.layout markDirty];
    }
    [[HMUIManager sharedInstance] batchLayout:self];
}


- (HMViewComponent *)rootComponent {
    
    HMViewComponent *root = self;
    while (root.supercomponent) {
        root = root.supercomponent;
    }
    return root;
}
- (void)addUITask:(dispatch_block_t)task {
    [[HMUIManager sharedInstance] flushUIBlock:task];
}

- (void)addSubview:(HMViewComponent *)subcomponent {
    [_subcomponents addObject:subcomponent];
    subcomponent.supercomponent = self;
    [self.layout addSubview:subcomponent.layout];
    HMBaseValue *jsValue = subcomponent.hmValue;
    if (jsValue) {
        [self.jsValueLifeContainer setObject:jsValue forKey:subcomponent];
    }
    [self addUITask:^{
        [self.view addSubview:subcomponent.view];
    }];
}
/**
 * 当 oldChild 为 nil，则相当于 hm_addSubview 。
 */
- (void)_hm_insertNode:(HMBaseValue *)newChild beforeNode:(nullable HMBaseValue *)oldChild {
    id newViewObject = newChild.hm_toObjCObject;
    id oldViewObject = oldChild.hm_toObjCObject;
    HMViewComponent *newView = nil;
    HMViewComponent *oldView = nil;
    if ([newViewObject isKindOfClass:HMViewComponent.class]) {
        newView = newViewObject;
    }
    if ([oldViewObject isKindOfClass:HMViewComponent.class]) {
        oldView = oldViewObject;
    }
    // 目标视图不能为空，如果 oldChild 为空，则 addsubview
    if (!newView) {
        HMLogError(@"参数必须为视图");
        return;
    }
    if (newView.supercomponent && newView.supercomponent != self) {
        HMViewComponent *parent = newView.supercomponent;
        [newView removeFromSuperview];
        //deref
        [parent.jsValueLifeContainer removeObjectForKey:newView];
        [parent markDirty];
    }
    if (newView && oldView){
        NSInteger idx = [_subcomponents indexOfObject:oldView];
        [_subcomponents insertObject:newView atIndex:idx];
    }else{
        [self addSubview:newView];
    }
    [self markDirty];
}

- (void)applyStyle:(NSDictionary *)styleDic {

    NSMutableDictionary<NSString *, NSObject *> *layoutInfo = NSMutableDictionary.dictionary;
    NSMutableDictionary<NSString *, NSObject *> *attributes = NSMutableDictionary.dictionary;
    NSMutableDictionary<NSString *, NSObject *> *transitions = NSMutableDictionary.dictionary;
    [styleDic enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
        if (![key isKindOfClass:NSString.class]) {
            return;
        }
        if ([[self hm_layoutInfoKeys] containsObject:key]) {
            layoutInfo[key] = obj;
        } else if ([[self hm_transtionInfoKeys] containsObject:key]) {
            transitions[key] = obj;
        } else {
            attributes[key] = obj;
        }
    }];

    NSMutableDictionary<NSString *, NSObject *> *mutableStyleDictionary = self.styleStore.mutableCopy;
    if (!mutableStyleDictionary) {
        mutableStyleDictionary = [NSMutableDictionary dictionaryWithCapacity:layoutInfo.count + attributes.count + transitions.count];
    }
    self.styleStore = nil;
    [mutableStyleDictionary addEntriesFromDictionary:layoutInfo];
    [mutableStyleDictionary addEntriesFromDictionary:attributes];
    [mutableStyleDictionary addEntriesFromDictionary:transitions];
    self.styleStore = mutableStyleDictionary;


    NSMutableDictionary *transitionAnimations = NSMutableDictionary.dictionary;
    [layoutInfo enumerateKeysAndObjectsUsingBlock:^(NSString *key, NSObject *obj, BOOL *stop) {
      
        [self hm_configureWithTarget:self.layout cssAttribute:key value:obj converterManager:HMYogaConfig.defaulfConfig];
    }];
    [attributes enumerateKeysAndObjectsUsingBlock:^(NSString *key, NSObject *obj, BOOL *stop) {
  
        [self addUITask:^{
            [self hm_configureWithTarget:self.view cssAttribute:key value:obj converterManager:HMAttrManager.sharedManager];
        }];
    }];
    
  
//    [self hm_markDirty];
}


- (void)hm_configureWithTarget:(id)target cssAttribute:(NSString *)cssAttribute value:(id)value converterManager:(id)converterManager {
    // TODO(唐佳诚): 未来改成协议
    if (![converterManager respondsToSelector:@selector(converterWithCSSAttr:)]) {
        NSAssert(NO, @"必须响应对应内容");

        return;
    }
    SEL converter = [converterManager converterWithCSSAttr:cssAttribute];
    NSMethodSignature *signature = [HMConverter.class methodSignatureForSelector:converter];
    if (signature.numberOfArguments != 3 ||
            *(signature.methodReturnType) == 'v') {
        HMLogError(@"Converter [%@] method signature error!, cssAttribute [%@]",
                NSStringFromSelector(converter), cssAttribute);

        return;
    }

    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setTarget:[HMConverter class]];
    [invocation setSelector:converter];
    [invocation setArgument:(void *) &value atIndex:2];
    [invocation invoke];

    NSString *property = nil;
    // TODO(唐佳诚): 未来改成协议
    if ([converterManager isKindOfClass:HMYogaConfig.class]) {
        HMYogaConfig *yogaConfig = converterManager;
        property = [yogaConfig ygPropertyWithCSSAttr:cssAttribute];
    } else if ([converterManager isKindOfClass:HMAttrManager.class]) {
        HMAttrManager *attrManager = converterManager;
        property = [attrManager viewPropWithCSSAttr:cssAttribute];
    }

    SEL selector = [self hm_setterSelectorForPropertyName:property];
    if (!property.length || ![target respondsToSelector:selector]) {
        HMLogError(@"视图或者 YGLayout can not found selector [%@]",
                NSStringFromSelector(converter));

        return;
    }

    void *returnVal = malloc(signature.methodReturnLength);
    [invocation getReturnValue:returnVal];

    signature = [target methodSignatureForSelector:selector];
    invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setTarget:target];
    [invocation setSelector:selector];
    [invocation setArgument:returnVal atIndex:2];
    [invocation invoke];

    if (returnVal) {
        free(returnVal);
    }
}

- (SEL)hm_setterSelectorForPropertyName:(NSString *)propertyName {
    if (!propertyName || propertyName.length <= 0) {
        return nil;
    }
    if (propertyName.length < 1) {
        NSAssert(NO, @"propertyName 必须至少一个字符");

        return nil;
    }

    NSString *setterSel = [NSString stringWithFormat:@"set%@%@:", [propertyName substringToIndex:1].uppercaseString,
                                                     [propertyName substringFromIndex:1]];

    return NSSelectorFromString(setterSel);
}



//HM_EXPORT_PROPERTY(enabled, hm_enabled, hm_setEnabled:)
//
//HM_EXPORT_METHOD(getRect, hm_getRect:)
//
//HM_EXPORT_METHOD(appendChild, hm_addSubview:)
//
//HM_EXPORT_METHOD(removeChild, hm_removeSubview:)
//
//HM_EXPORT_METHOD(removeAll, hm_removeAllSubviews)
//
//HM_EXPORT_METHOD(insertBefore, hm_insertBefore:
//    withNode:)
//
//HM_EXPORT_METHOD(replaceChild, hm_replaceSubview:
//    withNode:)
//
//HM_EXPORT_METHOD(getElementById, hm_getSubViewByID:)
//
//HM_EXPORT_METHOD(layout, hm_layoutRootView)
//HM_EXPORT_METHOD(dbg_highlight, dbg_highlight:)
//
//HM_EXPORT_METHOD(dbg_getDescription, dbg_getDescription:depth:)
- (NSArray<NSString *> *)hm_layoutInfoKeys {
    return @[@"top",
            @"left",
            @"bottom",
            @"right",
            @"margin",
            @"marginTop",
            @"marginLeft",
            @"marginBottom",
            @"marginRight",
            @"padding",
            @"paddingTop",
            @"paddingLeft",
            @"paddingBottom",
            @"paddingRight",
            @"width",
            @"height",
            @"minWidth",
            @"minHeight",
            @"maxWidth",
            @"maxHeight",
            @"flexDirection",
            @"flexWrap",
            @"flexFlow",
            @"justifyContent",
            @"alignItems",
            @"alignContent",
            @"order",
            @"flexGrow",
            @"flexShrink",
            @"flexBasis",
            @"flex",
            @"display",
            @"alignSelf",
            @"position",
    ];
}

- (NSArray<NSString *> *)hm_transtionInfoKeys {
    return @[
        @"transitionDelay",
        @"transitionDuration",
        @"transitionProperty",
        @"transitionTimingFunction",
    ];
}
@end
