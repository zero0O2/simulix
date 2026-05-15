import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext()



const AuthProvider = ({children}) => {

    const [access,setAccess] = useState(null)
    const [user,setUser] = useState(null)

    const Loggout = () => {
        localStorage.removeItem("token")
        setAccess(false)
        setUser(null)
    }

    const CarregarUserForId = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${id}`)
            setUser(response.data)
        } catch (error) {
            console.error("Erro ao carregar usuário:", error)
        }
    }

    const CarregarUserToken = async () => {
        try {
            const token = localStorage.getItem("token")

            if(!token){
                throw new Error("Token não encontrado")
            }

            const response = await axios.get('http://localhost:3000/authorization', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            CarregarUserForId(response.data.id)

            setAccess(true)

        } catch (error) {
            Loggout()
        }
    }


    const CreatedUser = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/cadastro', data)
            return response.data
        } catch (error) {
            return error?.response?.data
        }
    }

    const Login = async (formDataUser) => {
        try {
            const response = await axios.post('http://localhost:3000/login', formDataUser)
            
            return response.data

        } catch (error) {
            return error?.response?.data
        }

    }
    
    useEffect(() => {
        CarregarUserToken()
    }, [])

    return(
        <AuthContext.Provider value={{access,setAccess,CreatedUser,Login,CarregarUserToken,Loggout,CarregarUserForId,user}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}


export {AuthContext,AuthProvider,useAuth}