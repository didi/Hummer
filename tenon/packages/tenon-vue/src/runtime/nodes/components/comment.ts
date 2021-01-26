import {Base} from '../Base'
import {NODE_COMMENT} from '@hummer/tenon-utils'
import {View as ViewComponent} from '@hummer/hummer-front'

// 注释节点，使用Hummer侧View对象进行封装
export class Comment extends Base{
  __NAME = NODE_COMMENT
  private _comment:string = ''
  constructor(comment:string){
    super()
    this.element = new ViewComponent()
    this.element.style = {
      display: 'none'
    }
    this._comment = comment
  }

  get comment(){
    return this._comment
  }
}