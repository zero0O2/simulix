import CardsQuestoes from "../components/CardsQuestoes"
import DisplayFilterQuestions from "../components/DisplayFilterQuestions"
import { useQuestoes } from "../contexts/QuestoesProvider"

const QuestionPage= () => {
    const {questoesForUser} = useQuestoes()

    return (
        <>
            <div className="flex min-h-0 flex-1 justify-between gap-[10px] ">
                <div className="flex p-[10px] min-h-0 flex-1 flex-col gap-[6px] rounded-[8px]">
                    <aside className="flex">
                        <h1 className="text-[17x]">All Questions -</h1>
                    </aside>

                    <div className="flex min-h-0 flex-col flex-1 overflow-y-auto">
                        <div className="columns-2  space-y-2">
                            {questoesForUser?.map((e,index)=> (
                                <CardsQuestoes card={e} key={index}/>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-amber-400 flex-1 max-w-[400px]">

                </div>
            </div>
        </>
    )
}

export default QuestionPage