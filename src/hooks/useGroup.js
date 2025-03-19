import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getToken } from "./useAuth";

const API_URL = "https://nt-shopping-list.onrender.com/api/groups";

// ✅ Guruhlarni olish
const fetchGroupById = async (id) => {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const response = await axios.get(`${API_URL}/${id}`, {
        headers: { "x-auth-token": token },
    });

    return response.data;
};

// ✅ Guruhni o‘chirish funksiyasi
const deleteGroup = async (id) => {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    await axios.delete(`${API_URL}/${id}`, {
        headers: { "x-auth-token": token },
    });
};

const useGroup = (groupId) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 🟢 Guruh ma’lumotlarini olish
    const { data: group, isLoading } = useQuery({
        queryKey: ["group", groupId],
        queryFn: () => fetchGroupById(groupId),
        enabled: !!groupId, // ID mavjud bo‘lsa ishlaydi
    });

    // 🔴 Guruhni o‘chirish mutatsiyasi
    const deleteGroupMutation = useMutation({
        mutationFn: deleteGroup,
        onSuccess: () => {
            toast.success("Group successfully deleted!");
            queryClient.invalidateQueries(["groups"]); // Group ro‘yxatini yangilash
            navigate("/groups"); // Guruhlar sahifasiga qaytish
        },
        onError: (error) => {
            console.error("Group delete error:", error);
            toast.error("Failed to delete group.");
        },
    });

    return { group, isLoading, deleteGroupMutation };
};

export default useGroup;
