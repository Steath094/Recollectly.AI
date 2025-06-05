import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from './Input';
import { Button } from './Button';
import { useRef, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; confirm?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notif, setNotif] = useState('');

  const validate = () => {
    const userName = usernameRef.current?.value?.trim() || '';
    const password = passwordRef.current?.value || '';
    const confirm = confirmRef.current?.value || '';

    const newErrors: typeof errors = {};

    // Username validation
    if (!/^[a-zA-Z0-9]{3,10}$/.test(userName)) {
      newErrors.username = 'Username must be 3-10 alphanumeric characters';
    }

    // Password strength validation
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)
    ) {
      newErrors.password =
        'Password must be 8-20 characters long with at least one uppercase, one lowercase, one number, and one special character';
    }

    // Confirm password
    if (password !== confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    const userName = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        userName,
        password,
      });
      console.log(response);
      navigate('/login');
    } catch (err) {
      setNotif('Signup failed. Please try again.');
      setTimeout(() => setNotif(''), 4000);
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
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-sm text-white">Please sign-up to continue</p>
          </div>

          <form className="space-y-4 mt-25 flex flex-col gap-4">
            <div className="gap-2 flex flex-col">
              {/* Username */}
              <Input
                ref={usernameRef}
                type="text"
                placeholder="Username"
                customClasses="w-full px-4 py-2 border rounded"
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}

              {/* Password with toggle */}
              <div className="relative">
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
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

              {/* Confirm Password (no toggle) */}
              <Input
                ref={confirmRef}
                type="password"
                placeholder="Confirm Password"
                customClasses="w-full px-4 py-2 border rounded"
              />
              {errors.confirm && <p className="text-sm text-red-500">{errors.confirm}</p>}
            </div>

            {/* Button */}
            <div className="flex justify-center mt-2">
              <Button
                onClick={handleSignup}
                disabled={isLoading}
                text={isLoading ? 'Signing up...' : 'Sign Up'}
                variant="primary"
                className="w-1/3 py-2 bg-[#5146e3] rounded-4xl text-white font-semibold hover:brightness-105 disabled:opacity-60"
              />
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#5146e3] font-semibold underline">
              Sign In
            </Link>
          </p>

          {/* Error Notification */}
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
