import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { create } from "zustand";

const API_URL = "https://nt-shopping-list.onrender.com/api";

// 📌 AUTH STORE (Zustand orqali state boshqarish)
const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,

    setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },
    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },
    removeToken: () => {
        localStorage.removeItem("token");
        set({ token: null });
    },
    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        set({ user: null, token: null });
    }
}));

// 📌 TOKEN VA USERNI OLISH FUNKSIYALARI
export const getToken = () => useAuthStore.getState().token;
export const getUser = () => useAuthStore.getState().user;
export const removeToken = () => useAuthStore.getState().removeToken(); // ✅ EXPORT QILINDI

// 📌 LOGIN API chaqiruvchi funksiya
const login = async ({ username, password }) => {
    const response = await axios.post(`${API_URL}/auth`, { username, password });
    return response.data;
};

// 📌 REGISTER API chaqiruvchi funksiya
const register = async ({ username, name, password }) => {
    const response = await axios.post(`${API_URL}/users`, { username, name, password });
    return response.data;
};

// 📌 PROFIL MA’LUMOTLARINI OLISH
const getProfile = async () => {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { "x-auth-token": token }
    });
    return response.data;
};

// 📌 PROFILNI YANGILASH
const updateProfile = async (updatedData) => {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const response = await axios.put(`${API_URL}/users/profile`, updatedData, {
        headers: { "x-auth-token": token }
    });
    return response.data;
};

// 📌 AUTH HOOK (Login, Register, Logout, Profile)
const useAuth = () => {
    const navigate = useNavigate();
    const { setUser, setToken, logout } = useAuthStore();

    // 🔵 LOGIN MUTATION
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token);
            setUser(data.user);
            toast.success("Login successful");

            setTimeout(() => {
                navigate("/profile");
                navigate(0); // Sahifani yangilash
            }, 500);
        },
        onError: (error) => {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed");
        }
    });

    // 🟢 REGISTER MUTATION
    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            setToken(data.token);
            setUser(data.user);
            toast.success("Registration successful");

            setTimeout(() => {
                navigate("/profile");
                navigate(0);
            }, 500);
        },

        onError: (error) => {
            console.error("Register error:", error);
            toast.error(error.response?.data?.message || "Registration failed");
        }
    });

    // 🟠 PROFILE YANGILASH MUTATION
    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            setUser(data);
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            console.error("Profile update error:", error);
            toast.error(error.response?.data?.message || "Profile update failed");
        }
    });

    return { loginMutation, registerMutation, updateProfileMutation, logout, getUser, getToken, removeToken };
};

export default useAuth;
