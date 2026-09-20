import { useRef, useState } from "react"
import { FaCheckCircle } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import LoadCircle from "./LoadCircle";
import { FaRegTrashAlt } from "react-icons/fa";
import { useQuestoes } from "../contexts/QuestoesProvider";
import { MdOutlineEdit } from "react-icons/md";
import { useNav } from "../contexts/NavigationProvider";

const CardsQuestoes = ({ card }) => {
    const [isCorrect, setIsCorrect] = useState(null)

    const timeOutRef = useRef(null)
    const {DeletarQuestoesForUserId,setQuestoesForUser,setQuestionForUpdate} = useQuestoes()
    const {navigateOptionsForQuest,setNavigateOptionsForQuest} = useNav()

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

            <div className={` break-inside-avoid flex flex-col relative min-h-0 bg-[var(--02)] p-[10px_20px_50px_20px] gap-[10px] border-2  border-[var(--04)] rounded-[10px] ${isCorrect === true ? 'border-[var(--correct)]' : isCorrect === false ? 'border-[var(--incorrect)]' : ''}`}>

                {card === null &&
                    <div className="flex justify-center items-center w-[40px] h-[40px]">
                        <LoadCircle></LoadCircle>
                    </div>

                }

                <aside className="w-full flex justify-between gap-[20px]">
                    <h1 className="text-[16px] font-bold flex items-center indent-[20px] whitespace-pre-wrap break-normal hyphens-auto">{card?.title || "Questão"}</h1>

                    {card?.tags.length > 0 && (
                        <div className="flex max-w-[290px] min-w-[180px] overflow-x-auto h-[50px] justify-start items-center gap-[10px]">
                            {
                                card?.tags?.map((tag, index) => (
                                    <span key={index} className="bg-[var(--14)] text-nowrap text-[var(--13)] h-[30px] flex justify-center items-center px-[10px] rounded-full text-[12px]">
                                        {tag}
                                    </span>
                            ))
                        }
                    </div>)}

                    <span className="flex justify-center h-[50px] items-center gap-[10px]">
                        <p className="text-[14px] text-[var(--cor04)]">{card?.subject}</p>
                        <p className="text-[var(--132)] text-[var(--cor05)]">{card?.examType}</p>
                    </span>
                </aside>

                <div className="flex-1 min-h-0 flex gap-[20px] flex-col ">
                    <p className="text-[16px] text-[var(--11)] indent-[20px] max-w-[600px] whitespace-pre-wrap break-normal hyphens-auto ">{card?.question}</p>

                    <div className="flex flex-1 gap-[10px] min-h-0">
                        <ul className="flex flex-2 flex-col gap-[8px] text-[16px] ">
                            {card?.options?.map((option, index) => (
                                <li onClick={() => VerifyQuest(option)} className={`${isCorrect === true && option.correct ? "border-[var(--correct)] border-2" : ""} border-0 bg-[var(--03)] cursor-pointer flex hover:bg-[var(--cor02)]  items-center text-[16px] duration-300 gap-[8px] p-[5px_10px] rounded-[8px]`} key={index}>
                                    {index == 0 && <p className="font-bold">A)</p>}
                                    {index == 1 && <p className="font-bold">B)</p>}
                                    {index == 2 && <p className="font-bold">C)</p>}
                                    {index == 3 && <p className="font-bold">D)</p>}
                                    {index == 4 && <p className="font-bold">E)</p>}

                                    <p className={`text-[var(--10)] text-[15px]`}>{option.text}</p>
                                    {isCorrect === true && option.correct && <FaCheckCircle className="text-[var(--correct)] text-[12px] min-w-[12px]"/>}
                                </li>
                            ))}
                        </ul>

                        <div className="flex-1 flex overflow-x-auto justify-start items-start pb-[20px]">
                            {isCorrect === false && <p className="text-[var(--incorrect)] w-full text-end text-[14px]">Resposta incorreta</p>}
                            {isCorrect === true && card?.explanation && <p className="text-[var(--correct)] w-full text-end text-[14px]">{card?.explanation} </p>} 
                        </div>

                    </div>
                </div>

                <div className="flex items-center absolute right-2 cursor-pointer bottom-2 justify-center gap-[18px] py-[2px]">

                    <button onClick={() => {
                        setIsCorrect(null)
                        clearTimeout(timeOutRef.current)
                        setNavigateOptionsForQuest("/update")
                        setQuestionForUpdate(card)

                    }} className="flex items-center cursor-pointer bottom-2 hover:scale-[1.03] bg-[var(--cor01)] rounded-[4px] justify-center gap-[8px] p-[4px]">
                        <MdOutlineEdit />
                    </button>

                    <button onClick={() => {
                        setIsCorrect(null)
                        clearTimeout(timeOutRef.current)
                    }} className="flex items-center cursor-pointer bottom-2 hover:scale-[1.03] bg-[var(--cor01)] rounded-[4px] justify-center gap-[8px] p-[4px]">
                        <IoReload />
                    </button>

                    <button onClick={async () => {
                        setIsCorrect(null)
                        clearTimeout(timeOutRef.current)

                        setQuestoesForUser((prev)=> prev?.filter((e) => e._id != card._id ))
                        if (navigateOptionsForQuest == "/update") {setNavigateOptionsForQuest("/home")}
                        await DeletarQuestoesForUserId(card._id)

                    }} className="flex items-center cursor-pointer bottom-2 justify-center hover:scale-[1.03] hover:text-red-600 duration-300 items-center gap-[8px] py-[2px]">
                        <FaRegTrashAlt />
                    </button>

                </div>

            </div>
        </>
    )
}

export default CardsQuestoes
