import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../utils/firebase.config';
import { useLocation, useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/store/userSlice';

const useAuthListener = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                dispatch(addUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                  }));

                  if(location.pathname === '/' || location.pathname === '/signup' )navigate('/browse')
            }else{
                dispatch(removeUser());
                navigate('/');
            }
        })

        return () => unsubscribe() // unsubscribe to the event listener
    },[navigate,dispatch])
}

export default useAuthListener;