import axios from "axios"
import { useState } from "react"
import { useQuestoes } from "../contexts/QuestoesProvider"
import LoadCircle from "../components/LoadCircle"

const HomeOptiosExportQuestions = () => {

    const {CriarQuestoesForJSON,CriarQuestoesForUserId} = useQuestoes()
    const [load,setLoad] = useState(false)

    const [jsonQuestions,setJsonQuestions] = useState("")

    const Submit = async () => {
        setLoad(true)
        try {
            const questions = await CriarQuestoesForJSON(JSON.parse(jsonQuestions))
            
            await Promise.all(
                questions.map(async (e) => {
                    console.log(e)
                    await CriarQuestoesForUserId(e)
                })
            )
            
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
        setJsonQuestions("")
            
    }


    return(
        <>
            <div className="w-full h-full overflow-y-scroll flex flex-col gap-[10px] p-[20px_30px]">

                <h1 className="text-[var(--white)] text-[17px]">Cole o JSON aqui :</h1>
                <p className="text-[14px]">(Se precisar copie o prompt e envie as questões que precisar.)</p>

                <form className="w-full flex flex-col">
                    <label>
                        <textarea onChange={(e) => setJsonQuestions(e.target.value)} value={jsonQuestions} className="resize-none h-[300px] outline-none border-0 w-full bg-[var(--whiteCream)] text-[var(--textBlack)]"></textarea>
                    </label>
                    <button onClick={(e)=>{
                        e.preventDefault()
                        Submit()
                    }} className="hover:bg-[var(--azulEscuro)] cursor-pointer duration-100 flex self-start p-[5px_25px] rounded-[5px] bg-[var(--azulCeu)] text-[var(--white)]">Enviar {load && <LoadCircle/>}</button>
                </form>

<p className="whitespace-pre-wrap text-sm text-gray-300">
{`Sempre que eu enviar uma ou várias questões, transforme TODAS elas para o formato JSON especificado abaixo.

REGRAS:

1. Você deve aceitar questões enviadas em qualquer formato, seja texto, imagem ou várias questões de uma vez.
2. Para cada questão, crie um objeto dentro de um array JSON.
3. A resposta deve conter SOMENTE o JSON, sem explicações, comentários, introduções ou markdown.
4. Nunca altere a estrutura do JSON.
5. Os campos devem ser exatamente:
- "title"
- "subject"
- "examType"
- "question"
- "options"

6. O campo "options" deve conter todas as alternativas da questão, e cada alternativa deve possuir:
- "text"
- "correct"

7. A alternativa correta deve possuir "correct": true.
8. Todas as outras alternativas devem possuir "correct": false.
9. Se houver mais de uma alternativa correta, marque todas as corretas como "correct": true.
10. NÃO invente alternativas que não estejam na questão.
11. Preserve o texto original da questão e das alternativas o máximo possível.
12. Identifique a matéria pelo conteúdo da questão.
13. Para "subject", use SOMENTE uma destas opções:
- "Matemática"
- "Português"
- "História"
- "Geografia"
- "Física"
- "Química"
- "Biologia"
- "Inglês"
- "Espanhol"
- "Artes"
- "Educação Física"

14. Para "examType", use SOMENTE uma destas opções:
- "ENEM"
- "UECE"
- "Faculdade"
- "Cursinho"
- "Outro"

15. Se a origem da questão não estiver informada, use "Outro".
16. O campo "title" deve ser um título curto e descritivo da questão.
17. Nunca coloque valores diferentes das opções permitidas em "subject" e "examType".
18. Mantenha a ordem das questões e das alternativas.
19. O JSON deve ser sempre válido e pronto para ser utilizado diretamente com JSON.parse().
20. Se eu enviar 1 questão, retorne 1 objeto no array. Se eu enviar várias, retorne todas.

FORMATO OBRIGATÓRIO:

[
{
    "title": "título da questão",
    "subject": "uma das matérias permitidas",
    "examType": "uma das origens permitidas",
    "question": "enunciado da questão",
    "options": [
    {
        "text": "alternativa 1",
        "correct": false
    },
    {
        "text": "alternativa 2",
        "correct": true
    }
    ]
}
]

IMPORTANTE:
- A resposta deve ser APENAS o JSON válido.
- Nunca use explicações antes ou depois.
- Nunca use markdown ou blocos de código.
- Não invente informações que não estejam na questão.`}
</p>

            </div>
        
        </>
    )
}


export default HomeOptiosExportQuestions