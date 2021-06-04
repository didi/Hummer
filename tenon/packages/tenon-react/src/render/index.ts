import ReactReconciler from 'react-reconciler'
import {document} from '@hummer/tenon-core'

import HostConfig from '../hostConfig/index'
import {GlobalLifeCycles} from '../lifecycle/global-lifecycle'

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


export function render(rootElement: React.ReactElement | null, options:any) {
  let page = document.createPageView({
    ...options,
    ...GlobalLifeCycles
  })
  let container = TenonRenderInst.createContainer(page, 0, false, null)
  TenonRenderInst.updateContainer(rootElement, container, null, () => {
    // ignore
    page.render()
  });

  return container
}