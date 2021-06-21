import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '@/hook/useStore';
import InfiniteScroll from 'react-infinite-scroller';
import ArticleItem from '@/pages/artilces/components/ArticleItem';
import { LoadingOutlined } from '@ant-design/icons';
import Loading from '@/components/Loading';

// import Helloworld from '../components/Helloworld.jsx';

export default observer(() =>{
  const articles = useStore('articles');
  
  // useEffect(()=>{
  //   articles.fetchArticleList();
  //   return () => {
  //     // articles.reset();
  //   }
  // }, [])

  function loadFunc(page){
    articles.fetchArticleList(page);
  }

  const hasMore = articles.state === 'pending' || articles.page * articles.quantity < articles.count;
  return(
    <InfiniteScroll
      className="home"
      pageStart={articles.page}
      loadMore={loadFunc}
      hasMore={hasMore}
      loader={
        <div className="loadmore" key={0}>
          {
            articles.state !== 'pending' && 
            <>
              <LoadingOutlined/>
              加载中 ...
            </>
          }            
        </div>
      }
    >
      {
        articles.state === 'pending' && <Loading/>
      }
      {
        [...articles.list].map(([id, item], index) => <ArticleItem key={id} article={item} index={index}/>)
      }
      {
        !hasMore && <div className="nomore">没有更多了...</div>
      }
    </InfiniteScroll>
  )
})