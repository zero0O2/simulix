import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider.jsx"
import HeaderAccess from "../components/HeaderAccess.jsx"
import { useState } from "react"

const Cadastro = () => {
    const navigation = useNavigate()


    const [ nameUser, setNameUser ] = useState("")
    const [ emailUser, setEmailUser ] = useState("")
    const [ senhaUser, setSenhaUser ] = useState("")
    const [ confirmarSenhaUser, setConfirmarSenhaUser ] = useState("")
    
    const [ erros, setErros ] = useState({})

    const {CreatedUser} = useAuth()

    const Submit = async(event) => {
        event.preventDefault()
        const formDataUser = {
            name: nameUser,
            email: emailUser,
            password: senhaUser,
            passwordConfirm: confirmarSenhaUser
        }

        const response = await CreatedUser(formDataUser)

        if(response.erros){
            return setErros(response.erros)
        }

        setErros({})
        navigation('/login')

    }
    
    return (
        <>
            <div className="w-[100dvw] z-0 h-[100dvh] bg-[var(--cinza)] p-[10px] flex items-center justify-center">
                <div className="w-full h-full relative bg-[var(--verdeClaro)] overflow-hidden rounded-[30px] flex items-center justify-center">
                    <img className="w-full h-full absolute top-0 left-0 object-cover" src="./images/fundo.jpeg" alt="" />
                    <div className="w-full h-full absolute backdrop-brightness-60"></div>
                    <div className="z-10 w-full h-full flex-col citizen flex text-[var(--textWhite)]">
                        
                        <main className=" flex flex-1 flex justify-end">
                            <div className="w-full h-full flex items-center flex-col justify-center">
                                <h1 className="text-[40px]">Seu preparo começa aqui</h1>
                                <h1 className="text-[30px] text-center max-w-[750px]">Transforme estudo em resultado e comece a resolver questões e acompanhe sua evolução.</h1>
                            </div>
                            <div className="w-full relative z-0 max-w-[550px] h-full flex ">
                                <div className="absolute  w-full h-full"></div>
                                <div className="absolute backdrop-blur-[15px] backdrop-brightness-65 w-full h-full"></div>

                                <div className="flex flex-col p-[30px] flex-1 z-10 gap-[30px] py-[50px]">

                                    <header className="w-full justify-center items-center flex">
                                        <h1 className="text-[40px]">Crie sua conta</h1>
                                    </header>

                                    <form onSubmit={Submit} className="w-full flex flex-col items-center gap-[50px]" >

                                        <label className="w-full flex flex-col relative justify-center">
                                            <input onChange={(e)=>{
                                                setNameUser(e.target.value)
                                                setErros(prev => ({...prev, name: undefined}))
                                                }} value={nameUser} className="peer w-full border-2 border-[var(--verdeClaro)] outline-none rounded-[10px] h-[45px] px-[10px]" type="text" />
                                            <h1 className={`absolute text-[18px] top-1/2 -translate-y-1/2 peer-focus:top-[-12px] peer-focus:left-[0px] ${nameUser ? 'left-[0px] top-[-12px]' : 'left-[10px]'} transition-all duration-300 px-[5px]`}>Nome(completo)</h1>
                                            {erros.name && <p className="text-red-500 absolute -bottom-1/2 text-[14px]">{erros?.name}</p>}
                                        </label>

                                        <label className="w-full flex flex-col relative justify-center">
                                            <input onChange={(e)=>{
                                                setEmailUser(e.target.value)
                                                setErros(prev => ({...prev, email: undefined}))
                                                }} value={emailUser} className="peer w-full border-2 border-[var(--verdeClaro)] outline-none rounded-[10px] h-[45px] px-[10px]" type="text" />
                                            <h1 className={`absolute text-[18px] top-1/2 -translate-y-1/2 peer-focus:top-[-12px] peer-focus:left-[0px] ${emailUser ? 'left-[0px] top-[-12px]' : 'left-[10px]'} transition-all duration-300 px-[5px]`}>Email</h1>
                                            {erros.email && <p className="text-red-500 absolute -bottom-1/2 text-[14px]">{erros?.email}</p>}
                                        </label>

                                        <label className="w-full flex flex-col relative justify-center">
                                            <input onChange={(e)=>{
                                                setSenhaUser(e.target.value)
                                                setErros(prev => ({...prev, password: undefined}))
                                                }} value={senhaUser} className="peer w-full border-2 border-[var(--verdeClaro)] outline-none rounded-[10px] h-[45px] px-[10px]" type="password" />
                                            <h1 className={`absolute text-[18px] top-1/2 -translate-y-1/2 peer-focus:top-[-12px] peer-focus:left-[0px] ${senhaUser ? 'left-[0px] top-[-12px]' : 'left-[10px]'} transition-all duration-300 px-[5px]`}>Senha</h1>
                                            {erros.password && <p className="text-red-500 absolute -bottom-1/2 text-[14px]">{erros?.password}</p>}
                                        </label>

                                        <label className="w-full flex flex-col relative justify-center">
                                            <input onChange={(e)=> {
                                                setConfirmarSenhaUser(e.target.value)
                                                setErros(prev => ({...prev, passwordConfirm: undefined}))
                                                }} value={confirmarSenhaUser} className="peer w-full border-2 border-[var(--verdeClaro)] outline-none rounded-[10px] h-[45px] px-[10px]" type="password" />
                                            <h1 className={`absolute text-[18px] top-1/2 -translate-y-1/2 peer-focus:top-[-12px] peer-focus:left-[0px] ${confirmarSenhaUser ? 'left-[0px] top-[-12px]' : 'left-[10px]'} transition-all duration-300 px-[5px]`}>Confirmar Senha</h1>
                                            {erros.passwordConfirm && <p className="text-red-500 absolute -bottom-1/2 text-[14px]">{erros?.passwordConfirm}</p>}
                                        </label>
                                        
                                        <button type="submit" className="w-[300px] border-[var(--azulCeu)] h-[40px] border-2 rounded-[10px] hover:bg-[var(--azulEscuro)] duration-300 cursor-pointer">Criar conta</button>
                                    </form>

                                    <p>Já tem uma conta? <Link to="/login" className="text-[var(--verde)] hover:underline">Entre</Link></p>

                                </div>

                            </div>
                        </main>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cadastro