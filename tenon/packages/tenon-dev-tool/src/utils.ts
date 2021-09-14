const NODE_VIEW = "Symbol(NODE_VIEW)";
const NODE_TEXT = "Symbol(NODE_TEXT)";
const NODE_IMAGE = "Symbol(NODE_IMAGE)"
const NODE_BUTTON = "Symbol(NODE_BUTTON)"
const NODE_TEXTAREA = "Symbol(NODE_TEXTAREA)"
const NODE_INPUT = "Symbol(NODE_INPUT)"
const NODE_SWITCH = "Symbol(NODE_SWITCH)"
const NODE_SCROLLER = "Symbol(NODE_SCROLLER)"
const NODE_REFRESH = "Symbol(NODE_REFRESH)"
const NODE_LOADMORE = "Symbol(NODE_LOADMORE)"

function getElementTagMap() {
  let tagMap = new Map();
  tagMap.set(NODE_VIEW, 'view');
  tagMap.set(NODE_TEXT, 'text');
  tagMap.set(NODE_IMAGE, 'image');
  tagMap.set(NODE_BUTTON, 'button');
  tagMap.set(NODE_TEXTAREA, 'textarea');
  tagMap.set(NODE_INPUT, 'input');
  tagMap.set(NODE_SWITCH, 'switch');
  tagMap.set(NODE_SCROLLER, 'scroller');
  tagMap.set(NODE_REFRESH, 'refresh');
  tagMap.set(NODE_LOADMORE, 'loadmore');
  return tagMap;
}

export const ELEMNT_TAG_MAP = getElementTagMap()

export const getPartUrlByParam = (url: string, param: string) => {
  const reg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  const res: any = reg.exec(url)
  const fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
  return res[fields.indexOf(param)]
}

export const getViewData = function (container: any) {
  let simpleRoot = Object.create({})
  let viewMap = Object.create({})
  const treeTraveler = function(node: any, rootView: any) {
    processView(node, rootView, viewMap)
    if (node.children && node.children.size > 0) {
      rootView.children = Array.apply(null, new Array(node.children.size)).map( () => {return {}})
      let arr = Array.from(node.children)
      arr.forEach((n, i) => {
        treeTraveler(n, rootView.children[i])
      })
    }
  }
  treeTraveler(container, simpleRoot)
  return {
    simpleRoot,
    viewMap
  }
}

const processView = function(node: any, rootView: any, viewMap: any) {
  rootView.__view_id = node.__view_id
  rootView.name = node.__NAME && ELEMNT_TAG_MAP.get(node.__NAME.toString()) || 'template'
  switch (rootView.name) {
    case 'text':
      rootView.text = node._text
      break;
    case 'image':
      rootView.src = node._src
      break;
    default:
      break;
  }
  viewMap[rootView.__view_id] = node
}

export const updateOptions = function (oldOptions:any, newOptions:any) {
  for (const key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (const key in newOptions) {
    oldOptions[key] = newOptions[key]
  }
  return oldOptions
}

export const log = function (str: String) {
  console.log(`[RUNTIME_DEV_TOOL]: ${str}`)
}