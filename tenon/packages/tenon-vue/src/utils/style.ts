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
    let globalStyleArr = getGlobalStyle(MatchType.Class, item)
    let scopeStylesArr:Array<Style> = []
    if(scoped && scopedId){
      scopeStylesArr = getScopedStyle(MatchType.Class, item, scopedId)
    }
    // 将元素总样式、全局变量、scoped变量按照顺序合并
    elementStyle = Object.assign({}, elementStyle, ...globalStyleArr, ...scopeStylesArr)
  })
  return elementStyle
}

function getGlobalStyle(type: MatchType, key:string):Array<Style>{
  let styles:Array<Style> = []
  switch(type){
    case MatchType.Class:
      styles =  __GLOBAL__.CSSOM['global'].classMap.get(key) || []
      break;
    default:
      break;
  }
  return styles.map((item:any) => {
    return item?.style
  })
}

function getScopedStyle(type:MatchType, key:string, scopedId: string):Array<Style>{
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
  return styles.map((item:any) => {
    return item?.style
  })
}