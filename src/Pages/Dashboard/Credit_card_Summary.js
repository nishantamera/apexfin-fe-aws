import React,{useEffect,useState} from 'react'
import mastercardLogo from '../../Images/mastercard.png'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading_Scren from '../Front/LoadingScreen';
import Slider from 'react-slick';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Credit_card_Summary = ({token}) => {

  const containerStyle = {
    width: '100%', // Set the width to 100% for full-width
  };


  const [loadingData , setLoadingData] = useState(false);

  const [creditCards, setCreditCards] = useState()
  const [cardNumber,  setCardNumber] = useState()
  const [cardHolderName,  setCardHolderName] = useState()
  const [pendingAmount, setPendingAmount] = useState()
  const [creditCardTransactions,  setCreditCardTransactions] = useState([])


  useEffect(()=>{
    getCreditCardSummary()
  },[])


  const getCreditCardSummary=async()=>{
    setLoadingData(true)

    var accessToken = token.access;

    try {
      await axios.get(`https://democentraldev.trybmc.com/apex-bank/get/credit-card-summary`,{
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
      },
      }).then(res=>{
       console.log(res)

       var crditcarddata = res.data.details["Credit-Cards"];
       var crditcardTransaction = res.data.details["Credit-Card-Transactions"];
       //console.log(crditcardTransaction)

      setCreditCards(crditcarddata)
      setCardNumber(crditcarddata.cardNumber)
      setCardHolderName(crditcarddata.cardHolderName)
      setPendingAmount(crditcarddata.pendingAmount)
      setCreditCardTransactions(crditcardTransaction)

       setLoadingData(false);

        
      }).catch(err=>{
       console.log(err)
       setLoadingData(false)
      
      })
    } catch (error) {
      console.log(error)
      setLoadingData(false)
     
    }



  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { 
      year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric',  
    timeZoneName: 'short' 
  };
    return date.toLocaleDateString('en-US', options);
  };


  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    return today.toLocaleDateString('en-US', options);
  };



 
  
  return (
    <>
{loadingData && <Loading_Scren />}

<div className='dashboard-section-ui container px-4'style={containerStyle}>
        
        <div class="container px-4">
            <h1 className='saving-account'>Your Credit Card Summary</h1>
            <div>
            <div class="row row-cols-2 row-cols-sm-1 row-cols-md-2 row-cols-xl-2 row-cols-xxl-3" id='credit-card-scroll-row'>
                
                
                <div class="col" id='credit-card-scroll-col'>
                    <div class="p-3" id='card-gred-card-summ'>
                      <img src={mastercardLogo} width='180' className='card-gred-card-logo'/>
                    <br></br>
                    <div className='margin-g-summ'>
                    <div class="row" >
                    <div class="col-7"id='margin-card'>
                                <h6 className='card-card-account-name-summ'>Card Number</h6>
                                <h6 className='card-card-account-number-summ'>{cardNumber}</h6>

                                <h6 className='card-card-account-name-summ-hid'>Name</h6>
                                <h6 className='card-card-account-number-summ'>{cardHolderName}</h6>
                              </div>

                              <div class="col"id='margin-card'>
                              <p className='card-card-account-bal-summ'>Pending Settlement</p>
                                <h6 className='card-card-account-amount-summ'>${pendingAmount}</h6>
                                
                                <p className='card-card-account-bal-summ'>Today's Date</p>
                                <h6 className='card-card-account-amount-summ-date'>{getFormattedDate()}</h6>
                              </div>
                    </div>
                    </div>
                    {/* <div class="row" >
                              <div class="col-8"id='margin-card'>
                                <h6 className='card-white-account-name'>Card Number</h6>
                                <h6 className='card-white-account-number'>4500-1234-4567-6623</h6>
                              </div>
                              <div class="col"id='margin-card'>
                              <p className='card-white-account-bal'>Outstanding Amount</p>
                                <h6 className='card-white-account-amount'>$ 20</h6>
                                
                              </div>
                          </div> */}
                    </div>
                </div>
                <div class="col" id='credit-card-scroll-col'>
                    <div class="p-3" id='card-gred-card-summ'>
                      <img src={mastercardLogo} width='180' className='card-gred-card-logo'/>
                    <br></br>
                    <div className='margin-g-summ'>
                    <div class="row" >
                    <div class="col-7"id='margin-card'>
                                <h6 className='card-card-account-name-summ'>Card Number</h6>
                                <h6 className='card-card-account-number-summ'>{cardNumber}</h6>

                                <h6 className='card-card-account-name-summ-hid'>Name</h6>
                                <h6 className='card-card-account-number-summ'>{cardHolderName}</h6>
                              </div>

                              <div class="col"id='margin-card'>
                              <p className='card-card-account-bal-summ'>Pending Settlement</p>
                                <h6 className='card-card-account-amount-summ'>${pendingAmount}</h6>
                                
                                <p className='card-card-account-bal-summ'>Today's Date</p>
                                <h6 className='card-card-account-amount-summ-date'>{getFormattedDate()}</h6>
                              </div>
                    </div>
                    </div>
                    {/* <div class="row" >
                              <div class="col-8"id='margin-card'>
                                <h6 className='card-white-account-name'>Card Number</h6>
                                <h6 className='card-white-account-number'>4500-1234-4567-6623</h6>
                              </div>
                              <div class="col"id='margin-card'>
                              <p className='card-white-account-bal'>Outstanding Amount</p>
                                <h6 className='card-white-account-amount'>$ 20</h6>
                                
                              </div>
                          </div> */}
                    </div>
                </div>
                


                





                

              </div>
            </div>
    
            </div>
            


 

            {/* Transaction Section */}
        <div class="container px-4">
        <h6 className='deposits'>Transactions</h6>


        <table class="wp-table">
          <thead>
              <tr>
                <th>#</th>
                <th>Transaction Details</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
              </thead>
              <tbody>


              {creditCardTransactions.map((value,index)=>{
                        return(
                <tr id='tr-hov'key={index}>
                <td>{index + 1}</td>
                <td>{value.transactionDetails}</td>
                <td>{formatTime(value.timestamp)}</td>
                <td>${value.amount}</td>
              </tr>
                        )
                })}


              
              </tbody>
              
             
            </table>
        </div>



    
        <footer className='public-footer-dash'>
                <div className='container'>
                <div className="row">
                <div className="col" id='foot-content-cop-dash'>© 2023 BMC Software. All rights reserved.</div> 
                </div>
                </div>
            </footer>
           
    
        </div>


    </>
  )
}


const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    isLoading: state.account.isLoading,
    currentUser:state.account.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Credit_card_Summary)