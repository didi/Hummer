//
//  OCMethodParseTests.m
//  OCAppTests
//
//  Created by didi on 2022/4/21.
//

#import <XCTest/XCTest.h>
#import <Hummer/HMFunctionParser.h>

@interface OCMethodParseTests : XCTestCase

@end

@implementation OCMethodParseTests

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

void check_arg_count(HMMethodSignature *ms, NSInteger count) {
    XCTAssertTrue(ms.arguments.count == count);
}

void check_arg(HMMethodSignature *ms, NSInteger index, NSString *type) {
    XCTAssertTrue([ms.arguments[index].type isEqualToString:type]);
    XCTAssertTrue(ms.arguments[index].unused == NO);
    XCTAssertTrue(ms.arguments[index].nullability == HMParserNullabilityUnspecified);
}

void check_arg2(HMMethodSignature *ms, NSInteger index, NSString *type ,BOOL unused, HMParserNullability nullability) {
    XCTAssertTrue([ms.arguments[index].type isEqualToString:type]);
    XCTAssertTrue(ms.arguments[index].unused == unused);
    XCTAssertTrue(ms.arguments[index].nullability == nullability);
}

- (void)testParseMethod {
    
    NSString *m = @" - (void)testMethod:( NSString *)param";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal == nil);
    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:"]);
    XCTAssertTrue(ms.arguments.count == 1);
    XCTAssertTrue(ms.arguments[0].unused == false);
    XCTAssertTrue(ms.arguments[0].nullability == HMParserNullabilityUnspecified);
}

- (void)testParseMethodNoArg {
    
    NSString *m = @" - (void)testMethod";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal == nil);
    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod"]);
    XCTAssertTrue(ms.arguments.count == 0);
}

#pragma mark <------- 基本类型 ------->
- (void)testParseMethodPrimitive1 {
    
    NSString *m = @" - (void)testMethod:(int)t";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal == nil);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:"]);
    XCTAssertTrue(ms.arguments.count == 1);
    XCTAssertTrue([ms.arguments[0].type isEqualToString:@"int"]);
    XCTAssertTrue(ms.arguments[0].unused == NO);
    XCTAssertTrue(ms.arguments[0].nullability == HMParserNullabilityUnspecified);
}

- (void)testParseMethodPrimitive2 {
    
    NSString *m = @" - (long long)testMethod:(int)t arg2:(long)l arg3:(long long)ll";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"long long"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:arg3:"]);
   
    check_arg(ms, 0, @"int");
    check_arg(ms, 1, @"long");
    check_arg(ms, 2, @"long long");
    check_arg_count(ms, 3);

}

- (void)testParseMethodPrimitiveUnsigned1 {
    
    NSString *m = @" - ( unsigned int )testMethod:(unsigned int)t arg2:(unsigned char)c";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"unsigned int"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:"]);

    check_arg(ms, 0, @"unsigned int");
    check_arg(ms, 1, @"unsigned char");
    check_arg_count(ms, 2);
}

- (void)testParseMethodPrimitiveUnsigned2 {
    
    NSString *m = @" - ( unsigned long long )testMethod:(unsigned long long)t arg2:(unsigned char)c";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"unsigned long long"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:"]);

    check_arg(ms, 0, @"unsigned long long");
    check_arg(ms, 1, @"unsigned char");
    check_arg_count(ms, 2);
}

- ( unsigned long long )testMethod:(unsigned int __unused)t arg2:(__unused unsigned char)c {
    return  0;
}

- (void)testParseMethodPrimitiveUnusedUnsigned2 {
    
    NSString *m = @" - ( unsigned long long )testMethod:(unsigned long long __unused )t arg2:(__unused unsigned char)c";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"unsigned long long"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:"]);

    check_arg2(ms, 0, @"unsigned long long", YES, HMParserNullabilityUnspecified);
    check_arg2(ms, 1, @"unsigned char", YES, HMParserNullabilityUnspecified);
    check_arg_count(ms, 2);
}


/**
 * 支持的参数类型：
 * 1. 所有 C 类型，指针除外。
 * 2. OC：
 *    a. 基本类型：NSInteger, NSUInteger, CGFloat.
 *    b. 对象类型：NSNumber, NSString, NSArray, NSMutableArray, NSDictionary, NSMutableDictionary.
*/

#pragma mark <------- OC类型 ------->

- (void)testParseMethodOCPrimitive {
    
    NSString *m = @" - ( NSInteger )testMethod:(CGFloat __unused )t arg2:(__unused CGFloat)c1 arg3:( CGFloat)c2";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"NSInteger"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:arg3:"]);

    check_arg2(ms, 0, @"CGFloat", YES, HMParserNullabilityUnspecified);
    check_arg2(ms, 1, @"CGFloat", YES, HMParserNullabilityUnspecified);
    check_arg2(ms, 2, @"CGFloat", NO, HMParserNullabilityUnspecified);
    check_arg_count(ms, 3);
}

