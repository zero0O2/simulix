import { MdFullscreen, MdFullscreenExit } from "react-icons/md"
import { useNav } from "../contexts/NavigationProvider"
import AsideCardsCategoria from "./AsideCardsCategoria"
import AsideOptionsForMobile from "./AsideOptionsForMobile"
import { useQuestoes } from "../contexts/QuestoesProvider"
import { useEffect, useState } from "react"
import DadosQuestoesFilter from "./DadosQuestoesFilter"
import SimuladoQuestoesProva from "../utils/SimuladoQuestoesProva"

const DisplaySimuladoQuestions = () => {

    const {setQuestoesFoco,questoesFoco,setNavigateOptionsForQuest} = useNav()
    const {questoesFilter} = useQuestoes()
    const [questionarioDisplay,setQuestionarioDisplay] = useState(false)

    const [questoesForQuestionario,setQuestoesForQuestionario] = useState([])

    const IniciarQuestionario = () => {

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
            <div className=" flex-1 min-h-0 w-full flex gap-[10px] pb-[20px] flex-col">
                <aside className="w-full relative h-[40px] justify-between items-center gap-[20px] flex">

                    <AsideOptionsForMobile/>
                    
                    <button onClick={()=> setQuestoesFoco(prev=>!prev)} className="border-1 border-[var(--azulCeu)] w-[40px] h-[40px] flex justify-center items-center cursor-pointer text-[30px] text-[var(--azulCeu)]">{questoesFoco ? <MdFullscreenExit/> : <MdFullscreen/>}</button>
                </aside>

                <div className="w-full flex-1 flex overflow-y-auto justify-center min-h-0">
                    
                    {!questionarioDisplay && <main className="max-w-[900px] w-full p-[30px_20px] flex flex-col justify-between gap-[20px] h-[500px] bg-[var(--black01)] rounded-[10px]">
                        <h1 className="text-[20px]">Dados do simulado</h1>

                        <DadosQuestoesFilter/>

                        <div className="flex justify-center gap-[10px]">
                            <button onClick={()=>setNavigateOptionsForQuest("/home")} className="min-w-[120px] cursor-pointer hover:bg-[var(--verdeClaro)] hover:border-[var(--verdeClaro)] hover:text-[var(--textBlack)] duration-300 h-[40px] border-2 border-[var(--verdeEscuro)] rounded-full">Voltar</button>
                            <button onClick={()=>
                                IniciarQuestionario()
                            } className="min-w-[120px] cursor-pointer hover:bg-[var(--verdeClaro)] hover:text-[var(--textBlack)] duration-300 h-[40px] bg-[var(--verdeEscuro)] rounded-full">Iniciar</button>
                        </div>
                    </main>}
                    
                    
                    {questionarioDisplay &&
                        <SimuladoQuestoesProva questoes={questoesForQuestionario}/>
                    }

                    
                </div>
            </div>
        </>
    )
}

export default DisplaySimuladoQuestions