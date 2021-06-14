import { Switch, Route } from 'react-router-dom';
import loadable from "@loadable/component";
import { hot } from 'react-hot-loader/root';

import Header from "@/views/layout/Header";
import BaseRoute from '@/components/BaseRoute';

const App = () => {
  return (
    <>
      <Header/>
      <div className="main">
        <Switch>
          <BaseRoute
            title="首页"
            icon="logo"
            path="/"
            exact
            component={loadable(() =>
              import(/* WebpackChunkName: "home" */ './views/home')
            )}
          />
          <BaseRoute
            title="登录"
            icon="logo"
            path="/login"
            exact
            component={loadable(() =>
              import(/* WebpackChunkName: "home" */ './views/login')
            )}
          />
          <BaseRoute
            path="/articles"
            component={loadable(() =>
              import(/* WebpackChunkName: "articles" */ './views/artilces')
            )}
          />
        </Switch>
      </div>
    </>
  )
}

export default hot(App);