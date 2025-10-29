//
//  NSData+HMConvertible.m
//  WebSocket
//
//  Created by didi on 2020/10/12.
//

#import "NSData+HMConvertible.h"

@implementation NSData (HMConvertible)


- (nullable NSString *)hm_asString {
    return [[NSString alloc] initWithData:self encoding:NSUTF8StringEncoding];
}

- (nullable NSData *)hm_asData {
    return self;
}

@end
