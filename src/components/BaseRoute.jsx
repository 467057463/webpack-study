import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { store } from '@/store';

export default observer(({title, icon, ...props}) => {
  store.setConfig({title, icon})
  document.title = title;
  return (
    <Route {...props}/>
  )
})