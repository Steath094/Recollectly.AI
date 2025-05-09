import { BrowserRouter,Route,Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<LoginPage/>}/>
  </Routes>
  </BrowserRouter>
}

export default App
