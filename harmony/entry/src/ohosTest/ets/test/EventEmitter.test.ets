import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { EventEmitter, isArray, isBoolean, isNumber, isObject, isString } from 'hummer/ts'

export default function EventEmitterTest() {
  describe('EventEmitterTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it('testParams', 0, () => {

      const emitter = new EventEmitter();

      emitter.on('testNumber', (value: number) => {
        expect(isNumber(value)).assertTrue();
        expect(1 == value).assertTrue();
      })
      emitter.emit('testNumber', 1);

      emitter.on('testBool', (value: boolean) => {
        expect(isBoolean(value)).assertTrue();
        expect(value == true).assertTrue();
      })
      emitter.emit('testBool', true);

      emitter.on('testString', (value: string) => {
        expect(isString(value)).assertTrue();
        expect(value == 'string').assertTrue();
      })
      emitter.emit('testString', 'string');

      emitter.on('testArray', (value: Array<number>) => {
        expect(isArray(value)).assertTrue();
        expect(value[0] == 1).assertTrue();
      })
      emitter.emit('testArray', [1]);

      const obj: ESObject = {
        'name': "didi"
      };
      emitter.on('testObject', (value: Object) => {
        expect(isObject(value)).assertTrue();
        expect(value === obj).assertTrue();
      })
      emitter.emit('testObject', obj);
    })

    it('testOff', 0, () => {

      const emitter = new EventEmitter();
      const res: Array<number> = new Array();
      const callback1 = (value: number) => {
        res.push(1);
      }
      const fn1 = emitter.on('test', callback1)

      const callback2 = (value: number) => {
        res.push(2);
      }
      const fn2 = emitter.on('test', callback2)

      const callback3 = (value: number) => {
        res.push(3);
      }
      const fn3 = emitter.on('test', callback3)

      emitter.emit('test');
      expect(res.length == 3).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res[1] === 2).assertTrue();
      expect(res[2] === 3).assertTrue();

      let listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 3).assertTrue();
      expect(listeners[0] === callback1).assertTrue();
      expect(listeners[1] === callback2).assertTrue();
      expect(listeners[2] === callback3).assertTrue();

      fn2();
      listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 2).assertTrue();
      expect(listeners[0] === callback1).assertTrue();
      expect(listeners[1] === callback3).assertTrue();
      emitter.emit('test');
      expect(res.length == 5).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res[1] === 2).assertTrue();
      expect(res[2] === 3).assertTrue();
      expect(res[3] === 1).assertTrue();
      expect(res[4] === 3).assertTrue();

      fn1();
      listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 1).assertTrue();
      expect(listeners[0] === callback3).assertTrue();
      emitter.emit('test');
      expect(res.length == 6).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res[1] === 2).assertTrue();
      expect(res[2] === 3).assertTrue();
      expect(res[3] === 1).assertTrue();
      expect(res[4] === 3).assertTrue();
      expect(res[4] === 3).assertTrue();


      fn3();
      listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 0).assertTrue();
      emitter.emit('test');
      expect(res.length == 6).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res[1] === 2).assertTrue();
      expect(res[2] === 3).assertTrue();
      expect(res[3] === 1).assertTrue();
      expect(res[4] === 3).assertTrue();
      expect(res[4] === 3).assertTrue();
    })

    it('testOffAll', 0, () => {

      const emitter = new EventEmitter();
      const res: Array<number> = new Array();
      const callback1 = (value: number) => {
        res.push(1);
      }
      const fn1 = emitter.on('test', callback1)

      const callback2 = (value: number) => {
        res.push(2);
      }
      const fn2 = emitter.on('test', callback2)

      const callback3 = (value: number) => {
        res.push(3);
      }
      const fn3 = emitter.on('test', callback3)

      emitter.emit('test');
      expect(res.length == 3).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res[1] === 2).assertTrue();
      expect(res[2] === 3).assertTrue();

      let listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 3).assertTrue();
      expect(listeners[0] === callback1).assertTrue();
      expect(listeners[1] === callback2).assertTrue();
      expect(listeners[2] === callback3).assertTrue();

      emitter.off('test');
      listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 0).assertTrue();
    })

    it('testOnEmitOff', 0, () => {

      const res:Array<number> = new Array();
      const emitter = new EventEmitter();
      const callback = (num:number)=>{
        res.push(num)
      }
      let fn = emitter.on('test', callback)
      emitter.emit('test', 1);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();

      let listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 1).assertTrue();
      expect(listeners[0] === callback).assertTrue();

      fn();
      listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length).assertEqual(0)

      emitter.emit('test', 2);
      expect(res.length).assertEqual(1);
      expect(res[0]).assertEqual(1);

      fn = emitter.on('test', callback)
      expect(res.length).assertEqual(2);
      expect(res[0]).assertEqual(1);
      expect(res[1]).assertEqual(2);


      listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 1).assertTrue();
      expect(listeners[0] === callback).assertTrue();

      emitter.off('test')
      listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 0).assertTrue();
    })

    it('testOnce', 0, () => {

      const res:Array<number> = new Array();
      const emitter = new EventEmitter();
      const callback = (num:number)=>{
        expect(isNumber(num)).assertTrue();
        expect(num == 1).assertTrue()
        res.push(num)
      }
      let fn = emitter.once('test', callback)

      let listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 1).assertTrue();
      expect(listeners[0] === callback).assertTrue();

      emitter.emit('test', 1);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();

      listeners = emitter._TestOnlyGetCallback('test')
      expect(listeners.length == 0).assertTrue();

      emitter.emit('test', 1);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
    })
  })
}