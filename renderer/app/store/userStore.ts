import { create } from 'zustand';

const useStore = create((set) => ({
  currentDatabase: null,
  setCurrentDatabase: (database: string) => set({ currentDatabase: database }),
}));

export default useStore;