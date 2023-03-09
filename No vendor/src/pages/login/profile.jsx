import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TestContext } from '../../App';
import { useContextS } from '../cart/Function';
import { Cookies, useCookies } from 'react-cookie';



const Profile = () => {
  const [ setCookie, removeCookie] = useCookies(['token']);
  // const [ removeCookie] = useCookies(['token']);
  const {    setActiveTabCart, setActiveTabOrder,setActiveTabHome, setActiveTabUser} = useContext(TestContext);
  let { userID, isLoggedIn} =  useContextS();
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate();

  const handleLogOut =  () => {

    removeCookie('token')
    navigate('/')
    window.location.reload(false)
  }
  const fetchUSer = async () => {
    axios(`${process.env.REACT_APP_SHOP_LINK}wp-json/wc/v3/customers/${userID}?${process.env.REACT_APP_KEY}`)
    .then(data2 => { const data = data2.data
      console.log(data)
      setUserInfo(data)
      

    })
  
  }


  useEffect(() => {
    setActiveTabCart(false)
    setActiveTabOrder(false)
    setActiveTabHome(false)
    setActiveTabUser(true) 
   if(!isLoggedIn){ navigate(`/login`)}  
   console.log(userID)    
   fetchUSer()
  }, [userID, isLoggedIn, setActiveTabCart,setActiveTabOrder, setActiveTabHome, setActiveTabUser, navigate ])
    

  return (
    <div className='cart-page profile'>
      <div className="profile__header">
      <img src="https://i.pravatar.cc/150?u=dfgsad@da.c" alt="" className="profile__avatar" />
      <span className="profile__header_span">
        <h3>Hi, {userInfo?.username}</h3>
        <p className="profile-stats">This is your profile page. Here, you can view and customize your profile details. Double check your details before check out.</p>
      </span>
      <div className="buttons" style={{marginLeft: "auto"}}>
      <button className='buttonRed'  onClick={handleLogOut}     style={{padding: "1rem 1.5rem"}}> Sign Out </button>
      </div>
      

      </div>
      <div className="profile__inner">
        <p>   <span>Name</span> <span> {userInfo?.username}  </span>  </p>
        <p>   <span>Email Address</span> <span>   {userInfo?.email}   </span>  </p>
      
      </div>
    </div>
  )
}

export default Profile
