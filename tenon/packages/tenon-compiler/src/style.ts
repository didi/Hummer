import postcss,{Root} from 'postcss'

enum MatchType{
  Class,
  ID,
  Attr
}
interface RuleNode {
  selector: string,
  relation: string,
  matchType: MatchType
}
interface RuleSet{
  tagList: Array<RuleNode>,
  classList: Array<RuleNode>,
  idList: Array<RuleNode>,
  attrList: Array<RuleNode>
}

interface CompileStyleOptions{

}
const isClassSelectorReg = /^\./
const isTagSelectorReg = /\[.+\]/
const isAttrSelectorReg = /\[.+\]/
const isIDSelectorReg = /^\#/


/**
 * 针对Class的Selector进行特殊处理
 * 支持的Selectors如下：
 * 基础选择器：
 * #id ID选择器
 * .class Class选择器
 * view Tag选择器
 * 复杂选择器：属性选择器
 * .class[attr] 属性选择器
 * @param selector 
 */
function handleSelector(ruleSet:RuleSet, selector: string){
  const selectorList = selector.split(/\s/).filter(item => !!item)
  const lastSelector = selectorList.pop() as string
  if(isTagSelectorReg.test(lastSelector)){
    return
  }
  if(isClassSelectorReg.test(lastSelector)){
    const className = lastSelector.slice(1)
    ruleSet.classList.push({
      selector: className,
      matchType: MatchType.Class,
      relation: ''
    })
    return
  }
  if(isAttrSelectorReg.test(lastSelector)){

  }
  if(isIDSelectorReg.test(lastSelector)){

  }
  return ""
}

function getCollectPlugin(ruleSet: RuleSet){
  const collectRulePlugin = postcss.plugin('collect-rule', (options: any) => (root:Root) => {
    root.each(function collectRule(node){
      if(node.type !== "rule"){
        // 不支持媒体查询
        return;
      }
      const {selector} = node
      handleSelector(ruleSet, selector)
    })
  })
  return collectRulePlugin
}
function generateCode(ruleSet:RuleSet){
  const styleCode = `
    var ruleSet = ${JSON.stringify(ruleSet)};
  `
  return `
    import {collectStyle} from '@didi/tenon';
    export default (function(){
      ${styleCode}
      return collectStyle(ruleSet)
    })();
  `
}
export const compileStyle = function(source: string, options: CompileStyleOptions = {}){
  console.log('Style:', source)
  const ruleSet:RuleSet = {
    tagList: [],
    classList: [],
    idList: [],
    attrList: []
  }
  postcss([getCollectPlugin(ruleSet)]).process(source, {from: undefined});
  const code = generateCode(ruleSet)
  return code  
}