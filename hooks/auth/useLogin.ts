import Constants from "expo-constants";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = `${Constants.expoConfig?.extra?.API_URL}/auth/login`;

export default function useLogin() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const Login = async (email: string, password: string): Promise<{ verified: boolean, success: boolean }> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed.");
            }

            const { token, user, verified } = data;

            if (verified) {
                await login(user, token);
            }

            return { verified, success: true }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
            return { success: false, verified: false }
        } finally {
            setLoading(false);
        }
    };

    return {
        Login,
        loading,
        error,
    };
}