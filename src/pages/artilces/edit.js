import { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Editor } from '@bytemd/react';
import { Form, Input, } from 'antd';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { useStore } from '@/hook/useStore';
import Loading from '@/components/Loading';
import { Button } from 'antd';

import zhHans from "bytemd/lib/locales/zh_Hans.json";
import gfm from "@bytemd/plugin-gfm";
// import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import save from './puglins/save';
import prism from './puglins/prism';



export default observer(() =>　{
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const { articles } = useStore();

  const plugins = useMemo(() => {
    return [
      gfm(), 
      // gemoji(),
      // highlight(), 
      // mediumZoom(),
      // save(),
      prism()
    ]
  }, [])

  useEffect(async () => {
    if(id){
      if(!articles.list.get(id)){
        const res = await articles.fetchArticle(id);
        setTitle(res.title)
        setContent(res.content)
      } else{
        articles.setCurrent(id)
        setTitle(articles.current.title)
        setContent(articles.current.content)
      }
    }
    setLoading(false)
  }, [])

  async function submit(){
    if(!title.trim()){
      message.error('请输入文章标题')
      return;
    }
    if(!content.trim()){
      message.error('文章内部不能为空')
      return;
    }
    const data = {
      title,
      content
    }
    setSubmitLoading(true)
    if(!id){
      await articles.createArticle(data)
    }else{
      await articles.updateArticle(id, data)
    }
    setSubmitLoading(false)
  }
  
  if(loading){
    return <Loading/>;
  }

  return(
    <div className="article-edit">
      <Input 
        className='title-input'
        size="large" 
        placeholder="文章标题" 
        value={title}
        onChange={(event)=>setTitle(event.target.value)}
      />

      <Editor
        locale={zhHans}
        plugins={plugins}
        value={content}
        onChange={(v) => {
          setContent(v);
        }}
      />

      <div className="button-wrapper">
        <Button 
          className='save-btn' 
          type="link" 
          onClick={submit}
          loading={submitLoading}
        >发布</Button>
        <Button type="text">保存为草稿</Button>
      </div>
    </div>
  )
})