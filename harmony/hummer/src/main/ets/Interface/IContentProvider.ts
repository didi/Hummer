import { HMContext } from '../Context/HMContext';

export interface IContentProvider {
  render(context: HMContext);
}
