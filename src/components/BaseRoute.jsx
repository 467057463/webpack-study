import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { store } from '@/store';
import { useEffect } from 'react';

export default observer(({name, icon, ...props}) => {
  useEffect(()=>{
    window.scrollTo(0, 0)
  })

  store.app.setTitle({name, icon})
  return (
    <Route {...props}/>
  )
})