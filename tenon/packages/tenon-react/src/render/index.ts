import ReactReconciler from 'react-reconciler'
import HostConfig from '../hostConfig/index'
import {document} from '@hummer/tenon-core'

const TenonRenderInst = ReactReconciler({
  ...HostConfig,
  clearTimeout,
  setTimeout,
  isPrimaryRenderer: true,
  noTimeout: -1,
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  now: Date.now,
  scheduleDeferredCallback: () => {},
  cancelDeferredCallback: () => {}
} as any);


export function render(rootElement: React.ReactElement | null) {
  // TODO 支持生命周期传递
  let page = document.createPageView({})
  let container = TenonRenderInst.createContainer(page, 0, false, null)
  console.log('Tenon React Render')
  TenonRenderInst.updateContainer(rootElement, container, null, () => {
    // ignore
    page.render()
  });

  return container
}
