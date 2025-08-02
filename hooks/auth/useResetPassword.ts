import Constants from "expo-constants";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

const API_URL = `${Constants.expoConfig?.extra?.API_URL}/auth/resetPassword`;

export default function useResetPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetPassword = async (password: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = await SecureStore.getItemAsync('token');
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Password Reset failed.");
            }

            return true
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
            return false
        } finally {
            setLoading(false);
        }
    };

    return {
        resetPassword,
        loading,
        error,
    };
}