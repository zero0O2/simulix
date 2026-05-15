import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext()



const AuthProvider = ({children}) => {

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    const [access,setAccess] = useState(null)
    const [user,setUser] = useState(null)

    const Loggout = () => {
        localStorage.removeItem("token")
        setAccess(false)
        setUser(null)
    }

    const CarregarUserForId = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/users/${id}`)
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

            const response = await axios.get(`${API_URL}/authorization`, {
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
            const response = await axios.post(`${API_URL}/cadastro`, data)
            return response.data
        } catch (error) {
            return error?.response?.data
        }
    }

    const Login = async (formDataUser) => {
        try {
            const response = await axios.post(`${API_URL}/login`, formDataUser)
            
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