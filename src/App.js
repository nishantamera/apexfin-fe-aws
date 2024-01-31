import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import PublicLayout from './Pages/Layouts/PublicLayout';
import PrivateLayout from './Pages/Layouts/PrivateLayout';
import Homepage from "./Pages/Front/Homepage";
import Login from "./Pages/Front/Login2";


// CSS Import 
 import '../src/Styles/Home.css'
import '../src/Styles/Navbar.css'
import '../src/Styles/Login.css'
import '../src/Styles/Dashboard.css'
import '../src/Styles/Sidebar.css'
import '../src/Styles/Saving_Account.css'
import '../src/Styles/card_summary.css'
import '../src/Styles/my_profile.css'
import '../src/Styles/Invest.css'
import '../src/Styles/Transfer_other.css'
import '../src/Styles/Carousal.css'

// Pages
import LandingPage from '../src/Pages/Front/Homepage'
import LoginPage from '../src/Pages/Front/Login'
import OtpPage from '../src/Pages/Front/OTP'


// Dashboard
import Dashboard from '../src/Pages/Dashboard/Dashboard'
import Savings_Account from '../src/Pages/Dashboard/Saving_Account'
import Transfer_Other from '../src/Pages/Dashboard/Transfer_Other'
import Credit_card_Summary from '../src/Pages/Dashboard/Credit_card_Summary2'
import My_Profile from '../src/Pages/Dashboard/My_Profile'
import Ingest from '../src/Pages/Dashboard/Ingest'

function App({ token }) {
  const isAuthenticated = !!token;


  return (
    <>
    {/* <Routes>
        <Route exact path="/"  element={ <LandingPage/> } />
        <Route exact path="login"  element={ <LoginPage/> } />
        <Route exact path="Otp"  element={ <OtpPage/> } />
    </Routes> */}



      <Routes>
        <Route
          path="/*"
          element={
            <PublicLayout>
              <Routes>
              <Route index element={<LandingPage />} />
              <Route path="otp" element={<OtpPage />} />
              <Route path="login" element={<Login />} />
              </Routes>
            </PublicLayout>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? 
             (
              <PrivateLayout>
                <Routes>
                <Route  index element={<Dashboard />} />
                <Route  path="saving-account" element={<Savings_Account />} />
                <Route  path="transfer-other" element={<Transfer_Other />} />
                <Route  path="credit-summary" element={<Credit_card_Summary />} />
                <Route  path="my-profile" element={<My_Profile />} />
                <Route  path="ingest" element={<Ingest />} />
                </Routes>
              </PrivateLayout>
           ) : (
             <Navigate to="/login" />
            )
          }
        />
      </Routes>
    
    </>
  );
}


const mapStateToProps = (state) => {
  return { token: state.account.token }
}

export default connect(mapStateToProps)(App);
