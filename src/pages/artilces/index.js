import loadable from '@loadable/component';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import BaseRoute from '@/components/BaseRoute';

const articles = () =>　{
  const match = useRouteMatch();
  return(
    <Switch>
      <BaseRoute 
        name="添加文章"
        icon="logo"
        path="/"
        path={`${match.path}/new`}
        component={loadable(() =>
          import(/* WebpackChunkName: "article_edit" */ './edit')
        )}
      />
      <BaseRoute 
       name="编辑文章"
       icon="logo"
       path="/"
        path={`${match.path}/:id/edit`}
        component={loadable(() =>
          import(/* WebpackChunkName: "article_edit" */ './edit')
        )}
      />
      <BaseRoute
        name="文章详情"
        icon="logo"
        path="/" 
        path={`${match.path}/:id`}
        component={loadable(() =>
          import(/* WebpackChunkName: "article_show" */ './show')
        )}
      />
      <Route path={match.path}>
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}

export default articles;