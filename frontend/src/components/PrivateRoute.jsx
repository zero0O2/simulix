import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"
import LoadCircle from "./LoadCircle"

const PrivateRoute = ({children,loggedIn = "all",local}) => {
    const {user,access} = useAuth()

    if(access === null || (access === true && user === null )){return <div className="absolute w-[100dvw] h-[100dvh] flex justify-center text-[50px] items-center"><LoadCircle/></div>}

    if(loggedIn === "all"){return children}

    if(loggedIn && !access){return <Navigate to={local} />}
    if(!loggedIn && access){return <Navigate to={local} />}

    return children
}

export default PrivateRoute