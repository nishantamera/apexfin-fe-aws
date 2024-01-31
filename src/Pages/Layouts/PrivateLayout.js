import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Sidebar  from '../../Blocks/Sidebar';
import SidebarTailwind from '../../Blocks/Sidebar';
import axios from 'axios'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const PrivateLayout = ({ children,token }) => {

  const [firstname , setFirstname] = useState('');


  useEffect(()=>{
    getUserDetails()
  },[])


  const getUserDetails=async()=>{
    
    //setLoadingData(true);
    var accessToken = token.access;
    //console.log(accessToken)

    try {
      await axios.get(`https://democentraldev.trybmc.com/apex-bank/get/user-details`,{
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
      },
      }).then(res=>{

        const data = res.data.details["User-Details"]

       
        setFirstname(data.firstname)
        

       //console.log(res.data.details["User-Details"].firstname)
        //setLoadingData(false);
      
        
      }).catch(err=>{
       console.log(err)
       //setLoadingData(false);
       
      })
    } catch (error) {
      console.log(error)
     
    }



  }



  return(
    <div>
    <header className='main-d'>
    <div class="row">
        <div class="col-10"><h1 className='margin-l'>Dashboard</h1> </div>
        <div class="col">
          <Link to='/dashboard/my-profile'>
          <p>{firstname} <i class="fa-solid fa-angle-down"></i></p>
          </Link>
        </div>
      </div>
       
    </header>
    <div className="private-layout">
      <SidebarTailwind />
      <main class="s-layout__content">{children}</main>
    </div>
  </div>
);
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateLayout);