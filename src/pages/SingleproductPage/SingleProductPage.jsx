import React, { useEffect } from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useContextS } from '../cart/Function';

const SingleProductPage = () => {
    let {  allProducts, addToCart  } =  useContextS();
    let params = useParams();
    const param = params.name
    const pro = allProducts.map((cart) => cart ).filter((val)=> {
        return val.id === parseInt(param)
        });
        const product = pro[0]

        useEffect(() => {
            console.log(product)
          
        }, [allProducts])
  return (
   
  <div className=' home-page productSingle'>
 
  <div className=' productSingle__inner'>

    <div className='productSingle__image'>
  
      <img src={product?.images[0].src} alt={product?.name} />
      {product?.sale_price && <div> <p className="tag">Sale</p></div>}
    </div> 
<div className='productSingle__details '> 
<p className='productSingle__name'>{product?.name}</p>




<span dangerouslySetInnerHTML={{ __html: product?.short_description }} className='productSingle__features ' ></span>

  
      <div className='productSingle__footer'>    

<p className='productSingle__price price'>৳{product?.price} {product?.sale_price && <span className=" del">৳{product?.regular_price}</span>}</p>
{/* <span dangerouslySetInnerHTML={{ __html: details.description }} ></span> */}
      <div className="buttons ">
      <button className="buy-btn pp-btn" onClick={() => addToCart(product)}> <MdAddShoppingCart size={16} color="#FFF" />
        <span>  Add To Cart</span></button>
      
      </div>
    </div>
  </div>
 </div> 

<div className='container simmmilar'> <p className='top-line'>You might also like  </p> 
   


</div>
</div>

   
  )
}

export default SingleProductPage
