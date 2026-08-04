
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthProvider } from "./AuthProvider.jsx";
import { NavigationProvider } from "./NavigationProvider.jsx";
import { QuestoesProvider } from "./QuestoesProvider.jsx";
import { AcessibilityProvider } from "./AcessibilityProvider.jsx";


const AppContext = createContext();

const AppProvider = ({children}) => {

    const API_URL = import.meta.env.VITE_API_URL_LOCAL || import.meta.env.VITE_API_URL_LOCAL
    


    return (
        <>
            <AppContext.Provider value={{API_URL}}>
                <AuthProvider>
                <NavigationProvider>
                <QuestoesProvider>
                <AcessibilityProvider>
                    {children}
                </AcessibilityProvider>
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