import { types, getSnapshot, onSnapshot, applySnapshot, onAction, onPatch, addMiddleware } from 'mobx-state-tree';

import { ArticlesModel } from './articles';

const RootStore = types
  .model({
    title: '首页',
    icon: 'logo',
    articles: types.optional(ArticlesModel, {})
    // article: types.optional(ArticleStore, {}),
    // articles: types.optional(ArticlesStore, {}),
    // auth: types.optional(AuthStore, {})
  })
  .actions(self => ({
    setConfig(config){
      self.title = config.title || '首页';
      self.icon = config.icon || 'logo';
    }
  }))
 

export const store = RootStore.create();
// console.log(getSnapshot(store))

onSnapshot(store, (snapshot) => {
  console.dir(snapshot)
})

// onAction(store, (call) => {
//   console.log(store, call)
// })

// onPatch(store, (path) => {
//   console.log(path)
// })

// addMiddleware(store, (call, next) => {
//   console.log(call)
//   next(call)
// })

// applySnapshot(store, {
//   title: "MST",
//   articles: {
//     count: 1,
//     page: 1,
//     quantity: 10,
//     select: 1,
//     list: {
//       "1": {
//         _id: '1',
//         title: '1',
//         content: '1'
//       }
//     }
//   }
// })