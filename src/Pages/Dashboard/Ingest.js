import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading_Scren from '../Front/LoadingScreen';

const Ingest = ({token}) => {


  const containerStyle = {
    width: '100%', // Set the width to 100% for full-width
  };


  const [loadingData , setLoadingData] = useState(false);
  const [fundsAmount , setFundsAmount] = useState();
  const [equityAmount , setEquityAmount] = useState();
  const [totalInvestment, setTotalInvestment] = useState();
  const [investmentPortfolio, setInvestmentPortfolio] =  useState([]);


  useEffect(()=>{
    getInvestmentPortfolio()
  },[])


  const getInvestmentPortfolio=async()=>{
    
    setLoadingData(true)
    var accessToken = token.access;

    try {
      await axios.get(`https://democentraldev.trybmc.com/apex-bank/get/investment-portfolio`,{
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
      },
      }).then(res=>{
       //console.log(res)

       const investmentDetails  = res.data.details["Investment Details"] ;

       setEquityAmount(investmentDetails["Equity"].totalAmount.toLocaleString('en-US', { minimumFractionDigits: 0 }));
       setFundsAmount(investmentDetails["Funds"].totalAmount.toLocaleString('en-US', { minimumFractionDigits: 0 }));
       
       setInvestmentPortfolio(res.data.details["Investment-Portfolio"]);
       //totalInvestmentAmount(equityAmount,fundsAmount)


      



       setLoadingData(false)
       //console.log(equityAmount)
        
      }).catch(err=>{
       console.log(err)
       setLoadingData(false)
      })
    } catch (error) {
      console.log(error)
      setLoadingData(false)
     
    }



  }


  useEffect(() => {
    
    if (equityAmount !== undefined) {
      
      // const total = parseFloat(equityAmount.replace(/[$,]/g, ''));
      const total = equityAmount;
      setTotalInvestment(total)
      // setTotalInvestment(total.toLocaleString('en-US', { minimumFractionDigits: 0 }));
      
    }
  }, [equityAmount]);

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


  const newTotalInvestment = (equity,funds) =>{
    const eq = equity+funds
    //console.log(funds)
        // return eq
    //       const total = parseFloat(equity.replace(/[$,]/g, '')) + parseFloat(funds.replace(/[$,]/g, ''));
    // return total.toLocaleString('en-US', { minimumFractionDigits: 0 });
  }

