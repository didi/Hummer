import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { isNumber, HMNotifyCenter, HMContext, HMAny } from 'hummer/ts'

export default function HMNotifyCenterTest() {
  describe('HMNotifyCenterTest', () => {
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

    it('test', 0, () => {

      const abilityContext:ESObject = {};
      const res:Array<number> = new Array();
      const names:Array<string> = new Array();

      const ctx = new HMContext(abilityContext)
      const notifyCenter = new HMNotifyCenter(ctx, 1, 'HMNotifyCenter');
      notifyCenter.setEventTarget((name:string, value:number)=>{
        if(name == 'test'){
          expect(isNumber(value)).assertTrue();
          expect(value == 1).assertTrue()
          res.push(value)
        } else if(name == 'test2'){
          expect(isNumber(value)).assertTrue();
          expect(value == 2).assertTrue()
          res.push(value)
        }
        names.push(name);
      })
      notifyCenter.addEventListener('test');
      notifyCenter.triggerEvent('test', 1);
      expect(res.length == 1).assertTrue();
      expect(names.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(names[0] == 'test').assertTrue();

      notifyCenter.triggerEvent('test2', 2);
      expect(res.length == 1).assertTrue();
      expect(names.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(names[0] == 'test').assertTrue();

      notifyCenter.addEventListener('test2');
      expect(res.length == 1).assertTrue();
      expect(names.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(names[0] == 'test').assertTrue();

      notifyCenter.triggerEvent('test2', 2);
      expect(res.length == 2).assertTrue();
      expect(names.length == 2).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res[1] === 2).assertTrue();
      expect(names[0] == 'test').assertTrue();
      expect(names[1] == 'test2').assertTrue();
    })

    it('testRemove', 0, () => {

      const res:Array<number> = new Array();
      const abilityContext:ESObject = {};
      const ctx = new HMContext(abilityContext)
      const notifyCenter = new HMNotifyCenter(ctx, 1, 'HMNotifyCenter');
      notifyCenter.setEventTarget((name:string, num:number)=>{
        expect(isNumber(num)).assertTrue();
        expect(num == 1).assertTrue()
        res.push(num)
      })
      notifyCenter.addEventListener('test');
      notifyCenter.triggerEvent('test', 1);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();

      notifyCenter.removeEventListener('test')
      notifyCenter.triggerEvent('test', 1);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
    })
  })
}