import React, { useEffect, useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useContextS } from '../cart/Function';
import VariationContainer from './VariationContainer';

const SingleProductPage = () => {
    let {  allProducts, addToCart  } =  useContextS();
    const [isLoading, setLoading] = useState(true);
    const [variations , setVariations] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [warning, setWarning] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);





    let params = useParams();
    const param = params.name
    const pro = allProducts.map((cart) => cart ).filter((val)=> {
        return val.id === parseInt(param)
        });
        const product = pro[0]


        function   variationHandle(id){
          let clone = { ...product }
          clone.id = id.id
      
          const att = id.attributes.map((names) =>  names.option)
        
          clone.name = `${product.name} ${att}`
          clone.price = id.price
          clone.parent_id = product.id
        
          setCurrentItem(clone)
          setWarning(false)
          
          }
          
        
    
        function pressHandler(){ 
          // console.log(product.variations)
         
          if(product.variations.length < 1 || product.parent_id != 0){
          
           return  addToCart(product)
          }
          // console.log(id)
          if(!currentItem){
            setWarning(true)
            return alert('Select Variation')
          }else{
            addToCart(currentItem)
           
          }
        
     
                }

      
          useEffect(() => {
            console.log(param)
            const dataFetch = async () => {
              const data = await (
                await fetch(
                  process.env.REACT_APP_SHOP_LINK+`wp-json/wc/v3/products/`+product?.id+`/variations?`+process.env.REACT_APP_KEY+'&per_page=100')
              ).json();      
              setVariations(data)
              console.log(data)
              setLoading(false)
              };
            if(product)( dataFetch())
          
        }, [product])
     
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

{variations.length > 0 && <>
          <VariationContainer  setCurrentItem={setCurrentItem} warning={warning} variationHandle={variationHandle} selectedItem={selectedItem} setSelectedItem={setSelectedItem} isLoading={isLoading}  product={product} variations={variations}/>
        </>}
      <div className='productSingle__footer'>    
     
<p className='productSingle__price price'>৳{product?.price} {product?.sale_price && <span className=" del">৳{product?.regular_price}</span>}</p>
{/* <span dangerouslySetInnerHTML={{ __html: details.description }} ></span> */}

      <div className="buttons full-width">
      <button className="buy-btn pp-btn full-widths" onClick={() => pressHandler(product)}> <MdAddShoppingCart size={16} color="#FFF" />
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
