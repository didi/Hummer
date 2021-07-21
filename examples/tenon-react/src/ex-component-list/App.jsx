import React from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

const data = [1, 2, 3]

class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { data, renderItem } = this.props
    let cells = data.map(item => {
      return renderItem(item)
    })
    return (
      <>
        {cells}
      </>
    )
  }
}
function App() {
  const renderItem = (item) => {
    return (
      <>
        <view>
          {item}
        </view>
      </>
    )
  }
  return (
    <PageItem title="Component List">
      <DemoItem title="CanScroll">
        <List
          data={data}
          renderItem={renderItem}>
        </List>
      </DemoItem>
    </PageItem>
  );
}

export default App;
