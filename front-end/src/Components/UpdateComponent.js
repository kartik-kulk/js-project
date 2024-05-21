import React, { useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';


const UpdateProduct =()=>{
    
    const [name, setName] = React.useState("")
    const [brand, setBrand] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [price, setPrice] = React.useState("")
    const params = useParams();
    const Navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method:"get",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        console.warn(result)
        setName(result.name);
        setBrand(result.brand);
        setCategory(result.category);
        setPrice(result.price);
    }

    const updateProduct=async()=>{
        console.warn(name,price,category,brand)
        let result = await fetch(`http://localhost:5000/update/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,brand}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        console.warn(result)
        if (result){Navigate('/');}
        
    }
    return(
        <div>
            <h1>Update Product :</h1>
            <ul className='nobul'>
            <li><input className='inputbox' type="text" placeholder="Enter product name" value = {name} onChange={(e)=>{setName(e.target.value)}}/></li>
            
            <li><input className='inputbox' type="text" placeholder="Enter product brand" value = {brand} onChange={(e)=>{setBrand(e.target.value)}}/></li>

            <li><input className='inputbox' type="text" placeholder="Enter product category" value = {category} onChange={(e)=>{setCategory(e.target.value)}}/></li>

            <li><input className='inputbox' type="text" placeholder="Enter product price" value = {price} onChange={(e)=>{setPrice(e.target.value)}}/></li>

            </ul>
            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;