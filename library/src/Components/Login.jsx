import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleClick = async () => {
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            })
            alert("logged in");
            localStorage.setItem('token', res.data.token);

            navigate('/Home');
        }catch(err){
            alert("errpr logging in");
        }
    }
    return(
        <>
            <div className='flex flex-col'>
                <input
                    type="text"
                    placeholder="username"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleClick}>Log in</button>
                <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
    
}

export default Login