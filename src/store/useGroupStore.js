import { create } from "zustand";
import axios from "axios";

const useGroupStore = create((set) => ({
  groups: [],
  fetchGroups: async () => {
    try {
      const response = await axios.get("https://nt-shopping-list.onrender.com/api/groups");
      set({ groups: response.data });
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  },
  addGroup: async (groupData) => {
    try {
      const response = await axios.post("https://nt-shopping-list.onrender.com/api/groups", groupData);
      set((state) => ({ groups: [...state.groups, response.data] }));
    } catch (error) {
      console.error("Error adding group:", error);
    }
  }
}));

export default useGroupStore;
