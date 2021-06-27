import { observer } from 'mobx-react';
import { useEffect, useState, useMemo } from 'react';
import { useStore } from '@/hook/useStore';
import moment from 'moment';
import hljs from 'highlight.js';
import { 
  Link, 
  useParams, 
  useRouteMatch 
} from 'react-router-dom';
import { 
  Typography, 
  Divider, 
  Space, 
  Avatar, 
  Button, 
  Drawer 
} from 'antd';
const { 
  Title, 
  Paragraph, 
  Text 
} = Typography;
import { 
  MessageOutlined, 
  LikeOutlined, 
  ReadOutlined, 
  FieldTimeOutlined, 
  BarsOutlined  
} from '@ant-design/icons';
import avatar from '@/images/avatar.jpg';

import Loading from '@/components/Loading';
import MenuDarawer from './components/MenuDarawer';
import { Viewer } from '@bytemd/react';
import prism from './puglins/prism';
import gfm from "@bytemd/plugin-gfm";

export default observer(() =>　{
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { id } = useParams()
  const { articles, user, app } = useStore();
  const match = useRouteMatch();
  
  const plugins = useMemo(() => {
    return [
      gfm(), 
      prism()
    ]
  }, [])

  useEffect(async () => {
    if(!articles.list.get(id)){
      await articles.fetchArticle(id)      
    } else {
      articles.setCurrent(id)
    }
    app.setTitle({name: articles.current.title, icon: 'logo'})
    setLoading(false)
  }, [])

  async function remove(){
    setDeleteLoading(true);
    await articles.deleteArticle(id);
    setDeleteLoading(false);
  }

  const article = articles.current;
  if(loading){
    return <Loading/>;
  }

  return(
    <div className="article-show">
      <Title>{article.title}</Title>
      
      <div className='author'>
        <Avatar size={36} src={avatar} />
        <ul>
          <li>
            <Link 
              className="author-name" 
              to={`/users/${article.author._id}`}
            >
              {article.author.username}
            </Link>
          </li>
          <li>
            <Space>
              <FieldTimeOutlined />
              {moment(article.createdAt).format('YYYY年MM月DD日')}
            </Space>
            <Space>
              <ReadOutlined />
              {article.meta.view }
            </Space>
          </li>
        </ul>
      </div>

      {/* <div
        className="markdown-body content"
        dangerouslySetInnerHTML = {{ 
          __html: article.contentHtml 
        }} 
      /> */}

      <Viewer
        value={article.content}
        plugins={plugins}
      />

      <div className='meta'>    
        <div className='meta-data'>           
          <Space>
            <LikeOutlined/>
            {article.meta.like}
          </Space>
        </div>    

        {
          user.isLogin && user._id === article.author._id && 
          <ul>
            <li>
              <Link to={`${match.url}/edit`}>编辑</Link>
            </li>
            <li>
              {/* <a onClick={() => remove(article._id)}>删除</a> */}
              <Button 
                className='delete-btn'
                type="link" 
                onClick={remove}
                loading={deleteLoading}
              >删除</Button>
            </li>
          </ul>
        } 
      </div>
      <MenuDarawer menu={article.menu}/>
    </div>
  )
})