
import OptionsForQuest from "../components/OptionsForQuest"
import { MdOutlineCreate } from "react-icons/md";

const HomeOptiosForQuest = () => {

    return (
        <>

            <nav className="w-full flex flex-col gap-[10px] px-[20px]">

                <OptionsForQuest text="Criar Questão" path="/create-quest">
                    <MdOutlineCreate className="text-[20px]" />
                </OptionsForQuest>
                <OptionsForQuest text="Filtrar Questões" path="/filter-questions">
                    <MdOutlineCreate className="text-[20px]" />
                </OptionsForQuest>

            </nav>

        </>
    )
}

export default HomeOptiosForQuest