
import { useAuth } from "../contexts/AuthProvider";
import AsideForHours from "../components/AsideForHours";
import { CiLogout } from "react-icons/ci";

const AsideTopLayout = () => {
    const {user,Loggout} = useAuth()

    return (
        <>
            <header className="w-full min-h-[50px] bg-[var(--01)] text-[var(--09)] flex items-center justify-between px-[20px]">
                <div className=" flex justify-center gap-[10px] items-center">
                    <img className="object-cover w-[35px] h-[35px] rounded-[10px] " src="/images/logoSite.jpg" alt="Logo" />
                    <h1 className="text-[20px] max-[480px]:hidden">Simulix</h1>
                </div>
                <AsideForHours/>
                <div className=" flex gap-[10px] items-center">
                    <span className="text-[14px] flex gap-[10px] justify-center items-center">
                        <p className="text-[14px] ">Olá, como vai </p>
                        <h1 className="text-[18px]">{user?.name?.split(' ').slice(0,2).join(' ')}</h1> 
                        <img className="w-[35px] h-[35px] rounded-full object-cover " src={user?.avatar} alt="" />
                    </span>
                    <button onClick={()=>Loggout()} className="text-[20px] border-0 outline-0 text-[var(--incorrect)] cursor-pointer"><CiLogout /></button>
                </div>
            </header>



        </>
    )
}

export default AsideTopLayout
