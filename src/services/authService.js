// Empty service layer for future API integration
// Replace the simulated delays with actual API calls (e.g., using axios)

export const authService = {
  loginUser: async (email, password) => {
    // Placeholder for actual login API endpoint
    // return axios.post('/api/auth/login', { email, password });
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful login for now
        resolve({ token: 'dummy_token', user: { name: 'User', email } });
      }, 1500);
    });
  },

  registerUser: async (userData) => {
    // Placeholder for actual registration API endpoint
    // return axios.post('/api/auth/register', userData);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ token: 'dummy_token', user: { name: userData.fullName, email: userData.email } });
      }, 1500);
    });
  },

  googleLogin: async () => {
    // Placeholder for Google OAuth login
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'dummy_google_token', user: { name: 'Google User' } });
      }, 1000);
    });
  }
};
