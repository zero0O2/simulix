import { Link } from "react-router-dom"

import AsideNavigate from "../components/AsideNavigate";
import { useAuth } from "../contexts/AuthProvider";
import { useApp } from "../contexts/AppProvider";
import AsideForHours from "../components/AsideForHours";
import HomeTarefas from "../routes/HomeTarefas";
import { useNav } from "../contexts/NavigationProvider";
import { IoCaretBackOutline } from "react-icons/io5";

import { AiOutlineHome } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";

const Home = () => {

    const {hoursNow} = useApp()
    const {user} = useAuth()
    const {asideDisplay, setAsideDisplay,navigateInHome,setNavigateInHome} = useNav()



    return (
        <>
            <div className="w-[100dvw] z-0 h-[100dvh] bg-[var(--Preto)] text-[var(--textWhite)] flex">
                <div className="relative z-0 max-[1220px]:hidden">
                    <button onClick={()=>setAsideDisplay(prev => !prev)} className="w-[60px] h-[50px] rounded-r-[10px] top-[10px] left-full bg-[var(--azulEscuro)] absolute flex justify-center items-center duration-300 cursor-pointer">
                        <IoCaretBackOutline className={`text-[20px] transition-all duration-700 ${!asideDisplay ? 'rotate-180' : "rotate-0"}`} />
                    </button>
                    <AsideNavigate/>
                </div>

                <main className="flex flex-1 min-h-0 flex-col">
                    <header className="w-full h-[60px] max-[1220px]:h-[80px] flex items-center justify-between px-[20px]">
                        <div>
                            Simulix
                        </div>
                        <div className="h-full min-h-[80px] py-[10px]">
                            <div className="w-full h-full z-0 relative flex min-w-[110px] bg-[white] gap-[5px] rounded-full items-center overflow-hidden justify-start px-[10px]">

                                <button onClick={()=>setNavigateInHome("/home")} className={`text-[16px] h-[45px] gap-[6px] min-w-[45px] p-[10px] flex justify-center items-center ${navigateInHome == "/home" ? "bg-[var(--azulCeu)] text-[white]" : "text-[var(--azulCeu)]"} cursor-pointer rounded-full`}>
                                    <p className="flex gap-[10px]">
                                        <AiOutlineHome className="text-[18px]"/>
                                    </p>
                                    {navigateInHome == "/home" && <p>Home</p>}
                                </button>
                                <button onClick={()=>setNavigateInHome("/tarefas")} className={`text-[16px] gap-[6px] h-[45px] min-w-[45px] p-[10px] flex justify-center items-center ${navigateInHome == "/tarefas" ? "bg-[var(--azulCeu)] text-[white]" : "text-[var(--azulCeu)]"} cursor-pointer rounded-full`}>
                                    <p className="flex gap-[10px]">
                                        <FaTasks className="text-[18px]"/>
                                    </p>
                                    {navigateInHome == "/tarefas" && <p>Tarefas</p>}
                                </button>
                                <button onClick={()=>setNavigateInHome("/configs")} className={`text-[16px] gap-[6px] h-[45px] min-w-[45px] p-[10px] flex justify-center items-center ${navigateInHome == "/configs" ? "bg-[var(--azulCeu)] text-[white]" : "text-[var(--azulCeu)]"} cursor-pointer rounded-full`}>
                                    <p className="flex gap-[10px]">
                                        <AiOutlineHome className="text-[18px]"/>
                                    </p>
                                    {navigateInHome == "/configs" && <p>Configs</p>}
                                </button>


                            </div>
                        </div>
                        <div className="h-full flex items-center gap-[20px]">
                            <span className="text-[14px] flex gap-[10px] justify-center items-center">
                                <p className="text-[14px] max-[630px]:hidden">Olá, como vai </p>
                                <h1 className="text-[18px] max-[520px]:hidden">{user?.name?.split(' ').slice(0,2).join(' ')}</h1> 
                                <img className="w-[50px] h-[50px] rounded-full object-cover" src="https://i.pinimg.com/736x/bd/c7/81/bdc781b471ebd825a6ab5a40e36e0f8e.jpg" alt="" />
                            </span>
                        </div>
                    </header>

                    <div className=" flex-1 min-h-0 p-[20px] flex flex-col gap-[30px]">

                        <AsideForHours/>

                        <div className="flex-1 min-h-0 flex gap-[20px] flex-col">


                            {navigateInHome === "/home" &&
                                <div className="flex-1 flex text-center flex-col">
                                    nenhuma opção encontrada <br /> clique em tarefas para criar uma nova tarefa ou ver as tarefas criadas
                                </div>
                            }

                            {navigateInHome === "/tarefas" &&
                                <HomeTarefas/>             
                            }

                            
                        </div>
                    </div>
                </main>


            </div>
        </>
    )
}

export default Home