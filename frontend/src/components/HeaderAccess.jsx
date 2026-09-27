import {useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"

const HeaderAccess = () => {

    const navigation = useNavigate()

    const {access} = useAuth()

    return (
        <>

            <header className="flex w-full h-[60px] z-0 relative overflow-hidden rounded-[10px]">
                <div className="h-full w-full absolute backdrop-brightness-90"></div>

                <nav className="z-10 w-full h-full flex items-center justify-between px-[20px]">
                    <h1 onClick={()=>navigation("/")} className="text-[25px] cursor-pointer">Simulix</h1>

                    {access ? (
                            <span onClick={() => navigation("/")} className="flex justify-center items-center gap-[15px]">
                            <button className="border-[var(--azulCeu)] hover:border-[var(--cor02)] border-2 hover:scale-[1.05] duration-300 cursor-pointer h-[40px] w-[120px] rounded-full outline-none text-[20px]">Home</button>
                        </span>
                    ) : (
                        <span className="flex justify-center items-center gap-[15px]">
                            <button onClick={() => navigation("/cadastro")} className="border-[var(--05)] hover:border-[var(--cor02)] border-2 hover:scale-[1.02] duration-300 cursor-pointer h-[40px] w-[120px] rounded-full outline-none text-[20px]">Cadastrar</button>
                            <button onClick={() => navigation("/login")} className="bg-[var(--camel)] hover:scale-[1.05] hover:bg-[var(--khaki-beige)] duration-300 hover:text-[var(--coffee-bean)] cursor-pointer h-[40px] w-[120px] text-[var(--ash-brown-2)] rounded-full outline-none text-[20px]">Entrar</button>
                        </span>
                    )}
                </nav>
            </header>

        </>
    )
}

export default HeaderAccess