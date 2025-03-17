import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_URL = "https://nt-shopping-list.onrender.com/api";

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

// 📌 Foydalanuvchi ma’lumotlarini olish
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// 📌 Tokenni olish
export const getToken = () => localStorage.getItem("token");

// 📌 Tokenni saqlash
export const setToken = (token) => {
    localStorage.setItem("token", token);
};

// 📌 Token va user ma’lumotlarini o‘chirish
export const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// 📌 AUTH HOOK (Login va Register)
const useAuth = () => {
    const navigate = useNavigate();

    // 🟢 LOGIN MUTATION
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Login successful");

            setTimeout(() => {
                navigate("/profile");
                navigate(0); // Sahifani yangilash
            }, 500);
        },
        onError: (error) => {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials.");
        }
    });

    // 🔵 REGISTER MUTATION
    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Registration successful");

            setTimeout(() => {
                navigate("/profile");
                navigate(0); // Sahifani yangilash
            }, 500);
        },
        onError: (error) => {
            console.error("Register error:", error);
            toast.error("Registration failed. Try again.");
        }
    });

    return { loginMutation, registerMutation };
};

export default useAuth;
