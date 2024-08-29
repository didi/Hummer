import { HMContext } from '../Context/HMContext';
import { IContentProvider } from '../Interface/IContentProvider';
import { fn } from '../Utils/Utils';

export class HarmonyRuntimeContentProvider implements IContentProvider {
  private renderFunc: fn

  constructor(renderFunc: fn) {
    this.renderFunc = renderFunc;
  }

  render(context: HMContext) {
    this.renderFunc(context.harmonyRuntime.hummerObject, context.harmonyRuntime.globalObject);
  }
}
