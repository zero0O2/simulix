
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider.jsx";
import { useApp } from "./AppProvider.jsx";

const QuestoesContext = createContext();

const QuestoesProvider = ({children}) => {

    const {user,access} = useAuth()
    const {API_URL} = useApp()

    const [questoesForUser, setQuestoesForUser] = useState([])
    const [questoesFilter,setQuestoesFilter] = useState([])
    
    const [gabaritoForSimulado,setGabaritoForSimulado] = useState([])


    const [categoriaTypes, setCategoriaTypes] = useState("Todas")
    const [categoriaMateria, setCategoriaMateria] = useState([])


    const CriarQuestoesForUserId = async (dadosForQuest) => {
        try {
            const response = await axios.post(`${API_URL}/questions`,dadosForQuest,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            
            setQuestoesForUser(prev => [...prev,response.data])
            await BuscarQuestoesForUserId(user._id)
        } catch (error) {
            console.error("Erro ao Criar questão:", error.response)
            return error?.response
        }
    }

    const CriarQuestoesForJSON = async (jsonDATA) => {
        try {
            const response = await axios.post(`${API_URL}/jsonQuestions`,jsonDATA,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            
            return response.data
        } catch (error) {
            console.error("Erro ao Ler JSON da questão:", error.response)
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
            setCategoriaTypes("Todas")
            setCategoriaMateria([])

            BuscarQuestoesForUserId(user._id)
        } catch (error) {
            setQuestoesForUser([])
        }
    }, [user,access])

    const FilterQuestions = () => {
        let arrayQuestions = questoesForUser

        if(categoriaTypes !== "Todas"){
            arrayQuestions = arrayQuestions?.filter(questao => questao?.examType === categoriaTypes)
        }
        
        if(categoriaMateria?.length !== 0){
            arrayQuestions = arrayQuestions?.filter(questao => categoriaMateria?.includes(questao.subject))
        }

        setQuestoesFilter(arrayQuestions)
    }

    useEffect(() => {
        
        FilterQuestions()
        
    }, [questoesForUser,categoriaTypes,categoriaMateria])


    return (
        <>
            <QuestoesContext.Provider value={{CriarQuestoesForJSON,setGabaritoForSimulado,gabaritoForSimulado, questoesForUser,FilterQuestions, categoriaMateria,setCategoriaMateria,DeletarQuestoesForUserId,questoesFilter,setQuestoesFilter ,setQuestoesForUser,BuscarQuestoesForUserId,CriarQuestoesForUserId,FormatOptionsForQuestoes,categoriaTypes, setCategoriaTypes}}>
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