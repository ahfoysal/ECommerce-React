// import Featured from "../../components/Featured";
// import Common from "../../components/BestSelling";
// import AllProducts from "./All Items";
// import Banner from "../../components/banner";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { TestContext } from "../../App";
import AllProducts from "./AllProducts";
import Category from "./Category";
import './home.css'



  function Home() {
    const {    setActiveTabCart, setActiveTabOrder,setActiveTabHome, setActiveTabUser, setHeaderActive} = useContext(TestContext);
    useEffect(() => {
      setActiveTabCart(false)
      setActiveTabOrder(false)
      setActiveTabHome(true)
      setActiveTabUser(false)
      setHeaderActive(false)
    
    }, [])
    
    const [ctg , setCtg] = useState([]);
    const [active , setActive] = useState('all');
    

  return (

    <div className="home-page" > 
<Category  ctg={ctg} setCtg={setCtg} active={active} setActive={setActive}  />
    <AllProducts />
    
      {/* <Banner /> */}
      {/* <Featured /> */}
      
    {/* <Common /> */}
       

    </div>
  )
}

export default Home;
