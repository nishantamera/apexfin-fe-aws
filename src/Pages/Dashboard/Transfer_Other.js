import React, { useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Loading_Scren from '../Front/LoadingScreen'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { transferSuccess } from '../../Actions/account.action';

const Transfer_Other = ({token, transferDetails, dispatchTransferSuccess}) => {


  const [isPopupOpen, setPopupOpen] = useState(false);

  const [payees,setPayees] =useState([]);

  // Transfer
  const[newPayeeName,setNewPayeeName]=useState('');
  const[newAccountNo,setNewAccountNo]=useState('');
  const[newBankName,setNewBankName]=useState('');
  const [loadingData , setLoadingData] = useState(false);




  const[amount1,setAmount1]=useState(Number);


  const [show, setShow] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [payeeName, setpayeeName] = useState('');
  const [accountNo, setaccountNo] = useState('');


  const containerStyle = {
    width: '100%', // Set the width to 100% for full-width
  };


  const handleShow = () => setShow(true);
  const handleClose = () => {setShow(false);};

  const handleShowPay = (name,accountNo) => {
    //console.log(typeof(amount1))
    //console.log(typeof(accountNo))
    setShowPay(true)
    setpayeeName(name);
    setaccountNo(accountNo);
  };



  const handleClosePay = () => {setShowPay(false);};


  const [postData, setPostData] = useState({
    // Your payload data
    payeeName: newPayeeName,
    bankName: newBankName,
    bankAccountNumber: newAccountNo,
    type: 'Local',
    
    // Add other key-value pairs as needed
  });

  const addPayee = async()=>{
    setLoadingData(true)
    var accessToken = token.access;
    if(!newPayeeName || !newAccountNo || !newBankName){
      setLoadingData(false)
      Swal.fire({
        title: "Need Fields",
        text: "Please fill in all fields?",
        icon: "error"
      });
      
      return;
    }


    // const newPayee ={
    //   name:newPayeeName,
    //   accountNo:newAccountNo,
    //   bankName:newBankName,
    // };

    // setPayees([...payees,newPayee]);

    // setNewPayeeName('');
    // setNewAccountNo('');
    // setNewBankName('');


    // try {

    //   console.log(newPayeeName,newBankName,newAccountNo)
    //   await axios.post(`https://democentraldev.trybmc.com/apex-bank/post/add-payee`,
    //   postData,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${accessToken}`,
    //       }).then(res=>{
    //    console.log(res)
        
    //   }).catch(err=>{
    //    console.log(err)
      
    //   })
    // } catch (error) {
    //   console.log(error)
     
    // }

//console.log(postData)
//console.log(newPayeeName,newBankName,newAccountNo)
    try {
      const response = await axios.post(
        'https://democentraldev.trybmc.com/apex-bank/post/add-payee',
        {
          payeeName: newPayeeName,
    bankName: newBankName,
    bankAccountNumber: newAccountNo,
    type: 'Local',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle the response here
      //console.log(response);
      setLoadingData(false);
      setShow(false);
      Swal.fire({
        title: "Payee Added",
        text: "Payee Added Succesfully!",
        icon: "Success",
        confirmButtonText: "Ok"
      }).then((result)=>{
        if (result.isConfirmed) {

          window.location.reload();
        }
      });

    } catch (error) {
      // Handle errors here
      console.error(error);
      setLoadingData(false);
      setShow(false);
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong!",
        icon: "error"
      });
    }

  }


  const deletePayee = async(accountNo) => {
   
    var accessToken = token.access;

    try {
      const response = await axios.post(
        'https://democentraldev.trybmc.com/apex-bank/post/delete-payee',
        {
          bankAccountNumber:accountNo
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle the response here
      console.log(response);
      setLoadingData(false);
      setShow(false);
      Swal.fire({
        title: "Succesfully Deleted",
        icon: "Success",
        confirmButtonText: "Ok"
      }).then((result)=>{
        if (result.isConfirmed) {

          window.location.reload();
        }
      });
    } catch (error) {
       // Handle errors here
       console.error(error);
       setLoadingData(false);
       setShow(false);
       Swal.fire({
         title: "Oops!",
         text: "Something went wrong!",
         icon: "error"
       });
    }


  };



  const updateAmount = (inputValue) => {
    // Remove leading zeros and validate the input as a valid number
    const strippedValue = inputValue.replace(/^0+/, '');
    const isValidNumber = /^\d*\.?\d*$/.test(strippedValue);

    if (isValidNumber) {
      setAmount1(strippedValue);
    }
  };


  const transfer_pay = async()=>{
    setLoadingData(true)
    // setShowPay(false)
    


    var accessToken = token.access;
    if(!amount1){
      alert("Please fill the amount");
      setLoadingData(false)
      return;
    }


    

    try {
// Remove leading zeros and validate the amount
const strippedAmount = amount1.replace(/^0+/, '');
const isValidNumber = /^\d*\.?\d*$/.test(strippedAmount);
const time = new Date();

if (!isValidNumber) {
  alert("Invalid amount format");
  setLoadingData(false);
  return;
}

// Format the amount with two decimal places
const formattedAmount = parseFloat(strippedAmount).toFixed(2);
const amount = parseFloat(strippedAmount).toFixed(2);
const transactionDetails = `${payeeName} | I-BANK`;
const transferObject = {
  transactionDetails,
  time,
  amount,
  type: 'Deduction',
};
//console.log(transferObject)

      //console.log(formattedAmount)
      const response = await axios.post(
        'https://democentraldev.trybmc.com/apex-bank/post/process-transaction',
        {
          transactionDetails:`${accountNo}: I-BANK`,
          amount:formattedAmount,
          transactionType:"Deduction"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle the response here
     // Handle the response here
     //console.log(response);
     setLoadingData(false);
     dispatchTransferSuccess([transferObject, ...transferDetails]);
     setShowPay(false);
     Swal.fire({
       title: "Transfer Succesfully",
       text: `Amount $ ${amount1} Transfer to ${payeeName} Successfully`,
       icon: "Success"
     });
    } catch (error) {
      // Handle errors here
      console.error(error);
    }


  }



  useEffect(()=>{
    getPayeeDetails()
  },[])


  const getPayeeDetails=async()=>{
    setLoadingData(true)

    var accessToken = token.access;

    try {
      await axios.get(`https://democentraldev.trybmc.com/apex-bank/get/payee-details`,{
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
      },
      }).then(res=>{
        //console.log(res)
      //  var data =res.data.details;
      //  console.log(data['Payee-Details'][0])
      var dataLoad= res.data.details['Payee-Details'];
      setPayees(dataLoad)
      setLoadingData(false)
        
      }).catch(err=>{
       console.log(err)
       setLoadingData(false)
      })
    } catch (error) {
      console.log(error)
      setLoadingData(false)
    }



  }

  // console.log(payees)

  return (



    
    <>
    {loadingData && <Loading_Scren />}
    <div className='dashboard-section-ui container px-4'style={containerStyle}>
    <div class="container px-4">
        <div class="row">
            <div class="col-9">
            <h1 className='saving-account'>Your Saved Payees</h1>
            </div>
            <div class="col">
            <button className='transfer-btn-add'onClick={handleShow}>Add Payees</button>
            </div>
      </div>
    
    </div>

    <div className="container px-4">
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="wp-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name & Account No.</th>
                <th>Bank Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Render payees in the table */}
              {payees.map((payee, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${payee.name} | ${payee.bankAccountNumber}`}</td>
                  <td>{payee.bankName}</td>
                  <td>
                    <button className="transfer-btn" onClick={()=>handleShowPay(payee.name,payee.bankAccountNumber)}>Transfer</button>

                    <button className="transfer-btn-delete"onClick={() => deletePayee(payee.accountNumber)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

        </div>
    

        <Modal  show={show} fullscreen={false} onHide={handleClose}>
        <Modal.Body className='modalght'>
        <div className="container px-4">
          
          <center>
            <div className='form-transfer'>
          <h6 className='form-heading'>Add Your Payees</h6>

                <div>
                <input
                type="text"
                className='input-box-transfer'
                placeholder="Name"
                value={newPayeeName}
                onChange={(e) => setNewPayeeName(e.target.value)}
              />

<br></br>

              <input
                type="text"
                className='input-box-transfer'
                placeholder="Account No."
                value={newAccountNo}
                onChange={(e) => setNewAccountNo(e.target.value)}
              />
<br></br>

<input
                type="text"
                className='input-box-transfer'
                placeholder="Bank Name"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
              />
<br></br>

<button className='transfer-btn-new'onClick={addPayee}>Add Payees</button>
                </div>
                </div>

                <p onClick={()=>handleClose()} className='pay-box-pa'>Cancel</p>
                </center>
                
        </div>
        </Modal.Body>
      </Modal>


      {/* Modal for Amount */}
      <Modal  show={showPay} fullscreen={false} onHide={handleClosePay}>
        <Modal.Body className='modalght'>
        <div className="container px-4">
          
          <center>
            <div className='form-transfer'>
          <h6 className='form-heading'>Paying to <span className='payii'>{payeeName}</span></h6>
                  <p>Acc No - {accountNo}</p>
                <div>
                <input
                type="text"
                className='input-box-transfer'
                placeholder="Enter amount"
                value={amount1}
                onChange={(e) => updateAmount(e.target.value)}
              />

<br></br>


<button className='transfer-btn-new'onClick={()=>transfer_pay()}>Transfer to {payeeName}</button>
                </div>
                </div>
                <p onClick={()=>handleClosePay()} className='pay-box-pa'>Cancel</p>
                </center>
                
        </div>
        </Modal.Body>
      </Modal>


      <br></br>

<footer className='pubdlic-footer-dash'>
<div className='container'>
<div className="row">
<div className="col" id='foot-content-cop-dash'>© Apex Global Bank 2022. All rights reserved</div>

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
    currentUser:state.account.currentUser,
    transferDetails: state.account.transferDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchTransferSuccess: (transferDetails) => dispatch(transferSuccess(transferDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer_Other);