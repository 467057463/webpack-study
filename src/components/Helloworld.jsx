import logo from './../images/logo.png';

// const DEV = 'dev'

function Helloworld(){
  return(
    <div className='hello-world'>
      <img className='logo' src={logo}/>
      <span>test {process.env.DEV}</span>
    </div>
  )
}

export default Helloworld