import CardsQuestoes from "../components/CardsQuestoes"
import { useQuestoes } from "../contexts/QuestoesProvider"


const DisplayFilterQuestions = () => {

    const {questoesFilter} = useQuestoes()
            
    return (
        <>

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

        </>
    )
}

export default DisplayFilterQuestions