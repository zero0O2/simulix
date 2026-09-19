import CardsQuestoes from "../components/CardsQuestoes"
import { useQuestoes } from "../contexts/QuestoesProvider"


const DisplayFilterQuestions = () => {

    const {questoesFilter} = useQuestoes()
    
    const questaoFilterReverse = [...questoesFilter].reverse()

    return (
        <>

            {questoesFilter?.length > 0 &&
                questaoFilterReverse?.map((questao) => (
                    <CardsQuestoes key={questao._id} card={questao} />
                ))
            }

            {questoesFilter?.length === 0 && (
                <div className="flex justify-center">
                    <p>Nenhuma questão encontrada</p>
                </div>
            )}

        </>
    )
}

export default DisplayFilterQuestions