import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Login=()=>{

    const[email,setEmail] = React.useState('');
    const[password,setPassword] = React.useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (auth){navigate('/');}
    },[])
    const HandleLogin=async()=>{

        let result = await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if(result.authentication)
        {
            localStorage.setItem('user',JSON.stringify(result.User));
            localStorage.setItem('token',JSON.stringify(result.authentication));

            navigate("/WelcomeBack")

        }else{
            alert("Please enter the correct details")
        }
    }

    return(
        <div className='login'>
            <h1>Login</h1>
            <ul className='nobul'>
            <li><input className ='inputbox' type='text' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}/></li>

            <li><input className ='inputbox' type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password}/></li>

            <button onClick= {HandleLogin} className = 'appButton' type="button">Log In</button>
            </ul>
        </div>
    )
}
export default Login;