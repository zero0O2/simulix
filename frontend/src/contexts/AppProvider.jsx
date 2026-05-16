
import { createContext, useContext, useEffect, useState } from "react";
import { AuthProvider } from "./AuthProvider.jsx";
import { NavigationProvider } from "./NavigationProvider.jsx";
import { QuestoesProvider } from "./QuestoesProvider.jsx";


const AppContext = createContext();

const AppProvider = ({children}) => {

    const [hoursNow,setHoursNow] = useState(new Date().toLocaleTimeString("pt-br"))
    console.log(hoursNow)

    useEffect(() => {

        const interval = setInterval(() => {
            setHoursNow(new Date().toLocaleTimeString("pt-br"))
            
        }, 1000)
        
        return () => clearInterval(interval)
        
    }, [])

    return (
        <>
            <AppContext.Provider value={{ hoursNow }}>
                <AuthProvider>
                <NavigationProvider>
                <QuestoesProvider>
                    {children}
                </QuestoesProvider>
                </NavigationProvider>
                </AuthProvider>
            </AppContext.Provider>
        </>
    )
}

const useApp = () => {
    const app = useContext(AppContext)
    return app
}

export {AppContext, AppProvider, useApp};