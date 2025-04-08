import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    setIsLoading(true);

    try {
      const result = await login(formData);

      if (result?.success) {
        navigate('/');
      } else {
        setGeneralError(result?.error || 'Invalid email or password');
      }
    } catch (error) {
      setGeneralError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#F0FDF4] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border-[1px] border-zinc-300">
        <h2 className="mb-6 text-center text-3xl font-bold text-green-900 uppercase">
          Login
        </h2>

        {generalError && (
          <p className="mb-4 text-center text-red-500">{generalError}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex border-[1px] items-center py-2 mb-5">
            <MdOutlineEmail className="ml-3 md:ml-5 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="outline-none bg-transparent px-3 md:px-5 border-zinc-300 rounded-sm w-full"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex border-[1px] items-center py-2 mb-5 relative">
            <RiLockPasswordLine className="ml-3 md:ml-5 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              className="outline-none bg-transparent px-3 md:px-5 border-zinc-300 rounded-sm w-full pr-10"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 text-gray-500"
              disabled={isLoading}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-emerald-900">
            Don't have an account?
            <button
              onClick={() => navigate('/register')}
              className="ml-1 text-emerald-700 hover:underline"
              disabled={isLoading}
            >
              Register
            </button>
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 w-full bg-gray-100 py-2 font-bold text-green-900 hover:bg-gray-200 rounded disabled:opacity-50"
            disabled={isLoading}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;