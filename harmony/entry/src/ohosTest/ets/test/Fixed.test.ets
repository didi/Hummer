import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { HMNode, RootNode, HMContext } from 'hummer/ts'
import { common } from '@kit.AbilityKit'

export default function FixedTest() {
  describe('FixedTest', () => {

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

    it('testSetStyleFixed', 0, () => {
      const context = new HMContext( {} as common.UIAbilityContext);
      const root = new RootNode(context);
      HMContext.setRootView(context, root);

      const child = new HMNode(context, generateId(), 'view')
      root.appendChild(child);

      expect(root.childNodes.length == 1).assertTrue();

      const fixedChild = new HMNode(context, generateId(), 'view')
      child.appendChild(fixedChild);

      expect(root.childNodes.length == 1).assertTrue();
      expect(child.childNodes.length == 1).assertTrue();

      fixedChild.setStyles({position:'fixed'})

      expect(root.childNodes.length == 2).assertTrue();
      expect(child.childNodes.length == 0).assertTrue();
    })

    it('testAppendFixedChild', 0, () => {
      const context = new HMContext( {} as common.UIAbilityContext);
      const root = new RootNode(context);
      HMContext.setRootView(context, root);

      const child = new HMNode(context, generateId(), 'view')
      root.appendChild(child);

      expect(root.childNodes.length == 1).assertTrue();
      expect(root.childNodes[0] == child).assertTrue();

      const fixedChild = new HMNode(context, generateId(), 'view')
      fixedChild.setStyles({position:'fixed'})

      expect(root.childNodes.length == 1).assertTrue();
      expect(root.childNodes[0] == child).assertTrue();
      expect(child.childNodes.length == 0).assertTrue();

      child.appendChild(fixedChild);

      expect(root.childNodes.length == 2).assertTrue();
      expect(root.childNodes[0] == child).assertTrue();
      expect(root.childNodes[1] == fixedChild).assertTrue();
      expect(child.childNodes.length == 0).assertTrue();
    })

/*
 *  R                     R                  R
 *  A                   A   B                A
 * B C  fixed b   ->  C        flex b->    B   C
 *
 * */
    it('testResetFlex', 0, () => {
      const context = new HMContext( {} as common.UIAbilityContext);
      const root = new RootNode(context);
      HMContext.setRootView(context, root);

      const a = new HMNode(context, generateId(), 'view')
      root.appendChild(a);

      expect(root.childNodes.length == 1).assertTrue();
      expect(root.childNodes[0] == a).assertTrue();

      const b = new HMNode(context, generateId(), 'view')
      a.appendChild(b);

      expect(root.childNodes.length == 1).assertTrue();
      expect(root.childNodes[0] == a).assertTrue();
      expect(a.childNodes.length == 1).assertTrue();
      expect(a.childNodes[0] == b).assertTrue();


      const c = new HMNode(context, generateId(), 'view')
      a.appendChild(c);

      expect(root.childNodes.length == 1).assertTrue();
      expect(root.childNodes[0] == a).assertTrue();
      expect(a.childNodes.length == 2).assertTrue();
      expect(a.childNodes[0] == b).assertTrue();
      expect(a.childNodes[1] == c).assertTrue();

      b.setStyles({position:'fixed'})

      expect(root.childNodes.length == 2).assertTrue();
      expect(root.childNodes[0] == a).assertTrue();
      expect(root.childNodes[1] == b).assertTrue();
      expect(a.childNodes.length == 1).assertTrue();
      expect(a.childNodes[0] == c).assertTrue();

      b.setStyles({position:'relative'})

      expect(root.childNodes.length == 1).assertTrue();
      expect(root.childNodes[0] == a).assertTrue();
      expect(a.childNodes.length == 2).assertTrue();
      expect(a.childNodes[0] == b).assertTrue();
      expect(a.childNodes[1] == c).assertTrue();
    })
  })
}
let _id = 1;
function generateId() : number{

  return _id++;

}