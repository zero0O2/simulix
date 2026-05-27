import { useNav } from "../contexts/NavigationProvider"
import HomeOptiosCreateQuest from "../routes/HomeOptiosCreateQuest"
import HomeOptiosFilterQuests from "../routes/HomeOptiosFilterQuests"
import OptionsForQuest from "./OptionsForQuest"
import { MdOutlinePostAdd } from "react-icons/md";


const AsideOptionsForMobile = () => {
    const {setNavigateOptionsForQuest, navigateOptionsForQuest} = useNav()



    return(
        <>
            <div className={`flex ${navigateOptionsForQuest == "/simulado-questions" ? "" : "min-[1180px]:hidden"} gap-[10px] h-[30px]`}>
                
                
                {navigateOptionsForQuest !== "/home" ?
                    <OptionsForQuest text="Voltar" path={"/home"}/>
                    :<>
                    <OptionsForQuest text={"Criar Questao"} path={"/create-quest"}>
                        <MdOutlinePostAdd/>
                    </OptionsForQuest>
                    <OptionsForQuest text="Filtrar" path={"/filter-questions"}/>
                    <OptionsForQuest text="Simulado" path={"/simulado-questions"}/>
                </>}

                {(navigateOptionsForQuest != "/home" && navigateOptionsForQuest !== "/simulado-questions") &&                
                    <div onClick={()=>setNavigateOptionsForQuest("/home")} className="w-full h-full left-0 top-0 flex items-center absolute z-10">
                        <div onClick={(e)=>e.stopPropagation()} className=" bg-[var(--black01)] w-full overflow-hidden gap-[10px] flex flex-col items-center h-[100%]">
                            


                            <div className="flex w-full p-[10px_20px] justify-between items-center">
                                <h1 className="text-[17px] text-[var(--white)]">Controle total da sua preparação</h1>
                                <OptionsForQuest text="Voltar" path={"/home"}/>
                            </div>

                            {navigateOptionsForQuest == "/create-quest" &&
                                <HomeOptiosCreateQuest/>
                            }
                            {navigateOptionsForQuest == "/filter-questions" &&
                                <HomeOptiosFilterQuests/>
                            }
                        </div>  
                    </div>
                }

            </div>
        </>
    )
}

export default AsideOptionsForMobile