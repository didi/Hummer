import { HMContext } from '../Context/HMContext';
import { IContentProvider } from '../Interface/IContentProvider';
import { fn } from '../Utils/Utils';

export class HummerCoreContentProvider implements IContentProvider {
  private renderFunc: fn

  constructor(renderFunc: fn) {
    this.renderFunc = renderFunc;
  }

  render(context: HMContext) {
  }
}