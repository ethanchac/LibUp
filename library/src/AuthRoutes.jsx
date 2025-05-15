import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import Layout from './Components/Layout.jsx'
import Start from './Start'
const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('token');

    if(!token){
        console.log("no token");
        return <Navigate to="/login"/>
    }

    return children
}

function AuthRoutes(){
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route
                path="/Home"
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}

export default AuthRoutes;