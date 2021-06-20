import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { store } from '@/store';

export default observer(({name, icon, ...props}) => {
  store.app.setTitle({name, icon})
  return (
    <Route {...props}/>
  )
})