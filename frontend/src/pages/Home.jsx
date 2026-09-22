import AsideTopLayout from "../components/AsideTopLayout";
import HeaderNavigate from "../components/newComponents/HeaderNavigate";
import { useAcess } from "../contexts/AcessibilityProvider";
import { useNav } from "../contexts/NavigationProvider";
import QuestionPage from "../routes/QuestionPage";
import SimuladoPage from "../routes/SimuladoPage";
import DashBoardPage from "../routes/DashBoardPage";

const Home = () => {

    const {navigateInHome} = useNav()
    const {theme} = useAcess()


    return (
        <>
            <div className="w-[100dvw] h-[100dvh] bg-[var(--03)] flex flex-col" datatheme={theme}>
                <AsideTopLayout/>
                <HeaderNavigate/>
                
                {navigateInHome == "/home" &&
                    <DashBoardPage/>
                }

                {navigateInHome == "/questoes" &&
                    <QuestionPage/>
                }

                {navigateInHome == "/simulado" &&
                    <SimuladoPage/>
                }

            </div>
        </>
    )
}

export default Home