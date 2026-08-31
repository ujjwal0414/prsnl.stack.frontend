import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, useNavigate } from 'react-router'
import { Route } from 'react-router'
import { PrivateComponent } from './Components/PrivateComponent'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { UAParser } from 'ua-parser-js'
import { useDeviceInformation } from './hooks/useDeviceInfo'
import { useUserStore } from './hooks/useUserData'
import { Admin } from './pages/Admin'
import { AdminLayout } from './layouts/AdminLayout'
import { UnAuth } from './Components/UnAuthPage'
import { VendorLayout } from './layouts/VendorLayout'
import { ClientLayout } from './layouts/ClientLayout'
import { VendorHome } from './Components/Vendor/Home/VendorHome'
import { UpdateVendorDetails } from './Components/Vendor/UpdateDetails/UpdateVendorDetails'
import { AddServiceForm } from './Components/Vendor/CreateService/AddServiceForm'
import { VendorDashboard } from './Components/Vendor/Dashboard/Dashoard'

function App() {
  const [count, setCount] = useState(0)
  const role = useUserStore((state)=>state.role)
  const refreshToken = useUserStore((state)=>state.refreshToken)
  const navigate = useNavigate();
  const setDeviceInformation = useDeviceInformation((state) => state.setDeviceInformation)
  useEffect(()=>{
    const parser = new UAParser();
    const {os} = parser.getResult();
    if(role){
      navigate(`/${role}/`)
    }
    setDeviceInformation(os)
  },[role])
  return (
    <Routes>
      <Route element={<PrivateComponent/>} >  {/* Role based navigation has to be done */}
        <Route path='/' element={<h1>Home page</h1>}/>
        <Route path='client' element={<ClientLayout/>}>
          <Route index element={<h2>User home</h2>}/>
        </Route>
        <Route path='vendor' element={<VendorLayout/>}>
          <Route index element={<VendorHome/>}/>
          <Route path='updateDetails' element={<UpdateVendorDetails/>}/>
          <Route path='createService' element={<AddServiceForm/>}/>
          <Route path='dashboard' element={<VendorDashboard/>}/>
        </Route>
        <Route path='admin' element={<AdminLayout/>}>
          <Route index element={<Admin/>}/>
        </Route>
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/unauth' element={<UnAuth/>} />
    </Routes>
  )
}

export default App
