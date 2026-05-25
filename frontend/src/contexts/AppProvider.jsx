
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthProvider } from "./AuthProvider.jsx";
import { NavigationProvider } from "./NavigationProvider.jsx";
import { QuestoesProvider } from "./QuestoesProvider.jsx";


const AppContext = createContext();

const AppProvider = ({children}) => {

    


    return (
        <>
            <AppContext.Provider value={{}}>
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