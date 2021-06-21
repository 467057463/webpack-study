import { observer } from 'mobx-react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  List, 
  Avatar, 
  Space, 
  Image  
} from 'antd';
import { 
  MessageOutlined, 
  LikeOutlined, 
  ReadOutlined 
} from '@ant-design/icons';

import avatar from '@/images/avatar.jpg';
import exart01 from '@/images/exart_01.jpg';
import exart02 from '@/images/exart_02.jpg';
import exart03 from '@/images/exart_03.jpg';
import exart04 from '@/images/exart_04.jpg';
import exart05 from '@/images/exart_05.jpg';
const images = [exart01, exart02, exart03, exart04, exart05]

const imgUrl = (index) => {
  if(index < images.length){
    return images[index]
  }else{
    return "";
  }
}


export default observer(({article, index}) => {
  const history = useHistory();
  const [moved, setMoved] = useState(false);
  const url = imgUrl(index);

  function touchStart(){
    if(!moved){
      history.push(`/articles/${article._id}`)
    }
  }

  function touchEnd(){
    if(!moved){
      history.push(`/articles/${article._id}`)
    }
  }
  return (
    <div className="article-item" 
      onTouchStart={() => setMoved(false)}
      onTouchMove={() => setMoved(true)}
      onTouchEnd={() => touchEnd()}
      onClick={() => touchStart()}
    >
      <div className="article-header">
        <Avatar size={20} src={avatar} />
        <span className='user-name'>{article.author.username}</span>
      </div>
      <div className="article-body">
        {url && <Image
          preview={false}
          height={70}
          width={70}
          src={url}
        />}
        <span className="article-title" to={'/articles/' + article._id}>{article.title}</span>
        <p className="content">{article.describe}</p>
      </div>    
      <div className="meta-info">
        <span>
          <ReadOutlined/>
          {article.commentCount}
          </span>
        <span>
          <LikeOutlined/>
          {article.meta.view}
        </span>
        <span>
          <MessageOutlined/>
          {article.meta.like}
        </span>
      </div>
    </div>
  )
})