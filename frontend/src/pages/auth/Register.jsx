import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { FaRegUser, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "resident",
    address: "",
    assignedVehicle: ""
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) return 'Password must be at least 8 characters long';
    if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
    if (!hasNumbers) return 'Password must contain at least one number';
    if (!hasSpecialChar) return 'Password must contain at least one special character (!@#$%^&*)';
    return '';
  };

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
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(formData);

      if (result?.success) {
        navigate('/login');
      } else {
        setGeneralError(result?.error || 'Registration failed');
      }
    } catch (error) {
      setGeneralError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#F0FDF4] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border-[1px] border-zinc-300">
        <h2 className="mb-6 text-center text-3xl font-bold text-green-900 uppercase">
          Register
        </h2>

        {generalError && (
          <p className="mb-4 text-center text-red-500">{generalError}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Name Input */}
          <div className="flex border-[1px] items-center py-2 mb-5">
            <FaRegUser className="ml-3 md:ml-5 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              className="outline-none bg-transparent px-3 md:px-5 border-zinc-300 rounded-sm w-full"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Email Input */}
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
            {emailError && <p className="text-red-500 text-sm mt-1 ml-3">{emailError}</p>}
          </div>

          {/* Password Input */}
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
            {passwordError && <p className="text-red-500 text-sm mt-1 ml-3">{passwordError}</p>}
          </div>

          {/* Role Selection */}
          <div className="flex border-[1px] items-center py-2 mb-5">
            <FaRegUser className="ml-3 md:ml-5 text-gray-500" />
            <select
              name="role"
              className="outline-none bg-transparent px-3 md:px-5 border-zinc-300 rounded-sm w-full"
              value={formData.role}
              onChange={handleChange}
              required
              disabled={isLoading}
            >
              <option value="resident">Resident</option>
              <option value="garbage_collector">Garbage Collector</option>
            </select>
          </div>

          {/* Conditional Fields */}
          {formData.role === 'resident' && (
            <div className="flex border-[1px] items-center py-2 mb-5">
              <FaMapMarkerAlt className="ml-3 md:ml-5 text-gray-500" />
              <input
                type="text"
                name="address"
                placeholder="Enter Address"
                className="outline-none bg-transparent px-3 md:px-5 border-zinc-300 rounded-sm w-full"
                value={formData.address}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          )}

          {formData.role === 'garbage_collector' && (
            <div className="flex border-[1px] items-center py-2 mb-5">
              <FaTruck className="ml-3 md:ml-5 text-gray-500" />
              <input
                type="text"
                name="assignedVehicle"
                placeholder="Enter Vehicle Number"
                className="outline-none bg-transparent px-3 md:px-5 border-zinc-300 rounded-sm w-full"
                value={formData.assignedVehicle}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-emerald-900">
            Already have an account?
            <button
              onClick={() => navigate('/login')}
              className="ml-1 text-emerald-600 hover:underline"
              disabled={isLoading}
            >
              Login
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

export default Signup;