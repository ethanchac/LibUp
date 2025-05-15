import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try{
            const res = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                password,
            });
            alert('signed up');
        }catch(err){
            console.error(err.response?.data || err.message || err);
            alert('sign up failed');
        }
    }
    return(
        <>
            <input 
                type="text"
                placeholder="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign up</button>
            <Link to="/login">Log in</Link>
        </>
    )
}

export default Signup;