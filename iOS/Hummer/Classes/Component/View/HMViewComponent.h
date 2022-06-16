//
//  HMViewComponent.h
//  Hummer
//
//  Created by didi on 2022/6/1.
//

#import <Foundation/Foundation.h>
#import "HMRenderObject.h"
#import "HMBaseValue.h"
#import "HMJSObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMViewComponent : NSObject<HMJSObject>

@property (nonatomic, strong, readonly) HMRenderObject *layout;
@property (nonatomic, strong, readonly) UIView *view;
@property (nonatomic, copy, nullable, readonly) NSString *viewId;
@property (nonatomic, strong, nullable, readonly) HMViewComponent *supercomponent;
@property (nonatomic, strong, nullable, readonly) NSArray <HMViewComponent *> *subcomponents;
@property (nonatomic, strong, nullable, readonly) NSMapTable <HMViewComponent *, HMBaseValue *> *jsValueLifeContainer;


- (void)markDirty;
- (void)removeFromSuperview;
- (HMViewComponent *)rootComponent;
/**
 * @abstract Inserts a subview at the specified index.
 *
 * @param subcomponent The subcomponent whose view will be inserted in the component's view.
 *
 * @discussion This will insert subcomponent's view to the view hierachy by default, it can be overrided to change the view hierachy. The method is called on the main thread.
 */
- (void)addSubview:(HMViewComponent *)subcomponent;
- (void)addUITask:(dispatch_block_t)task;
@end

NS_ASSUME_NONNULL_END
