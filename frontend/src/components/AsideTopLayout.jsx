
import { useNav } from "../contexts/NavigationProvider";

import { AiOutlineHome } from "react-icons/ai";
import { FaCog, FaTasks } from "react-icons/fa";
import { useAuth } from "../contexts/AuthProvider";

const AsideTopLayout = () => {

    const {navigateInHome,setNavigateInHome} = useNav()
    const {user} = useAuth()

    return (
        <>

            <header className="w-full h-[60px] h-[80px] flex items-center max-[1180px]:justify-between justify-end px-[20px]">
                <div className="min-[1180px]:hidden flex justify-center gap-[10px] items-center">
                    <img className="object-cover w-[40px] h-[40px] rounded-[10px] " src="/images/logoSite.jpg" alt="Logo" />
                    <h1 className="text-[20px] max-[480px]:hidden">Simulix</h1>
                </div>
                <div className="h-full min-[1180px]:hidden min-h-[80px] py-[10px]">

                    <div className="w-full h-full z-0 relative flex min-w-[110px] bg-[#e4e4e4] gap-[5px] rounded-full items-center overflow-hidden justify-start px-[10px]">
                        <button onClick={()=>setNavigateInHome("/home")} className={`text-[16px] h-[45px] gap-[6px] min-w-[45px] p-[10px] flex justify-center items-center transition-all duration-300 ${navigateInHome == "/home" ? "bg-[var(--azulCeu)] text-[white]" : "bg-transparent text-[var(--azulCeu)]"} cursor-pointer rounded-full`}>
                            <p className="flex gap-[10px]">
                                <AiOutlineHome className="text-[18px]"/>
                            </p>
                            {navigateInHome == "/home" && <p>Home</p>}
                        </button>
                        <button onClick={()=>setNavigateInHome("/tarefas")} className={`text-[16px] gap-[6px] h-[45px] min-w-[45px] p-[10px] flex justify-center items-center transition-all duration-300 ${navigateInHome == "/tarefas" ? "bg-[var(--azulCeu)] text-[white]" : "bg-transparent text-[var(--azulCeu)]"} cursor-pointer rounded-full`}>
                            <p className="flex gap-[10px]">
                                <FaTasks className="text-[18px]"/>
                            </p>
                            {navigateInHome == "/tarefas" && <p>Tarefas</p>}
                        </button>
                        <button onClick={()=>setNavigateInHome("/configs")} className={`text-[16px] gap-[6px] h-[45px] min-w-[45px] p-[10px] flex justify-center items-center transition-all duration-300 ${navigateInHome == "/configs" ? "bg-[var(--azulCeu)] text-[white]" : "bg-transparent text-[var(--azulCeu)]"} cursor-pointer rounded-full`}>
                            <p className="flex gap-[10px]">
                                <FaCog className="text-[18px]"/>
                            </p>
                            {navigateInHome == "/configs" && <p>Configs</p>}
                        </button>
                    </div>


                </div>
                <div className="h-full flex items-center gap-[20px]">
                    <span className="text-[14px] flex gap-[10px] justify-center items-center">
                        <p className="text-[14px] max-[660px]:hidden">Olá, como vai </p>
                        <h1 className="text-[18px] max-[560px]:hidden">{user?.name?.split(' ').slice(0,2).join(' ')}</h1> 
                        <img className="w-[50px] h-[50px] rounded-full object-cover" src="https://i.pinimg.com/736x/bd/c7/81/bdc781b471ebd825a6ab5a40e36e0f8e.jpg" alt="" />
                    </span>
                </div>
            </header>
        </>
    )
}

export default AsideTopLayout
