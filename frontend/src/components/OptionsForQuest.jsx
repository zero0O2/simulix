import { useNav } from "../contexts/NavigationProvider"

const OptionsForQuest = ({ text, children, path }) => {
    const {setNavigateOptionsForQuest} = useNav()

    return (
        <>
            <button 
                className="bg-[var(--azulEscuro)] flex justify-center items-center gap-[10px] hover:bg-[var(--verdeClaro)] duration-300 cursor-pointer p-[10px_20px] rounded"
                onClick={() => setNavigateOptionsForQuest(path)}
            >
                <p>{text}</p>
                {children}
            </button>
        </>
    )
}

export default OptionsForQuest