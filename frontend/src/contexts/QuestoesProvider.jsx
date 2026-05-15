
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider.jsx";

const QuestoesContext = createContext();

const QuestoesProvider = ({children}) => {

    const {user} = useAuth()

    const [questoesForUser, setQuestoesForUser] = useState([])
    const [categoriaTypes, setCategoriaTypes] = useState("Todas")

    const CriarQuestoesForUserId = async (dadosForQuest) => {
        try {
            const response = await axios.post(`http://localhost:3000/questions`,dadosForQuest,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            
            BuscarQuestoesForUserId(user._id)
            return response.data
        } catch (error) {
            console.error("Erro ao Criar questão:", error.response)
            return error?.response
        }
    }

    const FormatOptionsForQuestoes = async (options,correct) => {
        try {
            const response = await axios.post(`http://localhost:3000/formatOptions/${correct}`,options)
            return response.data
        } catch (error) {
            console.error("Erro ao FormatOptions para questão:", error?.response)
            return error?.response
        }
    }
    
    const BuscarQuestoesForUserId = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/questions/${userId}`)
            const data = response.data
            setQuestoesForUser(data)
        } catch (error) {
            console.error("Erro ao buscar questões:", error?.response)
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
            <QuestoesContext.Provider value={{questoesForUser, setQuestoesForUser,BuscarQuestoesForUserId,CriarQuestoesForUserId,FormatOptionsForQuestoes,categoriaTypes, setCategoriaTypes}}>
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