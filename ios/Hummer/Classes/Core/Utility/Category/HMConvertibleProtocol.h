//
//  HMConvertibleProtocol.h
//  WebSocket
//
//  Created by didi on 2020/10/12.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMStringConvertible <NSObject>

//UTF8
- (nullable NSString *)hm_asString;

@end

@protocol HMDataConvertible <NSObject>

- (nullable NSData *)hm_asData;
@end


@protocol HMStringDataConvertible <HMStringConvertible,HMDataConvertible>

@end


NS_ASSUME_NONNULL_END
