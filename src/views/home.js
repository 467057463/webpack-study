import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '@/hook/useStore';
import ArticleItem from '@/views/artilces/components/ArticleItem';

// import Helloworld from '../components/Helloworld.jsx';

export default observer(() =>{
  const articles = useStore('articles');
  
  useEffect(()=>{
    articles.fetchArticleList();
    return () => {
      // articles.reset();
    }
  }, [])

  return(
    <div className="home">
      {
        [...articles.list].map(([id, item], index) => <ArticleItem key={id} {...item}/>)
      }
    </div>
  )
})