import { useEffect, useState } from "react"
import { MdNavigateNext } from "react-icons/md";
import { BiBookBookmark, BiLoaderCircle } from "react-icons/bi";
import axios from "axios";
import { useApp } from "../contexts/AppProvider";
import LoadCircle from "../components/LoadCircle";


const SimuladoQuestoesProva = ({questoes}) => {
    const [indexQuestao,setIndexQuestao] = useState(0)
    const [questaoAtual,setQuestaoAtual] = useState({})
    const [gabaritoDisplay,setGabaritoDisplay] = useState(false)
    const [load,setLoad] = useState(false)
    
    const {API_URL} = useApp()
    
    const [gabarito,setGabarito] = useState(()=>{ 
        const gabaritoInicial = questoes.map(e => {
            return {id:e._id,check:null}
        })
        return gabaritoInicial
    })

    const [dadosDesempenho,setDadosDesempenho] = useState([])

    const optionCorrect = gabarito.find(e => e.id === questaoAtual._id)?.check

    useEffect(()=>{
        setQuestaoAtual(questoes[indexQuestao])
    },[indexQuestao])

    const EnviarGabarito = async () => {
        setLoad(true)
        try {

            const res = await axios.post(`${API_URL}/gabaritoInfos`, gabarito )

            setDadosDesempenho(res.data)
            
            setLoad(false)
            setGabaritoDisplay(true)
            
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
        setLoad(false)
    }
    


    return(
        <>

            {!gabaritoDisplay && <div className="flex flex-col bg-[var(--black01)] max-w-[800px] min-h-[600px] h-min  p-[14px_20px] gap-[20px] w-full rounded-[12px] text-[var(--whiteCream)]">
                <main className="flex-1 flex flex-col gap-[20px]">

                    <aside className=" flex justify-between items-center w-full">
                        <h1 className="text-[16px]"> <span className="text-[20px]">{indexQuestao + 1}º</span> {questaoAtual.subject}</h1>
                        <h2 className="text-[14px] text-[var(--verdeClaro)]">{questaoAtual.examType}</h2>
                    </aside>

                    <div className=" flex flex-col w-full wrap-break-word gap-[10px]">
                        <h1 className="text-[20px] font-bold hyphens-auto" >{questaoAtual.title}</h1>
                        <p className="whitespace-pre-wrap text-[17px] hyphens-auto">
                            {questaoAtual.question}
                        </p>
                    </div>

                    <form onSubmit={null} id="optionsForm" key={questaoAtual._id} className=" flex flex-col gap-[10px]">
                        {
                            questaoAtual?.options?.map((option,index)=>(
                                <label key={index}>
                                    <input onChange={()=>setGabarito(prev => {
                                        const filter = prev.filter(e=>{ return e.id !== questaoAtual._id })

                                        return [...filter,{id:questaoAtual._id,check:option.id}]

                                    })} className="peer hidden" checked={optionCorrect === option.id} type="radio" name={questaoAtual._id} id={option.id} />
                                    <p className="peer-checked:bg-[var(--verdeClaro)] peer-checked:text-[var(--textBlack)] duration-200 text-[18px] gap-[10px] flex items-center backdrop-brightness-70 p-[10px] hyphens-auto rounded-[6px] cursor-pointer">
                                        {index == 0 && <span className="font-bold">A)</span>}
                                        {index == 1 && <span className="font-bold">B)</span>}
                                        {index == 2 && <span className="font-bold">C)</span>}
                                        {index == 3 && <span className="font-bold">D)</span>}
                                        {index == 4 && <span className="font-bold">E)</span>}

                                        {option.text}
                                    </p>
                                </label>
                            ))  
                        }
                    </form>

                </main>
                <div className="flex items-center h-[45px] relative justify-center gap-[10px] w-full ">

                    <button onClick={()=>{
                        setIndexQuestao(prev => prev === 0 ? questoes.length - 1 : prev - 1)
                    }} className="border-2 rounded-full p-[5px] absolute left-0 text-[30px] cursor-pointer rotate-[180deg]"><MdNavigateNext/></button>

                    <div className=" flex gap-[5px] justify-center items-center">
                        {questoes?.map((e,index)=>(
                            <div key={index} className={`${e?._id === questaoAtual?._id ? "bg-[var(--whiteCream)]" : "bg-transparent"} duration-150 border-2 w-[10px] aspect-square rounded-full`}></div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center absolute right-0 gap-[20px]">
                        <div className="relative">
                            <div onClick={()=>EnviarGabarito()} className="peer relative z-30 p-[10px_15px] cursor-pointer hover:bg-[var(--azulCeu)] duration-300 bg-[var(--azulEscuro)] rounded-full"> {load ? <LoadCircle/> : "Enviar Gabarito"} </div>
                            <span className="absolute z-[-10] peer-hover:z-10 peer-hover:opacity-100 duration-200 peer-hover:bottom-[calc(100%+5px)] bottom-[calc(40%+5px)] opacity-0 bg-[var(--bege)] rounded-[8px] text-[14px] text-[var(--textBlack)] p-[6px_10px] w-[200px]">Envie o gabarito após fazer todas as questões, Todas serão avaliadas</span>
                        </div>

                        <button onClick={()=>{
                            setIndexQuestao(prev => questoes.length - 1 == prev ? 0 : prev + 1)
                        }} className="border-2 relative rounded-full p-[5px] text-[30px] cursor-pointer"><MdNavigateNext/></button>
                    </div>

                </div>
            </div>}


            {gabaritoDisplay && <div className="flex flex-col max-w-[800px] min-h-[600px] h-min  gap-[20px] w-full rounded-[12px] text-[var(--whiteCream)]">
                
                <header className="flex justify-between">
                    <h1 className="text-[22px]">Desempenho</h1>
                    <h1 className="text-[25px] text-[var(--verdeClaro)]"><BiBookBookmark/></h1>
                </header>
                
                <main className="w-full">
                    <h1 className="text-[18px] flex items-center gap-[10px]">
                        <span>Porcentagem de Acertos:</span>
                        <span className="text-[20px] text-[var(--verdeClaro)]">  {dadosDesempenho.correctCount}/{dadosDesempenho.correctCount + dadosDesempenho.incorrectCount} | {Number.parseInt((dadosDesempenho.correctCount * 100) / (dadosDesempenho.correctCount + dadosDesempenho.incorrectCount))}%</span>
                    </h1>
                </main>

                <main className="w-full gap-[20px] flex flex-col">

                    {dadosDesempenho.desempenho?.map((e,index)=>{
                        const question = questoes.find(q => q._id === e.id)
                        const correctResposta = question?.options?.find(option => option?.id === e?.optionCorrect)
                        const checkResposta = question?.options?.find(option => option?.id === e?.optionCheck)
                        
                        return (
                            <div key={index} className={`w-full ${correctResposta === checkResposta ? "border-[var(--verdeClaro)] border-2" : ""} bg-[var(--black01)] flex flex-col gap-[20px] p-[10px] rounded-[8px]`}>
                                <div className="w-full flex justify-between">

                                    <p className="text-[14px] gap-[10px] flex">
                                        <span>{question.subject}</span>
                                        <span className="text-[var(--verdeClaro)]">{question.examType}</span>
                                    </p>
                                </div>

                                <h1 className="whitespace-pre-wrap text-[16px] hyphens-auto line-clamp-10">{question?.question}</h1>
                                
                                <div className="flex flex-col backdrop-brightness-70 p-[10px] rounded-[8px] gap-[5px]">
                                    <p className="text-[18px] text-[var(--verdeClaro)] whitespace-pre-wrap hyphens-auto">Resposta correta: {correctResposta?.text}</p>
                                    <p className={`text-[18px] whitespace-pre-wrap hyphens-auto ${correctResposta === checkResposta ? "text-[var(--verdeClaro)]" : "text-[#f62828]"}`}>Sua resposta: {checkResposta?.text || "Não respondido"}</p>
                                </div>

                            </div>
                        )
                    })}
                </main>


            </div>}

        </>
    )
}

export default SimuladoQuestoesProva