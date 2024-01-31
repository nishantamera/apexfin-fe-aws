import React from 'react'
import Navbar from '../../Blocks/Navbar'
import { Link,useNavigate } from "react-router-dom";

// Images
import Home_Page_Image from '../../Images/Home_page_image.png'
import Logo from '../../Images/APEX Global PNG.png'



const Homepage = () => {

    const navigate = useNavigate()


    const redirectFucn = ()=>{
        navigate('/principal')
    }
  return (
    <>
   
    <Navbar/>


    <br></br>
    <section className='hero-section'> 
        <div className='container' id='hero-div'>
            <div className='hero-div-next'>
                <div class="row">
                    <div class="col">
                        
                        <div className='hero-content'>
                            <h1 className='hero-content-h1'>Welcome to <br></br><span className='hero-content-h1-colord'>Apex Global Banking</span></h1>
                            <p className='hero-content-p'>Securly and Smartly Manage your account with the online banking website</p>
                            <Link style={{ textDecoration: 'none'}}  to='/login'>
                            <button className='login-btn-hero'>Login Here</button>
                            </Link>
                            
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <img className='hero-img' src={Home_Page_Image} />
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


    <div className='hero-content'>
                            <h1 className='hero-content-h1'>Start  your online banking<br></br>with <span className='hero-content-h1-colord'>Name</span></h1>
                            <p className='hero-content-p'>Securly and Smartly Manage your account with the online banking website</p>
                            <Link style={{ textDecoration: 'none'}}  to='/login'>
                            <button className='login-btn-hero'>Login Here</button>
                            </Link>
                            <div>
                            <img className='hero-img' src={Home_Page_Image}/>
                        </div>
    </div>
    

    </section>


    <footer className='mobile-public-footer'>
    <div className='container'>
    <div className="row">
        <div className="col-8" id='foot-content-cop'>© Apex Global Bank 2022. All rights reserved</div>
        <div className="col" id='foot-content-pri'>Privacy Policy</div>
        <div className="col" id='foot-content-ter'>Terms & Conditions</div>
    </div>
    </div>
    </footer>
    </div>
    </>
  )
}

export default Homepage