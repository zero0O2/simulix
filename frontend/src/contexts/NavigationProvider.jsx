
import { createContext, useContext, useState } from "react";


const NavigationContext = createContext();

const NavigationProvider = ({children}) => {

    const [navigateInHome, setNavigateInHome] = useState("/home")
    const [navigateOptionsForQuest, setNavigateOptionsForQuest] = useState("/home")
    const [asideDisplay, setAsideDisplay] = useState(true)



    return (
        <>
            <NavigationContext.Provider value={{navigateInHome, setNavigateInHome, navigateOptionsForQuest, setNavigateOptionsForQuest, asideDisplay, setAsideDisplay}}>
                {children}
            </NavigationContext.Provider>
        </>
    )
}


const useNav = () => {
    const context = useContext(NavigationContext);

    return context;
};

export {NavigationContext, NavigationProvider, useNav };