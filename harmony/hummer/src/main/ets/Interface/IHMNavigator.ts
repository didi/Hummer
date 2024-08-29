import { HMContext } from '../Context/HMContext';
import { fn } from '../Utils/Utils';
import { PageInfo } from './Page';

export interface IHMNavigator {
  /**
   * 打开某个页面
   * @param pageInfo 页面信息
   * @param callback 页面结果回调
   */
  openPage?(ctx:HMContext, pageInfo: PageInfo, callback:fn);

  /**
   * 关闭当前页面
   * @param pageInfo 页面信息
   */
  popPage?(ctx:HMContext, pageInfo: PageInfo);

  /**
   * 回退到指定页面
   * @param pageInfo 页面信息
   */
  popToPage?(ctx:HMContext, pageInfo: PageInfo);

  /**
   * 回退到首页
   * @param pageInfo 页面信息（是否需要动画）
   */
  popToRootPage?(ctx:HMContext, pageInfo: PageInfo);

  /**
   * 向前回退指定数量的页面
   * @param count 要回退的页面级数（默认是1）
   * @param pageInfo 页面信息（是否需要动画）
   */
  popBack?(ctx:HMContext, count: number, pageInfo: PageInfo);
}



