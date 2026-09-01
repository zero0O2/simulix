import { useNav } from "../contexts/NavigationProvider"
import { IoInformationCircleOutline } from "react-icons/io5";


const OptionsForQuest = ({ text, children, path, info }) => {
    
    const {setNavigateOptionsForQuest} = useNav()

    return (
        <>
            <button 
                className="bg-[var(--azulEscuro)] flex justify-center items-center gap-[10px] hover:bg-[var(--azulCeu)] relative duration-300 cursor-pointer p-[10px_20px] rounded"
                onClick={() => setNavigateOptionsForQuest(path)}
            >   
                <p className={`${children && "max-[500px]:hidden"}`}>{text}</p>
                {children && <span className="max-[1180px]:hidden max-[500px]:block">{children}</span>}

                {info && <>
                    <span className="peer absolute right-[10px]">
                        <IoInformationCircleOutline className="text-[20px]"/>
                    </span>
                    <div className=" peer-hover:opacity-100 opacity-0 max-w-[350px] z-10 duration-300 ease-in-out absolute right-0 top-[100%] bg-[var(--textWhite)] text-[var(--textBlack)] text-[13px] p-[10px] rounded-[8px]">
                        {info}
                    </div>
                </>} 
            </button>
        </>
    )
}

export default OptionsForQuest