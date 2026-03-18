import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BASE_URL from './constants'

const Premium = () => {
  const [isUserPremium, setIsUserPremium]= useState(false)
  const verifyPremiumUser=async()=>{
  const res= await axios.get(BASE_URL+ "/premium/verify",{withCredentials:true})

  if(res.data.isPremium){
    setIsUserPremium(true)
  }
  }

  useEffect(()=>{
    verifyPremiumUser()
  },[])
  const handleBuyClick= async(membershipType)=>{
    const order = await axios.post( BASE_URL+ "/payment/create", {
      membershipType
    },{withCredentials:true})
  const {keyId, amount, currency, orderId, notes}= order.data
  console.log(notes)
    const options = {
        key: keyId,
        amount, 
        currency,
        name: 'DevTinder',
        description: 'Connect with our developers',
        order_id: orderId, 


         handler: function (response) {
      console.log("🔥 PAYMENT SUCCESS", response);
        verifyPremiumUser();
    },
    
        // prefill: {
        //   name: notes.firstName + " " + notes.lastName,
        //   email: notes.emailId,
          
        // },
        theme: {
          color: '#F37254'
        },

      };
      const rzp = new window.Razorpay(options);
      rzp.open();
  }
  return ( isUserPremium? "You are Already a Premium User":
    <div>
    <div className="flex mt-25 mx-5 w-auto flex-col lg:flex-row">
       
  <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center">
    <h1 className='font-bold text-3xl'>
    Silver Subscription
    </h1>
    <ul >
        <li> - Unlimited Chat with Friends</li>
        <li> - 100 Friend Requests per day</li>
        <li> - Blue Tick </li>
        <li> - 3 Months Subscription</li>
    </ul>
    <button onClick={()=>handleBuyClick("silver")} className=' btn btn-primary'>Buy Silver</button>
    </div>
  <div className="divider lg:divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center">
    <h1 className='font-bold text-3xl'>
    Gold Subscription
    </h1>
     <ul >
        <li> - Unlimited Chat with Friends</li>
        <li> - 1000 Friend Requests per day</li>
        <li> - Blue Tick </li>
        <li> - 8 Months Subscription</li>
    </ul>
     <button onClick={()=>handleBuyClick("gold")} className=' btn btn-secondary'>Buy Gold</button>
    </div>
</div>
    </div>
  )
}

export default Premium
