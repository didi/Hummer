/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http:// www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * cache
 */

export { FileUtils } from './src/main/ets/components/cache/FileUtils'
export { Base64 } from './src/main/ets/components/cache/Base64'
export { LruCache } from './src/main/ets/components/cache/LruCache'
export { DiskStrategy } from './src/main/ets/components/cache/diskstrategy/DiskStrategy'
export { ALL } from './src/main/ets/components/cache/diskstrategy/enum/ALL'
export { AUTOMATIC } from './src/main/ets/components/cache/diskstrategy/enum/AUTOMATIC'
export { DATA } from './src/main/ets/components/cache/diskstrategy/enum/DATA'
export { NONE } from './src/main/ets/components/cache/diskstrategy/enum/NONE'
export { RESOURCE } from './src/main/ets/components/cache/diskstrategy/enum/RESOURCE'
export { EngineKeyInterface } from './src/main/ets/components/cache/key/EngineKeyInterface'
export { EngineKeyFactories } from './src/main/ets/components/cache/key/EngineKeyFactories'

/**
 * compress
 */
export { CompressBuilder } from './src/main/ets/components/imageknife/compress/CompressBuilder'
export { OnCompressListener } from './src/main/ets/components/imageknife/compress/listener/OnCompressListener'
export { OnRenameListener } from './src/main/ets/components/imageknife/compress/listener/OnRenameListener'
export { CompressDataListener } from './src/main/ets/components/imageknife/compress/listener/CompressDataListener'
export { CompressionPredicate } from './src/main/ets/components/imageknife/compress/listener/CompressionPredicate'
export { CompressAdapter } from './src/main/ets/components/imageknife/compress/provider/CompressAdapter'
export { CompressProvider } from './src/main/ets/components/imageknife/compress/provider/CompressProvider'
export { DataStringPathProvider } from './src/main/ets/components/imageknife/compress/provider/DataStringPathProvider'
export { RecourseProvider } from './src/main/ets/components/imageknife/compress/provider/RecourseProvider'

/**
 * crop
 */

export { CropImage } from './src/main/ets/components/imageknife/crop/CropImage'
export { CropOptions } from './src/main/ets/components/imageknife/crop/CropOptions'
export { PixelMapCrop,Options } from './src/main/ets/components/imageknife/crop/PixelMapCrop'
export { CropCallback } from './src/main/ets/components/imageknife/crop/CropCallback'

/**
 * transform
 */
export { BaseTransform } from './src/main/ets/components/imageknife/transform/BaseTransform'
export { BlurTransformation } from './src/main/ets/components/imageknife/transform/BlurTransformation'
export { BrightnessFilterTransformation } from './src/main/ets/components/imageknife/transform/BrightnessFilterTransformation'
export { ContrastFilterTransformation } from './src/main/ets/components/imageknife/transform/ContrastFilterTransformation'
export { CropCircleTransformation } from './src/main/ets/components/imageknife/transform/CropCircleTransformation'
export { CropCircleWithBorderTransformation,rgbColor } from './src/main/ets/components/imageknife/transform/CropCircleWithBorderTransformation'
export { CropSquareTransformation } from './src/main/ets/components/imageknife/transform/CropSquareTransformation'
export { CropTransformation,CropType } from './src/main/ets/components/imageknife/transform/CropTransformation'
export { GrayscaleTransformation } from './src/main/ets/components/imageknife/transform/GrayscaleTransformation'
export { InvertFilterTransformation } from './src/main/ets/components/imageknife/transform/InvertFilterTransformation'
export { PixelationFilterTransformation } from './src/main/ets/components/imageknife/transform/PixelationFilterTransformation'
export { RotateImageTransformation } from './src/main/ets/components/imageknife/transform/RotateImageTransformation'
export { RoundedCornersTransformation,RoundCorner } from './src/main/ets/components/imageknife/transform/RoundedCornersTransformation'
export { SepiaFilterTransformation } from './src/main/ets/components/imageknife/transform/SepiaFilterTransformation'
export { SketchFilterTransformation } from './src/main/ets/components/imageknife/transform/SketchFilterTransformation'
export { MaskTransformation } from './src/main/ets/components/imageknife/transform/MaskTransformation'
export { SwirlFilterTransformation } from './src/main/ets/components/imageknife/transform/SwirlFilterTransformation'
export { KuwaharaFilterTransform } from './src/main/ets/components/imageknife/transform/KuwaharaFilterTransform'
export { ToonFilterTransform } from './src/main/ets/components/imageknife/transform/ToonFilterTransform'
export { VignetteFilterTransform } from './src/main/ets/components/imageknife/transform/VignetteFilterTransform'
export { TransformUtils } from './src/main/ets/components/imageknife/transform/TransformUtils'
export { TransformType } from './src/main/ets/components/imageknife/transform/TransformType'
export { CenterCrop } from './src/main/ets/components/imageknife/transform/pixelmap/CenterCrop'
export { CenterInside } from './src/main/ets/components/imageknife/transform/pixelmap/CenterInside'
export { FitCenter } from './src/main/ets/components/imageknife/transform/pixelmap/FitCenter'

/**
 * pngj
 */
export { Pngj } from './src/main/ets/components/imageknife/pngj/Pngj'
export {handler} from './PngWork'
export { UPNG } from './src/main/ets/components/3rd_party/upng/UPNG'



/**
 * ImageKnife
 */
export { ImageKnife } from './src/main/ets/components/imageknife/ImageKnife'
export { ImageKnifeGlobal } from './src/main/ets/components/imageknife/ImageKnifeGlobal'
export { ObjectKey } from './src/main/ets/components/imageknife/ObjectKey'
export {RequestOption,Size} from './src/main/ets/components/imageknife/RequestOption'
export { ImageKnifeComponent, ScaleType, ScaleTypeHelper } from './src/main/ets/components/imageknife/ImageKnifeComponent'
export { ImageKnifeDrawFactory } from './src/main/ets/components/imageknife/ImageKnifeDrawFactory'
export {ImageKnifeOption,CropCircleWithBorder,Crop,GifOptions,TransformOptions} from './src/main/ets/components/imageknife/ImageKnifeOption'
export { ImageKnifeData } from './src/main/ets/components/imageknife/ImageKnifeData'
export {IAllCacheInfoCallback,AllCacheInfo,ResourceCacheInfo,MemoryCacheInfo,DataCacheInfo}  from './src/main/ets/components/imageknife/interface/IAllCacheInfoCallback'
export {IParseImage} from './src/main/ets/components/imageknife/interface/IParseImage'
export {IDataFetch} from './src/main/ets/components/imageknife/networkmanage/IDataFetch'
export {ICache} from './src/main/ets/components/imageknife/requestmanage/ICache'
export { FileTypeUtil } from './src/main/ets/components/imageknife/utils/FileTypeUtil'
export { ParseImageUtil } from './src/main/ets/components/imageknife/utils/ParseImageUtil'

/**
 * svg parse
 */
export { SVGParseImpl } from './src/main/ets/components/imageknife/utils/svg/SVGParseImpl'

/**
 * gif parse
 */
export { GIFParseImpl } from './src/main/ets/components/imageknife/utils/gif/GIFParseImpl'
export { GIFFrame } from './src/main/ets/components/imageknife/utils/gif/GIFFrame'


// 自定义组件新增
// 自定义组件绘制生命周期
export { IDrawLifeCycle } from './src/main/ets/components/imageknife/interface/IDrawLifeCycle'

// 日志管理
export { LogUtil } from './src/main/ets/components/imageknife/utils/LogUtil'