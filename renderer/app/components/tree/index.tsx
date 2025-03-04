import './index.scss';
import React from 'react';
import type { BasicDataNode, TreeProps as RcTreeProps } from 'rc-tree';
import RcTree from 'rc-tree';
import { CgChevronDown, CgChevronRight } from 'react-icons/cg';
import { DataNode } from 'rc-tree/lib/interface';

export interface TreeNodeProps {
  key?: string;
  title?: string | React.ReactNode;
  icon?: React.ReactNode | ((props: TreeNodeProps) => React.ReactNode);
  expanded?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface TreeNode extends React.Component<TreeNodeProps> {}

export interface TreeProps<T extends BasicDataNode = DataNode>
  extends Omit<
    RcTreeProps<T>,
    'prefixCls' | 'showLine' | 'direction' | 'draggable' | 'icon' | 'switcherIcon'
  > {}

const renderSwitcherIcon = (props: any) => {
  return props.expanded ? <CgChevronDown /> : <CgChevronRight />;
};

export default function Tree(props: TreeProps) {
  return (
    <RcTree
      onClick={(e, node) => {
        console.log(e, node);
      }}
      prefixCls="tree"
      switcherIcon={renderSwitcherIcon}
      {...props}
    >
      {props.children}
    </RcTree>
  );
}
