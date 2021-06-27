import { types, flow } from 'mobx-state-tree';
import Article from './article';
import * as articlesAPI from '@/actions/articles';
import history from '@/utils/history';
import { message } from 'antd';

export const ArticlesModel = types.model('Articles', {
  articleLoading: false,
  loading: false,
  articleState: 'pending',
  state: 'pending',
  count: types.optional(types.number, 0),
  page: types.optional(types.number, 0),
  quantity: types.optional(types.number, 0),
  list: types.optional(types.map(Article), {}),
  current: types.maybe(types.reference(types.late(() => Article)))
})
.actions(self => {
  const fetchArticleList = flow(function*(page) {
    self.loading = true;
    try {
      console.log('fetch')
      const res = yield articlesAPI.getList({page});
      console.log(res)
      self.count = res.count;
      self.page = Number(res.page);
      self.quantity = res.quantity;
      res.list.forEach(item => {
        self.list.set(item._id, item)
      })
      self.state = "done"
      // self.list = res.list;
      // console.log(res)
    } catch (error) {
      console.log(error)
      self.state = "error"
    } finally {
      self.loading = false;      
    }
  })
  const setCurrent = (id) => {
    self.current = id;
    self.articleState = "done";
  }
  const fetchArticle = flow(function*(id){
    self.articleLoading = true;
    try {
      const res = yield articlesAPI.getArticle(id);
      self.list.set(id, res)
      self.current = id;
      self.articleState = 'done';
      return res;
    } catch (error) {
      console.log(error)
      self.articleState = 'error';
    } finally {
      self.articleLoading = false;      
    }
  })

  const reset = () => {
    self.articleLoading = false;
    self.loading = false;
    self.articleState = 'pending';
    self.state = 'pending';
    self.count =  0;
    self.page =  0;
    self.quantity =  0;
    self.list = {};
    self.current = undefined;
  }

  const createArticle = flow(function*(data){
    try{
      const res = yield articlesAPI.createArticle(data);
      message.info('文章发布成功')
      let clone = self.list.toJSON();      
      self.list.clear();
      self.list.set(res._id, res)
      for(let key in clone){
        self.list.set(key, clone[key])
      }
      history.replace(`/articles/${res._id}`)
    } catch(error){
      console.error(error)
    }
  })

  const updateArticle = flow(function*(id, data){
    try{
      const res = yield articlesAPI.updateArticle(id, data);
      message.info('文章更新成功')
      // TODO
      // 新建成功后，后端返回文章数据
      self.list.set(res._id, res)
      history.replace(`/articles/${res._id}`)
    } catch (error){
      console.error(error)
    }
  })

  const deleteArticle = flow(function*(id){
    try{
      const res = yield articlesAPI.deleteArticle(id);
      message.info('文章已删除')
      self.list.delete(id);
      self.current = undefined;
      history.replace('/')
    } catch (error){
      console.error(error)
    }
  })

  return{
    fetchArticleList,
    setCurrent,
    fetchArticle,
    reset,
    createArticle,
    updateArticle,
    deleteArticle
  }
})

export default ArticlesModel.create()