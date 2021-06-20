import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { store } from '@/store';
import history from '@/utils/history';
import { StoreProvider } from '@/hook/useStore';
import App from '@/App';
import '@/styles/index';

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
