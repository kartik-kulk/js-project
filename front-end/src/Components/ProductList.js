import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const auth = localStorage.getItem('user')
    const Navigate = useNavigate();

    useEffect(() => {
        
        var UserID = JSON.parse(auth)._id;
        getProducts(UserID);
    }, []);

    const getProducts = async (UserID) => {
        let result = await fetch(`http://localhost:5000/prods/${UserID}`, {
            method:"get",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const Del=async(id)=>{
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result)
        {
            var UserID = JSON.parse(auth)._id;
            alert("Product Deleted!");
            getProducts(UserID);
        }
    }

    const Upd=(id)=>{
        Navigate("/update/"+id)
    }

    const searchHandle=async(event)=>{
        let key = event.target.value;
        var UserID = JSON.parse(auth)._id;
        if (key){
            let result = await fetch(`http://localhost:5000/search/${key}/${UserID}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json()
            if(result){
                setProducts(result)
            }
        }
        else{
            getProducts(UserID);
        }
        
    
    }

    return (
        <div className=''>
            <h1>Product List : </h1>
            <input type='text' className='Searchbox' placeholder='Search Product' onChange={searchHandle}/>
            <ul className='product-list'>
                <li>S. No</li>
                <li>Category</li>
                <li>Name</li>
                <li>Brand</li>
                <li>Price</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item,index) =>
                    <ul className='product-list' key = {item}>
                        <li>{index + 1}</li>
                        <li>{item.category}</li>
                        <li>{item.name}</li>
                        <li>{item.brand}</li>
                        <li>{item.price}</li>
                        <li>
                            <button className='operationButtons' onClick={()=>Del(item._id)}>Delete</button>
                            <button className='operationButtons' onClick={()=>Upd(item._id)}>Update</button>
                        </li>
                    </ul>
                )
                :
                <h1>No Result Found!</h1>
            }

        </div>
    )
}

export default ProductList;