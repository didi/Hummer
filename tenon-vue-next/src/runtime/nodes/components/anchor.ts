// const { document: _Document } = __Hummer__

import { View } from '@hummer/hummer-api'

/**
 * 锚点
 */
export class Anchor extends View {
  /**
   * 构造函数
   * 
   * @param id
   * @param name 
   * @param props 
   */
  public constructor(id: string = "", name: string = "", props: any = {}) {
    super(id, 'anchor', props);

    this.setStyle({
      display: "none"
    });
  }
}