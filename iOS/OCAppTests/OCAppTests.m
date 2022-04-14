//
//  OCAppTests.m
//  OCAppTests
//
//  Created by didi on 2022/4/13.
//

#import <XCTest/XCTest.h>
#import <Hummer/HMFunctionParser.h>
@interface OCAppTests : XCTestCase


@property (nonatomic, copy) NSString *methodString;
@end

@implementation OCAppTests

- (void)setUp {
 
    self.methodString = @" - (void)testMethod:( NSString *)param";
    // Put setup code here. This method is called before the invocation of each test method in the class.
}


- (void)testSkipWhitespace {
 
    char *func = "  -(void)";
    HMParserSkipWhitespace(&func);
    XCTAssertFalse(isspace(*func));
}


- (void)testGetMethodType {
    
    
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
