import { useState } from 'react';
import { authService } from '../services/authService';

export const useAuthApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await authService.loginUser(email, password);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err?.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await authService.registerUser(userData);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await authService.googleLogin();
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err?.message || 'Google Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
  };
};
