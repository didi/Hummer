import { View } from '@hummer/hummer-api'

/**
 * 注释节点，使用Hummer侧View对象进行封装
 */
export class Comment extends View {
  /**
   * 构造函数
   * 
   * @param id
   * @param name 
   * @param props 
   */
  _comment!: string
  public constructor(comment: string = "") {
    super('', 'comment');
    this.style = {
      display: "none"
    }
    this._comment = comment
  }

  get comment(){
    return this._comment
  }
}