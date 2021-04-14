import { types, getSnapshot, onSnapshot } from 'mobx-state-tree';

import { ArticlesModel } from './articles';

const RootStore = types
  .model({
    title: types.optional(types.string, 'ssss'),
    articles: types.optional(ArticlesModel, {})
    // article: types.optional(ArticleStore, {}),
    // articles: types.optional(ArticlesStore, {}),
    // auth: types.optional(AuthStore, {})
  })
  .actions(self => ({
    setTitle(title){
      self.title = title
    }
  }))

export const store = RootStore.create();
console.log(getSnapshot(store))