import { Base } from "src/runtime"

export interface Style{
  [key:string]:string
}

export enum MatchType {
  Class,
  ID,
  Attr,
  Tag,
}
export interface RuleNode {
  selector: any,
  relation: string,
  matchType: MatchType
}
export interface RuleSet{
  [key: string]: Array<RuleNode>, // 索引签名
  tagList: Array<RuleNode>,
  classList: Array<RuleNode>,
  attrList: Array<RuleNode>
}
export interface RuleSetMap {
  global: RuleSet,
  [key: string]: RuleSet
}

export const RuleKeyMap: Record<string, string> = {
  'tagList': 'tagMap',
  'classList': 'classMap',
  'idList': 'idMap'
}

export enum RelationType {
  Subselector, // No combinator(Default) .a | .a.b
  DescendantSpace, // .a .b
  Child, // .a > .b
  DirectAdjacent, // .a + .b
  IndirectAdjacent, // .a ~ .b
}

export const collectStyle = function(ruleSetMap: RuleSetMap){
  // TODO(memory-cssom): 当前 CSSOM 为进程级全局缓存（__GLOBAL__.CSSOM），仅初始化不重建。
  // TODO(memory-cssom): 在页面反复进入、HMR、重复注入样式场景下，若后续 collectStyle 再次执行，
  // TODO(memory-cssom): 将在已有缓存基础上继续累积，导致内存与查询成本持续增长。
  // TODO(memory-cssom): 下一步改造建议：
  // TODO(memory-cssom): 1) 引入“批次/版本”概念，支持按页面或 scopedId 进行覆盖写入；
  // TODO(memory-cssom): 2) 提供 clearStyleGroup(group) / clearScopedStyle(scopedId) 的释放入口；
  // TODO(memory-cssom): 3) 在页面 onUnload 或应用重渲染边界调用清理，形成完整生命周期回收。
  if(!__GLOBAL__.CSSOM){
    const defaultRuleSetGroup = {
      global: {
        tagMap: new Map(),
        classMap: new Map(),
        idMap: new Map()
      }
    }
    __GLOBAL__.CSSOM = defaultRuleSetGroup
  }
  Object.keys(ruleSetMap).forEach((group:string) => {
    let ruleSet = ruleSetMap[group]
    collectStyleGroup(ruleSet, group)
  })
}

const collectStyleGroup = function(ruleSet: RuleSet, group: string){
  // TODO(memory-cssom): 该方法当前是 append-only 行为：同 selectorKey 每次都 push(rule)。
  // TODO(memory-cssom): 这会造成重复 RuleNode 长期堆积，尤其在相同样式重复收集时（HMR/重复 mount）。
  // TODO(memory-cssom): 下一步改造建议：
  // TODO(memory-cssom): - 将 selectorKey 对应的数据结构由“累加数组”调整为“本次覆盖集”；
  // TODO(memory-cssom): - 或至少增加去重（按 selector + style 内容签名）；
  // TODO(memory-cssom): - 对 ruleSet 中不存在的旧 selectorKey 执行裁剪，避免脏规则常驻。
  if(!__GLOBAL__.CSSOM[group]){
    const defaultRuleSet = {
      tagMap: new Map(),
      classMap: new Map(),
      idMap: new Map()
    }
    __GLOBAL__.CSSOM[group] = defaultRuleSet
  }
  Object.keys(ruleSet).forEach((ruleKey:string) => {
    let ruleList = ruleSet[ruleKey]
    let key = RuleKeyMap[ruleKey]
    key && ruleList.forEach((rule:RuleNode) => {
      if(rule){
        let selectorMap = __GLOBAL__.CSSOM[group][key]
        let selectorKey = rule.selector
        let styleList = selectorMap.get(selectorKey) || []
        // TODO(memory-cssom): 这里是问题核心：持续 push 导致 styleList 单向增长。
        // TODO(memory-cssom): 目标行为应是“可控增长”：覆盖/去重/按生命周期释放，而非无限追加。
        styleList.push(rule)
        __GLOBAL__.CSSOM[group][key].set(selectorKey, styleList)
      }
    })
  })
}

export const getClassStyle = function(instance: Base, className: string = '',scoped:Boolean = false, scopedId?:string){
  let elementStyle = {}
  const classList = className.split(/\s/)
  // TODO(memory-cssom): 读取路径会直接放大缓存膨胀问题。
  // TODO(memory-cssom): 当 classMap 某 key 下规则数组被历史数据拉长后，这里的 filter/map/merge 成本线性上升。
  // TODO(memory-cssom): 建议在完成 collect 路径治理后补一轮观测：
  // TODO(memory-cssom): - 统计每个 class key 的 rule 数量分布；
  // TODO(memory-cssom): - 记录页面切换前后 CSSOM 总 rule 数变化；
  // TODO(memory-cssom): - 设置阈值告警（例如单 key > N 条）。
  
  classList.forEach((item: any) => {
    if(!item){return}
    let globalStyleArr = getGlobalStyle(MatchType.Class, item, filterStyle(classList))
    let scopeStylesArr:Array<Style> = []
    if(scoped && scopedId){
      scopeStylesArr = getScopedStyle(MatchType.Class, item, scopedId, filterStyle(classList))
    }
    // 将元素总样式、全局变量、scoped变量按照顺序合并
    // TODO 增加样式优先级概念，处理 .a.b 和 .b 的优先级
    elementStyle = Object.assign({}, elementStyle, ...globalStyleArr, ...scopeStylesArr)
  })
  return elementStyle
}

function filterStyle(classList:Array<string> = []){
  return (rule:any, ) => {
    if(rule.relation === ''){
      // 向下兼容
      return true
    }
    let flag = true
    let selector = rule.n_selector
    // 不存在组合关系的话，直接返回，从而优化性能
    if(!selector.next){
      return true
    }
    switch(selector.relation){
      case RelationType.Subselector:
        // case1: .a.b
        while(selector){
          if(classList.indexOf(selector.value) < 0){
            flag = false
            break;
          }
          selector = selector.next
        }
      break;
      default:
        break;
    }
    return flag
  }

}

function getGlobalStyle(type: MatchType, key:string, filterFunc?: Function):Array<Style>{
  let styles:Array<Style> = []
  switch(type){
    case MatchType.Class:
      styles =  __GLOBAL__.CSSOM['global'].classMap.get(key) || []
      break;
    default:
      break;
  }
  return styles.filter((item:any) => {
    if(filterFunc){
      return filterFunc(item)
    }
    return item
  }).map((item:any) => {
    return item?.style
  })
}

function getScopedStyle(type:MatchType, key:string, scopedId: string, filterFunc?: Function):Array<Style>{
  let styles:Array<Style> = []
  const {CSSOM} = __GLOBAL__
  if(CSSOM[scopedId]){
    switch(type){
      case MatchType.Class:
        styles =  CSSOM[scopedId].classMap.get(key) || []
        break;
      default:
        break;
    }
  }
  return styles.filter((item:any) => {
    if(filterFunc){
      return filterFunc(item)
    }
    return item
  }).map((item:any) => {
    return item?.style
  })
}