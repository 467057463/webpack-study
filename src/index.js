// import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from '@/utils/history';
import { StoreProvider } from '@/hook/useStore';
import App from '@/App';
import '@/styles/index';

import { store } from '@/store';
window._store = store;

ReactDOM.render(
  <StoreProvider>
    <Router history={history}>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);

// 如果已登录获取当前用户的信息
if(localStorage.getItem('access_token')){
  store.user.getCurrentUser();
}

// request.get('user').then(res => {
//   console.log(res)
// })

// request.post('users', {
//   username: "admin",
//   password: "888888"
// }).then(res => {
//   console.log(res)
// })
