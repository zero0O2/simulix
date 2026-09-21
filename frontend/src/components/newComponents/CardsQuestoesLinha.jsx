import { FaRegTrashAlt } from "react-icons/fa";
import { useQuestoes } from "../../contexts/QuestoesProvider";
import { MdOutlineEdit } from "react-icons/md";
import { useNav } from "../../contexts/NavigationProvider";

const CardsQuestoesLinha = ({ card }) => {

    const {DeletarQuestoesForUserId,setQuestoesForUser,setQuestionForUpdate} = useQuestoes()
    const {navigateOptionsForQuest,setNavigateOptionsForQuest} = useNav()

    return (
        <>  

            <div className="border-[var(--cor02)] bg-[var(--02)] cursor-pointer border-2 flex px-[10px] gap-[10px] justify-between items-center min-h-[50px] rounded-[6px]">
                <div className="h-full flex-1 flex gap-[10px] items-center">
                    <p className="min-w-max max-w-[50%] text-[var(--09)]  line-clamp-1">{card?.title ? card.title : card.question}</p> |
                    <p className="w-full line-clamp-1 text-[var(--07)]">{card?.title ? card.question : ""}</p>
                </div>
                <div className="h-full flex justify-center items-center gap-[10px]">
                    <p className="text-[var(--cor03)]">{card.examType}</p>
                    <p className="text-[var(--cor05)]">{card.subject}</p>
                </div>

                <button onClick={() => {
                    setNavigateOptionsForQuest("/update")
                    setQuestionForUpdate(card)

                }} className="flex items-center cursor-pointer bottom-2 hover:scale-[1.03] bg-[var(--cor01)] rounded-[4px] justify-center gap-[8px] p-[4px]">
                    <MdOutlineEdit />
                </button>
                <button onClick={async () => {

                    setQuestoesForUser((prev)=> prev?.filter((e) => e._id != card._id ))
                    if (navigateOptionsForQuest == "/update") {setNavigateOptionsForQuest("/home")}
                    await DeletarQuestoesForUserId(card._id)

                }} className="flex items-center cursor-pointer bottom-2 justify-center hover:scale-[1.03] hover:text-red-600 duration-300 items-center gap-[8px] py-[2px]">
                    <FaRegTrashAlt />
                </button>
            </div>

        </>
    )
}

export default CardsQuestoesLinha
