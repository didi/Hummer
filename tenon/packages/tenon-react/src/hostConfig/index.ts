import {document,Base as Element} from "@hummer/tenon-core"

type HostContext = string;
type Context = any;
const randomKey = Math.random()
  .toString(36)
  .slice(2);
const internalInstanceKey = '__reactFiber$' + randomKey;
const internalPropsKey = '__reactProps$' + randomKey;

function appendChild(parent: Element, child: Element): void {
  parent._appendChild(child);
}

function appendChildToContainer(container: any, child: Element): void {
  // TODO Container 添加子节点
  container._appendChild(child);
}

function appendInitialChild(parent: Element, child: Element): void {
  parent._appendChild(child);
}

function commitMount() {

}

// 提交文本更新
function commitTextUpdate() {

}

// 更新处理
function commitUpdate(
  instance: any,
  updatePayload: any,
): void {
  console.log('Commit Update')
  Object.keys(updatePayload).forEach(attr => {
    if (attr === 'children') {
      instance.text = updatePayload[attr].join('');
    }
    instance.setAttribute(attr, updatePayload[attr])

  });
}

function createContainerChildSet() {

}

function createInstance(
  type: string,
  props: any,
  rootContainerInstance: any,
  hostContext: HostContext,
  internalInstanceHandle: Object,
) {
  const element = document.createElement(type) as any;
  Object.keys(props).forEach((attr) => {
    switch (attr) {
      case 'children':
        if (type === 'text') {
          if (typeof props.children === 'string') {
            element.text = props.children;
          } else if (typeof props.children === 'object') {
            element.text = props.children.join('');
          }
        }
        break;
      case 'style':
        element.setStyle(props[attr]);
        break;
      default:
        element.setAttribute(attr, props[attr]);
        break;
    }
  })
  element[internalInstanceKey] = internalInstanceHandle;
  element[internalPropsKey] = props;
  return element;
}

function createTextInstance(
  text: string,
  rootContainerInstance: Document,
  hostContext: HostContext,
  internalInstanceHandle: Object) {
  const element = document.createElement('text') as any;
  element.meta = {
    skipDom: true
  }
  element.text = text;
  element[internalInstanceKey] = internalInstanceHandle;
  return element;
}
function finalizeContainerChildren() {

}
function finalizeInitialChildren() {
  return true
}
function getPublicInstance(instance: Element): Element {
  return instance
}
function insertBefore(
  parent: Element,
  child: Element,
  beforeChild: Element) {
  parent._insertBefore(child, beforeChild);
}
function prepareForCommit() {

}

function prepareUpdate(
  instance: Element,
  type: string,
  oldProps: any,
  newProps: any,
): any {
  const updatePayload: {
    [key: string]: any;
  } = {};
  Object.keys(newProps).forEach((key: string) => {
    const oldPropValue = oldProps[key];
    const newPropValue = newProps[key];
    switch (key) {
      case 'children': {
        if (oldPropValue !== newPropValue) {
          updatePayload[key] = newPropValue;
        }
        break;
      }
      default: {
        // FIXME: Cancel a event listener
        if (typeof oldPropValue === 'function' && typeof newPropValue === 'function') {
          // just skip it if meets function
        } else if (oldPropValue !== newPropValue) {
          updatePayload[key] = newPropValue;
        }
      }
    }
  });
  if (!Object.keys(updatePayload).length) {
    return null;
  }
  return updatePayload;
}

function replaceContainerChildren() {

}


function removeChild(parent: Element, child: Element): void {
  parent._removeChild(child);
}

function removeChildFromContainer(parent: Element, child: Element): void {
  parent._removeChild(child);
}

function resetAfterCommit() {

}


function resetTextContent() {

}
function getRootHostContext(): Context {
  return {}
}
function getChildHostContext(): Context {
  return {}
}
function shouldDeprioritizeSubtree(): boolean {
  return true
}
function shouldSetTextContent(type: string, nextProps: any): boolean {
  if (['text'].indexOf(type) !== -1) {
    const { children } = nextProps;
    return typeof children === 'string' || typeof children === 'number';
  }
  return false;
}

function clearContainer(container: any): void {
  console.log('Clear Container')
  container = null
}

export const HostConfig = {
  appendChild,
  appendChildToContainer,
  appendInitialChild,
  commitMount,
  commitTextUpdate,
  commitUpdate,
  createContainerChildSet,
  createInstance,
  createTextInstance,
  finalizeContainerChildren,
  finalizeInitialChildren,
  getPublicInstance,
  insertBefore,
  prepareForCommit,
  prepareUpdate,
  replaceContainerChildren,
  removeChild,
  removeChildFromContainer,
  resetAfterCommit,
  resetTextContent,
  getRootHostContext,
  getChildHostContext,
  shouldDeprioritizeSubtree,
  shouldSetTextContent,
  clearContainer
}