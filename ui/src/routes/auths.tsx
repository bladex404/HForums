import { Navigate } from "react-router-dom"

interface props {
    isAuthenticated: boolean,
    children: React.ReactNode
}
const AuthProtected = ({isAuthenticated, children}:props) =>{
    return(
        isAuthenticated ? <Navigate to={"/posts"} /> : children
    )
}
export default AuthProtected