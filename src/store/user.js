import { flow, types } from "mobx-state-tree";
import history from '@/utils/history';
import { message } from 'antd';
import { login, getCurrentUserInfo } from '@/actions/user';

export default types.model('user', {
  _id: '',
  name: '',
  isLogin: false,
  loading: false
})
.actions(self => {
  return { 
    loginSuccess: function(data){
      self.name = data.name;
      self._id = data._id;
      self.isLogin = true;
    },
    login: flow(function*(data) {
      self.loading = true;  
      try{
        const res = yield login(data);
        console.log(res)
        // self.user = res.user;
        self.loginSuccess(res.user);
        localStorage.setItem('access_token', res.access_token)
        self.isLoading = false;
        message.info('登录成功')
        history.replace('/')
      }catch(error){
        console.log(error)
        message.error(error.message)
      }finally{
        self.loading = false;  
      }
    }),
    logout: flow(function* logout(){
      message.info('退出登录成功')
      self.name = "";
      self.isLogin = false;
      localStorage.removeItem('access_token')
      history.replace('/')
    }),
    getCurrentUser: flow(function* getCurrentUser(){
      const token = localStorage.getItem('access_token');
      if(!token) return;
      try{
        const res = yield getCurrentUserInfo();
        // self.user = res.user;
        self.loginSuccess(res.user);
        return res;
      }catch(error){
        console.log(error)
      }
    })
  }
})