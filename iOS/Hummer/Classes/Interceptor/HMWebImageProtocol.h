//
//  HMWebImageProtocol.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMWebImageProtocol <NSObject>
@optional

- (void)setImageView:(id)imgView
             withURL:(NSURL *)url
    placeholderImage:(id)placeholder;

@end

NS_ASSUME_NONNULL_END
