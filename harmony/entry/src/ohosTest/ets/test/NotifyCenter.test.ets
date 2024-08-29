import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { isNumber, NotifyCenter } from 'hummer/ts'
export default function NotifyCenterTest() {
  describe('NotifyCenterTest', () => {
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
    it('testRemoveAll', 0, () => {

      const res:Array<number> = new Array();

      const notifyCenter = NotifyCenter.getInstance('didi')
      notifyCenter.addEventListener('test', (num:number)=>{
        expect(isNumber(num)).assertTrue();
        expect(num == 1).assertTrue()
        res.push(num)
      });
      notifyCenter.triggerEvent('test', 1);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();

      notifyCenter.removeEventListener('test')
      notifyCenter.triggerEvent('test', 1);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
    })

    it('testRemove', 0, () => {

      const res:Array<number> = new Array();

      const notifyCenter = NotifyCenter.getInstance('didi')
      notifyCenter.addEventListener('test', (num:number)=>{
        expect(isNumber(num)).assertTrue();
        expect(num == 1).assertTrue()
        res.push(1)
      });

      const callback = (num:number)=>{
        expect(isNumber(num)).assertTrue();
        expect(num == 1).assertTrue()
        res.push(2)
      }
      notifyCenter.addEventListener('test', callback);
      notifyCenter.triggerEvent('test', 1);
      expect(res.length == 2).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res[1] === 2).assertTrue();

      notifyCenter.removeEventListener('test', callback)
      notifyCenter.triggerEvent('test', 1);
      expect(res.length == 3).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res[1] === 2).assertTrue();
      expect(res[2] === 1).assertTrue();
    })

    it('testNamespace', 0, () => {

      const res:Array<number> = new Array();
      const res2:Array<number> = new Array();

      const notifyCenter = NotifyCenter.getInstance('didi')
      const notifyCenter2 = NotifyCenter.getInstance('didi2')

      notifyCenter.addEventListener('test', (num:number)=>{
        expect(isNumber(num)).assertTrue();
        expect(num == 1).assertTrue()
        res.push(1)
      });

      notifyCenter2.addEventListener('test', (num:number)=>{
        expect(isNumber(num)).assertTrue();
        expect(num == 2).assertTrue()
        res2.push(2)
      });

      notifyCenter.triggerEvent('test', 1);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res2.length == 0).assertTrue();

      notifyCenter2.triggerEvent('test', 2);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res2.length == 1).assertTrue();
      expect(res2[0] === 2).assertTrue();

      notifyCenter.removeEventListener('test')
      notifyCenter.triggerEvent('test', 1);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res2.length == 1).assertTrue();
      expect(res2[0] === 2).assertTrue();

      notifyCenter2.triggerEvent('test', 2);
      expect(res.length == 1).assertTrue();
      expect(res[0] === 1).assertTrue();
      expect(res2.length == 2).assertTrue();
      expect(res2[0] === 2).assertTrue();
      expect(res2[1] === 2).assertTrue();

    })
  })
}