const MsgSpanConfirm = ({func,title,confirmation,setState,setSpan}) => {
    return(
        <> 
            <div onClick={()=>setState(false)} className="w-[100dvw] h-[100dvh] backdrop-blur-[2px] z-30 flex justify-center absolute">
                <div className={`fixed top-10 bg-[var(--whiteCream)]  transition-all duration-300 flex flex-col text-[var(--textBlack)] rounded-[14px] gap-[20px] w-full max-w-[500px] p-[20px]`}>
                    <h1 className="text-[16px] text-center">{title}</h1>
                    <div className="flex justify-between w-full">
                        <button onClick={()=>{
                            setState(prev=>!prev)
                            setSpan({msg:"",confirmation:"Confirmar"})
                        }} className="w-[140px] text-[17px] cursor-pointer p-[5px_10px] rounded-[8px] bg-[#D81F25] hover:bg-[#e24146] text-[var(--whiteCream)] hover:scale-[1.03] duration-300">Voltar</button>
                        <button onClick={(e)=>{
                            e.stopPropagation()
                            func()
                            setState(prev=>!prev)
                            setSpan({msg:"",confirmation:"Confirmar"})
                        }} className="w-[140px] text-[17px] cursor-pointer p-[5px_10px] rounded-[8px] border-2 border-[var(--azulEscuro)] text-[var(--textBlack)] hover:bg-[var(--azulEscuro)] hover:text-[var(--whiteCream)] hover:scale-[1.03] duration-300">{confirmation}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MsgSpanConfirm