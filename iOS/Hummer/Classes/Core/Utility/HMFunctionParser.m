//
//  HMFunctionParser.m
//  Hummer
//
//  Created by didi on 2022/4/13.
//

#import "HMFunctionParser.h"




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

static void HMParserReadCharUntil(const char **input, char c) {
    
    while (**input != c && (**input != '\0')) {
        (*input)++;
    }
    HMParserReadChar(input, c);
}

BOOL HMParserReadString(const char **input, const char *string)
{
    int i;
    for (i = 0; string[i] != 0; i++) {
        if (string[i] != (*input)[i]) {
            return NO;
        }
    }
    *input += i;
    return YES;
}

// 字母或下划线
static BOOL HMIsIdentifierHead(const char c) {
    
    return isalpha(c) || c == '_';
}

// 数字、字面、或下划线
static BOOL HMIsIdentifierTail(const char c) {
    
    return isalnum(c) || c == '_';
}

static HMParserFunctionType HMParseMethodType(const char **start){
    
    if (HMParserReadChar(start, '+')) {
        return HMParserFunctionTypeClass;
    }else if (HMParserReadChar(start, '-')) {
        return HMParserFunctionTypeInstance;
    }
    return HMParserFunctionTypeUnknow;
}

static BOOL HMParserIsCollectionType(NSString *type)
{
    static NSSet *collectionTypes;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        
        collectionTypes = [[NSSet alloc] initWithObjects:@"NSArray", @"NSSet", @"NSDictionary", @"NSMutableArray", @"NSMutableSet", @"NSMutableDictionary", nil];
    });
    return [collectionTypes containsObject:type];
}

static BOOL HMParseUnused(const char **input) {
    return
    HMParserReadString(input, "__attribute__((unused))") ||
    HMParserReadString(input, "__attribute__((__unused__))") ||
    HMParserReadString(input, "__unused");
}

static HMParserNullability HMParseNullability(const char **input) {
    
    if (HMParserReadString(input, "nullable")) {
        return HMParserNullable;
    } else if (HMParserReadString(input, "nonnull")) {
        return HMParserNonnull;
    }
    return HMParserNullabilityUnspecified;
}

static HMParserNullability HMParseNullabilityPostfix(const char **input) {
    
    if (HMParserReadString(input, "_Nullable") || HMParserReadString(input, "__nullable")) {
        return HMParserNullable;
    } else if (HMParserReadString(input, "_Nonnull") || HMParserReadString(input, "__nonnull")) {
        return HMParserNonnull;
    }
    return HMParserNullabilityUnspecified;
}


#pragma mark <-------- selector -------->
static BOOL HMParseSelectorIdentifier(const char **input, NSString **string) {
    
    const char *start = *input;
    if (!HMIsIdentifierHead(**input)) {
        return NO;
    }
    while (HMIsIdentifierTail(**input)) {
        (*input)++;
    }
    if (string) {
        *string = [[NSString alloc] initWithBytes:start length:(NSInteger)(*input - start) encoding:NSASCIIStringEncoding];
    }
    return YES;
}

/**
 * - (void)method:(NSString *)str param:(NSString *)param
 *
 * 解析 selector ，每次提取 method: 部分。遇到 ':'或'\0'结束
 */

