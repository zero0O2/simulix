import { Link } from "react-router-dom"

import { useApp } from "../contexts/AppProvider";
import { useEffect, useState } from "react";
import { useNav } from "../contexts/NavigationProvider";



const AsideForHours = () => {

    const {hoursNow} = useApp()
    const {navigateInHome} = useNav()

    const [message,setMessage] = useState()

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

            <nav className="w-full h-[130px] z-0 relative flex items-center overflow-hidden rounded-[20px] ">
                <img className="w-full h-full object-cover object-[0_calc(100%+20px)] absolute" src="./images/fundo1.jpeg" alt="Logo" />
                <div className=" flex h-full w-full justify-between z-10 p-[20px]">
                    <div className="h-full flex flex-col justify-between">
                        <h1 className="text-[25px]">{message}</h1>
                        <p className="text-[20px]">{navigateInHome?.split("/")}</p>
                    </div>
                    <div className="w-[500px] h-full rounded-[20px] flex justify-center items-center backdrop-blur-3xl ">
                        <h1 className="text-[50px]">{hoursNow}</h1>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default AsideForHours