import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 12 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match!');
      return;
    }

    setPasswordError('');
    alert('Signup successful! (Replace with actual API call)');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-emerald-50">
      <div className="border-2 border-emerald-100 p-8 rounded-lg shadow-lg bg-white w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-800">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Fields Container */}
          <div className="flex gap-4 mb-4">
            {/* First Name Input */}
            <div className="flex-1">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Firstname"
                className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
                required
              />
            </div>
            {/* Last Name Input */}
            <div className="flex-1">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Lastname"
                className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
              required
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded mb-4"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-emerald-800">
            Already have an account?
            <button onClick={() => navigate('/login')} className="text-emerald-600 hover:underline ml-1">
              Login
            </button>
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;