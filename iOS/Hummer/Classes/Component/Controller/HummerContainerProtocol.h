//
//  HummerContainerProtocol.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/4/23.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HummerContainerProtocol <NSObject>

/**
 * @brief 页面唯一标识
 */
@property (nonatomic, copy, nullable) NSString *hm_pageID;

@end

NS_ASSUME_NONNULL_END
