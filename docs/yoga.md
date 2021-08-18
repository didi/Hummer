## Yoga 布局
### 布局长度属性转换规则
1. `key: undefined/null`，即为 undefined 类型
2. `key: 123`，即为虚拟像素点类型，即 dp/pt
3. `key: 'auto/100%'`，即为字符串类型，但是必须带 auto 或者 % 后缀，**绝对不能纯数字字符串**
4. 其他全部报错，如 `key: {x: 1}` 这样的字典类型

### 位置
top left bottom right start end 都是 Undefined 默认值，表示不生效，支持 auto，undefined，dp/pt，百分比。**auto 在这里被解释被 undefined**，start/end 根据 RTL 或者 LTR 发生互换

### 宽高
1. width height 默认为 Auto，表示自动撑开，支持 auto，undefined，dp/pt，百分比。
2. min/max 默认都是 Undefined，支持 auto，undefined，dp/pt，百分比。**auto 在这里被解释被 undefined**

### 边框宽度
borderWidth borderTopWidth borderLeftWidth borderBottomWidth borderRightWidth borderStartWidth borderEndWidth 都是 NaN，即 Undefined，**只支持纯数字**

### 外边距
margin marginVertical marginHorizontal marginTop marginLeft marginBottom marginRight marginStart marginEnd 默认都是 Undefined，**支持 undefined，dp/pt，百分比，auto**

### 内边距
padding paddingVertical paddingHorizontal paddingTop paddingLeft paddingBottom paddingRight paddingStart paddingEnd，**基本等同外边距**

## 枚举属性
### flex 主轴方向 flexDirection
和 React Native 一样，默认为竖向 column，**和 CSS 标准不一致**，可选 row，column，row-reverse，column-reverse

### 主轴排列 justifyContent
默认 flex-start，可选 flex-start，center，flex-end，space-between，space-around，space-evenly，**相比 CSS 多出一个 space-evenly**

### 副轴排列 alignItems
默认 stretch，可选 flex-start，center，flex-end，stretch，baseline

### 重载父容器副轴排列 alignSelf
默认 auto，相比副轴排列多出一个 auto

### 多行 alignContent
默认 flex-start，可选 flex-start，flex-end，center，space-between，space-around

### position
默认 relative，可选 relative，absolute

### flexWrap 折行
默认 nowrap，可选 nowrap，wrap，wrap-reverse

### display 显示
默认 flex，可选 flex，none

### flex 弹性属性
默认 NaN，即 undefined，只能为数字

### flexGrow 弹性扩大属性
默认 0，必须为数字

### flexShrink 弹性缩小属性
**同 flexGrow**

### flexBasis 弹性基础属性
**同 width**

### aspectRatio
默认值 NaN，即 undefined，只能为数字

### direction LTR/RTL
默认值 inherit，可以为 inherit，ltr，rtl

### overflow 超出可见
默认 visible，可选 scroll visible hidden

## Web 标准化
目前的属性很多默认值都是过时属性，未来会改成 CSS 标准一致，比如 flex 主轴方向，会改成 Row
