import { apiEndpoints, apiMethod } from "../constants/apiConstants";
import { apiClient } from "../utils/apiClient";

export const bookIssue = async (email, bookId) => {
    try {
        const response = await apiClient(`${apiEndpoints.BOOK_OPERATIONS}/issue`, {
            method: apiMethod.POST,
            body: { email, bookId }
        });
        return { data: response, message: 'Book issued successfully', success: true };
    } catch (error) {
        console.error('Book Issued:', error);
        return { message: error.message, success: false };
    }
}

export const bookReturn = async (email, bookId) => {
    try {
        const response = await apiClient(`${apiEndpoints.BOOK_OPERATIONS}/return`, {
            method: apiMethod.POST,
            body: { email, bookId }
        });
        return { data: response, message: 'Book return successfully', success: true };
    } catch (error) {
        console.error('Book Return:', error);
        return { message: error.message, success: false };
    }
}

export const bookRenew = async (email, bookId) => {
    try {
        const response = await apiClient(`${apiEndpoints.BOOK_OPERATIONS}/renew`, {
            method: apiMethod.POST,
            body: { email, bookId }
        });
        return { data: response, message: 'Book renew successfully', success: true };
    } catch (error) {
        console.error('Book Renew:', error);
        return { message: error.message, success: false };
    }
}