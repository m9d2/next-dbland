import Tree from '@/components/tree';
import React, { useEffect, useState } from 'react';

export default function Database() {
  const [treeData, setTreeData] = useState();
  const loadData = async (node) => {
    const res = await fetch('api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: node.id,
        sql: ``,
      }),
    })
    console.log(res)
  };

  useEffect(() => {
    fetch('api/config')
      .then((response) => response.json())
      .then((data) => {
        data.map((item: any) => {
          item.title = item.host;
          item.key = item.id;
          item.children = [];
        });
        setTreeData(data);
      });
  }, []);
  return <Tree treeData={treeData} loadData={loadData}></Tree>;
}