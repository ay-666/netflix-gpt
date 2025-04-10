import { signOut } from 'firebase/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/firebase.config';
import { removeUser } from '../utils/store/userSlice';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../utils/store/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { LOGO, USER_PHOTO_URL } from '../utils/constants';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store)=> (store.user));
    const signOutHandler = async () => {

        dispatch(startLoading())
        try {
            await signOut(auth);
            //dispatch(removeUser);
            toast("Logged Out successfully!")
            navigate('/')
        } catch (error) {
            toast(error.message);
        } finally {
            dispatch(stopLoading())
        }
    }
    return (

        <div className='absolute w-full px-8 py-4 bg-gradient-to-b from-black z-30 flex justify-between text-white'>
            <img className='w-42 ' src= {LOGO}
                alt='logo'></img>

           {user ? ( <div className='flex p-2 gap-2'>
                <img src= {USER_PHOTO_URL}
                    className='w-10 ' alt="usericon" >
                </img>
                <button onClick={signOutHandler} className='font-bold'>(Sign Out)</button>
            </div>) : (<></>) }

        </div>

    )
}

export default Header