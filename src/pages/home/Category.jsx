import React from 'react'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useContextS } from '../cart/Function';
import '@splidejs/react-splide/css';
import { useEffect } from 'react';


const Category = ({ctg , setCtg ,active ,setActive}) => {
    let {  allProducts  } =  useContextS();



    const ctgName =  allProducts.map(product => {
        return product.categories.map(categories => ( categories.name))})
        const merged = [].concat.apply([], ctgName);
        let uniqueChars = [...new Set(merged)];
      
        useEffect(() => {
             setCtg(uniqueChars)
        }, [allProducts])
    
      

  return (
    <div>
    <Splide  options={{
        arrows: false,      pagination: false,        gap: '10px',   perPage: 10,
        breakpoints: {
          700: {        perPage: 5,    gap: '10px'      },
          
          1000: {        perPage: 5,    gap: '10px'      }

        }
      }}>
        <SplideSlide className={'catergory-bar  test '}><p className={` cat-btn categories__category ${active === 'all' ? 'cat-active' : ' '}`} >All Products</p></SplideSlide>

        {ctg.map((ctgn) => {
  return <SplideSlide className={' catergory-bar'} key={ctgn}>   <p  className={` cat-btn categories__category ${active === ctgn ? 'cat-active' : ' '}`}   > {ctgn}</p> </SplideSlide>
})}
        </Splide>
      
    </div>
  )
}

export default Category
