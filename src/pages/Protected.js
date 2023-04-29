import React from 'react'
import { useNavigate } from 'react-router-dom';
import SignIn from './Signin';

function Protected({ Component }) {
    const navigate = useNavigate()
    const login = 1;
  return (
    <>
    {
        login ? <Component /> : <SignIn /> 
    }
    </>
  )
}

export default Protected