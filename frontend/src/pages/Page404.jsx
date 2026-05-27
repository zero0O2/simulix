import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider.jsx"
import HeaderAccess from "../components/HeaderAccess.jsx"

const Page404 = () => {
    const path = window.location.pathname

    const navigation = useNavigate()

    return (
        <>
            <div className="w-[100dvw] z-0 h-[100dvh] bg-[var(--cinza)] flex items-center justify-center">
                <div className="w-full h-full relative bg-[var(--verdeClaro)] overflow-hidden flex items-center justify-center">
                    <img className="w-full h-full absolute top-0 left-0 object-cover" src="./images/fundo.jpeg" alt="" />
                    <div className="w-full h-full absolute backdrop-brightness-45"></div>
                    <div className="z-10 w-full h-full flex-col p-[20px] citizen flex text-[var(--textWhite)]">

                        <HeaderAccess/>

                        <main className="flex-1 flex justify-center items-center">
                            <div className="max-w-[650px] w-full text-center">
                                <h1 className="text-[60px]">Erro 404</h1>
                                <p className="text-[20px]">A página {path} não foi encontrada</p>
                            </div>
                        </main>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Page404
