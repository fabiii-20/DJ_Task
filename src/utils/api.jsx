// api.jsx

import axios from 'axios';

const BASE_URL = 'https://stg.dhunjam.in/account/admin/';

// Function to handle login
export const login = async (username, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${BASE_URL}login`, {
      username: username,
      password: password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch admin details using admin ID
export const getAdminDetails = async (adminId) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`${BASE_URL}${adminId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // Function to update prices for admin using admin ID
  export const updatePrice = async (adminId, updatedPrices) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.put(`${BASE_URL}${adminId}`, {
        amount: updatedPrices // Include updated price data here
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export default { login, getAdminDetails, updatePrice };