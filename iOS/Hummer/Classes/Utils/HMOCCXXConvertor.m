//
//  OCCXXConvertor.m
//  DCPTrack
//
//  Created by GY on 2024/9/11.
//

#import "HMOCCXXConvertor.h"

NSString *hm_convertToNSStringUTF8(const char *utf8String) {
    return [NSString stringWithCString:utf8String encoding:NSUTF8StringEncoding];
}

@implementation HMOCCXXConvertor

@end
