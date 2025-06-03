import {useEffect,useState, type ReactElement} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
interface authProps{
    children: ReactElement
    authentication: Boolean
}
function Protected({
    children,
    authentication= true
}:authProps) {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector((state:any) => state.auth.status)
    console.log(authStatus);
    
    useEffect(()=>{
        if (authentication && authStatus !==authentication) {
            navigate("/login")
        }else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, authentication, navigate])
    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected