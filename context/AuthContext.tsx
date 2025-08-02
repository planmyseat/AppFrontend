import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
    name: string;
    email: string;
    _id: string;
    verified: boolean
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (userData: User, token: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load session on initial app start
    useEffect(() => {
        const loadSession = async () => {
            try {
                const storedUser = await SecureStore.getItemAsync("user");
                const storedToken = await SecureStore.getItemAsync("token");

                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                }
            } catch (error) {
                console.error("Error loading session:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSession();
    }, []);

    const login = async (userData: User, token: string) => {
        try {
            await SecureStore.setItemAsync("user", JSON.stringify(userData));
            await SecureStore.setItemAsync("token", token);
            setUser(userData);
            setToken(token);
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await SecureStore.deleteItemAsync("user");
            await SecureStore.deleteItemAsync("token");
            setUser(null);
            setToken(null);
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}