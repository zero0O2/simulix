import { useNav } from "../contexts/NavigationProvider";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const Configuracao = () => {

    const {asideDisplay, setAsideDisplay,navigateInHome,setNavigateInHome} = useNav()
    const navigation = useNavigate()

    return (
        <>
            <div className="w-[100dvw] z-0 h-[100dvh] bg-[var(--Preto)] overflow-hidden text-[var(--textWhite)] flex flex-col">
                <aside className=" w-full h-[60px] bg-[var(--black01)] p-[0_15px] flex justify-between items-center">
                    <div className="flex items-center gap-[10px] text-[20px] text-[var(--whiteCream)]">
                        <img className="max-w-[44px] rounded-[10px] w-full aspect-square object-cover" src="/images/logoSite.jpg" alt="" />
                        <p>Simulix</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[20px] text-[var(--whiteCream)]">
                        <div onClick={()=>navigation("/")} className="p-[8px] hover:scale-[1.06] duration-300 rounded-full cursor-pointer bg-[var(--Preto)]">
                            <AiOutlineHome className="text-[22px]"/>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 min-w-0 min-h-0 flex flex-col items-center pt-[30px]">
                    <p>Pagina de configuraçoes em desemvolvimento ...</p>

                </main>


            </div>
        </>
    )
}

export default Configuracao