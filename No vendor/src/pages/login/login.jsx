import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
// import { useUserAuth } from '../../context/UserAuthContext';
import { TestContext } from '../../App';
import { Cookies, useCookies } from 'react-cookie';
import { useContextS } from '../cart/Function';








const Login = () => {
  const cookies = new Cookies();
  const {    setActiveTabCart, setActiveTabOrder,setActiveTabHome, setActiveTabUser} = useContext(TestContext);
  // const { logIn, googleSignIn, user } = useUserAuth();
  let {  isLoggedIn  } =  useContextS();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ]  = useState("");
  







 
  const handleSubmit =  (e) => {
    e.preventDefault()
      setError("");
     console.log(email, password)
  
     fetch(`https://shop.abusayeeed.xyz/wp/?rest_route=/simple-jwt-login/v1/auth&email=${email}&password=${password}&THISISMySpeCiaLAUthCodee=THISISMySpeCiaLAUthCodee`, {
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
    <div className='login'>
    <form className='form' onSubmit={handleSubmit}>
      <h4>Log In</h4>
   
    {error && <p className='error'>{error}</p>}

  
    <div className="input-bx">
            <input  type="text" required="required" onChange={(e) => setEmail(e.target.value)}/>
            <span>Email</span>
          
        </div>     <br />
        <div className="input-bx">
            <input type="password" required="required"   onChange={(e) => setPassword(e.target.value)}/>
            <span>Password</span>
        </div>   <br />
<div className="buttons form__element">
      <Button type="submit">  LOGIN</Button></div>
      <span className='form-span'>Need help logging in?</span>
<hr /> 
      <div className="buttons form__element">


<Link to={'/signup'}>   <Button   className='secondary'>
        Sign Up
      </Button></Link>

</div>
  
    </form>

   
  
    </div>
  )
}

export default Login