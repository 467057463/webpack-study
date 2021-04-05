import { Link } from 'react-router-dom';
import Helloworld from '../components/Helloworld.jsx';

const home = () =>　{
  return(
    <div className="home">
      <Helloworld/>
      <ul>
        <li>
          <Link to='/articles/1'>文章详情</Link>
        </li>
        <li>
          <Link to='/articles/new'>添加文章</Link>
        </li>
        <li>
          <Link to='/articles/1/edit'>编辑文章</Link>
        </li>
      </ul>
    </div>
  )
}

export default home;