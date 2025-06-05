import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Input } from './Input';
import { useRef, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notif, setNotif] = useState("");

  const handleSignin = async () => {
    const userName = usernameRef.current?.value?.trim() || '';
    const password = passwordRef.current?.value?.trim() || '';

    const newErrors: { username?: string; password?: string } = {};
    if (!userName) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
        userName,
        password,
      });

      const jwt = response.data.data;
      localStorage.setItem('token', jwt);
      localStorage.setItem('status', 'true');
      dispatch(login({ token: jwt }));
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setNotif("Invalid credentials or server error");
      setTimeout(() => setNotif(""), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="relative xl:w-1/4 w-full max-w-sm bg-white shadow-md rounded-xl overflow-hidden">
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

          <form className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1">
              <Input
                ref={usernameRef}
                type="text"
                placeholder="Username"
                customClasses="w-full px-4 py-2 border rounded"
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <Input
                ref={passwordRef}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                customClasses="w-full px-4 py-2 border rounded pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Button */}
            <div className="flex justify-center mt-2">
              <Button
                onClick={handleSignin}
                disabled={isLoading}
                text={isLoading ? 'Signing in...' : 'Sign In'}
                variant="primary"
                className=" py-2 bg-[#5146e3] rounded-4xl text-white font-semibold hover:brightness-105 disabled:opacity-60"
              />
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#5146e3] font-semibold underline">
              Sign Up
            </Link>
          </p>

          {/* Notification */}
          {notif && (
            <div className="mt-4 text-sm text-red-500 text-center bg-red-100 px-4 py-2 rounded">
              {notif}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
