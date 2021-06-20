import { observer } from 'mobx-react';
import { useState } from 'react';
import { useStore } from '@/hook/useStore';

import { Link } from 'react-router-dom';
import { Avatar, Drawer, Badge } from 'antd';
import avatar from '@/images/avatar.jpg';
import { LeftOutlined, EditOutlined, ImportOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';

export default observer(()=> {
  const [visible, setVisible] = useState(false);
  const user = useStore('user');

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleLogout = () => {
    setVisible(false);
    user.logout()
  }
  return(
    <>
      {
        user.isLogin ? (
          <Avatar onClick={showDrawer} size={22} src={avatar}/>
        ) : (
          <Link to="/login"><UserOutlined/></Link>
        )
      }
      <Drawer
        title="个人信息"
        placement="right"
        onClose={onClose}
        visible={visible}
        className="user-drawer"
      >
        <ul style={{textAlign: 'center'}}>
          <li>
            <Link to={'/users/' + user._id}><Avatar size={100} src={avatar}/></Link>
          </li>
          <li style={{paddingTop: '5px'}}>
            {user.name}
          </li>
        </ul>
        <ul className="user-link">
          <li>
            <Link onClick={onClose} to="/articles/new">
              <EditOutlined /> 
              发布文章
            </Link>
          </li>
          <li onClick={handleLogout}>
            <ImportOutlined />
            退出登录
          </li>
        </ul>
      </Drawer>
    </>
  )
})