import React from 'react'
import { FaStar } from 'react-icons/fa'
import { MdAddShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Grid = ({product}) => {
  return (
    <div>{product?.status === 'publish' && <>
        
        <div className="col hp" key={product.id}>
      <div className="card h-100 shadow-sm">
  
            <div>  <Link to={'/product/'+product.id}> <>
          <img src={product?.images[0]?.src} className="card-img-top" alt="product.title" />
      

       
       {product.sale_price && <div style={{overflow: 'hidden !important'}}> <p className="tag">Sale</p></div>}
       
    
      
        <div className="card-body">
        {/* {product.categories.map((pro,index) =>
           <p className="product__category" key={index}>  {pro.name} </p>)} */}
        <h5 className="card-title">
            <p className="product__name">{product.name }</p>
          </h5>
          <div className="clearfix ">
          <p className="product__price">৳{product.price} {product.sale_price && <span className=" del">৳{product.regular_price}</span>}</p>

          <p className="product__rating"><FaStar  className="star"/>0</p>
          </div>
         
          </div>
        
          </></Link>
         
          {/* <div className="add-to-cart">
          
          <button className="buy-btn pp-btn" onClick={() => addToCart(product)}> <MdAddShoppingCart size={16} color="#FFF" />
        <span>  Add To Cart</span></button>
        {/* {product.stock_quantity < 1 && product.stock_quantity != null && <p>Stock Out</p>} */}
          {/* </div> */} 
          
         
        </div>
      </div>
    </div>

        </>}</div>
  )
}

export default Grid
