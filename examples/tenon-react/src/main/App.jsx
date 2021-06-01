import React from 'react';
import { menus } from "./assets/menu";
import ListItem from './components/ListItem'


function App() {
  const ListBoxs = menus.map(menu => {
    let {title, items} = menu
    let listItems = items.map(item => {
      return (
        <ListItem url={item.url} name={item.name}></ListItem>
      )
    })
    return (
      <view class="list-box">
        <text class="list-box-title">{ title }</text>
        <view class="list-box-container">
          {listItems}
        </view>
      </view>
    )
  })
  
  return (
    <view class="page">
      <view class="demo-header">
        <text class="demo-title">Demo App</text>
      </view>
      <view class="list-container">
        {ListBoxs}
      </view>
    </view>
  );
}

export default App;
