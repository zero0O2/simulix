import AsideTopLayout from "../components/AsideTopLayout";
import HeaderNavigate from "../components/newComponents/HeaderNavigate";
import { useNav } from "../contexts/NavigationProvider";
import QuestionPage from "../routes/QuestionPage";

const Home = () => {

    const {navigateInHome} = useNav()

    return (
        <>
            <div className="w-[100dvw] h-[100dvh] flex flex-col">
                <AsideTopLayout/>
                <HeaderNavigate/>
                
                {navigateInHome == "/home" &&
                
                    <p>Home</p>
                
                }

                {navigateInHome == "/questoes" &&
                    <QuestionPage/>
                }

            </div>
        </>
    )
}

export default Home