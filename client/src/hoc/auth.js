import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null){
    // options
    // null : 아무나 출입 가능 
    // true : 로그인한 유저만 출입 가능
    // false : 로그인하지 않은 유저만 출입 가능
    
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        const navigate = useNavigate();
          
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        navigate('/login')
                    }
                }
                
                //로그인 한 상태
                else {
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/')
                    }
                    else{
                        navigate('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}