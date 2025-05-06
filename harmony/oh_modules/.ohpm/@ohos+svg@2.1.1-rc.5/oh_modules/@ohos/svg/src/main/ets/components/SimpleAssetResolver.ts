/**
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

import { SVGExternalFileResolver } from './SVGExternalFileResolver'


export default class SimpleAssetResolver extends SVGExternalFileResolver {
  private static TAG: string = "SimpleAssetResolver";
  private assetManager: any

  public constructor(assetManager: any
  ) {
    super();
    this.assetManager = assetManager;
  }

  private supportedFormats: Array<String> = new Array()

  public resolveFont(fontFamily: String, fontWeight: number, fontStyle: string, fontStretch: number): any {


    return null;
  }

  public resolveImage(filename: String): any {
    console.info(SimpleAssetResolver.TAG + "resolveImage(" + filename + ")")
    try {


    } catch (e) {
      return null
    }
  }

  isFormatSupported(mimeType: string): boolean {
    return this.supportedFormats.indexOf(mimeType) >= 0;
  }

  public resolveCSSStyleSheet(url: string): string {
    console.info(SimpleAssetResolver.TAG, "resolveCSSStyleSheet(" + url + ")");
    return this.getAssetAsString(url);
  }

  private getAssetAsString(url: string): string {
    return "";


  }
}
