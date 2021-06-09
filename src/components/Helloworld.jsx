import logo from './../images/logo.png';
import { store } from '@/store';
import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';

export default observer(() => {
  const title = useStore('title');
  return(
    <div onClick={()=> store.setTitle('sssb')} className='hello-world'>
      <img className='logo' src={logo}/>
      <span>{title} testabcdef {process.env.DEV}</span>
    </div>
  )
})
