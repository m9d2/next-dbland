import React, { useEffect, useState } from 'react';
import { Tree, TreeDataNode } from 'antd';

const { DirectoryTree } = Tree;


interface DatabaseProps {
  className?: string;
}

interface TreeNode extends TreeDataNode{
  type?: string;
  data?: any;
}


export default function Database({ className }: DatabaseProps) {
  const [treeData, setTreeData] = useState<TreeNode[]>();

  const getConfigs = async () => {
    const res = await fetch('api/config');
    return await res.json();
  };

  const getDatabase = async (cid: number) => {
    const res = await fetch('api/database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: cid,
      }),
    });
    return await res.json();
  };

  const getTables = async (cid: number, db: string) => {
    const body = {
      cid: cid,
      database: db,
    };
    console.log(body);
    const res = await fetch('api/table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  };

  function updateTreeData(node: TreeNode) {
    // 递归更新树结构
    setTreeData((prevTreeData) => {
      return prevTreeData?.map((item) => {
        if (item.key === node.key) {
          return {
            ...item,
            children: node.children,
          };
        }

        // 如果有子节点，则递归更新子节点
        if (item.children) {
          return {
            ...item,
            children: updateTreeDataRecursive(item.children, node),
          };
        }

        return item;
      });
    });
  }

  function updateTreeDataRecursive(children: TreeNode[], node: TreeNode): TreeNode[] {
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
  }

  const onDoubleClick = async (node: TreeNode) => {
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
    updateTreeData(node)
  };
  
  useEffect(() => {
    getConfigs()
      .then((data) => {
        data.map((item: any) => {
          item.title = item.host;
          item.key = item.id;
          item.children = [];
          item.label = item.host;
          item.data = item;
          item.type = 'config';
        });
        setTreeData(data);
      });
  }, []);
  return (
    <DirectoryTree
      loadData={onDoubleClick}
      treeData={treeData}
    />
  );
}