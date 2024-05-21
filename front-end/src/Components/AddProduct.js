import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct =()=>{
    
    const [name, setName] = React.useState("")
    const [brand, setBrand] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [error,setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct=async()=>{

        if (!name || !price || !brand || !category)
            {
                setError(true);
                return false

            }

        const auth = localStorage.getItem('user');
        const userID = JSON.parse(auth)._id;
        console.warn(name,price,category,brand,userID);
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,brand,userID}),
            headers:{
                'Content-type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
        navigate("/Success");
    }
    return(
        <div>
            <h1>Add Product :</h1>
            <ul className='nobul'>
            <li><input className='inputbox' type="text" placeholder="Enter product name" value = {name} onChange={(e)=>{setName(e.target.value)}}/></li>
            {error && !name && <span className='validity'>Enter valid name!</span>}
            
            <li><input className='inputbox' type="text" placeholder="Enter product brand" value = {brand} onChange={(e)=>{setBrand(e.target.value)}}/></li>
            {error && !brand && <span className='validity'>Enter valid brand!</span>}

            <li><input className='inputbox' type="text" placeholder="Enter product category" value = {category} onChange={(e)=>{setCategory(e.target.value)}}/></li>
            {error && !category && <span className='validity'>Enter valid category!</span>}

            <li><input className='inputbox' type="text" placeholder="Enter product price" value = {price} onChange={(e)=>{setPrice(e.target.value)}}/></li>
            {error && !price && <span className='validity'>Enter valid price!</span>}

            </ul>
            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;