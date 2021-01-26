
// const {Hummer} = __GLOBAL__
// import {extend} from '../index'
/**
 * 环境参数
 * @param platform 平台类型
 * @param osVersion 平台系统版本号
 * @param appVersion App版本号
 * @param appName App名字
 * @param statusBarHeight 状态栏高度
 * @param safeAreaBottom iOS安全区域高度
 * @param deviceWidth 设备宽度
 * @param deviceHeight 设备高度
 * @param availableWidth 可用范围宽度
 * @param availableHeight 可用范围高度
 * @param scale 像素缩放比例
 */
export interface EnvironmentInfo{
  platform: string,
  osVersion: string,
  appVersion: string,
  appName: string,
  statusBarHeight: number,
  safeAreaBottom: number,
  deviceWidth: number,
  deviceHeight: number,
  availableWidth: number,
  availableHeight: number,
  scale: number
}

export function getEnvironmentInfo():EnvironmentInfo{
  // let env = extend({}, Hummer.env, {
  //   availableWidth: Number(Hummer.env.availableWidth.slice(0,-2)),
  //   availableHeight: Number(Hummer.env.availableHeight.slice(0,-2)),
  //   deviceWidth: Number(Hummer.env.deviceWidth.slice(0,-2)),
  //   deviceHeight: Number(Hummer.env.deviceHeight.slice(0,-2))
  // })
  // FIXME: 增加Env的获取
  return {} as any
}