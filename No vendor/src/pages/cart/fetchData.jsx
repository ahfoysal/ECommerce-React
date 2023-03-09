import axios from "axios"

//   function fetchingRequest (id) {
   
//     const data =  fetch("")
//   .then((response) => response.json())
//   .then((data) => {
//    return data
//   });
//    return data
  
//     }
async function fetchingRequest() {
    const response = await fetch("https://shop.abusayeeed.xyz/wp/wp-json/wc/v3/products?consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191");
    const jsonData = await response.json();
   //  console.log(jsonData)
    return jsonData
  }
    
   //  async function fetchingRequest() {
   //  let response = await fetch('https://shop.abusayeeed.xyz/wp/wp-json/wc/v3/products?consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191');
   //  console.log(response); // Logs the response
   //  return response;
   //  }


    export default fetchingRequest