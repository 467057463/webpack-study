import { Switch, Route } from 'react-router-dom';
import loadable from "@loadable/component";
import { hot } from 'react-hot-loader/root';

import Header from "@/views/layout/Header";

const App = () => {
  return (
    <>
      <Header/>
      <Switch>
        <Route
          path="/"
          exact
          component={loadable(() =>
            import(/* WebpackChunkName: "home" */ './views/home')
          )}
        />
        <Route
          path="/articles"
          component={loadable(() =>
            import(/* WebpackChunkName: "articles" */ './views/artilces')
          )}
        />
      </Switch>
    </>
  )
}

export default hot(App);