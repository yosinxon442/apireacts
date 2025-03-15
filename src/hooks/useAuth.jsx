import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_URL = "https://nt-shopping-list.onrender.com/api";

const login = async ({ username, password }) => {
    const res = await axios.post(`${API_URL}/auth`, { username, password });
    return res.data;
};

const register = async ({ username, name, password }) => {
    const res = await axios.post(`${API_URL}/users`, { username, name, password });
    return res.data;
};

// Foydalanuvchini olish
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// Tokenni saqlash
export const setToken = (token) => {
    localStorage.setItem("token", token);
};

// Tokenni olish
export const getToken = () => localStorage.getItem("token");

// Token va userni o‘chirish (logout qilish)
export const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

const useAuth = () => {
    const navigate = useNavigate();

    // Login
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user)); // Foydalanuvchini saqlash
            toast.success("Login successful");

            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 500);
        },
        onError: () => {
            toast.error("Login failed. Please check your credentials.");
        }
    });

    // Register
    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user)); // Foydalanuvchini saqlash
            toast.success("Registration successful");

            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 500);
        },
        onError: () => {
            toast.error("Registration failed. Try again.");
        }
    });

    return { loginMutation, registerMutation };
};

export default useAuth;
