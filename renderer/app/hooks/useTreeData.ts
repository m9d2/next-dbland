import { useEffect, useState } from 'react';
import { getConfigs, getDatabase, getTables } from '@/tools/api';

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  type?: string;
  data?: any;
}

export function useTreeData() {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  const updateTreeData = (node: TreeNode) => {
    setTreeData((prevTreeData) => {
      return prevTreeData?.map((item) => {
        if (item.key === node.key) {
          return {
            ...item,
            children: node.children,
          };
        }

        if (item.children) {
          return {
            ...item,
            children: updateTreeDataRecursive(item.children, node),
          };
        }

        return item;
      });
    });
  };

  const updateTreeDataRecursive = (children: TreeNode[], node: TreeNode): TreeNode[] => {
    return children.map((child) => {
      if (child.key === node.key) {
        return {
          ...child,
          children: node.children,
        };
      }

      if (child.children) {
        return {
          ...child,
          children: updateTreeDataRecursive(child.children, node),
        };
      }

      return child;
    });
  };

  const onLoadData = async (node: TreeNode) => {
    if (node.type === 'config') {
      const databases = await getDatabase(node.data.id);
      node.children = databases.map((db: any) => {
        return {
          title: db.name,
          type: 'database',
          data: db,
          key: `${node.data}-${db.name}`,
        };
      });
    }
    if (node.type === 'database') {
      const tables = await getTables(node.data.cid, node.data.name);
      node.children = tables.map((table: any) => {
        return {
          title: table.name,
          type: 'table',
          data: table,
          key: `${node.data}-${table.name}`,
        };
      });
    }
    updateTreeData(node);
  };

  useEffect(() => {
    const fetchConfigs = async () => {
      const data = await getConfigs();
      data.map((item: any) => {
        item.title = item.host;
        item.key = item.id;
        item.children = [];
        item.label = item.host;
        item.data = item;
        item.type = 'config';
      });
      setTreeData(data);
    };

    fetchConfigs();
  }, []);

  return { treeData, onLoadData };
}