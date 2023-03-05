import React from 'react'
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Grid from '../../components/Grid';
import { useContextS } from '../cart/Function';

const AllProducts = () => {
  let {  allProducts  } =  useContextS();
  const [page , setPage] = useState(1);


  return (
  
     <div className="container-fluid bg-trasparent my-4 p-3"  style={{position: "relative"}}>
        <div className="row row-cols-2 row-cols-xs-3 row-cols-sm-5 row-cols-lg-6 g-2">
        { allProducts.slice((page-1) * 12, (page-1) * 12 + 12).map(product => (
       <div key={product.id}>
      <Grid product={product} />

       </div>
        )) }
        </div>    </div>
  
  )
}

export default AllProducts
