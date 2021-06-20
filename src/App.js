import { Switch, Route } from 'react-router-dom';
import loadable from "@loadable/component";
import { hot } from 'react-hot-loader/root';

import Header from "@/pages/layout/Header";
import Progress from '@/pages/layout/progress';
import BaseRoute from '@/components/BaseRoute';

const App = () => {
  return (
    <>
      <Progress/>
      <Header/>
      <div className="main">
        <Switch>
          <BaseRoute
            name="首页"
            icon="logo"
            path="/"
            exact
            component={loadable(() =>
              import(/* WebpackChunkName: "home" */ './pages/home')
            )}
          />
          <BaseRoute
            name="登录"
            icon="logo"
            path="/login"
            exact
            component={loadable(() =>
              import(/* WebpackChunkName: "home" */ './pages/login')
            )}
          />
          <BaseRoute
            path="/articles"
            component={loadable(() =>
              import(/* WebpackChunkName: "articles" */ './pages/artilces')
            )}
          />
        </Switch>
      </div>
    </>
  )
}

export default hot(App);