import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const OnEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const OnPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const OnSubmitHandler = (event) =>{
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body)) // redux를 사용할 경우 
      .then(response => {
        if (response.payload.loginSuccess){
          navigate('/');
        } else{
          alert('Error')
        }
      })
    /* Redux를 사용하지 않을 경우 axios로 바로 전달
    Axios.post('/api/users/login', body)
    .then(response => response.data)
    */
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      width: '100%', height: '100vh'
    }}>
      <form style = {{ display: 'flex', flexDirection: 'column'}}
        onSubmit={OnSubmitHandler}
      >  
        <label>Email</label>
        <input type="email" value={Email} onChange={OnEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={OnPasswordHandler} />
        <br />
        <button type = "submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage