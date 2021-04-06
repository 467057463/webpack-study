import { types } from 'mobx-state-tree';

const RootStore = types
  .model({
    title: types.optional(types.string, 'ssss')
    // article: types.optional(ArticleStore, {}),
    // articles: types.optional(ArticlesStore, {}),
    // auth: types.optional(AuthStore, {})
  })

export const store = RootStore.create();