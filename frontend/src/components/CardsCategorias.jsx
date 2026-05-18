import { useQuestoes } from "../contexts/QuestoesProvider"

const CardsCategorias = ({ option }) => {
    const {categoriaTypes, setCategoriaTypes} = useQuestoes()

    return (
        <>
            <button 
                className={`${categoriaTypes === option || categoriaTypes === "" ? 'bg-[var(--azulEscuro)] text-white' : 'text-[var(--azulCeu)]'} px-[0.5dvw] max-[710px]:px-[5px] max-[1120px]:text-[14px] cursor-pointer hover:text-white max-w-[120px] min-w-[80px] h-[40px] text-[17px] border-2 duration-300 rounded-full hover:border-[var(--azulEscuro)] hover:bg-[var(--azulEscuro)] border-[var(--azulCeu)]`}
                onClick={() => setCategoriaTypes(option)}
            >
                {option}
            </button>
        </>
    )
}

export default CardsCategorias