import Constants from "expo-constants";
import { useState } from "react";

const API_URL = `${Constants.expoConfig?.extra?.API_URL}/auth/forgotPassword`;

export default function useForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    

    const forgotPassword = async (email: string ): Promise<{ success: boolean }> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed.");
            }
            
            return { success: true }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
            return { success: false }
        } finally {
            setLoading(false);
        }
    };

    return {
        forgotPassword,
        loading,
        error,
    };
}