- (void)testParseMethodObjectType {
    
    NSString *m = @" - ( NSNumber * )testMethod:(NSString * __unused )t arg2:(__unused NSNumber *)c1 arg3:( NSNumber *)c2";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"NSNumber"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:arg3:"]);
    check_arg2(ms, 0, NSStringFromClass([NSString class]), YES, HMParserNullabilityUnspecified);
    check_arg2(ms, 1, NSStringFromClass([NSNumber class]), YES, HMParserNullabilityUnspecified);
    check_arg2(ms, 2, NSStringFromClass([NSNumber class]), NO, HMParserNullabilityUnspecified);
    check_arg_count(ms, 3);
}

- (void)testParseMethodObjectTypeNullability {
    
    NSString *m = @" - ( NSNumber * )testMethod:(NSString * __unused __nullable)t arg2:(__unused NSMutableDictionary * __nullable)c1 arg3:( NSMutableArray * __nonnull)c3 arg4:( nonnull NSArray * __unused)c4 arg5:( nullable NSDictionary * __unused)c5";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"NSNumber"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:arg3:arg4:arg5:"]);

    check_arg2(ms, 0, NSStringFromClass([NSString class]), YES, HMParserNullable);
    check_arg2(ms, 1, NSStringFromClass([NSMutableDictionary class]), YES, HMParserNullable);
    check_arg2(ms, 2, NSStringFromClass([NSMutableArray class]), NO, HMParserNonnull);
    check_arg2(ms, 3, NSStringFromClass([NSArray class]), YES, HMParserNonnull);
    check_arg2(ms, 4, NSStringFromClass([NSDictionary class]), YES, HMParserNullable);

    check_arg_count(ms, 5);
}

#pragma mark <------- OC 范型 ------->
- (void)testParseMethodObjectTypeNullabilityNotSetGeneric {
    
    NSString *m = @"- ( NSNumber * )testMethod:(NSString<NSCopying> * __unused __nullable)t arg2:(__unused NSString<NSObject> * __nonnull)c1";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"NSNumber"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:"]);

    check_arg2(ms, 0, NSStringFromClass([NSString class]), YES, HMParserNullable);
    check_arg2(ms, 1, NSStringFromClass([NSString class]), YES, HMParserNonnull);

    check_arg_count(ms, 2);
}

- (void)testParseMethodObjectTypeNullabilitySetGeneric1 {
    
    NSString *m = @"- ( NSNumber * )testMethod:(NSDictionary<NSString *, NSString *> * __unused __nullable)t arg2:(__unused NSMutableDictionary<NSString *, NSString *> * __nullable)c1 arg3:( NSMutableArray<NSNumber *> * __nonnull)c3 arg4:( nonnull NSArray<NSString *> * __unused)c4 arg5:( nullable NSDictionary * __unused)c5";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"NSNumber"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:arg3:arg4:arg5:"]);

    check_arg2(ms, 0, @"NSStringDictionary", YES, HMParserNullable);
    check_arg2(ms, 1, @"NSStringMutableDictionary", YES, HMParserNullable);
    check_arg2(ms, 2, @"NSNumberMutableArray", NO, HMParserNonnull);
    check_arg2(ms, 3, @"NSStringArray", YES, HMParserNonnull);
    check_arg2(ms, 4, NSStringFromClass([NSDictionary class]), YES, HMParserNullable);

    check_arg_count(ms, 5);
}

- (void)testParseMethodObjectTypeNullabilitySetGeneric2 {
    
    NSString *m = @"- ( NSNumber * )testMethod:(NSDictionary<NSString *, NSDictionary<NSString*, NSString*> *> * __unused __nullable)t arg2:(__unused NSMutableDictionary<NSString *, NSDictionary<NSString*,NSDictionary<NSString*, NSString*> *> *> * __nullable)c1 arg3:( NSMutableArray<NSMutableArray<NSMutableArray <NSString *> *> *> * __nonnull)c3 arg4:( nonnull NSArray<NSArray<NSArray *> *> * __unused)c4 arg5:( nullable NSDictionary * __unused)c5 ";
    HMMethodSignature *ms = HMFunctionParse(m.UTF8String);
    XCTAssertTrue(ms.retVal != nil);
    XCTAssertTrue([ms.retVal.type isEqualToString:@"NSNumber"]);
    XCTAssertTrue(ms.retVal.nullability == HMParserNullabilityUnspecified);
    XCTAssertTrue(ms.retVal.unused == false);

    XCTAssertTrue(ms.flag == HMParserFunctionTypeInstance);
    XCTAssertTrue([ms.selector isEqualToString:@"testMethod:arg2:arg3:arg4:arg5:"]);

    check_arg2(ms, 0, @"NSDictionaryDictionary", YES, HMParserNullable);
    check_arg2(ms, 1, @"NSDictionaryMutableDictionary", YES, HMParserNullable);
    check_arg2(ms, 2, @"NSMutableArrayMutableArray", NO, HMParserNonnull);
    check_arg2(ms, 3, @"NSArrayArray", YES, HMParserNonnull);
    check_arg2(ms, 4, NSStringFromClass([NSDictionary class]), YES, HMParserNullable);

    check_arg_count(ms, 5);
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
}

- (void)testExample {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end
