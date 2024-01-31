import React, { Component } from 'react';
import { Link,Navigate ,redirect   } from "react-router-dom";
import { connect } from 'react-redux';
import Logo from '../../Images/APEX Global PNG.png';
import Swal from 'sweetalert2';
import Loading_Scren from './LoadingScreen';
import AccountActions from '../../Actions/account.action';
import Home_Page_Image from '../../Images/Login_page_image.png';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      pin: '',
      error: '',
      loading: this.props.isLoading,
    };
  }

  handleLogin = () => {
    const { username, pin, loading } = this.state;
    const { login, isLoading } = this.props;

    if (!username || !pin) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please provide both pin and username!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else {
      console.log('login Successfully');
    }
  };

  // handleLoginSubmit = async (event) => {
  //   event.preventDefault()
  //   const { username, pin,loading } = this.state;
  //   const { login, isLoading } = this.props;

  //   if (!username || !pin) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Please provide both pin and username!',
  //       footer: '<a href="#">Why do I have this issue?</a>',
  //     });
  //   } else {
  //     event.preventDefault();
  //     this.setState({ loading: true });
  //     const { username, pin } = this.state;
  //     this.props.login(username, pin);
  //   }
  // };


  handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { username, pin } = this.state;
    const { login } = this.props;

    if (!username || !pin) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please provide both pin and username!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else {
      // Set loading state to true during the login process
      this.setState({ loading: true });

      try {
        await login(username, pin);
        // Reset loading state to false on successful login
        this.setState({ loading: false });
      } catch (error) {
        // Handle login failure
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or pin. Please try again.',
        });

        // Reset loading state to false on login failure
        this.setState({ loading: false });
      }
    }
  };


 



  render() {
    const { loading, username, pin, error } = this.state;

   

    return (
      <>
        {loading && <Loading_Scren />}
        <div>
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <a className="navbar-brand" href="#" id="navbar-itm-text-logo">
                <img src={Logo} width="150" alt="logo" />
              </a>
              <h6 className="sign-up">
                New User? <span className="sign-two">Sign Up</span>
              </h6>
            </div>
          </nav>
        </div>

        <section className="hero-section">
          <div className="container" id="hero-div">
            <div className="hero-div-next">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                  <div>
                    <img className="hero-img-log" src={Home_Page_Image} alt="home page" />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                  <div className="log-content">
                    <h1 className="log-content-h1">Welcome Back!</h1>
                    <p className="log-content-p">Login to continue</p>
                    <div>
                      <input
                        className="input-box-username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => this.setState({ username: e.target.value })}
                      />
                      <br></br>
                      <br></br>

                      <input
                        className="input-box-pin"
                        type="text"
                        value={pin}
                        placeholder="Pin"
                        onChange={(e) => this.setState({ pin: e.target.value })}
                      />
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <br></br>
                        <div className="login-btn-nav" onClick={this.handleLoginSubmit}>
                          Login {"->"}
                        </div>
                      </div>
                      <div className="col-8">
                        <h6 className="forgot-pin"onClick={()=>window.location = "http://www.yoururl.com"}>Forgot PIN</h6>
                      </div>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="public-footer">
          <div className="container">
            <div className="row">
              <div className="col-8" id="foot-content-cop">
                © 2023 BMC Software. All rights reserved.
              </div>
              <div className="col" id="foot-content-pri">
                Privacy Policy
              </div>
              <div className="col" id="foot-content-ter">
                Terms & Conditions
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile View */}
        <div className="container">
          <section className="mobile-section">
            <div className="log-content">
              <h1 className="log-content-h1">Welcome Back!</h1>
              <p className="log-content-p">Login to continue</p>
              <div>
                <input
                  className="input-box-username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <br></br>
                <br></br>
                <input
                  className="input-box-pin"
                  type="text"
                  value={pin}
                  placeholder="Pin"
                  onChange={(e) => this.setState({ pin: e.target.value })}
                />
              </div>

              <div className="row">
                <div className="col-4">
                  <br></br>
                  <div className="login-btn-nav" onClick={this.handleLoginSubmit}>
                    Login {"->"}
                  </div>
                </div>
                <div className="col-8">
                  <h6 className="forgot-pin"onClick={()=><Navigate to="/otp"/>}>Forgot PIN</h6>
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
          <footer className="mobile-public-footer">
            <div className="container">
              <div className="row">
                <div className="col-8" id="foot-content-cop">
                  © 2023 BMC Software. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    isLoading: state.account.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, pin) => dispatch(AccountActions.login(username, pin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
