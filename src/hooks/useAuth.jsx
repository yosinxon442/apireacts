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

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const getToken = () => localStorage.getItem("token");

export const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

const useAuth = () => {
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
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

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
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
