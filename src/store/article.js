import { types } from "mobx-state-tree"

export default types.model('Article', {
  _id: types.identifier,
  title: '',
  content: '',
  contentHtml: '',
  createdAt: '',
  describe: '',
  menu: types.frozen(
    []
  ),
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