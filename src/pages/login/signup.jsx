

import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

import { TestContext } from '../../App';
import { useContextS } from '../cart/Function';
import { Cookies } from 'react-cookie';




const Signup = () => {
  const cookies = new Cookies();

  const {    setActiveTabCart, setActiveTabOrder,setActiveTabHome, setActiveTabUser} = useContext(TestContext);

  const { isLoggedIn } = useContextS();
  
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ]  = useState("");
    const [ userName, setUserName ]  = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        console.log(email, password, userName)
        fetch(`https://shop.abusayeeed.xyz/wp/?rest_route=/simple-jwt-login/v1/users&email=${email}&password=${password}&user_login=${userName}&THISISMySpeCiaLAUthCodee=THISISMySpeCiaLAUthCodee`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then((json) =>{
            if(json.success === false){setError(json.data.message)
              setSuccess('')
            }
            if(json.success === true){
              console.log(json)
              setError('')
              setSuccess(json.message)
              handleSubmit2(email, password)
            
            
            }
            console.log(json)});
    
       
     
    }

    const handleSubmit2 =  (id, pass) => {
       fetch(`https://shop.abusayeeed.xyz/wp/?rest_route=/simple-jwt-login/v1/auth&email=${id}&password=${pass}&THISISMySpeCiaLAUthCodee=THISISMySpeCiaLAUthCodee`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) =>{
          if(json.success === false){setError(json.data.message)}
          if(json.success === true){
            console.log(json)
            cookies.set('token',json.data.jwt)
            
           navigate('/profile')
           window.location.reload(false)
          
          }
          console.log(json)});
       
      };
  
    useEffect(() => {


      setActiveTabCart(false)
      setActiveTabOrder(false)
      setActiveTabHome(false)
      setActiveTabUser(true) 
     if(isLoggedIn){ navigate(`/profile`)}
  
    })
  return (
    <div className='signup'>
    <form className='form' onSubmit={handleSubmit}> 
    <h4>Create your Account</h4>
    {error && <p className='text-danger'>{error}</p>}
    {success && <p className='text-success'>{success}, Redirecting......</p>}
      <div className="input-bx">
            <input  type="text" required="required" onChange={(e) => setUserName(e.target.value)}/>
            <span>User Name</span>
        </div>     <br />
      <div className="input-bx">
            <input  type="email" required="required" onChange={(e) => setEmail(e.target.value)}/>
            <span>Email</span>
        </div>     <br />

      <div className="input-bx">
            <input  type="password" required="required" onChange={(e) => setPassword(e.target.value)}/>
            <span>Password</span>
        </div>     <br />


        <div className="buttons form__element">
      <Button type="submit">  Sign Up</Button></div>
      <span className='form-span'>Already have an account?</span>
<hr /> 
      <div className="buttons form__element">
      <Link to={'/login'}>   <Button   className='secondary'>
      LogIn
      </Button></Link>




</div>
  
     
    </form>
    
    </div>
  )
}

export default Signup