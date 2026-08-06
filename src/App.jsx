import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import { PrivateComponent } from './Components/PrivateComponent'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { UAParser } from 'ua-parser-js'
import { useDeviceInformation } from './hooks/useDeviceInfo'

function App() {
  const [count, setCount] = useState(0)
  const setDeviceInformation = useDeviceInformation((state) => state.setDeviceInformation)
  useEffect(()=>{
    const parser = new UAParser();
    const {os} = parser.getResult();
    
    setDeviceInformation(os)
  },[])
  return (
    <Routes>
      <Route element={<PrivateComponent/>} >  {/* Role based navigation has to be done */}
        <Route path='/' element={<h1>Home page</h1>}/>
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
  )
}

export default App
