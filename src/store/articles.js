import { types } from 'mobx-state-tree';
import Article from './article';

export const ArticlesModel = types.model('Articles', {
  count: types.optional(types.number, 0),
  page: types.optional(types.number, 0),
  quantity: types.optional(types.number, 0),
  list: types.optional(types.map(Article), {})
})

export default ArticlesModel.create()