import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Input } from './Input';
import { useRef } from 'react';
import axios from "axios";
import { BACKEND_URL } from '../config';
import { useDispatch } from 'react-redux'
import {login } from '../store/authSlice'
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const handleSignin = async () =>{
    const userName = usernameRef.current?.value
    const password = passwordRef.current?.value
    const response = await axios.post(`${BACKEND_URL}/api/v1/login`,{
      userName,password
    })
    const jwt = response.data.data;
    localStorage.setItem("token", jwt);
    dispatch(login({token: jwt}))
    navigate('/dashboard')
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="relative w-1/4 max-w-sm bg-white shadow-md rounded-xl overflow-hidden">
        <motion.div
          className="absolute w-[550px] h-[550px] bg-gradient-to-r from-[#e1e8ff] to-[#5146e3] rounded-full -top-[300px] -left-[170px] rotate-[60deg]"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="relative z-10 p-6 pt-32">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-white">Please sign-in to continue</p>
          </div>
          <form className="space-y-4 mt-25 flex flex-col gap-4">
            <div className='gap-2 flex flex-col'>
              <Input ref={usernameRef} type='text' placeholder='Username' customClasses='w-full px-4 py-2 border rounded'/>
              <Input ref={passwordRef} type='password' placeholder='Password' customClasses='w-full px-4 py-2 border rounded'/>
            {/* <div className="text-sm text-gray-500 underline">Forgot your password?</div> */}
            </div>
            <div className='flex justify-center '>
              <Button onClick={handleSignin}  text='Sign In' variant='primary' className="w-1/3 py-2 bg-[#5146e3] rounded-4xl text-white font-semibold hover:brightness-105">
            </Button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#5146e3] font-semibold underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
