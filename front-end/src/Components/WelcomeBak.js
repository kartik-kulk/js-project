import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'


const Welcome=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (!auth){navigate('/');}
    },[])
    return(<div>
    <h3>Welcome back, {JSON.parse(auth).fname}</h3>
    </div>
    )
}
export default Welcome;
