import { useState } from "react"
import typeQuestion from "../assets/json/typesQuestions.json"
import subjectQuestion from "../assets/json/subjectQuestion.json"
import { IoIosArrowDown } from "react-icons/io";
import { useQuestoes } from "../contexts/QuestoesProvider";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const HomeOptiosCreateQuest = () => {

    const [displayMateria, setDisplayMateria] = useState(false)
    const {FormatOptionsForQuestoes, CriarQuestoesForUserId} = useQuestoes()
    const [adicionarTag, setAdicionarTag] = useState("")
    const [adicionarTagDisplay, setAdicionarTagDisplay] = useState(false)

    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [examType, setExamType] = useState('')
    const [subject, setSubject] = useState('')
    const [tags, setTags] = useState([])
    const [explanation, setExplanation] = useState('')

    const [options1, setOptions1] = useState("")
    const [options2, setOptions2] = useState("")
    const [options3, setOptions3] = useState("")
    const [options4, setOptions4] = useState("")
    const [options5, setOptions5] = useState("")
    
    const [correct, setCorrect] = useState(null)



    const Submit = async (event) => {
        event.preventDefault()
        try {
            
            const formatOptions = await FormatOptionsForQuestoes([options1, options2, options3, options4, options5],correct)
    

            if(formatOptions?.status >= 400 && formatOptions.status < 500){
                return alert(formatOptions?.data?.message)
            }
            
            const dados = {
                title,
                question,
                examType,
                subject,
                tags,
                explanation,
                options: formatOptions
            }
            
            const res = await CriarQuestoesForUserId(dados)
            
            if(res?.status >= 400 && res.status < 500){
                return alert(res?.data?.message)
            }

            setTitle('')
            setQuestion('')
            setExamType('')
            setSubject('')
            setExplanation('')
            setAdicionarTag([])
            setTags([])
            setAdicionarTagDisplay(false)

            setOptions1('')
            setOptions2('')
            setOptions3('')
            setOptions4('')
            setOptions5('')
            setCorrect(null)
        } catch (error) {
            console.error("Erro ao criar questão:", error.response)
        }
        
    }

    return (
        <>
            <div onClick={()=>setDisplayMateria(false)} className="w-full h-full min-y-0 overflow-y-scroll flex flex-col">
                <form onSubmit={Submit} className="flex flex-col gap-[30px] p-[20px] min-y-0 ">
                    <h1 className="text-[25px]">Criar Questão</h1>

                    <label className="flex relative flex-col ">
                        <input onChange={(e) => {
                            setTitle(e.target.value)
                        }} value={title} className=" peer w-full h-[40px] outline-none backdrop-brightness-60 border-[2px] border-[var(--verdeClaro)] rounded-[6px] px-[10px] flex justify-center items-center" type="text"/>
                        <span className={`font-bold text-[var(--bege)] text-[18px] transition-all duration-300 absolute peer-focus:-top-3 -translate-y-1/2 ${title ? 'left-0 -top-3' : 'left-[13px] top-1/2'}`} >Título da questão</span>
                    </label>

                    <ul className="flex flex-col gap-[10px]">
                        <span className={`text-[var(--bege)] text-[18px] transition-all font-bold duration-300 `} >Tipo da questão (obrigatória)</span>
                        <div className="flex flex-wrap justify-between
                         gap-[10px]">

                            {typeQuestion && typeQuestion?.types?.map((type) => {
                                return (
                                    <label className="flex" key={type}>
                                        <input onChange={() => {
                                            setExamType(type)
                                        }} className="peer hidden" type="radio" checked={examType === type} name="type" id={type} />
                                        <div className={`peer-checked:bg-[var(--verdeClaro)] cursor-pointer border-2 border-[var(--verdeClaro)] rounded-full peer-checked:text-[var(--azulEscuro)] text-[17px] p-[5px_10px]`}>
                                            <p>{type}</p>
                                        </div>
                                    </label>
                                )
                            })}

                        </div>
                    </ul>

                    <ul onClick={(event)=>{
                        event.stopPropagation()
                    }} className="flex z-1 flex-col relative gap-[10px]">
                        <span onClick={()=>{
                            setDisplayMateria(prev=>!prev)}

                            } className={`text-[var(--bege)] font-bold border-2 border-[var(--verdeClaro)] p-[6px] rounded-[6px] items-center cursor-pointer text-[18px] flex justify-between transition-all duration-300 `}>
                            <h1>{subject ? subject: "Matéria (obrigatória)"}</h1>
                            <IoIosArrowDown className={`${displayMateria ? 'rotate-180' : ''} transition-all duration-300 text-[25px]`}/>
                        </span>
                    
                        <div className={`flex flex-wrap w-full justify-between z-[-10] rounded-[6px] border-0 backdrop-blur-3xl backdrop-brightness-60 p-[20px]  absolute transition-all duration-400
                         gap-[10px] ${!displayMateria ? 'hidden top-[-100%]' : ' top-[100%]'}`}>

                            {subjectQuestion && subjectQuestion?.subject?.map((item) => {
                                return (
                                    <label className="flex" key={item}>
                                        <input onChange={() => {
                                            setSubject(item)
                                        }} className="peer hidden" type="radio" checked={subject === item} name="subject" id={item} />
                                        <div className="peer-checked:bg-[var(--verdeClaro)] cursor-pointer border-2 border-[var(--verdeClaro)] rounded-full peer-checked:text-[var(--azulEscuro)] text-[17px] p-[5px_10px]">
                                            <p>{item}</p>
                                        </div>
                                    </label>
                                )
                            })}

                        </div>
                    </ul>

                    <label className="flex relative mt-[20px] flex-col ">
                        <textarea onChange={(e) => {
                            setQuestion(e.target.value)
                        }} value={question} className=" peer w-full resize-none h-[80px] backdrop-brightness-60 outline-none border-[2px] border-[var(--verdeClaro)] rounded-[6px] px-[10px] flex justify-center items-center" type="text"/>
                        <span className={`text-[var(--bege)] font-bold text-[18px] transition-all duration-300 absolute peer-focus:-top-3 -translate-y-1/2 ${question ? 'left-0 -top-3' : 'left-[13px] top-1/2'}`} >Enunciado da questão (obrigatório)</span>
                    </label>
                    
                    <div className="flex flex-col gap-[10px]">
                        <h1 className="text-[18px]">Alternativas</h1>
                        <div className="flex relative w-full">
                            <input onChange={(e)=>{
                                setOptions1(e.target.value)
                            }} value={options1} className="p-[5px_10px] w-full text-[17px] backdrop-brightness-60 outline-none border-2 border-[var(--verdeClaro)] rounded-full" type="text"  />
                            <h1 className={`text-[var(--bege)] text-[18px] transition-all duration-300 ${options1 ? 'left-[-13px] text-[var(--bege)] ' : 'left-[13px] text-[var(--cinza)]'} top-1/2 absolute -translate-y-1/2`} >1</h1>
                        </div>

                        <div className="flex relative w-full">
                            <input onChange={(e)=>{
                                setOptions2(e.target.value)
                            }} value={options2} className="p-[5px_10px] w-full text-[17px] backdrop-brightness-60 outline-none border-2 border-[var(--verdeClaro)] rounded-full" type="text"  />
                            <h1 className={`text-[var(--bege)] text-[18px] transition-all duration-300 ${options2 ? 'left-[-13px] text-[var(--bege)] ' : 'left-[13px] text-[var(--cinza)]'} top-1/2 absolute -translate-y-1/2`} >2</h1>
                        </div>

                        {(options2 && options1) && (
                            <div className="flex relative w-full">
                                <input onChange={(e)=>{
                                    setOptions3(e.target.value)
                                }} value={options3} className="p-[5px_10px] w-full text-[17px] backdrop-brightness-60 outline-none border-2 border-[var(--verdeClaro)] rounded-full" type="text"  />
                                <h1 className={`text-[var(--bege)] text-[18px] transition-all duration-300 ${options3 ? 'left-[-13px] text-[var(--bege)] ' : 'left-[13px] text-[var(--cinza)]'} top-1/2 absolute -translate-y-1/2`} >3</h1>
                            </div>
                        )}
                        {options3 && (
                            <div className="flex relative w-full">
                                <input onChange={(e)=>{
                                    setOptions4(e.target.value)
                                }} value={options4} className="p-[5px_10px] w-full text-[17px] backdrop-brightness-60 outline-none border-2 border-[var(--verdeClaro)] rounded-full" type="text"  />
                                <h1 className={`text-[var(--bege)] text-[18px] transition-all duration-300 ${options4 ? 'left-[-13px] text-[var(--bege)] ' : 'left-[13px] text-[var(--cinza)]'} top-1/2 absolute -translate-y-1/2`} >4</h1>
                            </div>
                        )}
                        {options4 && (
                            <div className="flex relative w-full">
                                <input onChange={(e)=>{
                                    setOptions5(e.target.value)
                                }} value={options5} className="p-[5px_10px] w-full text-[17px] backdrop-brightness-60 outline-none border-2 border-[var(--verdeClaro)] rounded-full" type="text"  />
                                <h1 className={`text-[var(--bege)] text-[18px] transition-all duration-300 ${options5 ? 'left-[-13px] text-[var(--bege)] ' : 'left-[13px] text-[var(--cinza)]'} top-1/2 absolute -translate-y-1/2`} >5</h1>
                            </div>
                        )}


                        <div className=" flex flex-col gap-[10px] p-[5px] ">
                            <h1 className="text-[18px]">Opção correta</h1>
                            <div className="flex gap-[10px]">

                                <label>
                                    <input onChange={()=>setCorrect(1)} checked={correct === 1} className="peer hidden" type="radio" name="correct" id="option1" />
                                    <div className={`${correct === 1 ? 'bg-[var(--verdeClaro)] text-[var(--marromEscuro)]' : ''} w-[30px] h-[30px] flex justify-center items-center h-[20px] border-2 border-[var(--verdeClaro)] peer-checked:text-[var(--marromEscuro)] rounded-full peer-checked:bg-[var(--verdeClaro)]`}>1</div>
                                </label>

                                <label>
                                    <input onChange={()=>setCorrect(2)} checked={correct === 2} className="peer hidden" type="radio" name="correct" id="option1" />
                                    <div className={`${correct === 2 ? 'bg-[var(--verdeClaro)] text-[var(--marromEscuro)]' : ''} w-[30px] h-[30px] flex justify-center items-center h-[20px] border-2 border-[var(--verdeClaro)] peer-checked:text-[var(--marromEscuro)] rounded-full peer-checked:bg-[var(--verdeClaro)]`}>2</div>
                                </label>
                                {(options2 && options1 && options3) && (
                                    <label>
                                        <input onChange={()=>setCorrect(3)} checked={correct === 3} className="peer hidden" type="radio" name="correct" id="option2" />
                                        <div className={`${correct === 3 ? 'bg-[var(--verdeClaro)] text-[var(--marromEscuro)]' : ''} w-[30px] h-[30px] flex justify-center items-center h-[20px] border-2 border-[var(--verdeClaro)] peer-checked:text-[var(--marromEscuro)] rounded-full peer-checked:bg-[var(--verdeClaro)]`}>3</div>
                                    </label>
                                )}
                                {(options3 && options4) && (
                                    <label>
                                        <input onChange={()=>setCorrect(4)} checked={correct === 4} className="peer hidden" type="radio" name="correct" id="option3" />
                                        <div className={`${correct === 4 ? 'bg-[var(--verdeClaro)] text-[var(--marromEscuro)]' : ''} w-[30px] h-[30px] flex justify-center items-center h-[20px] border-2 border-[var(--verdeClaro)] peer-checked:text-[var(--marromEscuro)] rounded-full peer-checked:bg-[var(--verdeClaro)]`}>4</div>
                                    </label>
                                )}
                                {(options4 && options5) && (
                                    <label>
                                        <input onChange={()=>setCorrect(5)} checked={correct === 5} className="peer hidden" type="radio" name="correct" id="option4" />
                                        <div className={`${correct === 5 ? 'bg-[var(--verdeClaro)] text-[var(--marromEscuro)]' : ''} w-[30px] h-[30px] flex justify-center items-center h-[20px] border-2 border-[var(--verdeClaro)] peer-checked:text-[var(--marromEscuro)] rounded-full peer-checked:bg-[var(--verdeClaro)]`}>5</div>
                                    </label>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col gap-[15px]">
                        <h1 className="text-[18px]">Adicionar Tags</h1>
                        <div className="flex gap-[10px] flex-wrap">
                            {tags.map((tag, index) => (
                                <div key={index} className="bg-[var(--azulEscuro)] text-[var(--branco)] h-[40px] hover:bg-[var(--azulCeu)] h-[30px] flex justify-center items-center px-[10px] rounded-full text-[16px] gap-[5px]">
                                    {tag}
                                    <div onClick={()=>{
                                        setTags(prev=>prev.filter(e=>e !== tag))
                                    }} className="text-[18px] duration-300 h-[25px] w-[25px] rounded-full flex justify-center items-center cursor-pointer font-bold"><FaRegTrashAlt/></div>
                                </div>
                            ))}

                            <div onClick={()=> setAdicionarTagDisplay(true) } className="bg-[var(--azulEscuro)]  h-[40px] transition-all duration-300 cursor-pointer text-[var(--branco)] h-[30px] flex justify-center items-center p-[5px_10px] rounded-full text-[15px] gap-[5px]">
                                {adicionarTagDisplay ?

                                    <div className="flex items-center justify-center gap-[10px]">
                                        <input onChange={(e)=>{
                                            setAdicionarTagDisplay(true)
                                            setAdicionarTag(e.target.value)
                                            }} value={adicionarTag} type="text" className="outline-none w-[100px]" />

                                        <div onClick={(e)=>{
                                            e.stopPropagation()
                                            if(adicionarTag.trim().length > 0){
                                                setTags( (prev)=>[...prev, adicionarTag])
                                            }
                                            setAdicionarTag("")
                                            setAdicionarTagDisplay(false)

                                        }} className="text-[18px] hover:bg-[var(--verdeClaro)] duration-300 bg-[var(--azulCeu)] h-[25px] w-[25px] rounded-full flex justify-center items-center cursor-pointer font-bold"><FaCheck/></div>
                                    </div>

                                : 
                                        <p className="flex justify-center items-center">Adicionar<IoMdAdd  className="text-[20px]"/></p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <input onChange={(e)=>setExplanation(e.target.value)} value={explanation} type="text" className="w-full outline-none border-2 border-[var(--verdeClaro)] backdrop-brightness-60 p-[5px_10px] rounded-[8px]" placeholder="Explicaçao (opcional)"/>
                    </div>
                    
                    <button type="submit" className="bg-[var(--verdeClaro)] text-[var(--azulEscuro)] font-bold py-[10px] px-[20px] rounded-full hover:bg-[var(--bege)] cursor-pointer transition-all duration-300">
                        Criar Questão
                    </button>

                </form>
            </div>
        </>
    )
}

export default HomeOptiosCreateQuest