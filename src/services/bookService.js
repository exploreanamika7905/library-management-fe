import { apiEndpoints, apiMethod } from "../constants/apiConstants";
import { apiClient } from "../utils/apiClient";

export const createBook = async (payload) => {
    try {
        const response = await apiClient(`${apiEndpoints.BOOKS}`, {
            method: apiMethod.POST,
            body: { ...payload }
        });
        return { data: response, message: 'Book Added successfully', success: true };
    } catch (error) {
        console.error('Book Add:', error);
        return { message: error.message, success: false };
    }
}

export const getBooks = async () => {
    try {
        const response = await apiClient(`${apiEndpoints.BOOKS}`, {
            method: apiMethod.GET
        });

        return { data: response, message: 'Books Found Successful', success: true };
    } catch (error) {
        console.error('Error fetching books:', error);
        return { message: error.message, success: false };
    }
}

export const getBookById = async (id) => {
    try {
        const response = await apiClient(`${apiEndpoints.BOOKS}/${id}`, {
            method: apiMethod.GET,
        });

        return { data: response, message: 'Book found successfully', success: true };
    } catch (error) {
        console.error('Error fetching book details:', error);
        return { message: error.message, success: false };
    }
};