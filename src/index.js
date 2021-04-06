// import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from '@/utils/history';
import { StoreProvider } from '@/hook/useStore';
import App from '@/App';
import '@/styles/index';
import request from '@/utils/request';

ReactDOM.render(
  <StoreProvider>
    <Router history={history}>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);



request.get('user').then(res => {
  console.log(res)
})

request.post('users', {
  username: "admin",
  password: "888888"
}).then(res => {
  console.log(res)
})
