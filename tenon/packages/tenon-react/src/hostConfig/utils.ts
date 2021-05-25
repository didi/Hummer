import {Base as Element, isNotHasChilrenTag, isWithTextTag} from "@hummer/tenon-core"

export function diffProperties(node:Element, type: string, oldProps: any, newProps: any){
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

export function processProps(props:any, type:string, node:Element){
  if(isWithTextTag(type)){
    if(typeof props.children === 'string'){
      node.setElementText(props.children)
    }else if(typeof props.children === 'object'){
      node.setElementText(props.children.join(''))
    }
  }
  Object.keys(props).forEach((key:string) => {
    if(key === 'children'){
      return
    }
    node.setAttribute(key, props[key])
  })
}
export function shouldSetTextContent(type:string):boolean{
  return isNotHasChilrenTag(type)
}
