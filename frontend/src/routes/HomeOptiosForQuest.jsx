
import OptionsForQuest from "../components/OptionsForQuest"
import { MdOutlineCreate } from "react-icons/md";
import { CiFilter } from "react-icons/ci";

const HomeOptiosForQuest = () => {

    return (
        <>

            <nav className="w-full flex flex-col gap-[10px] px-[20px]">
                <OptionsForQuest text="Criar Questão" path="/create-quest">
                    <MdOutlineCreate className="text-[20px]" />
                </OptionsForQuest>
                <OptionsForQuest text="Exportar questões" path="/export-questions" info={"Para exportação de questões é necessario o uso de um txt em formato json"}>
                    <MdOutlineCreate className="text-[20px]" />
                </OptionsForQuest>
                <OptionsForQuest text="Filtrar Questões" path="/filter-questions">
                    <CiFilter className="text-[20px]" />
                </OptionsForQuest>
            </nav>

        </>
    )
}

export default HomeOptiosForQuest