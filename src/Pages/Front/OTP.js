import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import Logo from '../../Images/APEX Global PNG.png'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import Loading_Scren from './LoadingScreen';

// Images
import Home_Page_Image from '../../Images/OTP_Page.png'
import { useEffect } from 'react';

const OTP = ({currentUser,token}) => {

    const correctOTP = '5654';
    const [otp,setOtp] = useState();
    const [loadingData , setLoadingData] = useState(false);
    const navigate = useNavigate()

    //console.log(currentUser)

    if(!currentUser){
        // window.location = "http://localhost:3000/login"
        navigate('/dashboard')
    }

    useEffect(()=>{
        //var accessToken = token.access;
        var accessToken = localStorage.getItem('authTokens')
        
        
        if(accessToken==null){
            navigate('/login')
        }

      },[])



    const handleVerifyOTP = () => {

        setLoadingData(true)


        setTimeout(() => {
            if (otp === correctOTP) {
                // OTP is correct, navigate to dashboard
                navigate('/dashboard');
               
              } else {
                setLoadingData(false)
                // Incorrect OTP, you can display an error message or handle it as needed
              //   alert('Incorrect OTP. Please try again.');
                Swal.fire({
                  icon: 'error',
                  title: 'Incorrect OTP',
                  text: 'Please try again.',
                  footer: '<a href="#">Why do I have this issue?</a>',
                });
              }
          }, 2000);
          
        
        
      };

  return (
    <>
    {loadingData && <Loading_Scren />} 
 <div>
    <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container">
    <a className="navbar-brand" href="#"id='navbar-itm-text-logo'><img src={Logo} width='150'/></a>
    
    <h6 className='sign-up'>New User? <span className='sign-two'>Sign Up</span></h6>
  </div>
</nav>
    </div> 


    <section className='hero-section'> 
    <div className='container' id='hero-div'>
        <div className='hero-div-next'>
            <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                    <div className='log-content'>
                        <h1 className='log-content-h1'>One-Time Password!</h1>
                        <p className='log-content-p'>Please Enter the 6-Digit OTP sent to your phone via SMS</p>
                        <div>
                            
                            <input 
                            className='input-box-pin' 
                            type='text'
                            value={otp}
                            placeholder='Enter 6 Digit OTP'
                            onChange={(e) => setOtp(e.target.value)}/>

                            {/* <i class="fa fa-facebook icon"></i>
            <input class="input-field"
                   type="text"></input> */}


{/* <input type="text" class="icon" value placeholder="Search"/> */}
                        </div>

                        <div class="row">
                            <div class="col-4">
                            <br></br>
                            {/* <Link style={{paddingLeft: 13, textDecoration: 'none'}}  to='/dashboard'> */}
                                <div className='login-btn-nav'onClick={handleVerifyOTP}>
                                    Verify OTP {"->"}
                                </div>
                            {/* </Link> */}
                            </div>
                            <div class="col-8">
                                <h6 className='forgot-pin'>back to login</h6>
                            </div>
                        </div>
                         
                    </div>
                </div>
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                    <div>
                        <img className='hero-img' src={Home_Page_Image}/>
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
    
    </section>

    <footer className='public-footer'>
    <div className='container'>
    <div className="row">
        <div className="col-8" id='foot-content-cop'>© Apex Global Bank 2022. All rights reserved</div>
        <div className="col" id='foot-content-pri'>Privacy Policy</div>
        <div className="col" id='foot-content-ter'>Terms & Conditions</div>
    </div>
    </div>
    </footer>




    {/* Mobile View */}
<div className='container'>
    <section className='mobile-section'>


    <div className='log-content'>
                        <h1 className='log-content-h1'>One-Time Password!</h1>
                        <p className='log-content-p'>Please Enter the 6-Digit OTP sent to your phone via SMS</p>
                        <div>
                            
                        <input 
                            className='input-box-pin' 
                            type='text'
                            value={otp}
                            placeholder='Enter 6 Digit OTP'
                            onChange={(e) => setOtp(e.target.value)}/>

                            {/* <i class="fa fa-facebook icon"></i>
            <input class="input-field"
                   type="text"></input> */}


{/* <input type="text" class="icon" value placeholder="Search"/> */}
                        </div>

                        <div class="row">
                            <div class="col-4">
                                <br></br>
                            <div className='login-btn-nav'onClick={handleVerifyOTP}>
                                    Verify OTP {"->"}
                                </div>
                            </div>
                            <div class="col-8">
                                <h6 className='forgot-pin'>back to login</h6>
                            </div>
                        </div>
                         
                    </div>
                    <br></br>
        <br></br>

    </section>

    <br></br>
        <br></br>
        <br></br>
        <br></br>
    <footer className='mobile-public-footer'>
    <div className='container'>
    <div className="row">
        
        <div className="col-8" id='foot-content-cop'>© Apex Global Bank 2022. All rights reserved</div>
        
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



export default connect(mapStateToProps, mapDispatchToProps)(OTP);