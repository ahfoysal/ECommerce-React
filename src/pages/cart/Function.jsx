import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Cookies } from 'react-cookie';
import jwt_decode from "jwt-decode";


const contextProviderS = createContext();

export function ContextProviderS({ children }) {
  const cookies = new Cookies();

    const [test2 , setTest2] = useState(false);
    const [cart , setCart] = useState([]);
    const [allProducts , setAllProducts] = useState([]);
    const [isLoggedIn , setIsloggedIn] = useState(false);
    const [userID , setUserID] = useState('');

  


    
    function addToCart(id) {
      console.log(id)

      const newCart = [...cart, id];
      setCart(newCart);
      toast.success('🛒 Added to cart', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored"
        });
        addToDb(id.id)
        localStorage.setItem("cartItems", JSON.stringify(newCart))
        getCart();
        console.log(id)
         
    }


    const getCart = () => {
      const newCart = localStorage.getItem("cartItems" ) 
    setCart(JSON.parse(newCart))
    const nnnn = JSON.parse(newCart)
    const savedCart = getStoredCart();
    const savedId = Object.keys(savedCart);
    const cartPd = savedId.map( id => {
      const product = nnnn.find( pd => pd.id.toString() === id)
      product.abc = savedCart[id];
      return product
    } );
    
    
    setCart(cartPd)
    
    
    }
    const addToDb = id => {
      const exists = getDb();
      let shopping_cart = {};
      if (!exists) {
        shopping_cart[id] = 1;
      }
      else {
        shopping_cart = JSON.parse(exists);
        if (shopping_cart[id]) {
          const newCount = shopping_cart[id] + 1;
          shopping_cart[id] = newCount;
        }
        else {
          shopping_cart[id] = 1;
        }
      }
      updateDb(shopping_cart);
      console.log(shopping_cart);
    }
    const getDb = () => localStorage.getItem('shopping_cart');
    const updateDb = cart => {
      localStorage.setItem('shopping_cart', JSON.stringify(cart));
    }
    const removeFromDb = id => {
      const exists = getDb();
      if (!exists) {
      }
      else {
        const shopping_cart = JSON.parse(exists);
        delete shopping_cart[id];
        updateDb(shopping_cart);
      }
      getCart()
    }
    const getStoredCart = () => {
      const exists = getDb();
      return exists ? JSON.parse(exists) : {};
    }
    const clearTheCart = () => {
     
      setCart([]) 
      localStorage.removeItem('shopping_cart');
      console.log(localStorage.getItem('shopping_cart'));
    }







    const fetchProducts= () =>{
  
   
      axios(`${process.env.REACT_APP_SHOP_LINK}wp-json/wc/v3/products?${process.env.REACT_APP_KEY}&per_page=100`)
    .then(data2 => { const data = data2
     
      setAllProducts(data.data)
      console.log('all products fetching');

    })
  
}

    
    useEffect(() => {
    
      const tokens = cookies.get('token')
      fetchProducts()
      if(cookies.get('token')){
        try {
        
          if(tokens === 'undefined'){
             return console.log('hi')
          }
          const data = jwt_decode(cookies.get('token'));
          // console.log(data)
          setUserID(data.id)
          // valid token format
        } catch(error) {
          // invalid token format
        }
        // const token = jwt_decode(cookies.get('token'))
       
        setIsloggedIn(true)
      }
      else(console.log('not logged in'))
      

    }, []);
    return(  
    <contextProviderS.Provider value={{ userID, addToCart, cart, test2 , updateDb, getDb, clearTheCart,removeFromDb, getCart, setCart, setTest2, allProducts, isLoggedIn }}>{children}</contextProviderS.Provider>)
    ;

}

export function useContextS() {
    return useContext(contextProviderS);
}


