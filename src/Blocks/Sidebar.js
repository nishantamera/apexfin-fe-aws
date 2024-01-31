import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { FaHome, FaCog, FaChevronDown,FaChevronRight, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loading_Scren from '../Pages/Front/LoadingScreen';



import logo from '../Images/APEX Global PNG.png'; // Import your logo

const Sidebar = () => {

   const navigate = useNavigate()

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

<div class="s-layout">
        
        <div class="s-layout__sidebar">
         
          <a class="s-sidebar__trigger" href="#0">
            
             <i class="fa fa-bars"></i>
          </a>
        
          <nav class="s-sidebar__nav">
          <img className='logo-img' src={logo} width='150'/><br></br>
           <div>

           </div>
             <ul>
                <li class="s-sidebar__dropdown">
                   <Link class="s-sidebar__nav-link" to='/dashboard'>
                      <i class="fa fa-user"></i><em>Account</em>
                   </Link>
                   <ul class="s-sidebar__subnav">
                        <li><Link to='/dashboard/saving-account'>Savings Account</Link></li>
                        
                     </ul>
                </li>



                <li class="s-sidebar__dropdown">
                   <a class="s-sidebar__nav-link" href="#0">
                   <i class="fa-solid fa-arrow-right-arrow-left"></i><em>Transfer</em>
                   </a>
                   <ul class="s-sidebar__subnav">
                        <li><Link to='/dashboard/transfer-other' href="#0">To My Account</Link></li>
                        <li><Link to='/dashboard/transfer-other' href="#0">To Other Account</Link></li>
                     </ul>
                </li>



                <li class="s-sidebar__dropdown">
                   <a class="s-sidebar__nav-link" href="#0">
                   <i class="fa-solid fa-credit-card"></i><em>Cards</em>
                   </a>
                   <ul class="s-sidebar__subnav">
                        <li><Link to='/dashboard/credit-summary' href="#0">Debit card Summary</Link></li>
                        <li><Link to='/dashboard/credit-summary' href="#0">Credit Card Summary</Link></li>
                     </ul>
                </li>



                <li>
                   <Link class="s-sidebar__nav-link" to='/dashboard/ingest'>
                   <i class="fa-solid fa-money-bill"></i><em>Invest</em>
                   </Link>
                </li>
                <li>
                   <a class="s-sidebar__nav-link" href="#0">
                   <i class="fa-solid fa-file"></i><em>Statement & Services 
Request</em>
                   </a>
                </li>




<br></br>
<br></br>
<br></br>
<br></br>
                <li onClick={()=>logout()}>
                   <a class="s-sidebar__nav-link" href="#0">
                   <i class="fa-solid fa-right-from-bracket"></i><em>Sign Out</em>
                   </a>
                </li>

                
               


             </ul>
          </nav>
        </div>
        
       
        
        </div>












{/* <nav>
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/dashboard/profile">Profile</Link>
  <Link to="/dashboard/transactions">Transactions</Link>
 </nav> */}

</>








  )
}


export default Sidebar