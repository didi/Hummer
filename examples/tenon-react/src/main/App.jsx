import React from 'react';
import { menus } from "./assets/menu";
import ListItem from './components/ListItem'


function App() {
  const ListBoxs = menus.map((menu, menuIndex) => {
    let {title, items} = menu
    let listItems = items.map((item,index) => {
      return (
        <ListItem url={item.url} name={item.name} key={index}></ListItem>
      )
    })
    return (
      <view className="list-box" key={menuIndex}>
        <text className="list-box-title">{ title }</text>
        <view className="list-box-container">
          {listItems}
        </view>
      </view>
    )
  })
  
  return (
    <view className="page">
      <view className="demo-header">
        <text className="demo-title">Demo App</text>
      </view>
      <view className="list-container">
        {ListBoxs}
      </view>
    </view>
  );
}

export default App;
