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
#import <Hummer/NSObject+HMDescriptor.h>
#import <Hummer/UIView+HMDescriptor.h>

@implementation UIView (HMInspector)

HM_EXPORT_METHOD(dbg_highlight, dbg_highlight:)

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

// depth：递归深度，0：全量，1：自身(及children)
- (void)dbg_getDescription:(HMFunctionType)callBack depth:(NSInteger)depth {
    
   
}

- (nullable NSDictionary *)_dbg_getDescriptionWithDepth:(NSInteger)depth {
    // base code
    if (depth == 0) {
        return nil;
    }
    NSMutableDictionary *dic = [NSMutableDictionary new];
    [dic setObject:[self hm_ID] forKey:@"id"];
    [dic setObject:[self hm_jsClassName] forKey:@"tagName"];
    NSString *content = [self hm_content];
    if ([self hm_content]) {
        [dic setObject:content forKey:@"content"];
    }
    NSArray * children = [self hm_jsChildren];
    if (children) {
        NSMutableArray *array = [NSMutableArray new];
        [children enumerateObjectsUsingBlock:^(HMBaseValue*  _Nonnull jsValue, NSUInteger idx, BOOL * _Nonnull stop) {
           
            UIView *view = (UIView *)[jsValue toNativeObject];
            [array addObject:[view _dbg_getDescriptionWithDepth:depth-1]];
        }];
        if (array.count>0) {
            [dic setObject:children forKey:@"children"];
        }
    }
    return dic.copy;
}


@end
