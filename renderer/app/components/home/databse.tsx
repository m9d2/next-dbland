import Tree from '@/components/tree';
import React, { useEffect, useState } from 'react';
import { DataNode } from 'rc-tree/lib/interface';
import DatabaseSvg from '@/components/svg/database';
import MySQLSvg from '@/components/svg/mysql';

export default function Database() {
  const [treeData, setTreeData] = useState<DataNode[]>();
  const loadData = async (node: any) => {
    const res = await fetch('api/database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: node.id,
      }),
    });

    const data = await res.json();
    setTreeData((prevTreeData) => {
      return prevTreeData?.map((item) => {
        if (item.key === node.key) {
          return {
            ...item,
            children: data.map((item: any) => ({
              title: item.name,
              key: item.name,
              children: [],
              icon: <DatabaseSvg />,
            })),
          };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    fetch('api/config')
      .then((response) => response.json())
      .then((data) => {
        data.map((item: any) => {
          item.title = item.host;
          item.key = item.id;
          item.children = [];
          item.icon = <MySQLSvg />;
        });
        setTreeData(data);
      });
  }, []);
  return <Tree treeData={treeData} loadData={loadData}></Tree>;
}