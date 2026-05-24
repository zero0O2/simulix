import { MdFullscreen, MdFullscreenExit } from "react-icons/md"
import { useNav } from "../contexts/NavigationProvider"
import AsideCardsCategoria from "./AsideCardsCategoria"
import AsideOptionsForMobile from "./AsideOptionsForMobile"

const DisplaySimuladoQuestions = () => {

    const {setQuestoesFoco,questoesFoco} = useNav()
        
    
    return (
        <>

            <div className=" flex-1 w-full">
                <aside className="w-full relative h-[40px] justify-between items-center gap-[20px] flex">

                    <AsideOptionsForMobile/>
                    
                    <button onClick={()=> setQuestoesFoco(prev=>!prev)} className="border-1 border-[var(--azulCeu)] w-[40px] h-[40px] flex justify-center items-center cursor-pointer text-[30px] text-[var(--azulCeu)]">{questoesFoco ? <MdFullscreenExit/> : <MdFullscreen/>}</button>
                </aside>

                <div className="w-full h-full text-center">
                    Área em desenvolvimento
                </div>
            </div>
        </>
    )
}

export default DisplaySimuladoQuestions