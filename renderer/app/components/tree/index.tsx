import './index.scss';
import React, { useState } from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';


interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}


export interface TreeProps {
}

export default function Tree(props: TreeProps) {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  
  const renderTree = (nodes: TreeNode[]) =>
    nodes.map((node) => (
      <TreeItem key={node.id} label={node.name} itemId={node.id}>
        {node.children && renderTree(node.children)}
      </TreeItem>
    ));

  return (
    <SimpleTreeView expansionTrigger="iconContainer">
      {renderTree(treeData)}
    </SimpleTreeView>
  );
}
