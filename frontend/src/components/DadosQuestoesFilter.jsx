import { useQuestoes } from "../contexts/QuestoesProvider"

const DadosQuestoesFilter = () => {

    const {questoesFilter,categoriaTypes,categoriaMateria} = useQuestoes()
    

    return (
        <>
            <div className="flex flex-col gap-[20px]">
                <div className="w-full flex gap-[10px] w-full justify-center">
                    <div className=" h-[60px] flex gap-[10px] justify-center items-center p-[10px_20px] rounded-[8px] text-[var(--textWhite)] bg-[var(--azulEscuro)]">
                        <p className="text-[16px]">Total de Questões:</p>
                        <span className="text-[22px]">{questoesFilter?.length}</span>
                    </div>
                </div>

                <div className="w-full flex items-center gap-[5px] flex-col">
                    <p>Tipo Selecionado:</p>

                    <p className="flex p-[5px_15px] bg-[var(--azulEscuro)] rounded-full text-[var(--textWhite)]">{categoriaTypes}</p>

                </div>

                <div className="w-full flex gap-[5px] items-center flex-col">
                    <p>{categoriaMateria?.length > 1 ? "Matérias Selecionadas" : "Matéria Selecionada"}:</p>

                    <div className="flex gap-[10px]">
                        {categoriaMateria.length ?
                            categoriaMateria?.map((type)=>(
                                <p key={type} className="flex p-[5px_15px] bg-[var(--azulEscuro)] rounded-full text-[var(--textWhite)]">{type}</p>
                            ))
                        :
                            <p className="flex p-[5px_15px] bg-[var(--azulEscuro)] rounded-full text-[var(--textWhite)]">Todas</p>
                        
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DadosQuestoesFilter