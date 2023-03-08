import React from 'react'
import { useState } from 'react';
import './singlePage.css'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';


const VariationContainer = ({isLoading, product, variations, selectedItem, setSelectedItem, variationHandle, warning, setCurrentItem}) => {
 
    const [isItemSelected, setIsItemSelected] = useState(null);
  
  const variationHandler = async (id) => {
    if(isItemSelected == id.id){
      setCurrentItem(null)
      setSelectedItem(null)
      return setIsItemSelected(null)
    }
    setIsItemSelected(id.id)
    setSelectedItem(id)
    variationHandle(id)

    console.log(id.attributes[0].name, id.attributes[0].option)
   
    };

    
    return (
    <div className={`variationContainer ${warning && 'warning'}`}>
        <div className='flex-rows'>
        {!selectedItem ? <p className='description'> Variations</p> : <p className='description' > Selected:</p>}
        <div className='flex-rows'>
        {selectedItem  &&  selectedItem.attributes.map((name,index) => {
      return  <p  key={index} >{selectedItem.attributes[index].name} : {selectedItem.attributes[index].option}, </p>
    })}</div>
       
        {isLoading ? <p>Loading...</p> : <div className=''>
       
       
  
        </div> }  
        </div>
    
        <div className='order__list noScrollbar max-width'>
        <div className='size-s'>
        {product.attributes.map((att, index) => {
   return       <p  key={index} className='attSize'>{att.name}</p>
 })}
        </div>
        {variations.map((products, index) => {
    return     <div  className={`inner-item-vari ${isItemSelected === products.id && 'active-back'}`}  onClick={() => variationHandler(products)} key={index} >
  
    <img src={products.image.src} alt="" width="60px" height="60px" />

    <div >  
    {products.attributes.map(att => {
      return         <p key={att.option} className='attSize'>{att.option} </p>

    })}
    </div>
  
    </div>
  })}             
        </div>
 
                       
    </div>
  )
}

export default VariationContainer


