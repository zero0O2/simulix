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
                <p className={`${children && "max-[470px]:hidden"}`}>{text}</p>
                <span className="max-[1180px]:hidden max-[470px]:block">{children}</span>

                {info && <>
                    <span className="peer absolute right-[10px]">
                        <IoInformationCircleOutline className="text-[20px]"/>
                    </span>
                    <div className="peer-hover:opacity-100 opacity-0 max-w-[350px] duration-300 ease-in-out absolute right-0 top-[100%] bg-[var(--bege)] text-[var(--textBlack)] p-[10px] rounded-[8px]">
                        {info}
                    </div>
                </>}
            </button>
        </>
    )
}

export default OptionsForQuest