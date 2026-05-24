import { useAuth } from "../contexts/AuthProvider"
import { useNav } from "../contexts/NavigationProvider"
import HomeOptiosForQuest from "../routes/HomeOptiosForQuest"
import HomeOptiosCreateQuest from "../routes/HomeOptiosCreateQuest"
import HomeOptiosFilterQuests from "../routes/HomeOptiosFilterQuests"
import HomeOptionSimulado from "../routes/HomeOptionSimulado"

const AsideNavigateOptionsQuest = () => {

    const {navigateOptionsForQuest,setNavigateOptionsForQuest,asideDisplay} = useNav()
    const {user} = useAuth()

    return (
        <>
            <div className={`w-full z-0 flex relative transition-all overflow-hidden duration-[800ms] flex-col gap-[20px]`}>
                
                <img className="absolute w-full h-full object-cover " src="./images/fundo3.png" alt="" />
                <div className="absolute w-full h-full backdrop-blur-[150px] backdrop-brightness-45"></div>
                
                <div className="flex-1 z-10 min-y-0 flex flex-col items-center overflow-hidden py-[20px] gap-[10px]">
                    <aside className="flex h-[40px] justify-center w-full items-center px-[10px] gap-[10px]">
                        <h1 className="text-[20px] font-bold text-white">Controle total da sua preparação</h1>
                        {navigateOptionsForQuest !== "/home" && (
                            <button onClick={()=>setNavigateOptionsForQuest("/home")} className="bg-[var(--azulEscuro)] hover:bg-[var(--verdeClaro)] text-white duration-300 cursor-pointer p-[5px_10px] rounded-[5px]">Voltar</button>
                        )}
                    </aside>
                    {navigateOptionsForQuest === "/home" && <HomeOptiosForQuest />}
                    {navigateOptionsForQuest === "/create-quest" && <HomeOptiosCreateQuest />}
                    {navigateOptionsForQuest === "/filter-questions" && <HomeOptiosFilterQuests />}
                    {navigateOptionsForQuest === "/simulado-questions" && <HomeOptionSimulado />}
                    

                </div>
            </div>

        </>
    )
}

export default AsideNavigateOptionsQuest