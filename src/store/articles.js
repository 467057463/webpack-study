import { types, flow } from 'mobx-state-tree';
import Article from './article';
import { getList } from '@/actions/articles';

export const ArticlesModel = types.model('Articles', {
  loading: false,
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
      // self.list = res.list;
      // console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      self.loading = false;      
    }
  })
  return{
    fetchArticleList
  }
})

export default ArticlesModel.create()