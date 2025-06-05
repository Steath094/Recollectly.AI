import { BrowserRouter,Route,Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { Provider } from 'react-redux'
import store from './store/store'
import SharePage from "./pages/SharePage"
import AuthLayout from './components/AuthLayout'
import NotFound from "./pages/NotFound"
import { useEffect } from "react"
import { BACKEND_URL } from "./config"
import axios from "axios"
function App() {
  useEffect(() => {
      axios.get(`${BACKEND_URL}/api/v1/brain/abc`).then().catch()
  },[])
  
  return <BrowserRouter>
  <Provider store={store}>
    <Routes>
      <Route path="/dashboard" element={<AuthLayout authentication={true}><Dashboard/></AuthLayout> }/>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/share/:id" element={<SharePage/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Provider>
    
  </BrowserRouter>
}

export default App
