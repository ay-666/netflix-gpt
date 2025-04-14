import React, { useState } from 'react'
import Header from './Header';
import { Link , useNavigate } from 'react-router-dom';
import { validateInput } from '../utils/validateInput';
import { auth } from '../utils/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/store/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import { startLoading,stopLoading } from '../utils/store/loadingSlice';
import { NETFLIX_BACKGROUND_IMAGE } from '../utils/constants';



const Login = () => {

  const [formInput, setFormInput] = useState({
    email: "",
    password: ""
  });
  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
    other:""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(store => store.loading.isLoading);
  const handleChange = (e) => {

    setFormInput((prevInput) => ({ ...prevInput, [e.target.name]: e.target.value }))
    const errorMessage = validateInput(e.target.name, e.target.value, true)

    setInputErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: errorMessage }))
  }

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

    console.log(formInput.email)
    console.log(formInput.password)

    dispatch(startLoading());

    signInWithEmailAndPassword(auth,formInput.email,formInput.password).then((userCredential)=>{
      const user = userCredential.user;
      console.log(user)
      if(!user){
        toast("Login Error");
        return; 
      }
      // dispatch(addUser({
      //   uid: user.uid,
      //   email: user.email,
      //   displayName: user.displayName,
      //   photoURL: user.photoURL,
      // }));

      toast("Login Successful")


      navigate('/browse');



    }).catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(`Err: ${errorCode} : ${errorMessage}`)
      // updatedErrors.other = `Err: ${errorCode} : ${errorMessage}`
      toast(errorMessage);
    }).finally(()=>{
      dispatch(stopLoading());
    })


    
  }

  return (
    <div >
      <Header />
      <div className='absolute'>
        <img
          src={NETFLIX_BACKGROUND_IMAGE}
          alt="bg"></img>
      </div>

      <form className='w-4/12 py-10 px-14 bg-black/80 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-8'
        onSubmit={(e) => handleSubmit(e)}>
        <label className='text-white font-bold text-3xl'>Sign In</label>
        <div>
          <input type="text" name='email' onChange={handleChange} className='p-2 w-full h-14 border-2 border-gray-400 rounded focus:outline-2 focus:outline-offset-2 focus:outline-white bg-transparent text-white' placeholder='Email' />
          {inputErrors.email && <p className='text-sm text-red-500 mt-1'>{inputErrors.email}</p>}
        </div>
        <div>
          <input type="password" name='password' onChange={handleChange} className='h-14 w-full  p-2 border-2 border-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-white rounded text-white' placeholder='Password' />
          {inputErrors.password && <p className='text-sm text-red-500 mt-1'>{inputErrors.password}</p>}
        </div>
        {inputErrors.other && <p className='text-sm text-red-500 mt-1'>{inputErrors.other}</p>}
        <button className=' text-center flex justify-center rounded p-2 bg-red-500 text-white font-bold'>
          {
            isLoading ? (<div className=' w-5 h-5 border-2 border-gray-200 border-t-transparent animate-spin rounded-full text-center'> 

            </div>)  : ('Sign In')
          }
        </button>

        <div><span className='text-gray-400'>New to Netflix? </span>
          <Link to="/signup"><span className='text-white font-medium'>Sign Up now.</span></Link>
        </div>
        
      </form>
      
    </div>
  )
}

export default Login;