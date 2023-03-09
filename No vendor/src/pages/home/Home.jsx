// import Featured from "../../components/Featured";
// import Common from "../../components/BestSelling";
// import AllProducts from "./All Items";
// import Banner from "../../components/banner";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { TestContext } from "../../App";
import { useContextS } from "../cart/Function";
import AllProducts from "./AllProducts";
import Category from "./Category";
import './home.css'



  function Home() {
    let {  allProducts  } =  useContextS();

    const {    setActiveTabCart, setActiveTabOrder,setActiveTabHome, setActiveTabUser, setHeaderActive} = useContext(TestContext);
    useEffect(() => {
      setActiveTabCart(false)
      setActiveTabOrder(false)
      setActiveTabHome(true)
      setActiveTabUser(false)
      setHeaderActive(false)
    
    }, [])
    
    const [active , setActive] = useState('all');
    const [activeCategory, setActiveCategory] = useState([])
    


    const getProduct = (id) =>{
       
      setActive(id)
      if(id === 'all'){
          return setActiveCategory(allProducts.slice(0,12))
      }
      const cartItems = allProducts.map((cart)=> {
          return cart.categories.map(cat => (cart)).filter((val)=> {
            return val.categories[0].name === id
                });          
          });
      
        const merged = [].concat.apply([], cartItems);
        let uniqueChars = [...new Set(merged)];
       
      setActiveCategory(uniqueChars)
      
      }




  return (

    <div className="home-page" > 
<Category   active={active}  setActive={setActive}  getProduct={getProduct}   />
    <AllProducts   pro={activeCategory.length < 1 ?  allProducts : activeCategory}/>
    
      {/* <Banner /> */}
      {/* <Featured /> */}
      
    {/* <Common /> */}
       

    </div>
  )
}

export default Home;
