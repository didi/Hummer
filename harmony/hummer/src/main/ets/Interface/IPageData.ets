import { fn, HMAny } from '../Utils/Utils'
import { PageInfo } from './Page'

export interface IPageData {
  pageInfo? : PageInfo //当前页面信息
  closeCallback? : fn//返回上一个页面时的回调
  navStack?:NavPathStack
  result?:HMAny//返回上个页面时的数据
}