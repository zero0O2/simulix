
import { useEffect, useState } from "react";

const AsideForHours = () => {
    const [hoursNow,setHoursNow] = useState(new Date().toLocaleTimeString("pt-br"))

    useEffect(() => {
        const interval = setInterval(() => {
            setHoursNow(new Date().toLocaleTimeString("pt-br"))
            
        }, 1000)
        
        return () => clearInterval(interval)
    }, [])
    
    return (
        <>

            <nav className={`flex items-center rounded-[20px] `}>
                <h1 className="text-[30px] text-[var(--07)]">{hoursNow}</h1>
            </nav>

        </>
    )
}

export default AsideForHours