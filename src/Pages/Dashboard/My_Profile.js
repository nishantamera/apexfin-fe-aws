import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading_Scren from '../Front/LoadingScreen';
import axios from 'axios'





const My_Profile = ({token}) => {

  const containerStyle = {
    width: '100%', // Set the width to 100% for full-width
  };


 
  const [loadingData , setLoadingData] = useState(false);
  const [userDetails,setUserDetails] = useState();
  const navigate = useNavigate()

  // Detail
  // Firstname
  const [firstname , setFirstname] = useState('');
  // Lastname
  const [lastname , setLastname] = useState('');
  // username
  const [username , setUsername] = useState('');
  // email
  const [email , setEmail] = useState('');
  // dateOfBirth
  const [dob , setDOB] = useState('');
  // number
  const [number , setNumber] = useState();
  // address
  const [address , setAddress] = useState([]);




  useEffect(()=>{
    getUserDetails()
  },[])


  const getUserDetails=async()=>{
    
    setLoadingData(true);
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

        setUserDetails(res.data.details["User-Details"])
        setFirstname(data.firstname)
        setLastname(data.lastname)
        setUsername(data.username)
        setEmail(data.email)
        setDOB(data.dateOfBirth)
        setNumber(data.number)
        setAddress(data.address)

       //console.log(res.data.details["User-Details"].firstname)
      setLoadingData(false);
      
        
      }).catch(err=>{
       console.log(err)
       setLoadingData(false);
       Swal.fire({
        title: "Oops?",
        text: "Something went wrong",
        icon: "error"
      });
      })
    } catch (error) {
      console.log(error)
     setLoadingData(false);
     Swal.fire({
      title: "Oops?",
      text: "Something went wrong",
      icon: "error"
    });
    }



  }



  const logout = ()=>{
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#22C9B7",
      confirmButtonText: "Yes, Log me out"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()

        navigate('/login')
      }
    });
      
  }
  

  return (



    <>
  {loadingData && <Loading_Scren />} 

    <div className='dashboard-section-ui container px-4'style={containerStyle}>


        <div class="container px-4">
        <h1 className='saving-account'>Personal Details</h1>
        <div className='edit-block'>
          <div class="row">
            <div class="col">
                <lable className='lab-name'>First name</lable><br></br>
                <input className='input-box-des'type='text'placeholder='First name' value={firstname}/>
            </div>
            <div class="col">
            <lable className='lab-name'>Last name</lable><br></br>
                <input className='input-box-des'type='text' placeholder='Last name'value={lastname}  />
            </div>
            
          </div>
<br></br>
<br></br>
          <div class="row">
            <div class="col">
                <lable className='lab-name'>Email</lable><br></br>
                <input className='input-box-des'type='text'placeholder='liam_patel@bmc.com' value={email}/>
            </div>
            <div class="col">
            <lable className='lab-name'>Date of Birth</lable><br></br>
                <input className='input-box-des'type='text' placeholder='4-12-2000' value={dob}/>
            </div>
          

          </div>


          <br></br>
<br></br>
          <div class="row">
            <div class="col">
                <lable className='lab-name'>Phone number</lable><br></br>
                <input className='input-box-des'type='text'placeholder='+91 1234567891' value={number}/>
            </div>
            <div class="col">
            <lable className='lab-name'>Address</lable><br></br>
                <textarea className='input-box-des'type='text' value={`${address.street}, ${address.city}, ${address.state}, ${address.postal}, ${address.country}`} placeholder='Pune'/>
            </div>
            
          </div>
          <br></br>
<br></br>
          <button className='login-btn-hero'>Edit Info</button>
        </div>

<br></br>
<br></br>

        <div className='edit-block-two'>
          
          <div class="row">
            <div class="col">
                <lable className='lab-name'>Username</lable><br></br>
                <input className='input-box-des'type='text'placeholder='Username'value={username}/>
            </div>
            <div class="col">
            <lable className='lab-name'>Password</lable><br></br>
                <input className='input-box-des'type='text' placeholder='Password'value="12345"/>
            </div>
            
          </div>

        <br></br>
          <button className='login-btn-hero'>Edit Info</button>

          <button className='login-btn-hero-logout'onClick={()=>logout()}>Logout</button>
        </div>

        </div>

        <br></br>


       
        
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

export default connect(mapStateToProps, mapDispatchToProps)(My_Profile)