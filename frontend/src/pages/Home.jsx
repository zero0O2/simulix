import { Link } from "react-router-dom"

import AsideNavigate from "../components/AsideNavigate";
import { useAuth } from "../contexts/AuthProvider";
import { useApp } from "../contexts/AppProvider";
import AsideForHours from "../components/AsideForHours";
import HomeTarefas from "../routes/HomeTarefas";
import { useNav } from "../contexts/NavigationProvider";
import { IoCaretBackOutline } from "react-icons/io5";

import { AiOutlineHome } from "react-icons/ai";
import { FaCog, FaTasks } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { CiStopwatch } from "react-icons/ci";

import AsideTopLayout from "../components/AsideTopLayout";
import { useAcess } from "../contexts/AcessibilityProvider";
import Cronograma from "../utils/Cronograma";

const Home = () => {

    const {
        asideDisplay, setAsideDisplay,
        navigateInHome,setNavigateInHome
    } = useNav()


    return (
        <>
            <div className="w-[100dvw] z-0 h-[100dvh] bg-[var(--Preto)] overflow-hidden text-[var(--textWhite)] flex">
                <div className="relative z-10 max-[1180px]:hidden">
                    <button onClick={()=>setAsideDisplay(prev => !prev)} className="w-[60px] h-[50px] rounded-r-[10px] top-[10px] left-full bg-[var(--azulEscuro)] absolute flex justify-center items-center duration-300 cursor-pointer">
                        <IoCaretBackOutline className={`text-[20px] transition-all duration-700 ${!asideDisplay ? 'rotate-180' : "rotate-0"}`} />
                    </button>
                    <AsideNavigate/>
                </div>

                <main className="flex flex-1 min-h-0 flex-col">
                    <AsideTopLayout/>

                    <div className=" flex-1 min-h-0 p-[0_20px] max-[800px]:p-[0px_20px] flex flex-col gap-[20px]">

                        <AsideForHours/>

                        <div className="flex-1 min-h-0 flex flex-col">

                            {navigateInHome === "/home" &&
                                <div className="flex-1 grid grid-cols-2 grid-rows-2 max-[1000px]:grid-cols-1 max-[1000px]:grid-rows-3  gap-[10px] mb-[15px] flex-col">

                                    
                                    <div className="col-span-1 row-span-1 p-[15px] rounded-[10px] flex flex-1">
                                        <p className="w-full text-center">Em desenvolvimento ...</p>
                                    </div>

                                    <div className="col-span-1 row-span-1 flex flex-1">

                                        <Cronograma/>

                                    </div>

                                    <div className=" max-[1000px]:col-span-1 col-span-2 p-[15px] row-span-1 rounded-[10px] flex flex-1 bg-[var(--black01)]">
                                        <p className=" w-full text-center">Em desenvolvimento ...</p>
                                    </div>
                                    

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