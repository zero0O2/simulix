import { useEffect } from "react"
import CardsCategorias from "../components/CardsCategorias"
import CardsQuestoes from "../components/CardsQuestoes"
import { useQuestoes } from "../contexts/QuestoesProvider"
import { useAuth } from "../contexts/AuthProvider"
import { useNav } from "../contexts/NavigationProvider"
import OptionsForQuest from "../components/OptionsForQuest"
import { MdOutlineCreate } from "react-icons/md";
import HomeOptiosForQuest from "./HomeOptiosForQuest"
import HomeOptiosCreateQuest from "./HomeOptiosCreateQuest"
import HomeOptiosFilterQuests from "./HomeOptiosFilterQuests"
import typesJson from "../assets/json/typesQuestions.json"

const HomeTarefas = () => {

    const {questoesForUser,BuscarQuestoesForUserId,categoriaTypes, setCategoriaTypes} = useQuestoes()
    const {navigateOptionsForQuest,setNavigateOptionsForQuest} = useNav()
    const {user} = useAuth()

    const FilterQuestions = () => {
        if(categoriaTypes === "Todas"){
            return questoesForUser
        }

        return questoesForUser?.filter((questao) => questao?.examType === categoriaTypes)
        
    }

    useEffect(() => {
        try {
            user && BuscarQuestoesForUserId(user._id)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <div className="flex-1 min-h-0 gap-[20px] overflow-hidden flex ">
                <div className="flex-2 flex min-h-0 flex-col gap-[10px]">
                    <aside className="w-full h-[60px] flex items-center justify-center gap-[20px] px-[20px]">

                        <CardsCategorias option={"Todas"}/>

                        {
                            typesJson.types.map((e)=>{
                                return <CardsCategorias key={e} option={e}/>
                            })
                        }

                    </aside>

                    <main className="flex-1 min-h-0 overflow-y-auto justify-start items-center no-scrollbar flex flex-col gap-[20px]">

                        {
                            FilterQuestions()?.map((questao) => (
                                <CardsQuestoes key={questao._id} card={questao} />
                            ))
                        }

                        {questoesForUser?.length === 0 && (
                            <div className="flex justify-center">
                                <p>Nenhuma questão encontrada</p>
                            </div>
                        )}

                    </main>
                </div>

                <div className="flex-1 z-0 flex relative flex-col gap-[20px]">
                    <img className="absolute w-full h-full object-cover " src="./images/fundo3.png" alt="" />
                    <div className="absolute w-full h-full backdrop-blur-[30px] backdrop-brightness-45"></div>
                    
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

                    </div>

                </div>

            </div>
        </>
    )
}

export default HomeTarefas