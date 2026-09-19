

import HomeAsideRedirect from "../HomeAsideRedirect";
import { GoHomeFill } from "react-icons/go";

const HeaderNavigate = () => {


    return (
        <>
            <header className="w-full min-h-[30px] bg-[var(--02)] flex items-center px-[20px] gap-[10px]">
                <HomeAsideRedirect  path="/home" text="Home">
                    <GoHomeFill />
                </HomeAsideRedirect>
                <HomeAsideRedirect  path="/questoes" text="Questões">
                    <GoHomeFill />
                </HomeAsideRedirect>
            </header>
        </>
    )
}

export default HeaderNavigate
