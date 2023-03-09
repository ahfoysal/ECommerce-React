import React, { useContext } from 'react'
import {Container, Navbar} from 'react-bootstrap'
import {Link, useNavigate, useLocation} from 'react-router-dom';
import Search from "../Search";
import './header.css'
import { TestContext } from '../../App';
import Left from '@mui/icons-material/KeyboardArrowLeft';
import Right from '@mui/icons-material/KeyboardArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon2 from '@mui/icons-material/ShoppingCart';
import { useContextS } from '../../pages/cart/Function';

const Header = () => {
  let params = useLocation();
  const param = params.pathname
  const history = useNavigate()
  const {  activeTabCart } = useContext(TestContext);
    let {  cart } =  useContextS();





  return (

      <>
    <Navbar className="header-top"  >
      <Container fluid >
   
               <div className="head-conatiner ">
            <div>
             {param !== '/' && <button className='border-none header__back' onClick={() => history(-1)}> Back</button>}
            </div>
                  <div ><Search  />
                  </div>

                  <div className="cartIcon2">
                  <Link to={'/cart'}>{activeTabCart ? <ShoppingCartIcon2  fontSize="large" className='nav-icons'  /> : <ShoppingCartIcon  fontSize="large" className='nav-icons'  />} <h3 className='cart-text2'>{cart.length}</h3></Link>
                    </div>

                  <Navbar.Brand ><Link to={'/'}>
               <h3 className="logo">Pewds</h3>  </Link>  </Navbar.Brand>
     
                 </div>

       
      </Container>
    </Navbar>
</>
  )
}

export default Header
