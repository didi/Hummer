//
//  NSURL+Hummer.m
//  Hummer
//
//  Created by didi on 2020/11/18.
//

#import "NSURL+Hummer.h"
#import "NSString+Hummer.h"
@implementation NSURL (Hummer)

- (NSString *)hm_asFilePath {
 
    return [[self hm_asString] hm_asFilePath];
}

- (nullable NSURL *)hm_asFileUrl {
    if (self.isFileURL) {
        return self;
    }
    return [NSURL fileURLWithPath:self.path];
}

- (nullable NSString *)hm_asString {
    return self.absoluteString;
}

- (nullable NSURL *)hm_asUrl {
    return self;
}

@end
