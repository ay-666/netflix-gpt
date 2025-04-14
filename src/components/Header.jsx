import { signOut } from 'firebase/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/firebase.config';
import { removeUser } from '../utils/store/userSlice';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../utils/store/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { LOGO, SUPPORTED_LANGUAGES, USER_PHOTO_URL } from '../utils/constants';
import { toggleGptSearchView } from '../utils/store/gptSlice';
import { changeLanguage } from '../utils/store/configSlice';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => (store.user));
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


    const gptSearchHandler = ()=>{
        dispatch(toggleGptSearchView())
    }
    const languageChangeHandler = (e) =>{
        dispatch(changeLanguage(e.target.value))
    }
    return (

        <div className='absolute w-full px-8 py-4 bg-gradient-to-b from-black z-30 flex justify-between text-white'>

            <img className='w-42 ' src={LOGO}
                alt='logo'></img>


            {user ? (<div className='flex p-2 gap-2'>
                <select className='' onChange={languageChangeHandler}>
                    {SUPPORTED_LANGUAGES.map((lang)=>(<option className='bg-gray-400' key={lang.identifier} value={lang.identifier} >{lang.name}</option>))}
                </select>
                <button onClick={gptSearchHandler} className='font-bold px-2 mx-2 bg-gray-500/60 hover:bg-gray-500/30 rounded'>GPT Search</button>
                <img src={USER_PHOTO_URL}
                    className='w-10 ' alt="usericon" >
                </img>
                <button onClick={signOutHandler} className='font-bold'>(Sign Out)</button>
            </div>) : (<></>)}

        </div>

    )
}

export default Header