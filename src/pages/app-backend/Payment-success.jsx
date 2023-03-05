


import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import  CryptoJS , { AES, enc, SHA256  } from 'crypto-js';




const PaymentSuccess = () => {
    
    const navigate = useNavigate();
    const useQuery = () => {
        return new URLSearchParams (useLocation().search)
      }
      let query = useQuery()
        const key = query.get('key')

 
    
  

    const secretKey = process.env.REACT_APP_PAYMENT_PIN
    const ciphertext = key.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');

    const bytes = AES.decrypt(ciphertext, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        

    const  PaymentProcess = (id) => {
      const  key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
    const    bodys = `{"status": "processing", "payment_method": "SSLCOMMERZ"}`
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: bodys,
    redirect: 'follow'
    };
     fetch(`https://shop.abusayeeed.xyz/wp/wp-json/wc/v3/orders/${id}?`+key, requestOptions)
    .then(response => response.json())
    .then(result => {
      const rslt = result;
    //   console.log(rslt) 
    navigate(`/order/${decryptedData}`) 
    })

    }
    


    useEffect(() => {
      
        PaymentProcess(decryptedData)
       
      
    }, [])
  return (
    <div>
        <p  style={{color: "Green", margin: 300}}>Payment-success</p>
       
        
    </div>
  )
}

export default PaymentSuccess