import { View } from '@hummer/hummer-api'

/**
 * Refresh节点，使用Hummer侧View对象进行封装
 */
export class Refresh extends View {
  /**
   * 构造函数
   * 
   * @param id
   * @param name 
   * @param props 
   */
  public constructor(comment: string = "") {
    super('', 'refresh');
  }
}