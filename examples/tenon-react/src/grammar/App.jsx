import React from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

import CreateRefComponent from './components/CreateRefComponent';

function App() {
  return (
    <PageItem title="Common Grammer">
      <DemoItem title="createRef">
        <CreateRefComponent ></CreateRefComponent>
      </DemoItem>
    </PageItem>
  );
}

export default App;
