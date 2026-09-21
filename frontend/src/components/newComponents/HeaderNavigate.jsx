

import HomeAsideRedirect from "../HomeAsideRedirect";
import { GoHomeFill } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { useAcess } from "../../contexts/AcessibilityProvider";
import { GoTasklist } from "react-icons/go";
import { FaRegObjectUngroup } from "react-icons/fa";

const HeaderNavigate = () => {
    const {setTheme,theme} = useAcess()
    return (
        <>
            <header className="w-full min-h-[30px] bg-[var(--02)] flex items-center justify-between px-[20px] gap-[10px]">
                <span className="flex items-center gap-[10px]">

                    {/* <HomeAsideRedirect  path="/home" text="Home">
                        <GoHomeFill />
                    </HomeAsideRedirect> */}
                    <HomeAsideRedirect  path="/questoes" text="Questões">
                        <GoTasklist />
                    </HomeAsideRedirect>
                    <HomeAsideRedirect  path="/simulado" text="Simulado">
                        <FaRegObjectUngroup />
                    </HomeAsideRedirect>

                </span>

                <div className="flex text-[var(--11)]">
                    <button className={`text-[22px] ${theme == "dark" ? "rotate-[1450deg]" : "" } cursor-pointer outline-0 border-0 transition-all duration-[1s]`} onClick={()=>setTheme(prev => prev == 'white' ? 'dark' : 'white')}>
                        {theme == 'dark' &&<IoMoonOutline/>}
                        {theme != 'dark' &&<IoSunnyOutline/>}
                    </button>
                </div>
            </header>
        </>
    )
}

export default HeaderNavigate
