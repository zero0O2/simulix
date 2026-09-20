import { useQuestoes } from "../contexts/QuestoesProvider"

const CardsCategoriasMaterias = ({ option }) => {
    const {categoriaMateria, setCategoriaMateria} = useQuestoes()
    
    return (
        <>
            <button 
                className={`${categoriaMateria?.includes(option) ? 'bg-[var(--cor05)] text-[var(--cor01)]' : 'text-[var(--cor03)]'} text-nowrap px-[15px] cursor-pointer hover:text-[var(--cor03)] min-w-[80px] h-[40px] text-[17px] border-2 duration-300 rounded-full hover:border-[var(--cor05)] border-[var(--cor03)]`}
                onClick={() => {
                    setCategoriaMateria(prev => {
                        return prev?.includes(option) ? prev.filter(e => e !== option ) : [...prev, option]
                    })
                }}
            >
                {option}
            </button>
        </>
    )
}

export default CardsCategoriasMaterias