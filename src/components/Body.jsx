import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'

import {  Outlet, useNavigate} from 'react-router-dom'
import SignUp from './SignUp'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase.config'
import { useDispatch } from 'react-redux'

import { ToastContainer } from 'react-toastify'
import useAuthListener from '../hooks/useAuthListener'


const Body = () => {

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useAuthListener();
    
        
    return (
        <div>
            <Outlet></Outlet>
            <ToastContainer theme='dark' position='bottom-right' hideProgressBar={true}> </ToastContainer>
        </div>
    )
}

export default Body;