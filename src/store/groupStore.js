import { create } from "zustand";
import axios from "axios";

const API_URL = "https://nt-shopping-list.onrender.com/api/groups";

const useGroupStore = create((set) => ({
  groups: [],
  loading: false,
  error: null,

  fetchGroups: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(API_URL);
      set({ groups: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addGroup: async (groupData) => {
    try {
      const response = await axios.post(API_URL, groupData);
      set((state) => ({ groups: [...state.groups, response.data] }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteGroup: async (groupId) => {
    try {
      await axios.delete(`${API_URL}/${groupId}`);
      set((state) => ({
        groups: state.groups.filter((group) => group.id !== groupId),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  joinGroup: async (groupId) => {
    try {
      await axios.post(`${API_URL}/${groupId}/join`);
      set((state) => ({
        groups: state.groups.map((group) =>
          group.id === groupId ? { ...group, isMember: true } : group
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  leaveGroup: async (groupId) => {
    try {
      await axios.post(`${API_URL}/${groupId}/leave`);
      set((state) => ({
        groups: state.groups.map((group) =>
          group.id === groupId ? { ...group, isMember: false } : group
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  searchGroups: (query) => {
    set((state) => ({
      groups: state.groups.filter((group) =>
        group.name.toLowerCase().includes(query.toLowerCase())
      ),
    }));
  },
}));

export default useGroupStore;
