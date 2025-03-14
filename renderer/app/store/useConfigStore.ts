import { create } from 'zustand';

interface ConfigStore {
  configs: any[];
  setConfigs: (configs: any[]) => void;
}

export const userConfigStore = create<ConfigStore>((set) => ({
  configs: [],
  setConfigs: (configs) => set({ configs }),
}));