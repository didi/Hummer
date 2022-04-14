//
//  HMFunctionParser.m
//  Hummer
//
//  Created by didi on 2022/4/13.
//

#import "HMFunctionParser.h"


HMParserFunctionType HMParserMethodType(const char **start){
    
    char type = **start;
    if (type == '+') {
        return HMParserFunctionTypeClass;
    }else if (type == '-') {
        return HMParserFunctionTypeInstance;
    }
    return HMParserFunctionTypeUnknow;
}

#pragma mark <-------- 工具方法 -------->
// 过滤空格
static void HMParserSkipWhitespace(const char **start){
    while (isspace(**start)) {
        (*start) ++;
    }
}

static BOOL HMParserReadChar(const char **input, char c) {
    
    if (**input == c) {
        (*input)++;
        return YES;
    }
    return NO;
}

// 字母或下划线
static BOOL HMIsIdentifierHead(const char c) {
  
    return isalpha(c) || c == '_';
}

// 数字、字面、或下划线
static BOOL HMIsIdentifierTail(const char c) {
  
    return isalnum(c) || c == '_';
}


#pragma mark <-------- selector -------->
static BOOL HMParserSelectorIdentifier(const char **input, NSString **string) {
    
    const char *start = *input;
    if (!HMIsIdentifierHead(**input)) {
        return NO;
    }
    while (HMIsIdentifierTail(**input)) {
        (*input)++;
    }
    *string = [[NSString alloc] initWithBytes:start length:(NSInteger)(*input - start) encoding:NSASCIIStringEncoding];
    return YES;
}

/**
 * - (void)method:(NSString *)str param:(NSString *)param
 *
 * 解析 selector ，每次提取 method: 部分。遇到 ':'或'\0'结束
 */

/// @return YES：有参数，NO：无参数
static BOOL HMParserSelectorPart(const char **start, NSMutableString *selector){
    
    //字母，_开头
    NSString *selPart = @"";
    if (HMParserSelectorIdentifier(start,&selPart)) {
        [selector appendString:selPart];
    }
    //跳过空格
    HMParserSkipWhitespace(start);
    
    //参数检测
    if (HMParserReadChar(start, ':')) {
        [selector appendString:@":"];
        HMParserSkipWhitespace(start);
        return YES;
    }
    return NO;
}

#pragma mark <-------- argument -------->


static void HMParseArgumentIdentifier(const char **start, NSString **type){
    
    
}
/**
 * 解析参数
 * Token:
 *
 * 1. (Token)
 * 2. (Token<Token>)
 *
 * NSString, NSNumber,
 */
static HMMethodArgument * HMParseArgumentPart(const char **start){
    
    
    if (HMParserReadChar(start, '(')) {
        return nil;
    }
    HMParserSkipWhitespace(start);

    return [[HMMethodArgument alloc] initWithType:@"" nullability:HMParserNullable unused:NO];
    // 5 cases that both nullable and __unused exist
    // 1: foo:(nullable __unused id)foo 2: foo:(nullable id __unused)foo
    // 3: foo:(__unused id _Nullable)foo 4: foo:(id __unused _Nullable)foo
    // 5: foo:(id _Nullable __unused)foo
}

/**
 * OC 方法解析器，该方法不需要检查被解析字符串是否合法。
 * - (void)method
 * - (void)method:(NSString *)str
 * - (void)method:(NSString *)str param:(NSString *)param
 *
 * 解析过程
 * 以 - (void)method:(NSString *)str param:(NSString *)param 为例
 *
 * *** 阶段                                             token                             处理之后的剩余部分
 * 1. 识别方法类型                                         -\+                         ->  (void)method:(NSString *)str param:(NSString *)param
 * 2. 识别返回值                                        (void)                        ->   method:(NSString *)str param:(NSString *)param
 * 3. 识别 sel + 参数：parse pass
 *    a. method:(NSString *)str     character set:(character set *)character set    ->   param:(NSString *)param
 *    b. param:(NSString *)param    character set:(character set *)character set    ->   \0
 *
 */
void HMFunctionParse(const char *start) {
    
    
    //phase 1: 方法类型
    HMParserSkipWhitespace(&start);
    HMParserFunctionType flag = HMParserMethodType(&start);
    
    
    //phase 2: 返回值
    HMParserSkipWhitespace(&start);
    HMParseArgumentPart(&start);
    
    
    NSMutableString *selector = [NSMutableString new];
    //phase 3: selector
    while (HMParserSelectorPart(&start, selector)) {
        
    }

}


@implementation HMMethodArgument
- (instancetype)initWithType:(NSString *)type nullability:(HMParserNullability)nullability unused:(BOOL)unused {
    if (self = [super init]) {
        _type = [type copy];
        _nullability = nullability;
        _unused = unused;
    }
    return self;
}


@end
