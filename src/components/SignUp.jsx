import React, { useState } from 'react'
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { validateInput } from '../utils/validateInput';
import { auth } from '../utils/firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { startLoading, stopLoading } from '../utils/store/loadingSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { NETFLIX_BACKGROUND_IMAGE } from '../utils/constants';

const SignUp = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const [inputErrors, setInputErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        other: ""
    })
    const isLoading = useSelector(state => state.loading.isLoading);
    const dispatch  = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasError = false;
        let updatedErrors = { ...inputErrors };

        for (let key in formInput) {
            const message = validateInput(key, formInput[key], true);
            updatedErrors[key] = message;
            if (message) hasError = true;
        }
        setInputErrors(updatedErrors);
        if (hasError) {
            console.log("Has issues")
            return;
        }

        dispatch(startLoading());

        createUserWithEmailAndPassword(auth, formInput.email, formInput.password)
            .then(async (userCredential) => {
                // Signed up 
                

                await updateProfile(auth.currentUser,{
                    displayName: formInput.fullName
                })
                const user = auth.currentUser;
                
                //console.log(user)
                navigate('/browse')
                toast("User Registered Successfully")

                setFormInput({
                    fullName:'',
                    email: '',
                    password: '',
                  });
                
                  // Optional: also clear any input errors
                  setInputErrors({});
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(`Err: ${errorCode} : ${errorMessage}`)
                // updatedErrors.other = `Err: ${errorCode} : ${errorMessage}`
                toast(errorMessage)

                setInputErrors(updatedErrors);
                // ..
            }).finally(()=>{
                dispatch(stopLoading());
            });
    }

    const handleChange = (e) => {
        setFormInput((prevInput) => ({ ...prevInput, [e.target.name]: e.target.value }))
        const errorMessage = validateInput(e.target.name, e.target.value, true)

        setInputErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: errorMessage }))
    }
    return (
        <div >
            <Header />
            <div className='absolute w-full h-full'>
                <img className='w-full h-full object-cover'
                    src={NETFLIX_BACKGROUND_IMAGE}
                    alt="bg"></img>
            </div>

            <form className='w-4/5 sm:w-3/5 md:w-1/2 lg:1/4 py-10 px-8 md:px-14 bg-black/80 absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] flex flex-col gap-8 '
                onSubmit={(e) => handleSubmit(e)}>
                <label className='text-white font-bold text-2xl md:text-3xl'>Sign Up</label>
                <div>
                    <input type="text" name='fullName' value={formInput.fullName} onChange={handleChange} className='p-2 w-full  h-14 border-2 border-gray-400 rounded focus:outline-2 focus:outline-offset-2 focus:outline-white bg-transparent text-white' placeholder='Full Name' />
                    {inputErrors.fullName && <p className='text-sm text-red-500 mt-1'>{inputErrors.fullName}</p>}
                </div>
                <div>
                    <input type="text" name='email'value={formInput.email} onChange={handleChange} className='p-2 w-full h-14 border-2 border-gray-400 rounded focus:outline-2 focus:outline-offset-2 focus:outline-white bg-transparent text-white' placeholder='Email' />
                    {inputErrors.email && <p className='text-sm text-red-500 mt-1'>{inputErrors.email}</p>}
                </div>

                <div>
                    <input type="password" name='password' value={formInput.password} onChange={handleChange}  className='h-14 w-full p-2 border-2 border-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-white rounded text-white' placeholder='Password' />
                    {inputErrors.password && <p className='text-sm text-red-500 mt-1'>{inputErrors.password}</p>}
                </div>
                {inputErrors.other && <p className='text-sm text-red-500 mt-1'>{inputErrors.other}</p>}
                <button className=' text-center flex justify-center rounded p-2 bg-red-500 text-white font-bold'>
                    {
                        isLoading ? (<div className=' w-5 h-5 border-2 border-gray-200 border-t-transparent animate-spin rounded-full text-center'>

                        </div>) : ('Sign Up')
                    }
                </button>

                <div><span className='text-gray-400'>Already Registered?  </span> <Link to='/'><span className='text-white font-medium'>Log In now.</span> </Link> </div>
            </form>
            
        </div>
    )
}

export default SignUp;