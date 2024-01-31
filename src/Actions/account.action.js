// import AlertActions from './alert.action';
import Swal from 'sweetalert2';
import * as ActionTypes from '../Constants/ActionTypes';
import * as ApiUrls from '../Constants/ApiUrls';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';



const login = (email, password) => {

    
    //console.log(email,password)

    return async (dispatch) => {
        if(!email) {
            Swal.fire({
                title: "Email is required",
                showCancelButton: true,
                confirmButtonColor: "#000",
                cancelButtonColor: "#22C9B7",
                confirmButtonText: "OK"
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
              });
        } else if (!password) {
            Swal.fire({
                title: "PIN is required",
                showCancelButton: true,
                confirmButtonColor: "#000",
                cancelButtonColor: "#22C9B7",
                confirmButtonText: "OK"
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
              });
        } else {
            console.log(email,password)
            
            try 
            {
                dispatch(loginIsLoading(true))
                console.log(email,password)
                const response = await fetch(ApiUrls.API_LOGIN, {
                    method: "POST",
                    
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: email,
                        pin: password,
                    }),
                    
                });
                if (response.status === 200) {
                    var passResponse = await response.json();
                    dispatch(setCurrentUser(jwt_decode(passResponse.access)))
                    dispatch(setAuthToken(passResponse))
                    localStorage.setItem('authTokens', JSON.stringify(passResponse))
                    // if (process.env.NODE_ENV === 'production') {
                    //     // Code for production environment
                    //     Navigate('/otp');
                    //   } else {
                    //     // Code for development environment
                    //     Navigate('/otp');
                    //   }
                    
                    
                }
                else {
                    var failResponse = await response.json();
                    //dispatch(alert("Error 1", failResponse.error))
                    Swal.fire({
                        title: "Something went wrong",
                        showCancelButton: true,
                        confirmButtonColor: "#000",
                        cancelButtonColor: "#22C9B7",
                        confirmButtonText: "OK"
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                      });
                }

            } catch (error) {
                Swal.fire({
                    title: "Something went wrong",
                    showCancelButton: true,
                    confirmButtonColor: "#000",
                    cancelButtonColor: "#22C9B7",
                    confirmButtonText: "OK"
                  }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                  });
                console.log(error)
            }
        }
    }
}

const logout = () => {
    return (dispatch) => {
        dispatch(setAuthToken(null))
        dispatch(setCurrentUser(null))
        localStorage.removeItem('authTokens')
    }
}



// const changePassword = (token, credentials) => {
//     return async (dispatch) => {
//         if (!credentials.password || !credentials.newPassword || !credentials.cnewPassword) {
//             dispatch(alert("Error", "Password fields should not be empty."))
//         } else {
//             dispatch(changePasswordIsLoading(true))
//             try
//             {
//                 const response = await fetch(ApiUrls.API_CHANGE_PASSWORD, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": "Bearer " + String(token.access)
//                     },
//                     body: JSON.stringify({
//                         oldPassword: credentials.password,
//                         newPassword: credentials.newPassword,
//                         cnewPassword: credentials.cnewPassword
//                     })
//                 });
//                 if (response.status === 200) {
//                     var passResponse = await response.json();
//                     dispatch(changePasswordIsLoading(false))
//                     dispatch(alert("Success", passResponse.success))

//                 } else {
//                     var failResponse = await response.json();
//                     await dispatch(changePasswordIsLoading(false))
//                     if (failResponse.error === undefined) {
//                         let response = failResponse.messages[0]['message']
//                         dispatch(alert("Error", "Session " + response + ". Please login again."))
//                         dispatch(logout())
//                     }
//                     else {
//                         dispatch(alert("Error", failResponse.error))
//                     }
//                 }
//             } catch (error) {
//                 dispatch(changePasswordIsLoading(false))
//                 dispatch(alert("Error", "Something went wrong."))
//             }
//         }
//     }
// }


const loginIsLoading = (bool) => ({type: ActionTypes.LOGIN_IS_LOADING, isLoading: bool})

const setCurrentUser = (user) => ({type: ActionTypes.SET_CURRENT_USER, currentUser: user})

const setAuthToken = (token) => ({type: ActionTypes.LOGIN, token: token})

// const changePasswordIsLoading = (bool) => ({type: ActionTypes.CHANGE_PASSWORD_IS_LOADING, changePasswordIsLoading: bool})

const authMethods = {
    login,
    logout,
    setAuthToken,
    // changePassword,
}



// export const tranferSuccess = (transferDetails)=>({
//     type:ActionTypes.TRANSFER_SUCCESS,
//     payload:transferDetails
// })



export default authMethods;


export const transferSuccess = (transferDetails) => {
    return {
    type:ActionTypes.TRANSFER_SUCCESS,
    payload: transferDetails,
    };
  };