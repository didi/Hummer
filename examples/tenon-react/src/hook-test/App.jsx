import React from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

import UseStateComponent from './components/UseStateComponent';
import UseEffectComponent from './components/UseEffectComponent';
import UseReducerComponent from './components/UseReducerComponent';
import UseCallbackComponent from './components/UseCallbackComponent';


function App() {
  return (
    <PageItem title="Use Hook">
      <DemoItem title="useState">
        <UseStateComponent initialCount={0}></UseStateComponent>
      </DemoItem>
      <DemoItem title="useEffect">
        <UseEffectComponent></UseEffectComponent>
      </DemoItem>
      <DemoItem title="useReducer">
        <UseReducerComponent></UseReducerComponent>
      </DemoItem>
      <DemoItem title="useCallback">
        <UseCallbackComponent initialCount={0}></UseCallbackComponent>
      </DemoItem>
    </PageItem>
  );
}

export default App;
