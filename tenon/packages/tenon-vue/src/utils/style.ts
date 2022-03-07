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
        styleList.push(rule)
        __GLOBAL__.CSSOM[group][key].set(selectorKey, styleList)
      }
    })
  })
}

export const getClassStyle = function(instance: Base, className: string = '',scoped:Boolean = false, scopedId?:string){
  let elementStyle = {}
  const classList = className.split(/\s/)
  
  classList.forEach((item: any) => {
    if(!item){return}
    let globalStyleArr:Array<Style> = getGlobalStyle(MatchType.Class, item, filterStyle(classList, instance))
    let scopeStylesArr:Array<Style> = []
    if(scoped && scopedId){
      scopeStylesArr = getScopedStyle(MatchType.Class, item, scopedId, filterStyle(classList, instance))
    }
    // 将元素总样式、全局变量、scoped变量按照顺序合并
    // TODO 增加样式优先级概念，处理 .a.b 和 .b 的优先级
    elementStyle = Object.assign({}, elementStyle, ...globalStyleArr, ...scopeStylesArr)
  })
  return elementStyle
}

function filterStyle(classList:Array<string> = [], selectorNode: Base){
  return (rule:any, ) => {
    if(rule.relation === ''){
      // 向下兼容
      return true
    }
    let flag = true
    let selector = rule.n_selector
    let node: any = selectorNode
    // 优先级权重
    let selectorWeightBase = 1
    let selectorWeight = 0
    // 不存在组合关系的话，直接返回，从而优化性能
    if(!selector.next){
      return true
    }
    switch(selector.relation){
      case RelationType.Subselector:
        // case1: .a.b
        while(selector && selector.relation === RelationType.Subselector){
          if(classList.indexOf(selector.value) < 0){
            flag = false
            break;
          }
          selector = selector.next
        }
      break;
      case RelationType.DescendantSpace:
        // .a .b
        flag = false
        selectorWeightBase = 1
        selectorWeight = 0
        while(selector && node){
          const classList = (node.getAttribute('class') || '').split(/\s/)
          let selectorIndex = classList.indexOf(selector.value)
          if (selectorIndex > -1) {
            selectorWeight = selectorWeight + selectorWeightBase * (selectorIndex + 1)
            if (selector.next) {
              // 权重 增加
              selectorWeightBase *= 100
              selector = selector.next
              node = node.parent
            } else {
              flag = true
              rule.selectorWeight = selectorWeight
              break;
            }
          } else {
            node = node.parent
          }
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
  }).sort((a: any, b: any) => a.selectorWeight - b.selectorWeight
  ).map((item:any) => {
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
  }).sort((a: any, b: any) => a.selectorWeight - b.selectorWeight
  ).map((item:any) => {
    return item?.style
  })
}