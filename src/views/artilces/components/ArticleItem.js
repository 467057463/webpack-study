import { observer } from 'mobx-react';

export default observer((article) => {
  return (
    <div className="article-item">
      <b>{article.title}</b>
      <p>{article.describe}</p>
    </div>
  )
})