import { BrowserRouter,Route,Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { Provider } from 'react-redux'
import store from './store/store'
function App() {
  return <BrowserRouter>
  <Provider store={store}>
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
    </Routes>
  </Provider>
    
  </BrowserRouter>
}

export default App
