import { Link } from "react-router-dom"
import HomeAsideRedirect from "../components/HomeAsideRedirect";

import { GoHomeFill } from "react-icons/go";
import { FaTasks,FaCog } from "react-icons/fa";

import { useState } from "react";
import { useNav } from "../contexts/NavigationProvider";
import { useAuth } from "../contexts/AuthProvider";


const AsideNavigate = () => {

    const {Loggout} = useAuth()
    const {asideDisplay, setAsideDisplay,navigateInHome} = useNav()

    return (
        <>
            <aside className={`${asideDisplay ? 'w-[400px]' : 'w-0'} transition-all duration-700 overflow-hidden relative flex flex-col h-full `}>
                <img className="absolute w-full h-full object-cover" src="./images/fundo1.jpeg" alt="" />
                <div className="absolute w-full h-full backdrop-blur-[40px] backdrop-brightness-45"></div>
                
                <div className="flex w-full h-full relative p-[20px] z-10 flex-col">


                    <aside className="w-full flex relative justify-between items-center">
                        <img className="w-[60px] h-[60px] object-cover rounded-2xl" src="./images/logoSite.jpg" alt="" />
                        <h1 onClick={()=>setAsideDisplay(false)} className="text-[20px]">Simulix</h1>
                    </aside>

                    <main className="flex flex-col w-full">
                        <nav className="flex  flex-col p-[30px_20px] gap-[10px] w-full">

                            <HomeAsideRedirect  path="/home" text="Home">
                                <GoHomeFill />
                            </HomeAsideRedirect>

                            <HomeAsideRedirect path="/tarefas" text="Tarefas" >
                                <FaTasks />
                            </HomeAsideRedirect>

                        </nav>
                    </main>

                    <footer className="w-full flex flex-col gap-[20px]">
                        <div className="w-full crescimentoHorizontal h-[4px] bg-[var(--azulCeu)]"></div>
                        
                        <nav className=" flex flex-col w-full gap-[10px] px-[20px]">
                            <HomeAsideRedirect path="/configs" text="Configurações" >
                                <FaCog />
                            </HomeAsideRedirect>
                            <button onClick={()=> Loggout()} className="relative flex rounded-[10px] justify-center backdrop-brightness-75 items-center hover:backdrop-brightness-45 duration-300 ease-in-out overflow-hidden z-0 cursor-pointer w-full h-[40px]">
                                <h1 className="z-10 flex text-[17px]">Sair da conta</h1>
                            </button> 
                        </nav>

                    </footer>

                </div>
            </aside>

        </>
    )
}

export default AsideNavigate