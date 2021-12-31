// tenon 节点类型定义
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
// hummer 节点类型定义
const HUMMER_VIEW = 'View'
const HUMMER_TEXT = 'Text'
const HUMMER_BUTTON = 'Button'
const HUMMER_IMAGE = 'Image'
const HUMMER_INPUT = 'Input'
const HUMMER_TEXTAREA = 'TextArea'
const HUMMER_SWITCH = 'Switch'
const HUMMER_LOADING = 'Loading'
const HUMMER_SCROLLER = 'Scroller'
const HUMMER_HORIZONTALSCROLLER = 'HorizontalScroller'
const HUMMER_LIST = 'List'
const HUMMER_VIEWPAGER = 'ViewPager'
const HUMMER_DIALOG = 'Dialog'


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

  tagMap.set(HUMMER_VIEW, 'view');
  tagMap.set(HUMMER_TEXT, 'text');
  tagMap.set(HUMMER_BUTTON, 'button');
  tagMap.set(HUMMER_IMAGE, 'image');
  tagMap.set(HUMMER_INPUT, 'input');
  tagMap.set(HUMMER_TEXTAREA, 'textarea');
  tagMap.set(HUMMER_SWITCH, 'switch');
  tagMap.set(HUMMER_LOADING, 'loading');
  tagMap.set(HUMMER_SCROLLER, 'scroller');
  tagMap.set(HUMMER_HORIZONTALSCROLLER, 'horizontalscroller');
  tagMap.set(HUMMER_LIST, 'list');
  tagMap.set(HUMMER_VIEWPAGER, 'viewpager');
  tagMap.set(HUMMER_DIALOG, 'view');

  return tagMap;
}

export const ELEMNT_TAG_MAP = getElementTagMap()

export const getPartUrlByParam = (url: string, param: string) => {
  const reg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  const res: any = reg.exec(url)
  const fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
  return res[fields.indexOf(param)]
}

/**
 * 格式化来自不同框架的视图节点（hummer/tenon-vue/tenon-react）
 * @param node 
 * @param type 
 * @returns simplenode
 */
export const formatNode = function (node: any, type: string = 'tenon-vue') {
  let formatedNode = Object.create({})
  const treeTraveler = function (node: any, rootView: any) {
    processView(node, rootView, type)
    if (node.children) {
      // hummer children类型Array tenon-vue类型Set 处理一下
      let arr = Array.from(node.children)
      if (arr.length) {
        rootView.children = Array.apply(null, new Array(arr.length)).map(() => { return {} })
        arr.forEach((n, i) => {
          treeTraveler(n, rootView.children[i])
        })
      }
    }
  }
  treeTraveler(node, formatedNode)
  return formatedNode
}

export const getViewData = function (container: any, type: string = 'tenon-vue') {
  let simpleRoot = Object.create({})
  let viewMap = Object.create({})
  const treeTraveler = function (node: any, rootView: any) {
    if (node?.tagName) {
      node.name = node?.tagName.toLowerCase()
      node.style = node?.element?._style
      node.__view_id = node?.element?.objID
      switch (node.name) {
        case 'text':
          node.text = node.element?._text
          break;
        case 'image':
          node.src = node.element?._src
          break;
        default:
          break;
      }
    }
    rootView = Object.assign(rootView, node)
    viewMap[rootView.__view_id] = node
    delete rootView.children
    delete rootView.element
    if (node.name === 'template' && node !== container) {
      if (node?.element.dbg_getDescription) {
        node?.element.dbg_getDescription((thatNode: any) => {
          if (thatNode?.children) {
            thatNode.children.forEach((item: any, index: number) => {
              thatNode.children[index].name = item?.tagName
              thatNode.children[index].style = item?.element?._style
              thatNode.children[index].__view_id = item?.element?.objID
              switch (item.name) {
                case 'Text':
                  thatNode.children[index].text = item.element._text
                  break;
                case 'Image':
                  thatNode.children[index].src = item.element._src
                  break;
                default:
                  break;
              }
            });
            node.children = thatNode.children
          }
          node.name = thatNode.tagName.toLowerCase()
          rootView.name = node.name
          if (node.children && node.children.length > 0) {
            rootView.children = Array.apply(null, new Array(node?.children?.length || 0)).map(() => { return {} })
            let arr = Array.from(node.children)
            arr.forEach((n, i) => {
              treeTraveler(n, rootView.children[i])
            })
          }
        })
        // let element = await getDescription(node?.element)
        //@ts-ignore
        // node.children = element.children
        // if (node.children && node.children.length > 0) {
        //   rootView.children = Array.apply(null, new Array(node?.children?.length || 0)).map(() => { return {} })
        //   let arr = Array.from(node.children)
        //   arr.forEach((n, i) => {
        //     treeTraveler(n, rootView.children[i])
        //   })
        // }
      }
    } else {
      if (node.children && node.children.length > 0) {
        rootView.children = Array.apply(null, new Array(node?.children?.length || 0)).map(() => { return {} })
        let arr = Array.from(node.children)
        arr.forEach((n, i) => {
          treeTraveler(n, rootView.children[i])
        })
      }
    }
  }
  treeTraveler(container, simpleRoot)
  return {
    simpleRoot,
    viewMap
  }
}
// const getDescription = async function (element: any) {
//   return await new Promise((res, rej) => {
//     element.dbg_getDescription((thatNode: any) => {
//       res(thatNode)
//     })
//   }).then((res) => {
//     return res
//   })
// }
const processView = function (node: any, rootView: any, type: string = 'tenon-vue') {
  let nameKey = '__NAME',
    idKey = '__view_id',
    textKey = '_text',
    srcKey = '_src',
    elementKey = 'element',
    styleKey = 'style',
    classNameKey = 'className'

  rootView.style = node[styleKey]

  switch (type) {
    case 'hummer':
      nameKey = 'tagName'
      idKey = 'id'
      textKey = 'content'
      srcKey = 'content'
      rootView.style = node.element.style
      break;
    default:
      break;
  }

  rootView.__view_id = node[idKey]
  rootView.name = node[nameKey] && ELEMNT_TAG_MAP.get(node[nameKey].toString()) || 'template'
  rootView.element = node[elementKey]
  rootView.className = node[classNameKey]
  node[elementKey]?.node&&(node[elementKey].node.__view_id = node[idKey])
  switch (rootView.name) {
    case 'text':
      rootView.text = node[textKey]
      break;
    case 'image':
      rootView.src = node[srcKey]
      break;
    default:
      break;
  }
  // viewMap[rootView.__view_id] = node
}

