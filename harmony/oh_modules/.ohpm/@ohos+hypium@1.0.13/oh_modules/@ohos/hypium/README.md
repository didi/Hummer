<div style="text-align: center;font-size: xxx-large" >Hypium</div>
<div style="text-align: center">A unit test framework for OpenHarmonyOS application</div>

## Hypium是什么?
***
- Hypium是OpenHarmony上的测试框架，提供测试用例编写、执行、结果显示能力，用于OpenHarmony系统应用接口以及应用界面测试。
- Hypium结构化模型：hypium工程主要由List.test.js与TestCase.test.js组成。
```
rootProject                  // Hypium工程根目录
├── moduleA
│   ├── src
│      ├── main                   // 被测试应用目录
│      ├── ohosTest               // 测试用例目录
│         ├── js/ets
│            └── test
│               └── List.test.js      // 测试用例加载脚本，ets目录下为.ets后缀
│               └── TestCase.test.js  // 测试用例脚本，ets目录下为.ets后缀
└── moduleB
    ...
│               └── List.test.js      // 测试用例加载脚本，ets目录下为.ets后缀
│               └── TestCase.test.js  // 测试用例脚本，ets目录下为.ets后缀
```

## 安装使用
***
- 在DevEco Studio内使用Hypium
- 工程级package.json内配置:
```json
"dependencies": {
    "@ohos/hypium": "1.0.7"
}
```
注：
hypium服务于OpenHarmonyOS应用对外接口测试、系统对外接口测试（SDK中接口），完成HAP自动化测试。详细指导：
[Deveco Studio](https://developer.harmonyos.com/cn/develop/deveco-studio)

#### 通用语法

- 测试用例采用业内通用语法，describe代表一个测试套， it代表一条用例。

| No. | API        | 功能说明                                                                                                               |
| --- | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | describe   | 定义一个测试套，支持两个参数：测试套名称和测试套函数                                                                   |
| 2   | beforeAll  | 在测试套内定义一个预置条件，在所有测试用例开始前执行且仅执行一次，支持一个参数：预置动作函数                           |
| 3   | beforeEach | 在测试套内定义一个单元预置条件，在每条测试用例开始前执行，执行次数与it定义的测试用例数一致，支持一个参数：预置动作函数 |
| 4   | afterEach  | 在测试套内定义一个单元清理条件，在每条测试用例结束后执行，执行次数与it定义的测试用例数一致，支持一个参数：清理动作函数 |
| 5   | afterAll   | 在测试套内定义一个清理条件，在所有测试用例结束后执行且仅执行一次，支持一个参数：清理动作函数                           |
| 6   | it         | 定义一条测试用例，支持三个参数：用例名称，过滤参数和用例函数                                                           |
| 7   | expect     | 支持bool类型判断等多种断言方法                                                                                         |

#### 断言库

- 示例代码：

```javascript
  expect(${actualvalue}).assertX(${expectvalue})
```

- 断言功能列表：

| No.  | API                              | 功能说明                                                                                       |
| :--- | :------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1    | assertClose                      | 检验actualvalue和expectvalue(0)的接近程度是否是expectValue(1)                                  |
| 2    | assertContain                    | 检验actualvalue中是否包含expectvalue                                                           |
| 3    | assertDeepEquals                 | @since1.0.4 检验actualvalue和expectvalue(0)是否是同一个对象                                    |
| 4    | assertEqual                      | 检验actualvalue是否等于expectvalue[0]                                                          |
| 5    | assertFail                       | 抛出一个错误                                                                                   |
| 6    | assertFalse                      | 检验actualvalue是否是false                                                                     |
| 7    | assertTrue                       | 检验actualvalue是否是true                                                                      |
| 8    | assertInstanceOf                 | 检验actualvalue是否是expectvalue类型                                                           |
| 9    | assertLarger                     | 检验actualvalue是否大于expectvalue                                                             |
| 10   | assertLess                       | 检验actualvalue是否小于expectvalue                                                             |
| 11   | assertNaN                        | @since1.0.4 检验actualvalue是否是NaN                                                           |
| 12   | assertNegUnlimited               | @since1.0.4 检验actualvalue是否等于Number.NEGATIVE_INFINITY                                    |
| 13   | assertNull                       | 检验actualvalue是否是null                                                                      |
| 14   | assertPosUnlimited               | @since1.0.4 检验actualvalue是否等于Number.POSITIVE_INFINITY                                    |
| 15   | assertPromiseIsPending           | @since1.0.4 检验actualvalue是否处于Pending状态【actualvalue为promse对象】                      |
| 16   | assertPromiseIsRejected          | @since1.0.4 检验actualvalue是否处于Rejected状态【同15】                                        |
| 17   | assertPromiseIsRejectedWith      | @since1.0.4 检验actualvalue是否处于Rejected状态，并且比较执行的结果值【同15】                  |
| 18   | assertPromiseIsRejectedWithError | @since1.0.4 检验actualvalue是否处于Rejected状态并有异常，同时比较异常的类型和message值【同15】 |
| 19   | assertPromiseIsResolved          | @since1.0.4 检验actualvalue是否处于Resolved状态【同15】                                        |
| 20   | assertPromiseIsResolvedWith      | @since1.0.4 检验actualvalue是否处于Resolved状态，并且比较执行的结果值【同15】                  |
| 21   | assertThrowError                 | 检验actualvalue抛出Error内容是否是expectValue                                                  |
| 22   | assertUndefined                  | 检验actualvalue是否是undefined                                                                 |
| 23   | not                              | @since1.0.4 断言结果取反                                                                       |


  示例代码：

```javascript
  import { describe, it, expect } from '@ohos/hypium';

  export default async function assertCloseTest() {
    describe('assertClose', function () {
      it('assertClose_success', 0, function () {
        let a = 100;
        let b = 0.1;
        expect(a).assertClose(99, b);
      })
    })
  }
```

#### 公共系统能力

| No.  | API                                                     | 功能描述                                                     |
| ---- | ------------------------------------------------------- | ------------------------------------------------------------ |
| 1    | existKeyword(keyword: string, timeout: number): boolean | @since1.0.3 hilog日志中查找指定字段是否存在，keyword是待查找关键字，timeout为设置的查找时间 |
| 2    | actionStart(tag: string): void                          | @since1.0.3 cmd窗口输出开始tag                               |
| 3    | actionEnd(tag: string): void                            | @since1.0.3 cmd窗口输出结束tag                               |

  示例代码：

```javascript
import { describe, it, expect, SysTestKit} from '@ohos/hypium';

export default function existKeywordTest() {
    describe('existKeywordTest', function () {
        it('existKeyword',DEFAULT, async function () {
            console.info("HelloTest");
            let isExist = await SysTestKit.existKeyword('HelloTest');
            console.info('isExist ------>' + isExist);
        })
    })
}
```
```javascript
import { describe, it, expect, SysTestKit} from '@ohos/hypium';

export default function actionTest() {
    describe('actionTest', function () {
        it('existKeyword',DEFAULT, async function () {
            let tag = '[MyTest]';
			SysTestKit.actionStart(tag);
            //do something
            SysTestKit.actionEnd(tag);
        })
    })
}
```

#### 专项能力

- 测试用例属性筛选能力：hypium支持根据用例属性筛选执行指定测试用例，使用方式是先在测试用例上标记用例属性后，再在测试应用的启动shell命令后新增" -s ${Key} ${Value}"。

| Key      | 含义说明     | Value取值范围                                                                                                                                          |
| -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| level    | 用例级别     | "0","1","2","3","4", 例如：-s level 1                                                                                                                  |
| size     | 用例粒度     | "small","medium","large", 例如：-s size small                                                                                                          |
| testType | 用例测试类型 | "function","performance","power","reliability","security","global","compatibility","user","standard","safety","resilience", 例如：-s testType function |

  示例代码

```javascript
import { describe, it, expect, TestType, Size, Level } from '@ohos/hypium';

export default function attributeTest() {
    describe('attributeTest', function () {
        it("testAttributeIt", TestType.FUNCTION | Size.SMALLTEST | Level.LEVEL0, function () {
            console.info('Hello Test');
        })
    })
}
```

  示例命令
```shell  
XX -s level 1 -s size small -s testType function
```
该命令的作用是：筛选测试应用中同时满足a）用例级别是1 b）用例粒度是small c）用例测试类型是function 三个条件的用例执行。

- 测试套/测试用例名称筛选能力（测试套与用例名称用“#”号连接，多个用“,”英文逗号分隔）

| Key      | 含义说明                | Value取值范围                                                                                |
| -------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| class    | 指定要执行的测试套&用例 | ${describeName}#${itName}，${describeName} , 例如：-s class attributeTest#testAttributeIt    |
| notClass | 指定不执行的测试套&用例 | ${describeName}#${itName}，${describeName} , 例如：-s notClass attributeTest#testAttributeIt |

  示例命令
```shell  
XX -s class attributeTest#testAttributeIt,abilityTest#testAbilityIt
```
该命令的作用是：筛选测试应用中attributeTest测试套下的testAttributeIt测试用例，abilityTest测试套下的testAbilityIt测试用例，只执行这两条用例。

- 其他能力

| 能力项       | Key     | 含义说明                     | Value取值范围                                  |
| ------------ | ------- | ---------------------------- | ---------------------------------------------- |
| 随机执行能力 | random  | 测试套&测试用例随机执行      | true, 不传参默认为false， 例如：-s random true |
| 空跑能力     | dryRun  | 显示要执行的测试用例信息全集 | true , 不传参默认为false，例如：-s dryRun true |
| 异步超时能力 | timeout | 异步用例执行的超时时间       | 正整数 , 单位ms，例如：-s timeout 5000         |

##### 约束限制
随机执行能力和空跑能力从npm包1.0.3版本开始支持

#### Mock能力

##### 约束限制

单元测试框架Mock能力从npm包[1.0.1版本](https://repo.harmonyos.com/#/cn/application/atomService/@ohos%2Fhypium/v/1.0.1)开始支持

## 约束

***
    本模块首批接口从OpenHarmony SDK API version 8开始支持。

## Hypium开放能力隐私声明

-  我们如何收集和使用您的个人信息
	您在使用集成了Hypium开放能力的测试应用时，Hypium不会处理您的个人信息。
-  SDK处理的个人信息
	不涉及。
-  SDK集成第三方服务声明
	不涉及。
-  SDK数据安全保护
	不涉及。
-  SDK版本更新声明
	为了向您提供最新的服务，我们会不时更新Hypium版本。我们强烈建议开发者集成使用最新版本的Hypium。

