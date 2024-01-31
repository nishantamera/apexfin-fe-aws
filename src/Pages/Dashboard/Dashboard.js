import React,{ useState,useEffect } from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import Loading_Scren from '../Front/LoadingScreen';
import axios from 'axios'
import Slider from 'react-slick';
import mastercardLogo from '../../Images/mastercard.png'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from './Carousel';


const cards2 = [
  { title: 'Card 1', description: 'Description 1' },
  { title: 'Card 2', description: 'Description 2' },
  { title: 'Card 3', description: 'Descriptisdon 3' },
  { title: 'Card 4', description: 'Description 3' },
  // Add more cards as needed
];

const cardGradients = [
  'linear-gradient(to right, #bdc3c7, #2c3e50)',  
  'linear-gradient(to right, #0F2027, #2C5364)',   
  'linear-gradient(to right, #b92b27, #1565C0)',
  'linear-gradient(to right, #8E2DE2, #4A00E0)',
  'linear-gradient(to right, #c31432, #240b36)',
  // Add more gradient strings as needed
];


const Dashboard = ({token,transferDetails}) => {


  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, 
    centerPadding: '0', 
    adaptiveHeight: true,
    arrows: true,
    
  };
  

  // Const Data

  const [loadingData , setLoadingData] = useState(false);
  const [totalTransfers, setTotalTransfers] = useState(0);

  //UserFullName
  const[userFullName, setUserFullName] = useState()
  //UserLastLoginTimestamp
  const[userLastLoginTimestamp, setUserLastLoginTimestamp] = useState()
  //accountName
  const[accountName, setAccountName] = useState()
  //accountNumber
  const[accountNumber, setAccountNumber] = useState()
  //accountType
  const[accountType, setAccountType] = useState()
  //balance
  const[balance, setBalance] = useState()
  //Investments
  const[investments, setInvestments] = useState([])
  //Credit-Cards
  const[creditCards, setCreditCards] = useState([])
  //cardNumber
  const[cardNumber, setCardNumber] = useState()
  //cardHolderName
  const[cardHolderName, seCardHolderName] = useState()
  //pendingAmount
  const[pendingAmount, setPendingAmount] = useState()
  //Loans
  const[Loans,setLoans] = useState()

  // Accounts
  const [Accounts, setAccounts] = useState([]);




  useEffect(()=>{
    getAccountSummary();
    // const handleBackButtonClick = () => {
      
    //   console.log('Back button clicked! Redirecting...');
      
    //   window.location.href = 'https://democentraldev.trybmc.com/apex-bank/account/login';
    // };

    
    // window.addEventListener('popstate', handleBackButtonClick);

   
    // return () => {
    //   window.removeEventListener('popstate', handleBackButtonClick);
    // };
  },[])


  useEffect(() => {
    const transfersAmount = calculateTotalTransfers();
    setTotalTransfers(transfersAmount);
  }, [transferDetails]);


  const calculateTotalTransfers = () => {
    if (!transferDetails) return 0;

    // Extract all amounts from transferDetails
    const totalTransfersAmount = transferDetails.reduce((total, transaction) => {
      return total + parseFloat(transaction.amount);
    }, 0);

    return totalTransfersAmount;
  };

  const getAccountSummary=async()=>{
    setLoadingData(true);

    var accessToken = token.access;

    try {
      await axios.get(`https://democentraldev.trybmc.com/apex-bank/get/banking-account-summary`,{
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
      },
      }).then(res=>{
      //console.log(res.data.details["Credit-Cards"]["Credit-Cards"])

//       cardHolderName
// : 
// "Gerine Tan Duo Ri"
// cardNumber
// : 
// "5299920000000149"
// pendingAmount
// : 
// 12

       const data = res.data;
       //console.log(data)
       setUserFullName(data.details["User Full Name"])
       setUserLastLoginTimestamp(data.details["User Last Login Timestamp"])
       setAccountName(data.details["Accounts"].accountName)
       setAccountNumber(data.details["Accounts"].accountNumber)
       setAccountType(data.details["Accounts"].accountType)
       setBalance(data.details["Accounts"].balance)
       setInvestments(data.details["Investments"])
       setCreditCards(data.details["Credit-Cards"]["Credit-Cards"])
       setCardNumber(data.details["Credit-Cards"].cardNumber)
       seCardHolderName(data.details["Credit-Cards"].cardHolderName)
       setPendingAmount(data.details["Credit-Cards"].pendingAmount)
       setLoans(data.details["Loans"])

       setAccounts(res.data.details["Accounts"])

       setLoadingData(false)


        
      }).catch(err=>{
       console.log(err)
       setLoadingData(false)
      
      })
    } catch (error) {
      console.log(error)
      setLoadingData(false)
     
    }



  }


  const containerStyle = {
    width: '100%', // Set the width to 100% for full-width
  };



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



  const calculateTotalInvestment = () => {
    if (!investments) return 0;

    // Filter investments based on the category "Equity"
    const equityInvestments = investments.filter(
      (investment) => investment.category === 'Equity'
    );

    // Calculate total amount for filtered investments
    const totalEquityInvestment = equityInvestments.reduce(
      (total, investment) => total + parseFloat(investment.totalAmount),
      0
    );

    // Use toLocaleString to format the number with commas and without decimal places
    return totalEquityInvestment.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });
  };



  //console.log(creditCards)

  return (

    <>

{loadingData && <Loading_Scren />} 
    <div className='dashboard-section-ui container px-4'style={containerStyle}>
      {/* Section One */}
      <div className="container px-4">
          <div className="row gx-5">
                <div className="col">
                    <h6 className='sec-one-name'>Hi {userFullName}</h6>
                    <h1 className='sec-one-Welc'>Welcome Back</h1>
                </div>
                <div className="col-4">
                    <p className='sec-one-Welc-last-log'>Last Logged In <br></br><span className='last-login'>{formatTime(userLastLoginTimestamp)}</span></p>
                </div>  
          </div>
          </div>
      {/* Section two */}
          <div className='section-two-dashboard'>
            {/* <div class="row">
                  <div class="col" className='card-gred'>
                      <div class="row">
                          <div class="col">Cash & Investment </div>
                          <div class="col">$ 5432</div>
                      </div>
                  </div>
                  <div class="col" className='card-gred'>
                  <div class="row">
                          <div class="col">Cards & loans </div>
                          <div class="col">$ 20</div>
                      </div>
                  </div>  
            </div> */}
            
            <div className="container px-4">
              <div className="row gx-5">
                <div className="col">
                <div className="p-3" id='card-gred-one'>
                <div className="row">
                          <div className="col-9" id='card-gred-one-h1'>Investment</div>
                          <div className="col" id='card-gred-one-p1'>$ {calculateTotalInvestment()}</div>
                      </div>
                </div>
                </div>
                <div className="col">
                  <div className="p-3" id='card-gred-two'>
                  <div className="row">
                          <div className="col-9"id='card-gred-two-h1'>loans </div>
                          <div className="col"id='card-gred-two-p1'>$ {Loans}</div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section three */}
          <div className="container px-4">
            <h6 className='deposits'>Deposits</h6>
            <div className="row gx-5">


                  {Accounts.map((value,index)=>{
                    return(
                    <div className="col">
                    <div className="p-3" id='card-white-three'>
                        <div className="row">
                            <div className="col-8">
                              <h6 className='card-white-account-name'>{value.accountName}</h6>
                              <h6 className='card-white-account-number'>{value.accountNumber}</h6>
                            </div>
                            <div className="col">
                            {value.accountType === "Savings Account" ? (
                <>
                  <h6 className='card-white-account-amount'>$ {value.balance - totalTransfers}</h6>
                  <p className='card-white-account-bal'>Available Balance</p>
                </>
              ) : (
                <>
                  {/* Render differently for non-Savings Account types if needed */}
                  <h6 className='card-white-account-amount'>$ {value.balance}</h6>
                  <p className='card-white-account-bal'>Balance</p>
                </>
              )}
                              {/* <h6 className='card-white-account-amount'>$ {value.balance}</h6>
                              <p className='card-white-account-bal'>Available Balance</p> */}
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                    
                  })}

                  {/* <div class="col">
                  <div class="p-3" id='card-white-three'>
                      <div class="row">
                          <div class="col-8">
                            <h6 className='card-white-account-name'>{accountName}</h6>
                            <h6 className='card-white-account-number'>{accountNumber}</h6>
                          </div>
                          <div class="col">
                            <h6 className='card-white-account-amount'>$ {balance}</h6>
                            <p className='card-white-account-bal'>Available Balance</p>
                          </div>
                      </div>
                      </div>
                  </div> */}

                  {/* <div class="col">
                        <div class="p-3" id='card-white-three'>
                      <div class="row">
                              <div class="col-8">
                                <h6 className='card-white-account-name'>XXX Savings Account</h6>
                                <h6 className='card-white-account-number'>020-1-012345</h6>
                              </div>
                              <div class="col">
                                <h6 className='card-white-account-amount'>$ 2432</h6>
                                <p className='card-white-account-bal'>Available Balance</p>
                              </div>
                      </div>
                      </div> 
                  </div>   */}
            </div>
          </div>


          {/* Section Four */}

          <div class="container px-4">
          <h6 className='deposits'>Cards </h6>
              


          {creditCards.length > 0 && <Carousel cards={creditCards} autoPlayInterval={3000} cardGradients={cardGradients} />}
              {/* <Carousel cards={creditCards} autoPlayInterval={3000}cardGradients={cardGradients} /> */}
              <h6 className='deposits'>Investments</h6>



              <div class="row row-cols-2 row-cols-sm-1 row-cols-md-2 row-cols-xl-2 row-cols-xxl-3">
              <div class="col">
                <div class="p-3" id='card-gred-card'>
                  <h1 className='investment-title'>Investment</h1>
                <br></br>
                <div className='margin-s'>


                      {investments.map((value,index)=>{
                        return(
                          <div class="row" >
                <div class="col-8"id='margin-card'>
                            <h6 className='card-card-account-name'>{value.category}</h6>
                            <h6 className='card-card-account-number'></h6>
                </div>

                <div class="col"id='margin-card'>
                    <p className='card-card-account-bal'>{value.category} Amount</p>
                    <h6 className='card-card-account-amount'>${value.totalAmount}</h6>
                </div>

                </div>
                        )
                      })}
                      

                

                {/* <div class="row" >
                <div class="col-8"id='margin-card'>
                            <h6 className='card-card-account-name'>XXX Fund</h6>
                            <h6 className='card-card-account-number'></h6>
                </div>

                <div class="col"id='margin-card'>
                    <p className='card-card-account-bal'>Investment Amount</p>
                    <h6 className='card-card-account-amount'>$3000</h6>
                </div>
                
                </div> */}






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
              <br></br>

<footer className='pubdlic-footer-dash'>
<div className='container'>
<div className="row">
<div className="col" id='foot-content-cop-dash'>© Apex Global Bank 2022. All rights reserved</div>

</div>
</div>
</footer>
          </div>
         
          <br></br>
          <br></br>
          
    </div>
    </>
  )
}




const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    isLoading: state.account.isLoading,
    currentUser:state.account.currentUser,
    transferDetails: state.account.transferDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);