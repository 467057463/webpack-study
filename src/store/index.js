import { types, getSnapshot, onSnapshot, applySnapshot, onAction, onPatch, addMiddleware } from 'mobx-state-tree';

import { ArticlesModel } from './articles';
import UserModel from './user';
import appModel from './app';

const RootStore = types
  .model({
    app: types.optional(appModel, {}),
    articles: types.optional(ArticlesModel, {}),
    user: types.optional(UserModel, {})   
  })

export const store = RootStore.create();

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