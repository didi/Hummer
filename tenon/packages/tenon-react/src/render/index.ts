import ReactReconciler from 'react-reconciler'
import {HostConfig} from '../hostConfig'


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
} as any)

function getPublicRootInstance(container: ReactReconciler.FiberRoot) {
  const containerFiber = container.current;
  if (!containerFiber.child) {
    return null;
  }
  return containerFiber.child.stateNode;
}

export function render(rootElement: React.ReactElement | null, container:any) {
  // Create a root Container if it doesnt exist
  if (!container._rootContainer) {
    container._rootContainer = TenonRenderInst.createContainer(container, 0, false, null);
  }

  TenonRenderInst.updateContainer(rootElement, container._rootContainer, null, () => {
    // ignore
  });

  return getPublicRootInstance(container._rootContainer);
}
