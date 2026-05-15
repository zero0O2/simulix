import { Link } from "react-router-dom"

import AsideNavigate from "../components/AsideNavigate";
import { useAuth } from "../contexts/AuthProvider";
import { useApp } from "../contexts/AppProvider";
import AsideForHours from "../components/AsideForHours";
import HomeTarefas from "../routes/HomeTarefas";
import { useNav } from "../contexts/NavigationProvider";
import { IoCaretBackOutline } from "react-icons/io5";



const Home = () => {

    const {hoursNow} = useApp()
    const {user} = useAuth()
    const {asideDisplay, setAsideDisplay,navigateInHome} = useNav()



    return (
        <>
            <div className="w-[100dvw] z-0 h-[100dvh] bg-[var(--Preto)] text-[var(--textWhite)] flex">
                <div className="relative z-0">
                    <button onClick={()=>setAsideDisplay(prev => !prev)} className="w-[60px] h-[50px] rounded-r-[10px] top-[10px] left-full bg-[var(--azulEscuro)] absolute flex justify-center items-center duration-300 cursor-pointer">
                        <IoCaretBackOutline className={`text-[20px] transition-all duration-700 ${!asideDisplay ? 'rotate-180' : "rotate-0"}`} />
                    </button>
                    <AsideNavigate/>
                </div>

                <main className="flex flex-1 min-h-0 flex-col">
                    <header className="w-full h-[60px] flex items-center justify-end">
                        <div className="h-full flex items-center gap-[20px] px-[20px]">
                            <span className="text-[14px] flex gap-[10px] justify-center items-center">
                                <p className="text-[14px]">Olá, como vai </p>
                                <h1 className="text-[18px]">{user?.name?.split(' ').slice(0,2).join(' ')}</h1> 
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