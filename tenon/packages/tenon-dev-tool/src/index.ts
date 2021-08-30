// let container = null
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
const ELEMNT_TAG_MAP = getElementTagMap();
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
/**
 * DevTool 启动入口函数
 * @param container 页面实例，通过引用可以拿到整个视图树，以及视图上的各个实例
 */
export function run(container:any){
  log('get ready~')
  const { url } = __GLOBAL__.Hummer.pageInfo
  let host = getPartUrlByParam(url, 'host')
  let port = getPartUrlByParam(url, 'port')

  let viewMap = {}
    // 设置各种监听回调
  __GLOBAL__.WebSocket.onOpen(() => {
    log('websocket opened~');
  });

  __GLOBAL__.WebSocket.onMessage((data: any) => {
    let msg = JSON.parse(data)
    switch (msg.method) {
      case 'getViewTree':
        let data = getViewData(container)
        viewMap = data.viewMap
        __GLOBAL__.WebSocket.send(JSON.stringify({
          type: 'view',
          method: 'setViewTree',
          params: {
            ...msg.params,
            viewTree: [data.simpleRoot],
            baseInfo: __GLOBAL__.Hummer.env
          }
        }))
        break;
      case 'getViewInfo':
        let viewId:number = msg.params.viewId
        // @ts-ignore
        let view = viewMap[viewId]
        view.element.getRect((rect: any) => {
          view.element.dbg_highlight && view.element.dbg_highlight(true)
          __GLOBAL__.WebSocket.send(JSON.stringify({
            type: 'view',
            method: 'setViewInfo',
            params: {
              ...msg.params,
              rect: rect,
              style: view.style,
              className: view.className
            }
          }))
        })
        break;
      default:
        break;
    }
  });

  // scoket连接 取Hummer PageInfo 信息
  __GLOBAL__.WebSocket.connect(`ws://${host}:${port}/proxy/tenon`);
}

const log = function (str: String) {
  console.log(`[RUNTIME_DEV_TOOL]: ${str}`)
}

const getViewData = function (container: any) {
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


const getPartUrlByParam = (url: string, param: string) => {
  const reg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  const res: any = reg.exec(url)
  const fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
  return res[fields.indexOf(param)]
}
