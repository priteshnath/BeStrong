import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle redirect
import { FaUser, FaLock } from 'react-icons/fa';
import HeaderSection from './HeaderSection';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // To handle redirect after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send login data to the backend
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();
      // console.log(data);
      

      if (data.msg == 'Login successful') {
        localStorage.setItem('token',data.token);
        // If login is successful, redirect to home
        navigate('/'); // Redirect to home page
      } else {
        // Display error message if credentials are incorrect
        setErrorMessage(data.msg);
      }
    } catch (err) {
      setErrorMessage('Error connecting to the server. Please try again later.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e); // Trigger the form submission on Enter key press
    }
  };

  return (
    <>
      <HeaderSection />
      <div className="pt-20 flex items-center justify-center min-h-screen bg-black text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center">Log In</h2>

          {/* Display error message */}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

          {/* Username or Email Input */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium" htmlFor="usernameOrEmail">
              Username or Email
            </label>
            <div className="flex items-center bg-gray-900 rounded-lg">
              <FaUser className="text-lime-500 ml-3" />
              <input
                type="text"
                id="usernameOrEmail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Enter your username or email"
                className="w-full p-3 bg-transparent border-none focus:outline-none text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <div className="flex items-center bg-gray-900 rounded-lg">
              <FaLock className="text-lime-500 ml-3" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 bg-transparent border-none focus:outline-none text-white placeholder-gray-500"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-lime-500 text-black py-3 rounded-lg font-semibold hover:bg-lime-400 transition-colors"
          >
            Log In
          </button>

          {/* Redirect to Signup */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="/signup" className="text-lime-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
