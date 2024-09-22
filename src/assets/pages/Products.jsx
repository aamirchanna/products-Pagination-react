import axios from "axios";


import React from 'react';

function Products() {
    
    axios.get('https://dummyjson.com/products').then((item)=>{console.log(item) }).catch(()=>{
        console.log(err)
    })
    return (
        <div>
           <h2>Products</h2> 
        </div>
    );
}

export default Products;