const totalInvestmentAmount = () => {
   //console.log(equityAmount)
  //   const total = parseFloat(equityAmount2.replace(/[$,]/g, '')) + parseFloat(fundsAmount2.replace(/[$,]/g, ''));
  //   return total.toLocaleString('en-US', { minimumFractionDigits: 0 });
   // Check if equityAmount and fundsAmount are defined and not null
  //  const equity = equityAmount ? parseFloat(equityAmount.replace(/[$,]/g, '')) : 0;
  //  const funds = fundsAmount ? parseFloat(fundsAmount.replace(/[$,]/g, '')) : 0;
 
  //  const total = equity + funds;
  //  return total.toLocaleString('en-US', { minimumFractionDigits: 0 });
  };


  //console.log(equityAmount)

  return (
    <>
{loadingData && <Loading_Scren />} 
<div className='dashboard-section-ui container px-4'style={containerStyle}>


<div class="container px-4">
<h1 className='saving-account'>Invest</h1>
        <div class="row">
            <div class="col">
              <div class="p-3" id='card-save-gred-three'>
                  <h6 className='sav-sec-account'>Portfolio</h6>
                  
              </div>
            </div>
            <div class="col">
              <div class="p-3" id='card-save-gred-four'>
                  <h6 className='sav-sec-account'>Insights</h6>
                 
              </div>
            </div>
            <div class="col">
            <div class="p-3" id='card-save-gred-five'>
                <h6 className='sav-sec-account'>Invest</h6>
                
              </div>
            </div>
            <div class="col">
            <div class="p-3" id='card-save-gred-six'>
                <h6 className='sav-sec-account'>Request</h6>
                
              </div>
            </div>
          </div>

<br></br>


<div class="row">
            <div class="col">
              <div class="p-3" id='card-save-gred-one'>
                  <h6 className='sav-sec-account'>$ {equityAmount}</h6>
                  <p className='sav-sec-number'>Equity</p>
              </div>
            </div>
            <div class="col">
              <div class="p-3" id='card-save-gred-one'>
                  <h6 className='sav-sec-account'>$ {fundsAmount}</h6>
                  <p className='sav-sec-number'>Funds</p>
              </div>
            </div>
            <div class="col">
            <div class="p-3" id='card-save-gred-one'>
                <h6 className='sav-sec-account'>$ {totalInvestment}</h6>
                <p className='sav-sec-number'>Total Investment</p>
              </div>
            </div>
          </div>

<br></br>

<h6>Details</h6>
<label for="check1" class="togButton">
<div class="row">
    <div class="col-10">
      Funds
    </div>
    <div class="col">
      $ {fundsAmount}
    </div>
  </div>
</label>
 

<input type="checkbox" class="togCheck" id="check1"/>
<div class="togContent">


{/* <table class="wp-table">
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Traded Currency </th>
                <th>Quantity</th>
                <th>Average Cost Price</th>
                <th>Closing Price</th>
                <th>Unrealised Profit/Loss</th>
                <th>Action</th>
              </tr>
              <tr id='tr-hov'>
                <td>1</td>
                <td>Xxx Transaction Debit Card Transaction</td>
                <td>SGD</td>
                <td>600</td>
                <td>5</td>
                <td>6</td>
                <td>600</td>
                <td>
                <button className='ingest-data-btn'>Buy</button>
                  <button className='ingest-data-btn'>Sell</button>
                </td>
              </tr>

              <tr id='tr-hov'>
                <td>1</td>
                <td>Xxx Transaction Debit Card Transaction</td>
                <td>SGD</td>
                <td>600</td>
                <td>5</td>
                <td>6</td>
                <td>600</td>
                <td>
                  <button className='ingest-data-btn'>Buy</button>
                  <button className='ingest-data-btn'>Sell</button>
                </td>
              </tr>
             
</table> */}

<p>No Data Available</p>

</div>


<br></br>


<label for="check2" class="togButton">
<div class="row">
    <div class="col-10">
      Equity
    </div>
    <div class="col">
      $ {equityAmount}
    </div>
  </div>
</label>
 

<input type="checkbox" class="togCheck" id="check2"/>
<div class="togContent">

<table class="wp-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Details</th>
                <th>Date</th>
                <th>Currency </th>
                <th>Quantity</th>
                <th>Average Cost Price</th>
                <th>Closing Price</th>
                <th>Unrealised Profit/Loss</th>
                <th>Asset Type</th>
              </tr>
            </thead>

            <tbody>
            {investmentPortfolio.map((value,index)=>{
                        return(
<tr id='tr-hov'key={index}>
                <td>{index + 1}</td>
                <td>{value.details}</td>
                <th>{formatTime(value.timestamp)}</th>
                <td>{value.currency}</td>
                <td>{value.quantity}</td>
                <td>{value.averageCostPrice}</td>
                <td>{value.closingPrice}</td>
                <td>{value.unrealised}</td>
                <td>{value.assetType}
                {/* <button className='ingest-data-btn'>Buy</button>
                  <button className='ingest-data-btn'>Sell</button> */}
                </td>
              </tr>
                        )})}
              
              </tbody>
             
             
</table>



</div>


<br></br>

{/* <div class="row">
            <div class="col">
              <div class="p-3" id='card-save-gred-seven'>
              <div class="row">
                  <div class="col"><h6>Equity</h6></div>
                  <div class="col"><h6>0 SGD</h6></div>
                  
                </div>
              </div>
            </div>
            <div class="col">
              
            </div>
            <div class="col">
            
            </div>
            <div class="col">
            
            </div>
          </div>

          <br></br>

<h6>Funds</h6>
<table class="wp-table">
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Traded Currency </th>
                <th>Quantity</th>
                <th>Average Cost Price</th>
                <th>Closing Price</th>
                <th>Unrealised Profit/Loss</th>
                <th>Action</th>
              </tr>
              <tr id='tr-hov'>
                <td>1</td>
                <td>Xxx Transaction Debit Card Transaction</td>
                <td>SGD</td>
                <td>600</td>
                <td>5</td>
                <td>6</td>
                <td>600</td>
                <td>
                  <p>Buy</p>
                  <p>Sell</p>
                </td>
              </tr>
             
</table> */}

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



export default connect(mapStateToProps, mapDispatchToProps)(Ingest)