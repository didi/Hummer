//
//  NSURL+Hummer.m
//  Hummer
//
//  Created by didi on 2020/11/18.
//

#import "NSURL+Hummer.h"

@implementation NSURL (Hummer)

- (nullable NSURL *)hm_asFileUrl {
    return self;
}

- (nullable NSString *)hm_asString {
    return self.absoluteString;
}

- (nullable NSURL *)hm_asUrl {
    return self;
}

@end
