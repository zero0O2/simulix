
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider.jsx";

const QuestoesContext = createContext();

const QuestoesProvider = ({children}) => {

    const {user} = useAuth()
    const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL

    const [questoesForUser, setQuestoesForUser] = useState([])
    const [categoriaTypes, setCategoriaTypes] = useState("Todas")


    const CriarQuestoesForUserId = async (dadosForQuest) => {
        try {
            const response = await axios.post(`${API_URL}/questions`,dadosForQuest,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            
            await BuscarQuestoesForUserId(user._id)
            return response.data
        } catch (error) {
            console.error("Erro ao Criar questão:", error.response)
            return error?.response
        }
    }

    
    const FormatOptionsForQuestoes = async (options,correct) => {
        try {
            const response = await axios.post(`${API_URL}/formatOptions/${correct}`,options)
            return response.data
        } catch (error) {
            console.error("Erro ao FormatOptions para questão:", error?.response)
            return error?.response
        }
    }
    
    const BuscarQuestoesForUserId = async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/questions/${userId}`)
            const data = response.data
            setQuestoesForUser(data)
        } catch (error) {
            console.error("Erro ao buscar questões:", error?.response)
            return error?.response
            
        }
    }
    
    const DeletarQuestoesForUserId = async (IdForQuest) => {
        try {
            const response = await axios.delete(`${API_URL}/questions/${IdForQuest}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            
            await BuscarQuestoesForUserId(user._id)
            return response.data
        } catch (error) {
            console.error("Erro ao Deletar questão:", error.response.data)
            return error?.response
        }
    }

    useEffect(() => {
        try {

            BuscarQuestoesForUserId(user._id)
            
        } catch (error) {
            setQuestoesForUser([])
        }
    }, [])
    
    useEffect(() => {
        try {
            BuscarQuestoesForUserId(user._id)
        } catch (error) {
            setQuestoesForUser([])
        }
    }, [user])

    return (
        <>
            <QuestoesContext.Provider value={{questoesForUser,DeletarQuestoesForUserId , setQuestoesForUser,BuscarQuestoesForUserId,CriarQuestoesForUserId,FormatOptionsForQuestoes,categoriaTypes, setCategoriaTypes}}>
                {children}
            </QuestoesContext.Provider>
        </>
    )
}


const useQuestoes = () => {
    const context = useContext(QuestoesContext);

    return context;
};

export {QuestoesContext, QuestoesProvider, useQuestoes };