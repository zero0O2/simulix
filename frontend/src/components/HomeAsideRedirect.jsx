import { useNav } from "../contexts/NavigationProvider";

const HomeAsideRedirect = ({ path, text, children }) => {
    const {setNavigateInHome,navigateInHome} = useNav();
    return (
        <>
            <div onClick={()=>setNavigateInHome(path)} className={` ${navigateInHome === path ? 'text-[var(--13)] underline' : ''} flex cursor-pointer items-center gap-[4px] text-[14px] text-[var(--06)] hover:text-[var(--08)] duration-300`}>
                {children}
                <span>{text}</span>
            </div>
        </>
    )
}

export default HomeAsideRedirect