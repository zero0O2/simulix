import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import BemVindo from './pages/BemVindo'
import PrivateRoute from './components/PrivateRoute.jsx'
import Page404 from './pages/Page404.jsx'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Configuracao from './pages/Configuracao.jsx'


const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path='*' 
                        element={
                            <Page404 />
                        } 
                    />

                    <Route 
                        path='/bem-vindo' 
                        element={
                            <PrivateRoute local={"/"} loggedIn={false}>
                                <BemVindo />
                            </PrivateRoute>
                        } 
                    />

                    <Route 
                        path='/' 
                        element={
                        <PrivateRoute local={"/bem-vindo"} loggedIn={true}>
                            <Home />
                        </PrivateRoute>
                        } 
                    />

                    <Route
                        path='/configuracao'
                        element={
                            <PrivateRoute local={"bem-vindo"} loggedIn={true}>
                                <Configuracao/>
                            </PrivateRoute>
                        }
                    >

                    </Route>

                    <Route 
                        path='/login' 
                        element={
                        <PrivateRoute local={"/"} loggedIn={false}>
                            <Login />
                        </PrivateRoute>
                        } 
                    />

                    <Route 
                        path='/cadastro' 
                        element={
                        <PrivateRoute local={"/"} loggedIn={false}>
                            <Cadastro />
                        </PrivateRoute>
                        } 
                    />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router