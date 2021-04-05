import loadable from '@loadable/component';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const articles = () =>　{
  const match = useRouteMatch();
  return(
    <Switch>
      <Route 
        path={`${match.path}/new`}
        component={loadable(() =>
          import(/* WebpackChunkName: "article_edit" */ './edit')
        )}
      />
      <Route 
        path={`${match.path}/:id/edit`}
        component={loadable(() =>
          import(/* WebpackChunkName: "article_edit" */ './edit')
        )}
      />
      <Route 
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