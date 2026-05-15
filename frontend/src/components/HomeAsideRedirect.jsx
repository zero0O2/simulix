import { Link } from "react-router-dom"
import { useNav } from "../contexts/NavigationProvider";




const HomeAsideRedirect = ({ path, text, children }) => {
    const {setNavigateInHome,navigateInHome} = useNav();
    
    return (
        <>
            <div onClick={()=>setNavigateInHome(path)} className={` ${navigateInHome === path ? 'text-[var(--bege)]' : ''} flex cursor-pointer items-center h-[40px] gap-[10px] text-[18px] hover:text-[var(--azulCeu)] duration-300`}>
                {children}
                <span>{text}</span>
            </div>
        </>
    )
}

export default HomeAsideRedirect