import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';
import DevTools from 'mobx-react-devtools';
import Layout from './components/Layout/Main';
import stores from './stores';

configure({
  enforceActions: true,
});

if (module.hot) module.hot.accept();
render(
  <div>
    <Provider {...stores}>
      <Layout />
    </Provider>
    {process.env.NODE_ENV !== 'production' && <DevTools />}
  </div>
  ,
  document.getElementById('root'),
);
