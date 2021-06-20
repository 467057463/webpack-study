import { Layout, Avatar, Drawer, Badge } from 'antd';
const { Header } = Layout;
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useStore } from '@/hook/useStore';
import { Link } from 'react-router-dom';
import logo from '@/images/logo.png';
import UserDarawer from './userDarawer';

export default observer(() => {
  const { title } = useStore('app');
  const user = useStore('user');

  return (
    <Header className="header">
      <div className="header-title">
        <div className="title-content">{title.name}</div>
      </div>

      <div className="header-wrap">
        {
          title.icon === 'logo' &&         
          <Link to='/'><img className='logo' src={logo}/></Link>
        }
        <div className="right-actions">
          <UserDarawer/>
          <div className="menu-btn">
            <Badge dot>
              <MenuOutlined />
            </Badge>
          </div>
        </div>
      </div>
    </Header>
  )
})