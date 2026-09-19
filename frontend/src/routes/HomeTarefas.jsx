import { useEffect } from "react"
import { useQuestoes } from "../contexts/QuestoesProvider"
import { useAuth } from "../contexts/AuthProvider"
import { useNav } from "../contexts/NavigationProvider"
import AsideNavigateOptionsQuest from "../components/AsideNavigateOptionsQuest"
import AsideCardsCategoria from "../components/AsideCardsCategoria"
import AsideOptionsForMobile from "../components/AsideOptionsForMobile"
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import DisplayFilterQuestions from "../components/DisplayFilterQuestions"
import DisplaySimuladoQuestions from "../components/DisplaySimuladoQuestions"



const HomeTarefas = () => {

    const {BuscarQuestoesForUserId } = useQuestoes()
    const {navigateOptionsForQuest,asideDisplay,questoesFoco,setQuestoesFoco} = useNav()


    const {user} = useAuth()
    
    useEffect(() => {
        try {
            user && BuscarQuestoesForUserId(user._id)
        } catch (error) {
            console.log(error)
        }
    }, [])
        
    
    return (
        <>
            <div className="flex-1 min-h-0 gap-[20px] flex">
                <div className="flex-2 flex min-h-0 min-w-0 max-[800px]:gap-[15px] items-center flex-col gap-[20px] ">
                    
                    {navigateOptionsForQuest !== "/simulado-questions" && <>
                        <aside className="w-full justify-between items-center gap-[20px] flex">   
                            <AsideCardsCategoria/>
                            <AsideOptionsForMobile/>

                            <button onClick={()=> setQuestoesFoco(prev=>!prev)} className="border-1 border-[var(--azulCeu)] w-[40px] h-[40px] flex justify-center items-center relative cursor-pointer text-[30px] text-[var(--azulCeu)]">{questoesFoco ? <MdFullscreenExit/> : <MdFullscreen/>}</button>
                        </aside>

                        <main className="flex-1 min-h-0 w-full overflow-y-auto justify-start items-center no-scrollbar flex flex-col pb-[20px] gap-[20px]">

                            <DisplayFilterQuestions/>

                        </main>
                    </>}

                    {navigateOptionsForQuest === "/simulado-questions" && <>

                        <DisplaySimuladoQuestions/>
                        
                    </> }
                </div>
                
                <div className={`flex relative max-[1180px]:hidden ${ questoesFoco || navigateOptionsForQuest == "/simulado-questions" ? "max-w-[0]" : "max-w-[500px]"} ${(asideDisplay || questoesFoco || navigateOptionsForQuest == "/simulado-questions") ? "max-[1450px]:max-w-[0]" : " max-[1450px]:max-w-[500px]"} flex-1 transition-all flex-1 pb-[10px] duration-[700ms]`}>
                    <AsideNavigateOptionsQuest/>
                </div>

            </div>
        </>
    )
}

export default HomeTarefas