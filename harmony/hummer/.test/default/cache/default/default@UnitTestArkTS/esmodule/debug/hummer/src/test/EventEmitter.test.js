import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/index';
import { EventEmitter } from '@bundle:com.example.hummer/hummer/ts';
export default function EventEmitterTest() {
    describe('EventEmitterTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('testOnEmitOff', 0, () => {
            const res = new Array();
            const emitter = new EventEmitter();
            const callback = (num) => {
                res.push(num);
            };
            const fn = emitter.on('test', callback);
            emitter.emit('test', 1);
            expect(res.length == 1).assertTrue();
            expect(res[0] === 1).assertTrue();
            {
                const listeners = emitter._TestOnlyGetCallback('test');
                expect(listeners.length == 1).assertTrue();
                expect(listeners[0] === callback).assertTrue();
            }
            ;
            emitter.emit('test', 2);
            expect(res.length).assertEqual(1);
            expect(res[0]).assertEqual(1);
            {
                const fn = emitter.on('test', callback);
                expect(res.length).assertEqual(2);
                expect(res[0]).assertEqual(1);
                expect(res[1]).assertEqual(2);
                // const listeners = emitter._TestOnlyGetCallback('test')
                // expect(listeners.length == 1).assertTrue();
                // expect(listeners[0] === callback).assertTrue();
            }
            // {
            //   emitter.off('test')
            //   const listeners = emitter._TestOnlyGetCallback('test')
            //   expect(listeners.length == 0).assertTrue();
            // }
            // console.log(res.toString());
            // [channel on:@"test" callback:^(id  _Nonnull param) {
            //   XCTAssertTrue([param isKindOfClass:NSString.class]);
            //   XCTAssertTrue([((NSString *)param) isEqualToString:@"value"]);
            //   [nums addObject:@2];
            //   [expectation fulfill];
            // }];
            // XCTAssertTrue(nums.count == 2);
            // XCTAssertTrue([nums[0] intValue] == 1);
            // XCTAssertTrue([nums[0] intValue] == 2);
            // [self waitForExpectationsWithCommonTimeout];
            //
            // // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
            // expect(a).assertEqual('test')
        });
    });
}
//# sourceMappingURL=EventEmitter.test.js.map