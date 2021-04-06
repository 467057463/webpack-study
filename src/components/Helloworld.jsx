import logo from './../images/logo.png';
import { useStore } from '@/hook/useStore';

function Helloworld(){
  const title = useStore('title');
  return(
    <div className='hello-world'>
      <img className='logo' src={logo}/>
      <span>{title} test {process.env.DEV}</span>
    </div>
  )
}

export default Helloworld