import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // useNavigate for redirecting
import HeaderSection from './HeaderSection';
import FooterSection from './FooterSection';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // To handle navigation after signup

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation: Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    // Reset error message before sending the request
    setErrorMessage('');
  
    // Send data to backend
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
  
      const data = await response.json();
  
      // Check for success or failure response
      if (response.ok) { // Only redirect if the response is ok
        setSuccessMessage('Registration successful! Please login.');
        setErrorMessage('');
        // Optionally, save user details to localStorage (if needed)
        localStorage.setItem('user', JSON.stringify({ username, email }));
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        setErrorMessage(data.msg || 'Registration failed. Please try again.');
        setSuccessMessage('');
      }
    } catch (err) {
      setErrorMessage('Error connecting to the server. Please try again later.');
      setSuccessMessage('');
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
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>

          {/* Display success or error messages */}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          {successMessage && <div className="text-green-500">{successMessage}</div>}

          {/* Username Input */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium" htmlFor="username">
              Username
            </label>
            <div className="flex items-center bg-gray-900 rounded-lg">
              <FaUser className="text-lime-500 ml-3" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full p-3 bg-transparent border-none focus:outline-none text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <div className="flex items-center bg-gray-900 rounded-lg">
              <FaEnvelope className="text-lime-500 ml-3" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="flex items-center bg-gray-900 rounded-lg">
              <FaLock className="text-lime-500 ml-3" />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 bg-transparent border-none focus:outline-none text-white placeholder-gray-500"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-lime-500 text-black py-3 rounded-lg font-semibold hover:bg-lime-400 transition-colors"
          >
            Sign Up
          </button>

          {/* Redirect to Login */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-lime-500 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default SignUp;
