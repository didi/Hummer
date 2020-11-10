//
//  NSString+HMConvertible.m
//  WebSocket
//
//  Created by didi on 2020/10/12.
//

#import "NSString+HMConvertible.h"

@implementation NSString (HMConvertible)

- (nullable NSData *)hm_asData{
    return [self dataUsingEncoding:NSUTF8StringEncoding];
}
- (nullable NSString *)hm_asString {
    return self;
}

@end
