import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading_Scren from '../Front/LoadingScreen';



const Saving_Account = ({token,transferDetails}) => {


  const [loadingData , setLoadingData] = useState(false);
  const [accountDetails, setAccountDetails] = useState();
  const [combinedTransactions, setCombinedTransactions] = useState([]);
  const [accountName, setAccountName] = useState();
  const [accountNumber,setAccountNumber]=useState()
  const [accountType,setAccountType]=useState()
  const [balance,setBalance]=useState()
  const [savingsAccountTransactions,setSavingsAccountTransactions]=useState([])

  //console.log(transferDetails)

  const containerStyle = {
    width: '100%', // Set the width to 100% for full-width
  };


  useEffect(()=>{
    getSavingAccountSummary()
  },[])




  const getSavingAccountSummary=async()=>{
    setLoadingData(true)
    var accessToken = token.access;
    try {
      await axios.get(`https://democentraldev.trybmc.com/apex-bank/get/savings-account-summary`,{
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
      },
      }).then(res=>{
        //console.log(res);
        var accountDetails =  res.data.details["Account-Details"];
        var transactionDetails = res.data.details["Savings-Account-Transactions"];
        setAccountDetails(accountDetails);
        setAccountName(accountDetails.accountName)
        setAccountNumber(accountDetails.accountNumber)
        setAccountType(accountDetails.accountType)
        setBalance(accountDetails.balance)
        setSavingsAccountTransactions(transactionDetails)
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


  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return date.toLocaleDateString('en-US', options);
  };


  useEffect(() => {
    // Combine Redux transferDetails and savingsAccountTransactions
    setCombinedTransactions([...transferDetails, ...savingsAccountTransactions]);
  }, [transferDetails, savingsAccountTransactions]);



  const calculateBalance = () => {
    // Extract all amounts from transferDetails and subtract from the initial balance
    const totalAmount = transferDetails.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    return balance - totalAmount;
  };




  return (
    <>
     {loadingData && <Loading_Scren />}
    <div className='dashboard-section-ui container px-4'style={containerStyle}>
        
    <div class="container px-4">
        <h1 className='saving-account'>Saving Account</h1>
        <div>
        <div class="row">
            <div class="col">
              <div class="p-3" id='card-save-gred-one'>
                  <h6 className='sav-sec-account'>{accountName}</h6>
                  <p className='sav-sec-number'>{accountNumber}</p>
              </div>
            </div>
            <div class="col">
              <div class="p-3" id='card-save-gred-one'>
                  <h6 className='sav-sec-account'>$ {calculateBalance()}</h6>
                  <p className='sav-sec-number'>Available Balance</p>
              </div>
            </div>
            <div class="col">
            <div class="p-3" id='card-save-gred-one'>
                <h6 className='sav-sec-account'>$ {calculateBalance()}</h6>
                <p className='sav-sec-number'>Total Balance</p>
              </div>
            </div>
          </div>
        </div>

        </div>
        {/* Transaction Section */}
        <div class="container px-4">
        <h6 className='deposits'>Transactions</h6>

        
<label for="check" class="togButton">Pending Transaction</label>
 

<input type="checkbox" class="togCheck" id="check"/>
<div class="togContent">
<table class="wp-table">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
              <tr id='tr-hov'>
                <td>1</td>
                <td>Xxx Transaction Debit Card Transaction</td>
                <td>Decliend</td>
                <td>$200</td>
              </tr>
             
            </table>
</div>

<br></br>

        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <table class="wp-table">
        <thead>
              <tr>
                <th>#</th>
                <th>Transaction details</th>
                <th>Date</th>
                <th>Amount</th>
                {/* <th>Type</th> */}
              </tr>
              </thead>
              <tbody>
              {combinedTransactions.map((value,index)=>(
                <tr id='tr-hov'key={index}>
                <td>{index + 1}</td>
                <td>{value.transactionDetails}</td>
                <td>{formatTime(value.time)}</td>
                {
                  value.type ==="Deduction" ?(
                    <><td><h6 className='sav-type-ded'>- {value.amount}</h6></td></>
                  ):(
                    <><td><h6 className='sav-type-add'>+ {value.amount}</h6></td></>
                  )
                }
                
                {/* {value.type ==="Deduction" ?(
                  <>
                  <td><h6 className='sav-type-ded'>-</h6></td>
                  </>
                ):(
                  <>
                  <td><h6 className='sav-type-add'>+</h6></td>
                  </>
                )} */}
                
              </tr>
              ))}
              </tbody>
             
        </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Saving_Account)