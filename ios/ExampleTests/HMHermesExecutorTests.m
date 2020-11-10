//
//  HMHermesExecutorTests.m
//  ExampleTests
//
//  Created by didi on 2020/8/11.
//  Copyright © 2020 Warmbloom. All rights reserved.
//

#import <XCTest/XCTest.h>
#import <Hummer/HMHermesExecutor.h>
#import <Hummer/HMBaseValue.h>

@interface HMHermesExecutorTests : XCTestCase

@property (nonatomic, strong)HMHermesExecutor *executor;
@end

@implementation HMHermesExecutorTests

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.
    self.executor = [[HMHermesExecutor alloc] init];

    [self.executor evaluateWithScript:@"function add(a,b){return a + b}" sourceUrl:nil];
    [self.executor evaluateWithScript:@"function getFunc(){return add}" sourceUrl:nil];
    [self.executor evaluateWithScript:@"function getArray(){return [{name:'didi1'},{name:'didi2'}]}" sourceUrl:nil];
    [self.executor evaluateWithScript:@"function getString(){return 'test'}" sourceUrl:nil];
    [self.executor evaluateWithScript:@"function getNumber(){return 9.9}" sourceUrl:nil];
    [self.executor evaluateWithScript:@"function getMap(){return {name:'didi'}}" sourceUrl:nil];
    [self.executor evaluateWithScript:@"function getObjc(){return {name:'didi'}}" sourceUrl:nil];
    
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
}

- (void)testExample {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    //      HMBaseValue arrVal = [self.executor evaluateScript:@"add()" withSourceURL:nil];
    HMBaseValue *arrVal = [self.executor evaluateWithScript:@"getArray()" sourceUrl:nil];
    HMBaseValue *strVal = [self.executor evaluateWithScript:@"getString()" sourceUrl:nil];
    HMBaseValue *numVal = [self.executor evaluateWithScript:@"getNumber()" sourceUrl:nil];
    HMBaseValue *mapVal = [self.executor evaluateWithScript:@"getMap()" sourceUrl:nil];
    HMBaseValue *objVal = [self.executor evaluateWithScript:@"getObjc()" sourceUrl:nil];
    HMBaseValue *funcVal = [self.executor evaluateWithScript:@"getFunc()" sourceUrl:nil];

    
    
    NSArray *arr = [arrVal toArray];
    NSString *str = [strVal toString];
    NSNumber *num = [numVal toNumber];
    NSDictionary *dic = [mapVal toDictionary];
    HMClosureType closure = [funcVal toClosure];

    XCTAssert([arr isKindOfClass:NSArray.class]);
    XCTAssert([str isKindOfClass:NSString.class]);
    XCTAssert([num isKindOfClass:NSNumber.class]);
    XCTAssert([dic isKindOfClass:NSDictionary.class]);

    
    HMBaseValue *strongArrVal = [self.executor convertArrayToValue:arr];
    HMBaseValue *strongStrVal = [self.executor convertStringToValue:str];
    HMBaseValue *strongNumVal = [self.executor convertNumberToValue:num];
    HMBaseValue *strongObjVal = [self.executor convertDictionaryToValue:dic];

    NSArray *arr1 = [strongArrVal toArray];
    NSString *str1 = [strongStrVal toString];
    NSNumber *num1 = [strongNumVal toNumber];
    NSDictionary *dic1 = [strongObjVal toDictionary];
//    [[HMBaseValue alloc] init]
//    HMBaseValue *res = closure(@[@2,@3]);
    NSLog(@"done");

}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end
