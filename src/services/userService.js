import { apiEndpoints, apiMethod } from "../constants/apiConstants";
import { apiClient } from "../utils/apiClient";

export const createUser = async (payload) => {
    try {
        const response = await apiClient(`${apiEndpoints.USERS}`, {
            method: apiMethod.POST,
            body: { ...payload }
        });
        return { data: response, message: 'Sign up successful', success: true };
    } catch (error) {
        console.error('Sign Up user:', error);
        return { message: error.message, success: false };
    }
}

export const getUsers = async () => {
    try {
        const response = await apiClient(`${apiEndpoints.USERS}`, {
            method: apiMethod.GET
        });

        return { data: response, message: 'Users Found Successful', success: true };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { message: error.message, success: false };
    }
}

export const getUserById = async (id) => {
    try {
        const response = await apiClient(`${apiEndpoints.USERS}/${id}`, {
            method: apiMethod.GET,
        });

        return { data: response, message: 'User found successfully', success: true };
    } catch (error) {
        console.error('Error fetching user details:', error);
        return { message: error.message, success: false };
    }
};