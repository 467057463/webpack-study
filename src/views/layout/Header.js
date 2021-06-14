import { Layout, Avatar, Drawer, Badge } from 'antd';
const { Header } = Layout;
import { LeftOutlined, EditOutlined, ImportOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useStore } from '@/hook/useStore';
import { Link } from 'react-router-dom';
import Logo from '@/images/logo.png';


export default observer(() => {
  const title = useStore('title');
  const icon = useStore('icon');
  return (
    <Header className="header">
      <div className="header-title">
        <div className="title-content">{title}</div>
      </div>

      <div className="header-wrap">
        {
          icon === 'logo' &&         
          <Link to='/'><img className='logo' src={Logo}/></Link>
        }
        <div className="right-actions">
          <Link to="/login"><UserOutlined/></Link>
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