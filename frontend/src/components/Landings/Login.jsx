import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    setEmailError('');

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);

    alert('Login data submitted. Check console for details.');

    if (role === 'user') {
      navigate('/user-dashboard');
    } else if (role === 'worker') {
      navigate('/worker-dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-emerald-50">
      <div className="border-2 border-emerald-100 p-8 rounded-lg shadow-lg bg-white w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
              required
            />
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
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
              required
            />
          </div>
          <div className="mb-6">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
              required
            >
              <option value="user">User</option>
              <option value="worker">Worker</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded mb-4"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-emerald-800">
            Don't have an account?
            <button onClick={() => navigate('/register')} className="text-emerald-600 hover:underline ml-1">
              Register
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

export default LoginPage;