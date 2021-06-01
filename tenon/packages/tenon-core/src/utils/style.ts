export enum MatchType{
  Class,
  ID,
  Attr
}
export interface RuleNode {
  selector: string,
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
        let styleList = selectorMap.get(rule.selector) || []
        styleList.push(rule)
        __GLOBAL__.CSSOM[group][key].set(rule.selector, styleList)
      }
    })
  })
}



