/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from "react"

const AcessibilityContext = createContext()

const AcessibilityProvider = ({children}) => {

    const [typeForCronograma,setTypeForCronograma] = useState("cronometro")

    const [cronometroExist,setCronometroExist] = useState(false)
    const [timerExist,setTimerExist] = useState(false)

    const [theme,setTheme] = useState(()=>{
        const theme = localStorage.getItem("theme")
        if(theme) return theme
        return 'white'
    })



    const Theme = () => {
        localStorage.setItem('theme',theme)
    }

    useEffect(()=>{
        Theme()
    },[theme])
    
    // ===========  Cronometro ============
    
    const cronometro = useRef(null)
    const [time,setTime] = useState(0)
    
    const hoursCronometro = Math.floor(time / 3600)
    const minutosCronometro = Math.floor((time % 3600) / 60)
    const secondsCronometro = Math.floor((time % 3600) % 60)

    const FormatNumberTime = (time) => {
        const formated = time.toString().padStart(2,"0")
        return formated
    }

    const IniciarCronometro = () => {
        if(cronometro.current) return
        setCronometroExist(true)
        cronometro.current = setInterval(()=>{
            
            setTime(prev=> prev + 1)
            
        },1000)
    }
    
    const PausarCronometro = () => {
        clearInterval(cronometro.current)
        cronometro.current = null
    }
    
    const CancelarCronometro = () => {
        clearInterval(cronometro.current)
        setCronometroExist(false)
        cronometro.current = null
        setTime(0)
    }

    const [buttonCronometro,setButtonCronometro] = useState('iniciar')


    return(
        <AcessibilityContext.Provider value={{
                setTypeForCronograma,typeForCronograma,
                IniciarCronometro,PausarCronometro,CancelarCronometro,time,cronometro,
                FormatNumberTime,
                hoursCronometro,minutosCronometro,secondsCronometro,
                buttonCronometro,setButtonCronometro,
                cronometroExist,
                timerExist,setTimerExist,
                theme,setTheme
            }}>
            {children}
        </AcessibilityContext.Provider>
    ) 
}


const useAcess = () => {
    const acess = useContext(AcessibilityContext)
    return acess
}

export {AcessibilityContext,AcessibilityProvider,useAcess}