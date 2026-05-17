import CardsCategorias from "../components/CardsCategorias"
import typesJson from "../assets/json/typesQuestions.json"

const AsideCardsCategoria = () => {
    

    return (
        <>

            <aside className=" max-[1180px]:hidden flex items-center flex-nowrap max-[700px]:justify-between max-[630px]:gap-[10px] max-[700px]:px-0 justify-center gap-[20px] px-[20px]">
                {
                    typesJson.types.map((e)=>{
                        return <CardsCategorias key={e} option={e}/>
                    })
                }
            </aside>

        </>
    )
}

export default AsideCardsCategoria