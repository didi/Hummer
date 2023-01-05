//
//  HMUtility.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "NSString+Hummer.h"
#import <CommonCrypto/CommonDigest.h>
#include <arpa/inet.h>
NSString * const HMParsePathKey_Path = @"path";
NSString * const HMParsePathKey_Name = @"name";
NSString * const HMParsePathKey_Extension = @"extension";

@implementation NSString(Hummer)

+ (BOOL)hm_isValidString:(NSString *)string {
    return ((!!string) && [string isKindOfClass:[NSString class]] && string.length > 0);
}

- (BOOL)hm_isURLString {
    return [NSURL URLWithString:self] != nil;
}

- (NSString *)hm_stringWithURLEncoded {
    return [self stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
}

- (NSString *)hm_md5String {
    const char * character = [self UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(character, (CC_LONG)strlen(character), result);
    NSMutableString *md5String = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH];
    for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++) {
        [md5String appendFormat:@"%02x",result[i]];
    }
    return md5String;
}

- (NSString *)hm_sh1String {
    NSData *data = [self dataUsingEncoding:NSUTF8StringEncoding];
    uint8_t digest[CC_SHA1_DIGEST_LENGTH];
    CC_SHA1(data.bytes, (unsigned int)data.length, digest);
    NSMutableString* output = [NSMutableString stringWithCapacity:CC_SHA1_DIGEST_LENGTH * 2];
    for(int i = 0; i < CC_SHA1_DIGEST_LENGTH; i++) {
        [output appendFormat:@"%02x", digest[i]];
    }
    return output;
}

- (BOOL)hm_isHTTPURLString {
    if (![self hasPrefix:@"http"] && ![self hasPrefix:@"https"]) {
        return NO;
    }
    return [self hm_isURLString];
}

;

- (BOOL)isPureIP{
    
    const char *utf8 = [self UTF8String];
    int success;
    struct in_addr dst;
    success = inet_pton(AF_INET, utf8, &dst);
    if (success != 1) {

        struct in6_addr dst6;
        success = inet_pton(AF_INET6, utf8, &dst6);
    }
    return success == 1;
}

- (nullable NSDictionary<NSString *, NSString *> *)hm_parsePath {
    
    NSMutableDictionary *result = [NSMutableDictionary new];
    NSString *filePath = self;
    // 提取扩展名
    NSString *pathExtension = filePath.pathExtension;
    NSString *fileName = nil;
    if(pathExtension.length > 0){
        // 提取文件名
        [result setObject:pathExtension forKey:HMParsePathKey_Extension];
        fileName = [filePath stringByDeletingPathExtension].lastPathComponent;
    }
    NSString *relativePath = [filePath stringByDeletingPathExtension];
    if(fileName && fileName.length > 0){
        [result setObject:fileName forKey:HMParsePathKey_Name];
        // 提取相对路径，删除扩展名，删除文件名
        relativePath = [relativePath stringByDeletingLastPathComponent];
    }
    if(relativePath){
        [result setObject:relativePath forKey:HMParsePathKey_Path];
    }
    if(result.count > 0){
        return result.copy;
    }
    return nil;
}

#pragma mark <HMURLConvertible>

- (nullable NSURL *)hm_asUrl {
    return [NSURL URLWithString:self];
}

- (nullable NSURL *)hm_asFileUrl {
    if ([self hasPrefix:@"file:"]) {
        return [self hm_asUrl];
    }
    NSURL *fileUrl = [NSURL fileURLWithPath:self];
    return fileUrl;
}

- (NSString *)hm_asString {
    return self;
}

- (NSString *)hm_asFilePath {
    if ([self hasPrefix:@"http"]) {
        return nil;
    }
    
    if ([self hasPrefix:@"file:"] == NO) {
        return self;
    }
    NSString *temp = [self substringFromIndex:5];
    //stringByDeletingPathExtension stringByDeletingLastPathComponent 优势会导致 file:/// 变为 file:/
    while([temp hasPrefix:@"//"]){
        temp = [temp substringFromIndex:1];
    }
    return temp;
}
@end
