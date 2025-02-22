import { API_BASE_URL } from "../constants/apiConstants";

export const apiClient = async (endpoint, { method = 'GET', headers = {}, body = null } = {}) => {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  };