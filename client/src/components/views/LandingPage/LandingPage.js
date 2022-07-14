import axios from 'axios'
import React from 'react'

function LandingPage() {

  const OnClickHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
      if(response.data.success){
        console.log(response.data)
      }
      else {
        alert('Logout Failed')
      }
    })
  }
  return (
    <div style={{
      display: 'flex', flexDirection : 'column', justifyContent: 'center', alignItems: 'center', 
      width: '100%', height: '100vh'
    }}>
      
      <h2> 시작 페이지 </h2>
      <br />

      <button onClick = {OnClickHandler}>
        Logout
      </button>
      
    </div>
  )
}

export default LandingPage