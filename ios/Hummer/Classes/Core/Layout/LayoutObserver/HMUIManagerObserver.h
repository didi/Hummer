//
//  HMUIManagerObserver.h
//  Expecta
//
//  Created by didi on 2020/12/17.
//

#import <Foundation/Foundation.h>
@class HMUIManager;
NS_ASSUME_NONNULL_BEGIN
@protocol HMUIManagerObserver <NSObject>

@optional

/**
 * Called just before the UIManager layout views.
 * It allows performing some operation for components which contain custom
 * layout logic right before regular Yoga based layout. So, for instance,
 * some components which have own React-independent state can compute and cache
 * own intrinsic content size (which will be used by Yoga) at this point.
 */
- (void)uiManagerWillPerformLayout:(HMUIManager *)manager;

/**
 * Called just after the UIManager layout views.
 * It allows performing custom layout logic right after regular Yoga based layout.
 * So, for instance, this can be used for computing final layout for a component,
 * since it has its final frame set by Yoga at this point.
 */
- (void)uiManagerDidPerformLayout:(HMUIManager *)manager;

/**
 * Called before flushing UI blocks at the end of a batch.
 * This is called from the UIManager queue. Can be used to add UI operations in that batch.
 */
- (void)uiManagerWillPerformMounting:(HMUIManager *)manager;


/**
 * Called just after flushing UI blocks.
 * This is called from the UIManager queue.
 */
- (void)uiManagerDidPerformMounting:(HMUIManager *)manager;


@end

NS_ASSUME_NONNULL_END
