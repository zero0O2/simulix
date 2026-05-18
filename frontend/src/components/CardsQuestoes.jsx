import { use, useEffect, useRef, useState } from "react"
import { FaCheckCircle } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import LoadCircle from "./LoadCircle";
import { FaRegTrashAlt } from "react-icons/fa";
import { useQuestoes } from "../contexts/QuestoesProvider";

const CardsQuestoes = ({ card }) => {
    const [isCorrect, setIsCorrect] = useState(null)

    const timeOutRef = useRef(null)
    const {DeletarQuestoesForUserId,setQuestoesForUser} = useQuestoes()


    const VerifyQuest = (option) => {
        clearTimeout(timeOutRef.current)

        if(option.correct){
            return setIsCorrect(true)
        }

        setIsCorrect(false)

        timeOutRef.current = setTimeout(() => {
            setIsCorrect(null)
        }, 1500)
    }

    return (
        <>  

            <div className={`w-full max-w-[1000px] flex flex-col relative border-[var(--azulEscuro)] p-[10px_20px_50px_20px] gap-[10px] border-2 rounded-[10px] ${isCorrect === true ? 'border-[var(--verdeClaro)]' : isCorrect === false ? 'border-red-600' : ''}`}>

                {card === null &&
                    <div className="flex justify-center items-center w-[40px] h-[40px]">
                        <LoadCircle></LoadCircle>
                    </div>

                }

                <aside className="w-full flex  justify-between gap-[20px]">
                    <h1 className="text-[18px] max-[800px]:text-[17px] min-h-[50px] font-bold flex items-center indent-[20px] max-w-[600px] whitespace-pre-wrap break-normal hyphens-auto">{card?.title || "Questão"}</h1>

                    {card?.tags && (
                        <div className="flex max-w-[290px] max-[700px]:hidden overflow-x-auto h-[50px] justify-start items-center gap-[10px]">
                            {
                                card?.tags?.map((tag, index) => (
                                    <span key={index} className="bg-[var(--azulEscuro)] text-nowrap text-[var(--branco)] h-[30px] flex justify-center items-center px-[10px] rounded-full text-[12px]">
                                        {tag}
                                    </span>
                            ))
                        }
                    </div>)}

                    <span className="flex justify-center h-[50px] items-center gap-[10px]">
                        <p className="text-[14px] max-[800px]:text-[13px]">{card?.subject}</p>
                        <p className="text-[var(--verdeClaro)]">{card?.examType}</p>
                    </span>
                </aside>

                <div className="flex-1 min-h-0 flex gap-[20px] flex-col ">
                    <p className="text-[19px] indent-[20px] max-w-[600px] whitespace-pre-wrap break-normal hyphens-auto max-[800px]:text-[17px]">{card?.question}</p>

                    <div className="flex flex-1 min-h-0 ">
                        <ul className="flex flex-1 flex-col gap-[8px] text-[18px]  text-[var(--verdeClaro)]">
                            {card?.options?.map((option, index) => (
                                <li onClick={() => VerifyQuest(option)} className="cursor-pointer flex items-center transition-all text-[18px] duration-300 gap-[8px] py-[2px]" key={index}>
                                    {index == 0 && <p className="font-bold">A)</p>}
                                    {index == 1 && <p className="font-bold">B)</p>}
                                    {index == 2 && <p className="font-bold">C)</p>}
                                    {index == 3 && <p className="font-bold">D)</p>}
                                    {index == 4 && <p className="font-bold">E)</p>}

                                    <p className={`${isCorrect === true && option.correct ? ' text-[var(--verdeClaro)]' : ' text-[var(--textWhite)]'} text-[18px] max-[800px]:text-[16px]`}>{option.text}</p>
                                    {isCorrect === true && option.correct && <FaCheckCircle className="text-[var(--verdeClaro)]"/>}
                                </li>
                            ))}
                        </ul>

                        <div className="flex-1 flex overflow-x-auto justify-start items-start max-[700px]:hidden pb-[20px]">
                            {isCorrect === false && <p className="text-red-600 w-full text-end text-[18px]">Resposta incorreta</p>}
                            {isCorrect === true && card?.explanation && <p className="text-[var(--verdeClaro)] w-full text-end text-[18px]">{card?.explanation} </p>} 
                        </div>

                    </div>
                </div>

                <div className="flex items-center absolute right-2 cursor-pointer bottom-2 justify-center gap-[18px] py-[2px]">

                    <button onClick={() => {
                        setIsCorrect(null)
                        clearTimeout(timeOutRef.current)
                    }} className="flex items-center cursor-pointer bottom-2 hover:scale-[1.03] justify-center gap-[8px] py-[2px]">
                        <IoReload />
                        <span>Reiniciar</span>
                    </button>

                    <button onClick={async () => {
                        setIsCorrect(null)
                        clearTimeout(timeOutRef.current)

                        setQuestoesForUser((prev)=> prev?.filter((e) => e._id != card._id ))

                        await DeletarQuestoesForUserId(card._id)

                    }} className="flex items-center cursor-pointer bottom-2 justify-center hover:scale-[1.03] hover:text-red-600 duration-300 items-center gap-[8px] py-[2px]">
                        <FaRegTrashAlt />
                        <span>Excluir</span>
                    </button>

                </div>

            </div>
        </>
    )
}

export default CardsQuestoes
