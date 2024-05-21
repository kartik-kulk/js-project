import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SignUp=()=>{
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");
    const [error,setError]=useState(false);

    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (auth){navigate('/');}
    },[])
    const collectData=async()=>{

        if (!fname||!lname||!email || !password||!cpassword)
            {
                setError(true);
                return false
    
            }

        if (password == cpassword) {
            console.warn(fname,lname,email,password)
            let result = await fetch("http://localhost:5000/Reg",{
                method:'post',
                body:JSON.stringify({fname,lname,email,password}),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            result=await result.json();
            console.warn(result);
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.authentication));

            navigate('/Success');
        }
        else {console.warn("Passwords are not matching, please try again")}
    }
    return(
        <div className='Registration'>
            <h1>Register!</h1>
            <ul className='nobul'>
                <li><input className='inputbox' type="text" placeholder="Enter First Name" value={fname} onChange={(e)=>setFname(e.target.value)}/></li>
                {error && !fname && <span className='validity'>Enter valid first name!</span>}

                <li><input className='inputbox' type="text" placeholder="Enter Last Name" value={lname} onChange={(e)=>setLname(e.target.value)}/></li>
                {error && !lname && <span className='validity'>Enter valid last name!</span>}

                <li><input className='inputbox' type="text" placeholder="Enter E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/></li>
                {error && !email && <span className='validity'>Enter valid email!</span>}

                <li><input className='inputbox' type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/></li>
                {error && !password && <span className='validity'>Enter valid password!</span>}

                <li><input className='inputbox' type="password" placeholder="Confirm Password" value={cpassword} onChange={(e)=>setCpassword(e.target.value)}/></li>
                <li>{error && !cpassword && <span className='validity'>Enter valid password!</span>}</li><li>{(password != cpassword) && <span className='validity'>Passwords dont match</span>}</li>

                <button onClick={collectData} className='appButton' type="button">Sign Up</button>
            </ul>
        </div>
    )
}
export default SignUp