import { View } from '@hummer/hummer-api'

/**
 *  加载更多节点，使用Hummer侧View对象进行封装
 */
export class LoadMore extends View {
  /**
   * 构造函数
   * 
   * @param id
   * @param name 
   * @param props 
   */
  public constructor(comment: string = "") {
    super('', 'loadMore');
  }
}