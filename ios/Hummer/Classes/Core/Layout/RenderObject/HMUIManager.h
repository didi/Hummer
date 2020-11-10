//
//  HMUIManager.h
//  Hummer
//
//  Created by didi on 2020/9/27.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class HMRenderObject;

@interface HMUIManager : NSObject

+ (instancetype)sharedInstance;

- (void)registerRenderObject:(Class)cls forView:(Class)viewCls;

- (HMRenderObject *)createRenderObjectWithView:(UIView *)view;

- (void)attachRenderObjectFromViewHierarchyForRootView:(nullable UIView *)rootView;

- (void)applyLayout:(UIView *)rootView preservingOrigin:(BOOL)preserveOrigin size:(CGSize)size;

- (CGSize)calculateLayout:(UIView *)view
              minimumSize:(CGSize)minimumSize
              maximumSize:(CGSize)maximumSize;
@end

NS_ASSUME_NONNULL_END
