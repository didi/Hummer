/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {ImageKnifeOption} from '../ImageKnifeOption'
import {ImageKnifeData} from '../ImageKnifeData'
export interface IDrawLifeCycle{

  // 展示占位图
  displayPlaceholder?: (context: CanvasRenderingContext2D,data: ImageKnifeData, imageKnifeOption:ImageKnifeOption, compWidth:number,compHeight:number, setGifTimeId?:(timeId:number)=>void)=>boolean

  // 展示加载进度
  displayProgress?: (context: CanvasRenderingContext2D,progress: number, imageKnifeOption:ImageKnifeOption, compWidth:number,compHeight:number, setGifTimeId?:(timeId:number)=>void)=>boolean

  // 展示缩略图
  displayThumbSizeMultiplier?: (context: CanvasRenderingContext2D,data: ImageKnifeData, imageKnifeOption:ImageKnifeOption, compWidth:number,compHeight:number, setGifTimeId?:(timeId:number)=>void)=>boolean

  // 展示主图
  displayMainSource?: (context: CanvasRenderingContext2D,data: ImageKnifeData, imageKnifeOption:ImageKnifeOption, compWidth:number,compHeight:number, setGifTimeId?:(timeId:number)=>void)=>boolean

  // 展示重试图层
  displayRetryholder?: (context: CanvasRenderingContext2D,data: ImageKnifeData, imageKnifeOption:ImageKnifeOption, compWidth:number,compHeight:number, setGifTimeId?:(timeId:number)=>void)=>boolean

  // 展示失败占位图
  displayErrorholder?: (context: CanvasRenderingContext2D,data: ImageKnifeData, imageKnifeOption:ImageKnifeOption, compWidth:number,compHeight:number, setGifTimeId?:(timeId:number)=>void)=>boolean

}