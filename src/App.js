

import Pages from "./pages/Navigation";
import {BrowserRouter} from 'react-router-dom'
import Header from "./components/header/Header";
import { useState , useEffect, createContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// import { UserAuthContextProvider } from './context/UserAuthContext';
import Header2 from "./components/header/SideBar";
import {  ContextProviderS } from "./pages/cart/Function";
import DisableDevtool from 'disable-devtool';




// DisableDevtool();

export const TestContext = createContext();
 
function App() {
  
 





  //////// Nav & Icon State
          const [headerActive , setHeaderActive] = useState(false);
          const [activeTabHome , setActiveTabHome] = useState(false);
          const [activeTabCart , setActiveTabCart] = useState(false);
          const [activeTabOrder , setActiveTabOrder] = useState(false);
          const [activeTabUser , setActiveTabUser] = useState(false);
  ////////////
  
 
   
   
  



  return (
    <div className="App">
      
      <BrowserRouter>  
     
        <ContextProviderS>

        <TestContext.Provider value={{
      
              activeTabCart ,setActiveTabCart,
               setActiveTabHome, setActiveTabOrder,
              setActiveTabUser,  activeTabUser,
              activeTabHome, activeTabOrder,
              headerActive, setHeaderActive
              }}>
    <Header />
    <Header2  />
     <Pages  />
     <ToastContainer />
     </TestContext.Provider  >
     </ContextProviderS>
   
      </BrowserRouter>
 
    </div>
  );
}






export default App;
