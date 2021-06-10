import React from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';


function handleRefresh(state, instance) {
  console.log("下拉刷新");
  console.log("State", state);
  setTimeout(() => {
    instance.stopPullRefresh();
  }, 3000);
}
function handleLoadMore(state, instance) {
  console.log("加载更多");
  console.log("State", state);
  setTimeout(() => {
    instance.stopLoadMore();
  }, 3000);
}
function handleScroll(param) {
  console.log("scroll param", param);
}
function handleScrollToTop(param) {
  console.log("scroll to top param", param);
}
function handleScrollToBottom(param) {
  console.log("scroll to bottom param", param);
}
function App() {
  const verList = Array.apply(null, new Array(10)).map((item, index) => {
    return {
      name: "Item " + index,
      index: index,
    };
  })

  const horiItems = verList.map((item, index) => {
    return (
      <view
        className="scroller-item hori-scroller-item"
        key={index}
      >
        <text>{item.name}</text>
      </view>
    )
  });
  const verItems = verList.map((item, index) => {
    return (
      <view
        className="scroller-item vertical-scroller-item"
        v-for="(item, index) in verList"
        key={index}
      >
        <text>{item.name}</text>
      </view>
    )
  })
  return (
    <PageItem title="Use Hook">
      <DemoItem title="横向滚动">
        <scroller scrollDirection="horizontal" className="scroller hori-scroller">
          {horiItems}
        </scroller>
      </DemoItem>
      <DemoItem title="普通垂直滚动(带下拉刷新和加载更多)">
        <scroller
          className="scroller vertical-scroller"
          onScroll={handleScroll}
          onScrollToTop={handleScrollToTop}
          onScrollToBottom={handleScrollToBottom}
          onRefresh={handleRefresh}
          onLoadMore={handleLoadMore}
        >
          <refresh type="refresh">
            <view className="refresh-view">
              <text>I am refresh view!</text>
            </view>
          </refresh>
          <loadmore type="loadmore">
            <view className="loadmore-view">
              <text>I am loadmore view!</text>
            </view>
          </loadmore>
          {verItems}
        </scroller>
      </DemoItem>
      <DemoItem title="普通垂直滚动">
      <view className="item-scroller-container">
            <text className="align-center-text"> Default </text>
            <scroller
              className="scroller vertical-scroller"
            >
              {verItems}
            </scroller>
          </view>
          <view className="item-scroller-container">
            <text className="align-center-text">showScrollBar</text>
            <scroller
              className="scroller vertical-scroller"
              showScrollBar={true}
            >
             {verItems}
            </scroller>
          </view>
          <view className="item-scroller-container">
            <text className="align-center-text">bounces</text>
            <scroller
              className="scroller vertical-scroller"
              bounces={false}
            >
             {verItems}
            </scroller>
          </view>
      </DemoItem>
    </PageItem>
  );
}

export default App;
