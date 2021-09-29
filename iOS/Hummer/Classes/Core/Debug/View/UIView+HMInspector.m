//
//  UIView+HMInspector.m
//  Hummer
//
//  Created by didi on 2021/8/6.
//

#import "UIView+HMInspector.h"
#import <Hummer/HMViewInspector.h>
#import <Hummer/HMExportManager.h>

@implementation UIView (HMInspector)

HM_EXPORT_METHOD(dbg_highlight, dbg_highlight:)

- (void)dbg_highlight:(BOOL)isHighlight{
    
    [HMViewInspector highlightView:isHighlight?self:nil];
}
@end
