import { useEffect } from "react"
import CardsCategorias from "../components/CardsCategorias"
import CardsQuestoes from "../components/CardsQuestoes"
import { useQuestoes } from "../contexts/QuestoesProvider"
import { useAuth } from "../contexts/AuthProvider"
import { useNav } from "../contexts/NavigationProvider"
import OptionsForQuest from "../components/OptionsForQuest"
import { MdOutlineCreate } from "react-icons/md";
import typesJson from "../assets/json/typesQuestions.json"
import AsideNavigateOptionsQuest from "../components/AsideNavigateOptionsQuest"

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
            <div className="flex-1 min-h-0 gap-[20px] flex ">
                <div className="flex-2 flex min-h-0 flex-col gap-[20px] ">
                    <aside className="w-full flex items-center max-[1120px]:flex-wrap justify-center gap-[20px] max-[1120px]:gap-[10px] max-[1120px]:justify-between max-[1120px]:px-[0px] px-[20px]">

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
                
                <div className="flex flex-1 overflow-hidden max-[1650px]:hidden max-w-[560px] ">
                    <AsideNavigateOptionsQuest/>
                </div>

            </div>
        </>
    )
}

export default HomeTarefas