/// @return YES：有参数，NO：无参数
static BOOL HMParseSelectorPart(const char **start, NSMutableString *selector){
    
    //字母，_开头
    NSString *selPart = @"";
    if (HMParseSelectorIdentifier(start,&selPart)) {
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
    
    BOOL isUnsigned = HMParserReadString(start, "unsigned");
    HMParserSkipWhitespace(start);
    HMParseSelectorIdentifier(start, type);
    if (type && [*type isEqualToString:@"long"]) {
        //long long
        if (HMParserReadString(start, " long")) {
            *type = [*type stringByAppendingString:@" long"];
        }
    }

    if (isUnsigned) {
        if (type) {
            *type = [@"unsigned " stringByAppendingString:*type];
        }
    }

}

/// @param depth 递归解析范型深度，目前只解析一层
static NSString *HMParseType(const char **input, int depth) {
    
    NSString *type;
    HMParseArgumentIdentifier(input, &type);
    HMParserSkipWhitespace(input);
    // 范型
    if (HMParserReadChar(input, '<')) {

        HMParserSkipWhitespace(input);
        NSString *subtype = HMParseType(input ,depth-1);
        if (HMParserIsCollectionType(type)) {
            
            if ([type isEqualToString:@"NSDictionary"] || [type isEqualToString:@"NSMutableDictionary"]) {
                
                HMParserSkipWhitespace(input);
                HMParserReadChar(input, ',');
                HMParserSkipWhitespace(input);
                subtype = HMParseType(input, depth-1);
            }
            if (![subtype isEqualToString:@"id"] && depth > 0) {
                type = [type stringByReplacingCharactersInRange:(NSRange){0, 2 /* "NS" */} withString:subtype];
            }
        } else {
            // It's a protocol rather than a generic collection - ignore it
        }
        HMParserSkipWhitespace(input);
        HMParserReadChar(input, '>');
    }
    HMParserSkipWhitespace(input);
    if (!HMParserReadChar(input, '*')) {
        HMParserReadChar(input, '&');
    }
    return type;
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
static HMMethodArgument * HMParseArgumentPart(const char **input){
    
    if (!HMParserReadChar(input, '(')) {
        return nil;
    }
    HMParserSkipWhitespace(input);
    // 5 cases that both nullable and __unused exist
    // 1: foo:(nullable __unused id)foo 2: foo:(nullable id __unused)foo
    // 3: foo:(__unused id _Nullable)foo 4: foo:(id __unused _Nullable)foo
    // 5: foo:(id _Nullable __unused)foo
    
    HMParserNullability nullability = HMParseNullability(input);
    HMParserSkipWhitespace(input);
    
    BOOL unused = HMParseUnused(input);
    HMParserSkipWhitespace(input);
    
    NSString *type = HMParseType(input, 1);
    HMParserSkipWhitespace(input);
    if (nullability == HMParserNullabilityUnspecified) {
        
        nullability = HMParseNullabilityPostfix(input);
        HMParserSkipWhitespace(input);
        if (!unused) {
            unused = HMParseUnused(input);
            HMParserSkipWhitespace(input);
            if (unused && nullability == HMParserNullabilityUnspecified) {
                nullability = HMParseNullabilityPostfix(input);
                HMParserSkipWhitespace(input);
            }
        }
    }else if (!unused) {
        unused = HMParseUnused(input);
        HMParserSkipWhitespace(input);
    }
    HMParserSkipWhitespace(input);
    HMParserReadChar(input, ')');
    HMParserSkipWhitespace(input);
    return [[HMMethodArgument alloc] initWithType:type nullability:nullability unused:unused];
    
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
HMMethodSignature * HMFunctionParse(const char *input) {
    
    
    //phase 1: 方法类型
    HMParserSkipWhitespace(&input);
    HMParserFunctionType flag = HMParseMethodType(&input);
    
    
    //phase 2: 返回值
    HMParserSkipWhitespace(&input);
    HMMethodArgument *ret = HMParseArgumentPart(&input);

    NSMutableArray <HMMethodArgument *> *args = [NSMutableArray new];
    
    
    NSMutableString *selector = [NSMutableString new];
    //phase 3: selector
    while (HMParseSelectorPart(&input, selector)) {
        
        HMMethodArgument *arg = HMParseArgumentPart(&input);
        if (arg == nil) {
         
        }
        [args addObject:arg];
        // 忽略参数名
        HMParseArgumentIdentifier(&input, NULL);
        HMParserSkipWhitespace(&input);
    }
    
    HMMethodSignature *ms = [[HMMethodSignature alloc] initWithFlag:flag returnValue:[ret isVoid]?nil:ret arguments:args.copy selector:selector.copy];
    return ms;
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

- (BOOL)isVoid {
    
    return [self.type isEqualToString:@"void"];
}
@end

@implementation HMMethodSignature

- (instancetype)initWithFlag:(HMParserFunctionType)flag returnValue:(nullable HMMethodArgument *)retVal arguments:(nullable NSArray<HMMethodArgument *> *)arguments selector:(nonnull NSString *)selector {

    if (self = [super init]) {
        _flag = flag;
        _retVal = retVal;
        _arguments = arguments;
        _selector = selector;
    }
    return self;
}

@end
