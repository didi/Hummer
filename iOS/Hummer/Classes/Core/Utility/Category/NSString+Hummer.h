//
//  HMUtility.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HMURLConvertible.h"

@interface NSString(Hummer)<HMURLConvertible>

+ (BOOL)hm_isValidString:(NSString *)string ;

- (BOOL)hm_isURLString;

- (NSString *)hm_stringWithURLEncoded;

- (NSString *)hm_md5String;

- (NSString *)hm_sh1String;

- (BOOL)isPureIP;

@property (nonatomic, readonly) BOOL hm_isHTTPURLString;

@end

