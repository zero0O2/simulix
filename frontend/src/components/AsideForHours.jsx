import { Link } from "react-router-dom"

import { useApp } from "../contexts/AppProvider";
import { useEffect, useState } from "react";
import { useNav } from "../contexts/NavigationProvider";



const AsideForHours = () => {

    
    const {navigateInHome,setQuestoesFoco,questoesFoco} = useNav()
    const [message,setMessage] = useState("")

    const [hoursNow,setHoursNow] = useState(new Date().toLocaleTimeString("pt-br"))

    useEffect(() => {

        const interval = setInterval(() => {
            setHoursNow(new Date().toLocaleTimeString("pt-br"))
            
        }, 1000)
        
        return () => clearInterval(interval)
        
    }, [])

    const GetMessageForHours = () => {
        const hour = Number(hoursNow.split(":")[0]) 

        if(hour < 6){
            return "Boa madrugada"
        }
        if(hour < 12){
            return "Bom dia"
        }
        if(hour < 18){
            return "Boa tarde"
        }
        if(hour < 24){
            return "Boa noite"
        }

        return ""
    }

    useEffect(()=>{
        setMessage(GetMessageForHours())
    },[hoursNow])

    return (
        <>

            <nav className={`w-full ${(questoesFoco && navigateInHome === "/tarefas") ? "h-[0px]" : "h-[130px] max-[1000px]:h-[90px]"} transition-all duration-200 z-0 relative flex items-center overflow-hidden rounded-[20px] `}>
                <img className="w-full h-full object-cover object-[0_calc(100%+20px)] absolute" src="./images/fundo1.jpeg" alt="Logo" />
                <div className="bg-linear-90 absolute w-full h-full from-[#00000077] to-transparent"></div>
                <div className=" flex h-full w-full gap-[20px] justify-between z-10 max-[1000px]:p-[15px] p-[20px]">
                    <div className="h-full flex flex-col justify-between">
                        <h1 className="text-[25px] text-nowrap">{message}</h1>
                        <p className="text-[20px]">{navigateInHome?.split("/")}</p>
                    </div>
                    <div className="max-w-[500px] max-[900px]:max-w-[300px] max-[570px]:max-w-[200px] w-full h-full rounded-[20px] flex justify-center items-center backdrop-blur-3xl ">
                        <h1 className="text-[50px] max-[950px]:text-[40px] max-[800px]:text-[30px]">{hoursNow}</h1>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default AsideForHours