export const updateOptions = function (oldOptions: any, newOptions: any) {
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
  console.info(`[RUNTIME_DEV_TOOL]: ${str}`)
}

export const error = function (str: String) {
  console.error(`[RUNTIME_DEV_TOOL]: ${str}`)
}

export const guid = function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}

export const logHola = function () {
  console.info('          _____                    _____                    _____                    _____                    _____                    _____          ')
  console.info(`         /\    \                  /\    \                  /\    \                  /\    \                  /\    \                  /\    \         `)
  console.info(`        /::\____\                /::\____\                /::\____\                /::\____\                /::\    \                /::\    \        `)
  console.info(`       /:::/    /               /:::/    /               /::::|   |               /::::|   |               /::::\    \              /::::\    \       `)
  console.info(`      /:::/    /               /:::/    /               /:::::|   |              /:::::|   |              /::::::\    \            /::::::\    \      `)
  console.info(`     /:::/    /               /:::/    /               /::::::|   |             /::::::|   |             /:::/\:::\    \          /:::/\:::\    \     `)
  console.info(`    /:::/____/               /:::/    /               /:::/|::|   |            /:::/|::|   |            /:::/__\:::\    \        /:::/__\:::\    \    `)
  console.info(`   /::::\    \              /:::/    /               /:::/ |::|   |           /:::/ |::|   |           /::::\   \:::\    \      /::::\   \:::\    \   `)
  console.info(`  /::::::\    \   _____    /:::/    /      _____    /:::/  |::|___|______    /:::/  |::|___|______    /::::::\   \:::\    \    /::::::\   \:::\    \  `)
  console.info(` /:::/\:::\    \ /\    \  /:::/____/      /\    \  /:::/   |::::::::\    \  /:::/   |::::::::\    \  /:::/\:::\   \:::\    \  /:::/\:::\   \:::\____\ `)
  console.info(`/:::/  \:::\    /::\____\|:::|    /      /::\____\/:::/    |:::::::::\____\/:::/    |:::::::::\____\/:::/__\:::\   \:::\____\/:::/  \:::\   \:::|    |`)
  console.info(`\::/    \:::\  /:::/    /|:::|____\     /:::/    /\::/    / ~~~~~/:::/    /\::/    / ~~~~~/:::/    /\:::\   \:::\   \::/    /\::/   |::::\  /:::|____|`)
  console.info(` \/____/ \:::\/:::/    /  \:::\    \   /:::/    /  \/____/      /:::/    /  \/____/      /:::/    /  \:::\   \:::\   \/____/  \/____|:::::\/:::/    / `)
  console.info(`          \::::::/    /    \:::\    \ /:::/    /               /:::/    /               /:::/    /    \:::\   \:::\    \            |:::::::::/    /  `)
  console.info(`           \::::/    /      \:::\    /:::/    /               /:::/    /               /:::/    /      \:::\   \:::\____\           |::|\::::/    /   `)
  console.info(`           /:::/    /        \:::\__/:::/    /               /:::/    /               /:::/    /        \:::\   \::/    /           |::| \::/____/    `)
  console.info(`          /:::/    /          \::::::::/    /               /:::/    /               /:::/    /          \:::\   \/____/            |::|  ~|          `)
  console.info(`         /:::/    /            \::::::/    /               /:::/    /               /:::/    /            \:::\    \                |::|   |          `)
  console.info(`        /:::/    /              \::::/    /               /:::/    /               /:::/    /              \:::\____\               \::|   |          `)
  console.info(`        \::/    /                \::/____/                \::/    /                \::/    /                \::/    /                \:|   |          `)
  console.info(`         \/____/                  ~~                       \/____/                  \/____/                  \/____/                  \|___|          `)
}
