import { useEffect, useState } from "react"
import CardsCategorias from "../components/CardsCategorias"
import CardsQuestoes from "../components/CardsQuestoes"
import { useQuestoes } from "../contexts/QuestoesProvider"
import { useAuth } from "../contexts/AuthProvider"
import { useNav } from "../contexts/NavigationProvider"
import OptionsForQuest from "../components/OptionsForQuest"
import { MdOutlineCreate } from "react-icons/md";
import typesJson from "../assets/json/typesQuestions.json"
import AsideNavigateOptionsQuest from "../components/AsideNavigateOptionsQuest"
import AsideCardsCategoria from "../components/AsideCardsCategoria"
import AsideOptionsForMobile from "../components/AsideOptionsForMobile"

const HomeTarefas = () => {

    const {questoesForUser,BuscarQuestoesForUserId,categoriaMateria ,categoriaTypes,questoesFilter,setQuestoesFilter,FilterQuestions} = useQuestoes()
    const {navigateOptionsForQuest,setNavigateOptionsForQuest,asideDisplay,setAsideDisplay} = useNav()


    const {user} = useAuth()

    
    useEffect(() => {
        try {
            user && BuscarQuestoesForUserId(user._id)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        FilterQuestions()
    }, [questoesForUser,categoriaTypes,categoriaMateria])
    


    return (
        <>
            <div className="flex-1 min-h-0 gap-[20px] flex ">
                <div className="flex-2 flex min-h-0 min-w-0 max-[800px]:gap-[15px] items-center flex-col gap-[20px] ">

                    <AsideCardsCategoria/>

                    <AsideOptionsForMobile/>

                    <main className="flex-1 min-h-0 w-full overflow-y-auto justify-start items-center no-scrollbar flex flex-col gap-[20px]">

                        {questoesFilter?.length > 0 &&
                            questoesFilter?.map((questao) => (
                                <CardsQuestoes key={questao._id} card={questao} />
                            ))
                        }

                        {questoesFilter?.length === 0 && (
                            <div className="flex justify-center">
                                <p>Nenhuma questão encontrada</p>
                            </div>
                        )}

                    </main>
                </div>
                
                <div className={`flex relative max-[1180px]:hidden ${asideDisplay ? "max-[1450px]:max-w-[0] max-[140px]:overflow-hidden " : " max-[1450px]:max-w-[560px]"} flex-1 transition-all flex-1 duration-[800ms]`}>
                    <AsideNavigateOptionsQuest/>
                </div>

            </div>
        </>
    )
}

export default HomeTarefas