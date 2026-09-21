import CardsQuestoes from "../components/CardsQuestoes"
import { useQuestoes } from "../contexts/QuestoesProvider"
import CardsQuestoesLinha from "./newComponents/CardsQuestoesLinha"


const DisplayFilterQuestions = ({typeList = "cards"}) => {

    const {questoesFilter} = useQuestoes()

    return (
        <>

            {questoesFilter?.length > 0 &&
                questoesFilter?.map((questao) => {
                    if (typeList == "cards") return <CardsQuestoes key={questao._id} card={questao} />
                    if (typeList == "linha") return <CardsQuestoesLinha key={questao._id} card={questao} />
                })
            }

            {questoesFilter?.length === 0 && (
                <div className="flex justify-center text-[var(--08)]">
                    <p>Nenhuma questão encontrada</p>
                </div>
            )}

        </>
    )
}

export default DisplayFilterQuestions