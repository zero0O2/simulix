import { useQuestoes } from "../contexts/QuestoesProvider"
import SimuladoQuestoesProva from "../utils/SimuladoQuestoesProva"
import { GoChevronUp } from "react-icons/go"
import CardsHistoricoSimulado from "../components/newComponents/CardsHistoricoSimulado"
import CardsCategorias from "../components/CardsCategorias"
import CardsCategoriasMaterias from "../components/CardsCategoriasMaterias"
import typesQuestions from "../assets/json/typesQuestions.json"
import subjectQuestion from "../assets/json/subjectQuestion.json"
import { useState } from "react"

const SimuladoPage= () => {
    const {newHistoricoSimulado,setNewHistoricoSimulado,questoesFilter} = useQuestoes()
    const [questionarioDisplay,setQuestionarioDisplay] = useState(false)
    const [questoesForQuestionario,setQuestoesForQuestionario] = useState([])

    const IniciarQuestionario = () => {
        if(!questoesFilter.length > 0) return window.alert("Nenhuma questão disponivel")

        let questoesEmbaralhadas = [...questoesFilter]

        for(let i = 0 ; i <= questoesEmbaralhadas.length - 1 ; i++){
            let numberAleatorio = Math.floor(Math.random()*questoesEmbaralhadas.length)

            let e = questoesEmbaralhadas[i]
            questoesEmbaralhadas[i] = questoesEmbaralhadas[numberAleatorio]
            questoesEmbaralhadas[numberAleatorio] = e
            
        }

        questoesEmbaralhadas = questoesEmbaralhadas?.map(e => {
            let options = [...e.options]
            
            for(let i = 0 ; i <= options.length - 1 ; i++){
                let r = Math.floor(Math.random()*options.length)

                let e = options[i]
                options[i] = options[r]
                options[r] = e
            }
            
            return {...e,options}
        })

        setQuestoesForQuestionario(questoesEmbaralhadas)
        setQuestionarioDisplay(true)

    }

    return (
        <>
            <div className="flex relative min-h-0 flex-1 text-[var(--10)]">
                <div className=" flex flex-col flex-1 gap-[10px] min-h-0 p-[6px]">
                    <div className="flex-1 flex flex-col min-h-0">
                        <aside className="p-[5px_10px] flex justify-between">
                            <h1>Historico de Simulados - (em desenvolvimento) </h1>
                            <nav>
                                <button onClick={() => setNewHistoricoSimulado(prev => !prev)} className={`${newHistoricoSimulado ? "" : "rotate-180"} duration-[.1s] text-[30px] border-0 outline-0 bg-[var(--cor04)] rounded-[5px] text-[var(--cor01)] h-[30px] w-[30px] cursor-pointer`}><GoChevronUp/></button>
                            </nav>
                        </aside>
                        <main className="flex flex-col flex-1 min-h-0 p-[5px] gap-[10px] overflow-y-auto">
                            <CardsHistoricoSimulado/>
                            <CardsHistoricoSimulado/>
                            <CardsHistoricoSimulado/>
                            <CardsHistoricoSimulado/>
                            <CardsHistoricoSimulado/>
                            <CardsHistoricoSimulado/>
                            <CardsHistoricoSimulado/>
                            <CardsHistoricoSimulado/>
                            <CardsHistoricoSimulado/>
                            <CardsHistoricoSimulado/>
                        </main>
                    </div>
                    <div className="bg-[var(--06)] rounded-[8px] flex-1 min-h-0">

                    </div>
                </div>
                <div className="bg-[var(--01)]  m-[6px] rounded-[4px] flex flex-col flex-1 min-h-0 min-w-0 p-[8px]">
                    <div className="">
                        <h1 className="text-center text-[17px] text-[var(--09)]">Monte seu Simulado</h1>
                        <div className="flex flex-col p-[10px]">
                            <h1 className="text-[var(--09)]">Tipo -</h1>
                            <div className="flex min-w-0 gap-[8px]   flex-wrap">
                                {typesQuestions?.types?.map(types => (
                                    <CardsCategorias key={types} option={types}/>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col p-[10px]">
                            <h1 className="text-[var(--09)]">Materia -</h1>
                            <div className="flex min-w-0 gap-[8px]   flex-wrap">
                                {subjectQuestion?.subject?.map(types => (
                                    <CardsCategoriasMaterias key={types} option={types}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 min-h-0">
                        <header className=" flex justify-between p-[10px] items-center  h-[30px] w-full">
                            <p className="text-[var(--09)]">{questoesFilter.length} questoes disponiveis</p>
                                
                        </header>
                        <main className="flex flex-col flex flex-1 gap-[10px] min-h-0 overflow-y-auto">
                            {questoesFilter.map((e,index) => (
                                <div key={index} className="border-[var(--cor02)] hover:bg-[var(--cor01)] cursor-pointer border-2 flex px-[10px] gap-[10px] justify-between min-h-[40px] rounded-[6px]">
                                    <div className="h-full flex-1 flex gap-[5px] items-center">
                                        <p className="max-w-[350px] text-[var(--09)] line-clamp-1">{e?.title ? e.title : e.question}</p>
                                        <p className="w-full line-clamp-1 text-[var(--07)]">{e?.title ? e.question : ""}</p>
                                    </div>
                                    <div className="h-full flex justify-center items-center gap-[10px]">
                                        <p className="text-[var(--cor03)]">{e.examType}</p>
                                        <p className="text-[var(--cor05)]">{e.subject}</p>
                                    </div>
                                </div>
                            ))}

                        </main>
                        <footer className=" flex justify-center items-center mt-[10px] h-[60px]">
                            <button onClick={()=>IniciarQuestionario()} className="bg-[var(--cor05)] cursor-pointer hover:bg-[var(--cor04)] duration-200 p-[10px_30px] rounded-[5px] text-[var(--cor01)]">Iniciar Simulado</button>
                        </footer>
                    </div>
                </div>
                {questionarioDisplay &&
                    <SimuladoQuestoesProva setQuestionarioDisplay={setQuestionarioDisplay} questoes={questoesForQuestionario}/>
                }
            </div>
            
        </>
    )
}

export default SimuladoPage