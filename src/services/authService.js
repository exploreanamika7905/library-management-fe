import { apiEndpoints, apiMethod } from "../constants/apiConstants";
import { apiClient } from "../utils/apiClient";

export const authService = {
    isAuthenticated: false,

    async login(email, password) {
        try {
            const response = await apiClient(`${apiEndpoints.USERS}/login`, {
                method: apiMethod.POST,
                body: { email, password }
            });
            localStorage.setItem('user', JSON.stringify(response));
            this.isAuthenticated = true;
            return { data: response, message: 'Login Successful' };
        } catch (error) {
            throw new Error(error.message || 'Invalid username or password');
        }
    },

    logout() {
        return new Promise((resolve) => {
            // Clear local storage
            localStorage.removeItem('user');
            this.isAuthenticated = false;
            resolve({ message: 'Logout successful' });
        });
    },

    isLoggedIn() {
        // Check if user data exists in local storage
        const user = localStorage.getItem('user');
        return user ? true : false;
    },

    getUser() {
        // Get user data from local storage
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}