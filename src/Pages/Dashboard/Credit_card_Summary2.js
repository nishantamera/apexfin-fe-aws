import React, { useEffect, useState } from 'react';
import mastercardLogo from '../../Images/mastercard.png';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import Slider from 'react-slick';
import Loading_Scren from '../Front/LoadingScreen';
import Carousel from './Carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ArrowLeft = (props) => (
  <button {...props} className="prev">
    Back
  </button>
);

const ArrowRight = (props) => (
  <button {...props} className="next">
    Next
  </button>
);




const cardGradients = [
  'linear-gradient(to right, #2193b0, #6dd5ed)',  // Gradient for Card 1
  'linear-gradient(to right, #0F2027, #2C5364)',   // Gradient for Card 2
  'linear-gradient(to right, #b92b27, #1565C0)',
  'linear-gradient(to right, #8E2DE2, #4A00E0)',
  'linear-gradient(to right, #c31432, #240b36)',
  // Add more gradient strings as needed
];


const Credit_card_Summary2 = ({ token }) => {


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
    // beforeChange: (current, next) => {
    //   setCurrentCardIndex(next);
    // },
    
  };


  const containerStyle = {
    width: '100%',
  };

  const [loadingData, setLoadingData] = useState(false);
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [creditCardTransactions, setCreditCardTransactions] = useState([]);
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    getCreditCardSummary();
  }, []);

  const getCreditCardSummary = async () => {
    setLoadingData(true);

    var accessToken = token.access;

    try {
      const res = await axios.get(
        'https://democentraldev.trybmc.com/apex-bank/get/credit-card-summary',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      //console.log(res);

      const creditCardData = res.data.details['Credit-Cards'];
      setCreditCards(creditCardData);
      setLoadingData(false);
    } catch (error) {
      console.error(error);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (creditCards.length > 0) {
      // Simulate card change to the first card
      handleAfterChange(0);
    }
  }, [creditCards]);

  // const handleCardClick = (card) => {
  //   // setSelectedCard(card);
  //   // setCreditCardTransactions(card['card-transactions'] || []);
  //   setLoadingData(true);

  //   // Simulate a 3-second delay using setTimeout
  //   setTimeout(() => {
  //     const card = creditCards[currentCardIndex];
  //     setSelectedCard(card);
  //     setSelectedCardDetails(card['credit-card-details']);
  //     setCreditCardTransactions(card['card-transactions'] || []);
  //     setLoadingData(false);
  //     const transactionsTable = document.getElementById('transactionsTable');
  //     if (transactionsTable) {
  //       transactionsTable.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }, 3000);


    
  // };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    return today.toLocaleDateString('en-US', options);
  };


  const loadTransactions = (card) => {
   
    setLoadingData(true);

    // Simulate a 3-second delay using setTimeout
    setTimeout(() => {
      setSelectedCardDetails(card['credit-card-details']);
      //console.log('Selected Card:', card);
      setLoadingData(false);
      const transactionsTable = document.getElementById('transactionsTable');
      if (transactionsTable) {
        transactionsTable.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3000);
  };

  const handleAfterChange = (index) => {

    setLoadingData(true)
    setTimeout(() => {
      const card = creditCards[index];
    setSelectedCard(card);
    setSelectedCardDetails(card['credit-card-details']);
    setCreditCardTransactions(card['card-transactions'] || []);
    setLoadingData(false)
    }, 3000);
    
  };

  return (
    <>
      {loadingData && <Loading_Scren />}

      <div className="dashboard-section-ui container px-4" style={containerStyle}>
        <div class="container px-4">
          <h1 className="saving-account">Your Credit Card Summary <span className='card-span'>(Click On Credit Card For Transaction)</span></h1>

         
            {/* <div
              class="row row-cols-3 row-cols-sm-3 row-cols-md-3 row-cols-xl-3 row-cols-xxl-3"
              id="credit-card-scroll-row-"
            > */}
            <div className='restric'>
              <Slider {...settings} className='slide'afterChange={handleAfterChange}>
              {creditCards.map((card, index) => (
                
                  <div className='slider-card-cen'>
                  <div class="codl" id="credit-card-scroll-col-" key={index}>
                    <div class="p-3" id="card-gred-card-summ" 
                    // onClick={() => handleCardClick(card)}
                    >
                      <img src={mastercardLogo} width="120" className="card-gred-card-logo" />
                      <br></br>
                      <div className="margin-g-summ">
                        <div class="row">
                          <div class="col-7" id="margin-card">
                            <h6 className="card-card-account-name-summ">Card Number</h6>
                            <h6 className="card-card-account-number-summ">{card['credit-card-details'].cardNumber}</h6>

                            <h6 className="card-card-account-name-summ-hid">Name</h6>
                            <h6 className="card-card-account-number-summ">{card['credit-card-details'].cardHolderName}</h6>
                          </div>

                          <div class="col" id="margin-card">
                            <p className="card-card-account-bal-summ">Pending Settlement</p>
                            <h6 className="card-card-account-amount-summ">${card['credit-card-details'].pendingAmount}</h6>

                            <p className="card-card-account-bal-summ">Today's Date</p>
                            <h6 className="card-card-account-amount-summ-date">{getFormattedDate()}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>

                  
                
                  
              ))}</Slider>
            {/* </div> */}
            </div>



        </div>

<br></br>
<br></br>

        {/* Transaction Section */}

        <div class="container px-4"id="transactionsTable">
          <h6 className="deposits">Transactions </h6>
          {selectedCardDetails && (
            <p className='para-graph-card-tran'>Card Number: {selectedCardDetails.cardNumber}</p>
          )}

<div style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
              {creditCardTransactions.map((value, index) => (
                
                <tr id="tr-hov" key={index}>
                  <td>{index + 1}</td>
                  <td>{value.transactionDetails}</td>
                  <td>{formatTime(value.timestamp)}</td>
                  <td>${value.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
<br></br>

        <div>
          
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
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    isLoading: state.account.isLoading,
    currentUser: state.account.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Credit_card_Summary2);
