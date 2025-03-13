// src/stores/useTreeStore.ts
import { create } from 'zustand';

// 定义 store 的状态和更新方法
interface TreeStore {
  selectedNode: string | null; // 存储选择的节点
  setSelectedNode: (nodeKey: string | null) => void; // 更新节点的方法
}

export const useTreeStore = create<TreeStore>((set) => ({
  selectedNode: null,
  setSelectedNode: (nodeKey) => set({ selectedNode: nodeKey }), // 设置节点
}));