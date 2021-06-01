import React from 'react';

const iconRight =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAASBJREFUWAntljsOwjAMhglcoHNmzsVQ0WwMSAyIAwADF2iKOvRczMy9QbClWkKoqurEEUjYQ+02D3/501hZLNRUAVVAFfiuAoabvq7rvTHmEELonHMniAN3jqn+y6nGsbYBxkLbsWmaO4CxFzU2L31jA6EyNBjiUhqKvTpUZIAoCQxUa6uq2kpsHxsIIXJCRQHlhIoGygWVBJQDKhlIGop97BHg0/B0DaespTYsCd77M73P9SJAmAyhiqJw4B+UHOINxXO9GBCWgr7vPfg1JYe4o3iu/7l/KBkIlZGs3ElA0jC4rdFAOWCigXLBRAHlhEGgFT44Zq29QP8djYFaI3b1wDnZdei92EnDRAHBlt0A5AmDr1KXMgRRUwVUgb9V4AWYNdeAJyzFDAAAAABJRU5ErkJggg==';

function ListItem(props) {
  let {name} = props
  return (
    <view class="item">
      <text class="item-title">{name}</text>
      <image class="item-icon" src={iconRight}></image>
    </view>
  );
}

export default ListItem;
