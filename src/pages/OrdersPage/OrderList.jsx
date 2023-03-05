import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import axios from 'axios';

import { TestContext } from '../../App';
import { useContextS } from '../cart/Function';


const OrderList = () => {
  const {    setActiveTabCart, setActiveTabOrder,setActiveTabHome, setActiveTabUser} = useContext(TestContext);
  let {  isLoggedIn , userID } =  useContextS();

  const [order, setOrder] = useState([]);
  const [details , setDetails] = useState([]);


  


   


// }
const getData2 =  () => {

  axios(`${process.env.REACT_APP_SHOP_LINK}wp-json/wc/v3/orders?${process.env.REACT_APP_KEY}&customer=${userID}&per_page=100`)
  .then(data2 => { const data = data2.data

    console.log(data)
      setOrder(data) 
  })

}
  useEffect( () => {


    if(isLoggedIn){
      getData2()  
    }

       
     
    setActiveTabCart(false)
    setActiveTabOrder(true)
    setActiveTabHome(false)
    setActiveTabUser(false)

       
      
}, [isLoggedIn,setActiveTabCart, setActiveTabOrder,setActiveTabHome,setActiveTabUser, userID ])

  return (
    <div className='cart-page'>
      
            <p className='top-line'>Your Orders </p>
          <div className='orders__inner' >      
        {order.map((name) => {
                     return  <div key={name.number} className='payment__summary pay_sum' > <Link to={`/order/${name.number}`}>
                      <h5>Order ID: 69420{name.number}</h5>
                      <p>Payment Method: {name.payment_method}</p>
                    <div className='order__list noScrollbar'>
                     
                    {name.line_items?.map((pro) => {
                              return   <div className='order__item item_order'> 
                      <div className='order__image'><img src={pro.image.src} alt=""   /></div>
                      <span className='order__name'>{pro.name}</span>
                      <span className="order__quantity">x{pro.quantity}</span>
                      </div>
                      }
                    )}</div>

                        <div className="payment__item" style={{marginTop: "auto"}}>
                        <span className="payment__name">Total Amount</span>
                          <span className="payment__price">{name.total}</span>
                        </div>
                        <div className="payment__item" style={{marginTop: "auto"}}>
                     <p className="payment__name">status  </p>
                     <span className='payment__status'> {name.status} </span>

                          </div>



                  </Link>   </div>
                     })}




                     
                     {!isLoggedIn && <p>Please Login To Check Orders</p> }
                     { order.length < 1 && <p>No order made yet.</p>}
                  
            </div>  
         
      </div>
  )
}

export default OrderList
