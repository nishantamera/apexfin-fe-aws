import React, { useState, useEffect } from 'react';
import '../../Styles/Carousal.css'; // Make sure to create a CSS file for styling
import mastercardLogo from '../../Images/mastercard.png'

const Carousel = ({ cards, autoPlayInterval,cardGradients  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
        let intervalId;
        // const timeoutId = setTimeout(() => {
        //     document.querySelector('.carousel-wrapper').style.transition = 'transform 0.5s ease-in-out';
        //   }, 0);
        // Auto play functionality
        if (autoPlayInterval) {
          intervalId = setInterval(() => {
            handleNext();
          }, autoPlayInterval);
        }
    
        return () => {
          clearInterval(intervalId);
          //clearTimeout(timeoutId)
        };
      }, [currentIndex, autoPlayInterval]);
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
      };


      const handleMove = (direction) => {
        if (direction === 'next') {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        } else if (direction === 'prev') {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? cards.length - 1 : prevIndex - 1
          );
        }
      };
  
    const transformValue = -currentIndex * 50; // Adjust based on the card width
  
    return (
      <div className="carousel-container">
        <div
          className="carousel-wrapper"
          style={{ transform: `translateX(${transformValue}%)` }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`carousel-card ${index === currentIndex ? 'active' : ''}`}
              style={{ background: cardGradients[index] || 'linear-gradient(to right, #ff7e5f, #feb47b)' }}
            >
             <img src={mastercardLogo}  className='card-gred-card-logo'/>
             <div className='margin-g-t'>
                <div class="row" >
                <div class="col-7"id='margin-card'>
                            <h6 className='card-card-account-name'>Card Number</h6>
                            <h6 className='card-card-account-number'>{card.cardNumber}</h6>
                          </div>

                          <div class="col"id='margin-card'>
                          <p className='card-card-account-bal'>Outstanding Amount</p>
                            <h6 className='card-card-account-amount'>$ {card.pendingAmount}</h6>
                            
                          </div>
                </div>
                </div>
                
            </div>
          ))}
        </div>
        <button className="carousel-arrow prev" onClick={() => handleMove('prev')}>
        &lt;
      </button>
      <button className="carousel-arrow next" onClick={() => handleMove('next')}>
        &gt;
      </button>
      </div>
    );
  };
  
  export default Carousel;