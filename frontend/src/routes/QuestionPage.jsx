import { useQuestoes } from "../contexts/QuestoesProvider"
import HomeOptiosForQuest from "./HomeOptiosForQuest"
import HomeOptiosCreateQuest from "./HomeOptiosCreateQuest"
import HomeOptiosFilterQuests from "./HomeOptiosFilterQuests"
import HomeOptiosExportQuestions from "./HomeOptiosExportQuestions"
import HomeOptiosUpdate from "./HomeOptiosUpdate"
import { useNav } from "../contexts/NavigationProvider"
import DisplayFilterQuestions from "../components/DisplayFilterQuestions"
import { GoChevronUp } from "react-icons/go";
import { MdOutlineCleaningServices } from "react-icons/md";
import { BsListNested } from "react-icons/bs";

const QuestionPage= () => {
    const {newQuestions,setNewQuestions,setCategoriaTypes,setCategoriaMateria,listagemType,setListagemType,questoesFilter} = useQuestoes()
    const {navigateOptionsForQuest,setNavigateOptionsForQuest} = useNav()

    return (
        <>
            <div className="flex min-h-0 flex-1 text-[var(--09)] justify-between gap-[10px] ">
                <div className="flex p-[10px] min-h-0 flex-1 flex-col gap-[6px] rounded-[8px]">
                    <aside className="flex h-[30px] items-center justify-between">
                        <h1 className="text-[17x] ">Questões - {questoesFilter.length}</h1>
                        <nav className="flex justify-center gap-[10px] items-center">

                            <div className="relative ">
                                <button onClick={() => {
                                    setListagemType((prev) => prev == "cards" ? "linha" : "cards")
                                }} className={`peer duration-[.1s] flex justify-center items-center text-[20px] border-0 outline-0 bg-[var(--cor04)] rounded-[5px] text-[var(--cor01)] h-[30px] w-[30px] cursor-pointer`}>
                                    <BsListNested/>
                                </button>
                                <span className="peer-hover:opacity-100 rounded-[4px] duration-200 opacity-0 pointer-events-none absolute bg-[var(--04)] text-[var(--cor10)] bottom-1/1 -left-1/2 p-[5px_10px] shadow-[0px_0px_5px_#00000032]">
                                    <p className="">Listagem</p>
                                </span>
                            </div>

                            <div className="relative ">
                                <button onClick={() => {
                                    setCategoriaMateria([])
                                    setCategoriaTypes("Todas")
                                }} className={`peer duration-[.1s] flex justify-center items-center text-[20px] border-0 outline-0 bg-[var(--cor04)] rounded-[5px] text-[var(--cor01)] h-[30px] w-[30px] cursor-pointer`}>
                                    <MdOutlineCleaningServices/>
                                </button>
                                <span className="peer-hover:opacity-100 rounded-[4px] duration-200 opacity-0 pointer-events-none absolute bg-[var(--04)] text-[var(--cor10)] bottom-1/1 -left-1/2 p-[5px_10px] shadow-[0px_0px_5px_#00000032]">
                                    <p className="">Limpar Filtros</p>
                                </span>
                            </div>
                            
                            <div className="relative">
                                <button onClick={() => setNewQuestions(prev => !prev)} className={`peer ${newQuestions ? "" : "rotate-180"} flex justify-center items-center duration-[.1s] text-[30px] border-0 outline-0 bg-[var(--cor04)] rounded-[5px] text-[var(--cor01)] h-[30px] w-[30px] cursor-pointer`}>
                                    <GoChevronUp/>
                                </button>
                                <span className="peer-hover:opacity-100 rounded-[4px] duration-200 opacity-0 pointer-events-none absolute bg-[var(--04)] text-[var(--cor10)] bottom-1/1 -left-1/2 p-[5px_10px] shadow-[0px_0px_5px_#00000032]">
                                    {newQuestions && <p>Novas</p>}
                                    {!newQuestions && <p>Antigas</p>}
                                </span>
                            </div>

                        </nav>
                    </aside>

                    <div className="flex min-h-0 flex-col flex-1 overflow-y-auto">
                        <div className={`${listagemType == "linha" ? "columns-1" : "columns-2"}  space-y-2`}>
                            <DisplayFilterQuestions typeList={listagemType}/>
                        </div>
                    </div>
                </div>

                <div className="bg-[var(--01)] m-[5px] flex flex-col flex-1 min-h-0 max-w-[400px]">
                    <aside className="flex h-[40px] text-[var(--09)] gap-[10px] items-center justify-center">
                        <h1>Controle Total da sua prepareção</h1>
                        {navigateOptionsForQuest !== "/home" && (
                            <button onClick={()=>setNavigateOptionsForQuest("/home")} className="bg-[var(--cor03)] hover:bg-[var(--cor04)] text-[var(--white)] duration-300 cursor-pointer p-[2px_10px] rounded-[5px]">Voltar</button>
                        )}
                    </aside>
                    <div className="flex flex-1 overflow-y-auto">
                        {navigateOptionsForQuest === "/home" && <HomeOptiosForQuest />}
                    
                        {navigateOptionsForQuest === "/create-quest" && <HomeOptiosCreateQuest />}
                    
                        {navigateOptionsForQuest === "/filter-questions" && <HomeOptiosFilterQuests />}
                    
                        {navigateOptionsForQuest === "/export-questions" && <HomeOptiosExportQuestions/>}

                        {navigateOptionsForQuest === "/update" && <HomeOptiosUpdate/>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionPage