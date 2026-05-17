import { useEffect, useState } from "react"
import { useQuestoes } from "../contexts/QuestoesProvider"
import AsideCardsCategoria from "../components/AsideCardsCategoria"
import typesQuestions from "../assets/json/typesQuestions.json"
import subjectQuestion from "../assets/json/subjectQuestion.json"
import CardsCategorias from "../components/CardsCategorias"
import CardsCategoriasMaterias from "../components/CardsCategoriasMaterias"

const HomeOptiosFilterQuests = () => {

    return (
        <>
            <div className="w-full h-full flex flex-col px-[20px] gap-[10px] items-center">
                <h1 className="text-[24px] w-full">Filtargem</h1>

                <div className="flex min-w-0 gap-[10px] backdrop-brightness-50 p-[10px] rounded-[10px] flex-wrap">
                    {typesQuestions?.types?.map(types => (
                        <CardsCategorias index={types} option={types}/>
                    ))}
                </div>
                <div className="flex min-w-0 gap-[10px] backdrop-brightness-50 p-[10px] rounded-[10px] flex-wrap">
                    {subjectQuestion?.subject?.map(types => (
                        <CardsCategoriasMaterias index={types} option={types}/>
                    ))}
                </div>
                
            </div>
        </>
    )
}

export default HomeOptiosFilterQuests