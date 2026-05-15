import { use, useEffect, useRef, useState } from "react"
import { FaCheckCircle } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import LoadCircle from "./LoadCircle";


const CardsQuestoes = ({ card }) => {
    const [isCorrect, setIsCorrect] = useState(null)

    const timeOutRef = useRef(null)


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

            <div className={`w-full max-w-full flex flex-col relative border-[var(--azulEscuro)] p-[10px_20px] gap-[10px] border-2 rounded-[10px] ${isCorrect === true ? 'border-[var(--verdeClaro)]' : isCorrect === false ? 'border-red-600' : ''}`}>

                {card === null &&
                    <div className="flex justify-center items-center w-[40px] h-[40px]">
                        <LoadCircle></LoadCircle>
                    </div>

                }

                <aside className="w-full flex  justify-between gap-[20px]">
                    <h1 className="text-[18px] min-h-[50px] flex items-center">{card?.title || "Questão"}</h1>

                    <div className="flex min-w-[250px] overflow-x-auto h-[50px] justify-start items-center max-w-[300px] gap-[10px]">
                        {
                            card?.tags.map((tag, index) => (
                                <span key={index} className="bg-[var(--azulEscuro)] text-[var(--branco)] h-[30px] flex justify-center items-center px-[10px] rounded-full text-[12px]">
                                    {tag}
                                </span>
                            ))
                        }
                    </div>

                    <span className="flex justify-center h-[50px] items-center gap-[10px]">
                        <p className="text-[14px]">{card?.subject}</p>
                        <p className="text-[var(--verdeClaro)]">{card?.examType}</p>
                    </span>
                </aside>

                <div className="flex-1 min-h-0 flex gap-[20px] flex-col ">
                    <p className="text-[20px]">{card?.question}</p>

                    <div className="flex flex-1 min-h-0 ">
                        <ul className="flex flex-1 flex-col gap-[8px] text-[18px] text-[var(--verdeClaro)]">
                            {card?.options.map((option, index) => (
                                <li onClick={() => VerifyQuest(option)} className="cursor-pointer flex items-center transition-all text-[17px] duration-300 gap-[8px] py-[2px]" key={index}>
                                    {index == 0 && <p className="font-bold">A)</p>}
                                    {index == 1 && <p className="font-bold">B)</p>}
                                    {index == 2 && <p className="font-bold">C)</p>}
                                    {index == 3 && <p className="font-bold">D)</p>}
                                    {index == 4 && <p className="font-bold">E)</p>}

                                    <p className={`is${isCorrect === true && option.correct ? ' text-[var(--verdeClaro)]' : ' text-[var(--textWhite)]'}`}>{option.text}</p>

                                    {isCorrect === true && option.correct && <FaCheckCircle className="text-[var(--verdeClaro)]"/>}
                                </li>
                            ))}
                        </ul>

                        <div className="flex-1 flex overflow-x-auto justify-start items-start pb-[20px]">
                            {isCorrect === false && <p className="text-red-600 w-full text-end text-[18px]">Resposta incorreta</p>}
                            {isCorrect === true && card?.explanation && <p className="text-[var(--verdeClaro)] text-center text-[18px]">{card?.explanation}</p>} 
                        </div>

                    </div>
                </div>
                
                <button onClick={() => {
                    setIsCorrect(null)
                    clearTimeout(timeOutRef.current)
                }} className="flex items-center absolute right-2 cursor-pointer bottom-2 justify-center gap-[8px] py-[2px]">
                    <IoReload />
                    <span>Reiniciar</span>
                </button>

            </div>
        </>
    )
}

export default CardsQuestoes
