/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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

/**
 * define the testcase type : TestType, Size , Level
 */
export const TAG = '[Hypium]';

export const DEFAULT = 0B0000;

export class TestType {
    static FUNCTION = 0B1;
    static PERFORMANCE = 0B1 << 1;
    static POWER = 0B1 << 2;
    static RELIABILITY = 0B1 << 3;
    static SECURITY = 0B1 << 4;
    static GLOBAL = 0B1 << 5;
    static COMPATIBILITY = 0B1 << 6;
    static USER = 0B1 << 7;
    static STANDARD = 0B1 << 8;
    static SAFETY = 0B1 << 9;
    static RESILIENCE = 0B1 << 10;
}

export class Size {
    static SMALLTEST = 0B1 << 16;
    static MEDIUMTEST = 0B1 << 17;
    static LARGETEST = 0B1 << 18;
}

export class Level {
    static LEVEL0 = 0B1 << 24;
    static LEVEL1 = 0B1 << 25;
    static LEVEL2 = 0B1 << 26;
    static LEVEL3 = 0B1 << 27;
    static LEVEL4 = 0B1 << 28;
}
