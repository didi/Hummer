//
//  HMURLSessionWebSocket.h
//  Hummer
//
//  Created by didi on 2020/10/10.
//

#import <Foundation/Foundation.h>
#import "HMWebSocketProtocol.h"
NS_ASSUME_NONNULL_BEGIN

API_AVAILABLE(macos(10.15), ios(13.0), watchos(6.0), tvos(13.0))
@interface HMURLSessionWebSocket : NSObject<HMWebSocketAdaptor,HMWebSocketDelegate>

@end

NS_ASSUME_NONNULL_END
