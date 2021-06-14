import { types } from "mobx-state-tree"

export default types.model('Article', {
  _id: types.identifier,
  title: '',
  content: '',
  createdAt: '',
  describe: '',
  meta: types.frozen({
    view: 0,
    like: 0
  }),
  author: types.frozen({
    _id: '',
    username: ''
  }),
  comments: types.frozen(
    []
  )
})
// .hooks(self => ({
//   afterCreate(){
//     console.log("created after")
//   }
// }))