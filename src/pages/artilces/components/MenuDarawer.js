import { observer } from 'mobx-react';
import { useState } from 'react';

import { 
  Typography, 
  Divider, 
  Space, 
  Avatar, 
  Button, 
  Drawer,
  Anchor
} from 'antd';
import IconFont from '@/components/IconFont';

const handleClick = (e, link) => {
  e.preventDefault();
};

function generateMenu(data){
  return (function walk(list){
    return(
      <>
        {list.map(item => {
          return (
            <Anchor.Link 
              key={item.data.id} 
              title={item.value} 
              href={'#' + item.data.id}              
            >              
              { 
                item.children && item.children.length > 0 &&
                walk(item.children)
              }
            </Anchor.Link>
          )
        })}
      </>
    )
  })(data)    
}


export default observer(({menu}) => {
  const [visible, setVisible] = useState(false);

  return(
    <>
      <Button
        size='large'
        className="menu-btn"
        shape="circle"
        type="primary"
        onClick={() => setVisible(true)}
        icon={<IconFont type='fi-zhankai'/>}
        // icon={<FieldTimeOutlined/>}
      />

      <Drawer
        title="文章目录"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Anchor
            affix={false}
            showInkInFixed={true}
            onClick={handleClick}
            offsetTop={60}
          >
            {generateMenu(menu)}
          </Anchor> 
      </Drawer>
    </>
  )
})
