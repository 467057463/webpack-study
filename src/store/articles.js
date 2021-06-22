import { types, flow } from 'mobx-state-tree';
import Article from './article';
import { getList, getArticle } from '@/actions/articles';

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
  const fetchArticleList = flow(function*() {
    self.loading = true;
    try {
      const res = yield getList();
      console.log(res)
      self.count = res.count;
      self.page = res.page;
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
  }
  const fetchArticle = flow(function*(id){
    self.articleLoading = true;
    try {
      const res = yield getArticle(id);
      // console.log(res)
      self.list.set(id, res)
      self.current = id;
      self.articleState = 'done';
    } catch (error) {
      console.log(error)
      self.articleState = 'error';
    } finally {
      self.articleLoading = false;      
    }
  })
  return{
    fetchArticleList,
    setCurrent,
    fetchArticle
  }
})

export default ArticlesModel.create()