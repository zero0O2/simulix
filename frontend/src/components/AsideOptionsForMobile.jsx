import { useNav } from "../contexts/NavigationProvider"
import HomeOptiosCreateQuest from "../routes/HomeOptiosCreateQuest"
import HomeOptiosFilterQuests from "../routes/HomeOptiosFilterQuests"
import OptionsForQuest from "./OptionsForQuest"



const AsideOptionsForMobile = () => {
    const {setNavigateOptionsForQuest, navigateOptionsForQuest} = useNav()



    return(
        <>
            <div className=" flex min-[1180px]:hidden w-full gap-[10px] h-[30px]">
                
                <OptionsForQuest text="Criar Questao" path={"/create-quest"}/>
                <OptionsForQuest text="Filtrar" path={"/filter-questions"}/>


                {navigateOptionsForQuest != "/home" &&                
                    <div onClick={()=>setNavigateOptionsForQuest("/home")} className="w-full h-full left-0 top-0 p-[10px] flex items-center absolute z-10">
                        <div onClick={(e)=>e.stopPropagation()} className="backdrop-blur-2xl w-full overflow-hidden gap-[10px] flex flex-col items-center h-[100%] rounded-[20px]">
                            <img className="absolute z-[-1] w-full h-full object-cover " src="./images/fundo3.png" alt="" />
                            <div className="absolute z-[-1] w-full h-full backdrop-blur-[50px] backdrop-brightness-25"></div>
                            <div className="flex w-full p-[10px_20px] justify-between items-center">
                                <h1 className="text-[17px]">Controle total da sua preparação</h1>
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