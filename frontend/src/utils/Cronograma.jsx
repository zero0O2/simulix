
import { CiTimer } from "react-icons/ci";
import { CiStopwatch } from "react-icons/ci";
import { IoIosPause } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";

import { useAcess } from "../contexts/AcessibilityProvider";
import { useRef, useState } from "react";

const Cronograma = () => {

    const {
        typeForCronograma,setTypeForCronograma,
        IniciarCronometro,PausarCronometro,CancelarCronometro,time,cronometro,
        FormatNumberTime,
        hoursCronometro,minutosCronometro,secondsCronometro,
        buttonCronometro,setButtonCronometro
    } = useAcess()
    



    return (
        <>
            <div className="w-full h-full flex p-[15px] rounded-[10px] gap-[10px] flex flex-col bg-[var(--black01)]">
                <aside className=" flex justify-between items-center">
                    <h1 className="text-[18px]">Cronograma de Estudos</h1>
                    <span className="flex gap-[10px]">
                        <button onClick={()=>{
                            setTypeForCronograma("cronometro")
                        }} className={`${typeForCronograma == "cronometro" ? "bg-[var(--azulCeu)]" : "" } duration-200 p-[5px_10px] rounded-full cursor-pointer text-[var(--whiteCream)] hover:bg-[var(--cinza)] flex items-center gap-[5px]`} >Cronômetro <CiStopwatch/></button>
                        <button onClick={()=>{
                            setTypeForCronograma("timer")
                        }} className={`${typeForCronograma == "timer" ? "bg-(--azulCeu)" : "" } duration-200 p-[5px_10px] rounded-full cursor-pointer text-[var(--whiteCream)] hover:bg-[var(--cinza)] flex items-center gap-[5px]`} >Timer <CiTimer /></button>
                    </span>
                </aside>


                {typeForCronograma == "cronometro" && <main className={`flex-1 z-0 relative flex gap-[10px] flex-col overflow-hidden ${buttonCronometro == "play" ? "bg-[#80cecb51]" : "bg-transparent"} duration-100 rounded-[10px]`}>
                    
                    <div className="absolute w-full h-full top-0 left-0 border-[6px] border-[var(--azulCeu)] z-[-2]"></div>
                    <div className="absolute w-full h-full top-0 left-0 backdrop-blur-[30px] z-[-1]"></div>
                    
                    <div className="w-full flex-2 text-[var(--whiteCream)] flex justify-center items-center rounded-[10px]">
                        <p className="text-[50px]">{FormatNumberTime(hoursCronometro)}:{FormatNumberTime(minutosCronometro)}:{FormatNumberTime(secondsCronometro)}</p>
                    </div>
                    <div className="w-full flex-1 flex justify-center items-center gap-[10px]">
                        {buttonCronometro == "iniciar" &&
                            <button onClick={()=>{
                                IniciarCronometro()
                                setButtonCronometro('pause')
                            }} className="flex text-[17px] p-[10px_40px] rounded-full bg-[var(--marromEscuro)] cursor-pointer hover:bg-[var(--bege)] hover:text-[var(--textBlack)] duration-200">Iniciar</button>
                        }
                        {buttonCronometro == "play" &&
                            <button onClick={()=>{
                                IniciarCronometro()
                                setButtonCronometro('pause')
                            }} className="flex text-[20px] h-[45px] flex items-center p-[0px_40px] rounded-full bg-[var(--marromEscuro)] cursor-pointer hover:bg-[var(--bege)] hover:text-[var(--textBlack)] duration-200"><IoIosPlay/></button>
                        }
                        {buttonCronometro == "pause" &&
                            <button onClick={()=>{
                                PausarCronometro()
                                setButtonCronometro('play')
                            }} className="flex text-[20px] flex items-center h-[45px] p-[0px_40px] rounded-full bg-[var(--marromEscuro)] cursor-pointer hover:bg-[var(--bege)] hover:text-[var(--textBlack)] duration-200"><IoIosPause/></button>
                        }

                        {buttonCronometro != "iniciar" &&
                            <button onClick={()=>{
                                CancelarCronometro()
                                setButtonCronometro('iniciar')
                            }} className="flex text-[17px] flex items-center h-[45px] p-[0px_40px] rounded-full bg-[var(--marromEscuro)] cursor-pointer hover:bg-[var(--bege)] hover:text-[var(--textBlack)] duration-200">Cancelar</button>
                        }   
                    </div> 
                </main>}

                {typeForCronograma == "timer" && <main className={`flex-1 z-0 relative flex gap-[10px] flex-col overflow-hidden ${buttonCronometro == "play" ? "bg-[#80cecb51]" : "bg-transparent"} duration-100 rounded-[10px]`}>
                    
                    <div className="absolute w-full h-full top-0 left-0 border-[6px] border-[var(--azulCeu)] z-[-2]"></div>
                    <div className="absolute w-full h-full top-0 left-0 backdrop-blur-[30px] z-[-1]"></div>
                    
                    <div className="w-full flex-2 text-[var(--whiteCream)] flex justify-center items-center rounded-[10px]">
                        <p className="text-[50px]">teste</p>
                    </div>

                    <div className="w-full flex-1 flex justify-center items-center gap-[10px]">
                            <button onClick={()=>{
                                
                            }} className="flex text-[17px] p-[10px_40px] rounded-full bg-[var(--marromEscuro)] cursor-pointer hover:bg-[var(--bege)] hover:text-[var(--textBlack)] duration-200">teste</button>
 
                    </div>

                </main>}


            </div>
        </>
    )
}

export default Cronograma