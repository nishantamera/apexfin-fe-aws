import React from 'react'
import ReactLoading from 'react-loading';


function LoadingScreen(props) {
  return (
    <>
    <div id='overlay'>
    
            

            <ReactLoading type={'cylon'} color={'#22C9B7'} height={'18%'} width={'18%'}/> 
            
           
            </div> 
            </>
  )
}

export default LoadingScreen