//
//  UIView+HMInspector.m
//  Hummer
//
//  Created by didi on 2021/8/6.
//

#import "UIView+HMInspector.h"
#import <Hummer/HMViewInspector.h>
#import <Hummer/HMExportManager.h>
#import <Hummer/HMBaseExecutorProtocol.h>
#import <Hummer/NSObject+HMDescription.h>
#import <Hummer/UIView+HMDescription.h>
#import <Hummer/NSObject+Hummer.h>
#import <Hummer/HMUtility.h>

@implementation UIView (HMInspector)

HM_EXPORT_METHOD(dbg_highlight, dbg_highlight:)

HM_EXPORT_METHOD(dbg_getDescription, dbg_getDescription:depth:)

- (void)dbg_highlight:(BOOL)isHighlight{
    
    [HMViewInspector highlightView:isHighlight?self:nil];
}

/**
 *  {
 *      id          // 唯一标识   String
 *      tagName     // 节点类型   String  View/Text/Image
 *      content     // 节点显示内容  String（text、src、...）
 *      element     // 节点实例  View
 *      children    // 子节点  Array类型
 
 * } Node
 */

// depth：递归深度，<1：全量，>=1：自身children 除 children.children部分
// 返回视图树，会被 视图检查 持有。
- (void)dbg_getDescription:(HMFunctionType)callBack depth:(NSInteger)depth {
    
    dispatch_async(dispatch_get_main_queue(), ^{
        NSDictionary *res = [self _dbg_getDescriptionWithDepth: depth < 1 ? INT_MAX : depth];
        callBack(@[res]);
    });
   
}

- (nullable NSDictionary *)_dbg_getDescriptionWithDepth:(NSInteger)depth {

    NSMutableDictionary *dic = [NSMutableDictionary new];
    NSString *hid = [self hm_displayID];
    if (hid) {
        [dic setObject:hid forKey:@"id"];
    }
    [dic setObject:[self hm_displayTagName] forKey:@"tagName"];
    NSString *content = [self hm_displayContent];
    NSString *alias = [self hm_displayAlias];
    if (content) {
        [dic setObject:content forKey:@"content"];
    }
    if (alias) {
        [dic setObject:alias forKey:@"alias"];
    }
    // base code
    if (depth <= 0) {
        return dic.copy;
    }
    HMBaseValue *jsValue = [self hm_displayJsElement];
    if (jsValue) {
        [dic setObject:jsValue forKey:@"element"];
    }
        
    NSArray * children = [self hm_displayJsChildren];
    
    //base code
    if (children) {
        if (children) {
            NSMutableArray *array = [NSMutableArray new];
            [children enumerateObjectsUsingBlock:^(id<HMViewInspectorDescription>  _Nonnull v, NSUInteger idx, BOOL * _Nonnull stop) {
               
                // 正常逻辑应该按照
                UIView *view;
                if ([v isKindOfClass:UIView.class]) {
                    view = (UIView *)v;
                }else if([v isKindOfClass:HMBaseValue.class]){
                    view = (UIView *)((HMBaseValue *)v).toNativeObject;
                }
                [array addObject:[view _dbg_getDescriptionWithDepth:depth-1]];
            }];
            if (array.count>0) {
                [dic setObject:array forKey:@"children"];
            }
        }
    }
    return dic.copy;
}


#pragma mark <HMViewInspectorDescription>


// js 类名，默认实现为 hm_ID
- (nullable NSString *)hm_displayID {
    return [self hm_ID];
}

// js 类名，默认实现为 hm_jsClassName
- (nullable NSString *)hm_displayTagName {
    return [self hm_jsClassName];
}

- (nullable NSString *)hm_displayAlias {
    
    return nil;
}

- (nullable NSString *)hm_displayContent {
    
    return [self hm_content];
}

- (HMBaseValue *)hm_displayJsElement {
    return [self hm_jsViewValue];
}

- (nullable NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    NSArray *jsChildren = [self hm_jsChildren];
    if (jsChildren) {
        NSMutableArray *array = [NSMutableArray new];
        [jsChildren enumerateObjectsUsingBlock:^(HMBaseValue*  _Nonnull jsValue, NSUInteger idx, BOOL * _Nonnull stop) {
           
            UIView *view = (UIView *)[jsValue toNativeObject];
            [array addObject:view];
        }];
        return array;
    }
    return nil;
}

@end
