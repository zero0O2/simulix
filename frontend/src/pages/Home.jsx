import AsideNavigate from "../components/AsideNavigate";
import AsideForHours from "../components/AsideForHours";
import HomeTarefas from "../routes/HomeTarefas";
import { useNav } from "../contexts/NavigationProvider";
import { IoCaretBackOutline } from "react-icons/io5";

import AsideTopLayout from "../components/AsideTopLayout";
import Cronograma from "../utils/Cronograma";

const Home = () => {

    const {
        asideDisplay, setAsideDisplay,
        navigateInHome
    } = useNav()



    return (
        <>
            <div className="w-[100dvw] z-0 h-[100dvh] bg-[var(--Preto)] overflow-hidden text-[var(--textWhite)] flex">
                Teste de update

            </div>
        </>
    )
}

export default Home