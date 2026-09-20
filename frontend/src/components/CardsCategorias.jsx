import { useQuestoes } from "../contexts/QuestoesProvider"

const CardsCategorias = ({ option }) => {
    const {categoriaTypes, setCategoriaTypes} = useQuestoes()

    return (
        <>
            <button 
                className={`${categoriaTypes === option || categoriaTypes === "" ? 'bg-[var(--cor05)] border-[var(--cor05)] text-[var(--cor01)]' : 'text-[var(--cor03)]'} px-[0.5dvw] cursor-pointer hover:text-[var(--cor03)] max-w-[120px] min-w-[80px] h-[40px] text-[17px] border-2 duration-300 rounded-full hover:border-[var(--cor05)] border-[var(--cor03)]`}
                onClick={() => setCategoriaTypes(option)}
            >
                {option}
            </button>
        </>
    )
}

export default CardsCategorias