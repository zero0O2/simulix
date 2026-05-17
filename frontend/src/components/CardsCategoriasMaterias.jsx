import { useQuestoes } from "../contexts/QuestoesProvider"

const CardsCategoriasMaterias = ({ option }) => {
    const {categoriaMateria, setCategoriaMateria} = useQuestoes()
    
    return (
        <>
            <button 
                className={`${categoriaMateria?.includes(option) ? 'bg-[var(--azulEscuro)] text-white' : 'text-[var(--azulCeu)]'} text-nowrap px-[15px] max-[710px]:px-[5px] max-[1120px]:text-[14px] cursor-pointer hover:text-white min-w-[80px] h-[40px] text-[17px] border-2 duration-300 rounded-full hover:border-[var(--azulEscuro)] hover:bg-[var(--azulEscuro)] border-[var(--azulCeu)]`}
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