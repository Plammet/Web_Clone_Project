import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const OnEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const OnNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const OnPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const OnConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const OnSubmitHandler = (event) =>{
    event.preventDefault();

    if(Password !== ConfirmPassword){
      return alert("Those passwords didn't match")
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body)) // redux를 사용할 경우 
      .then(response => {
        if (response.payload.success){
          navigate('/login');
        } else{
          alert('Failed to sign up')
        }
      })
  }

  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
    width: '100%', height: '100vh'
    }}>

      <form style = {{ display: 'flex', flexDirection: 'column'}}
        onSubmit={OnSubmitHandler}
      >  
        <label>Email</label>
        <input type="email" value={Email} onChange={OnEmailHandler} />
        <br />

        <label>Name</label>
        <input type="text" value={Name} onChange={OnNameHandler} />
        <br />

        <label>Password</label>
        <input type="Password" value={Password} onChange={OnPasswordHandler} />
        <br />

        <label>ConfirmPassword</label>
        <input type="Password" value={ConfirmPassword} onChange={OnConfirmPasswordHandler} />
        <br />

        <button type = "submit">
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage