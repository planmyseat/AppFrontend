import { useState } from "react";
import Constants from "expo-constants";
import { useAuth } from "@/context/AuthContext";

const API_URL = `${Constants.expoConfig?.extra?.API_URL}/auth/verifyOTP`;

export default function useVerifyOTP() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const verifyOTP = async (email: string, otp: string): Promise<{ ok: boolean; message?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed.");
      }

      const { token, user } = data;

      await login(user, token);

      return {ok :true};
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      return {ok:false, message: err.message};
    } finally {
      setLoading(false);
    }
  };

  return {
    verifyOTP,
    loading,
    error,
  };
}
