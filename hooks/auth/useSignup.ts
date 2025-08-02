import Constants from "expo-constants";
import { useState } from "react";

const API_URL = `${Constants.expoConfig?.extra?.API_URL}/auth/signup`;

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed.");
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
    signup,
    loading,
    error,
  };
}