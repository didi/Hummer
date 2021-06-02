import React, {useState, useEffect} from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   setInterval(() => {
  //     setCount(count + 1)
  //   }, 1000)
  // }, [])
  return (
    <view>
      <text>You clicked {count} times</text>
      <text class="btn" onTap={() => {
        setCount(count + 1)
        console.log('count', count, typeof count)
      }
      }>
        Click me
      </text>
    </view>
  );
}

function EffectExample(){
   // 声明一个叫 “count” 的 state 变量。
   const [count, setCount] = useState(0);

   useEffect(() => {
     let timer = setInterval(() => {
       setCount(count + 1)
       console.log("count", count)
     }, 10000)
     return () => {
       clearInterval(timer)
     }
   })
   return (
     <view>
       <text>You clicked {count} times</text>
     </view>
   );
}

function PersonalInfoComponent() {

  // 集中定义变量
  let name, age, career, setName, setCareer;
  // 获取姓名状态
  [name, setName] = useState("修言");
  // 获取年龄状态
  [age] = useState("99");
  // 获取职业状态
  [career, setCareer] = useState("我是一个前端，爱吃小熊饼干");
  // 输出职业信息
  console.log("career", career);
  // 编写 UI 逻辑
  return (
    <view className="personalInfo">

      <text>姓名：{name}</text>

      <text>年龄：{age}</text>

      <text>职业：{career}</text>

      <button
        onTap={() => {
          setName("秀妍");
        }}
      >
        修改姓名
      </button>

    </view>

  );

}

function App() {
  return (
    <view class="page">
      <view class="demo-header">
        <text class="demo-title">Hook Test</text>
      </view>
      <view class="demo-container">
        <view class="demo-item">
          <view class="item-title">
            <text class="item-title-text">useState</text>
          </view>
          <view class="item-container">
            <Example></Example>
          </view>
        </view>
        <view class="demo-item">
          <view class="item-title">
            <text class="item-title-text">useEffect</text>
          </view>
          <view class="item-container">
            <EffectExample></EffectExample>
          </view>
        </view>
        <view class="demo-item">
          <view class="item-title">
            <text class="item-title-text">test</text>
          </view>
          <view class="item-container">
            <PersonalInfoComponent></PersonalInfoComponent>
          </view>
        </view>
      </view>
    </view>
  );
}

export default App;
