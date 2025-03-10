'use client';
import styles from './index.module.css';
import Draggable from '../draggable';
import React, { useEffect, useState } from 'react';
import Database from '@/components/home/databse';
import ConnectedSvg from '@/components/svg/connected';
import ConsoleSvg from '@/components/svg/console';
import Dropdown from '@/components/dropdown';
import { Button, Input, Space, TreeDataNode } from 'antd';
import Search from '@/components/svg/search';
import { Tabs } from '@/components/tabs';
import { TabsProps } from '@/components/tabs/Tabs';

const menus = [
  {
    id: '1', label: '新建查询', accelerator: 'CmdOrCtrl+O', onClick: () => {
      console.log('one');
    },
  },
  { type: 'separator' },
  {
    id: '2', label: '新建数据库连接', submenu: [
      {
        id: 'mysql', label: 'MySQL',
      },
      {
        id: 'oracle', label: 'Oracle',
      },
      {
        id: 'postgresql', label: 'PostgreSQL',
      },
    ],
  },
];

const items = [
  {
    id: '1',
    title: 'test1test1test1test1',
    content: <div>test1</div>,
  },
  {
    id: '2',
    title: 'test2test1test1test1',
    content: <div>test2</div>,
  },
  {
    id: '3',
    title: 'test3',
    content: <div>test3</div>,
  },
];


function Layout({
                  children,
                }: Readonly<{
  children: React.ReactNode;
}>) {
  const [platform, setPlatform] = useState<string>('');
  const ConnectedAndDownSvg = () => {
    return <>
      <ConnectedSvg />
    </>;
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.getPlatform().then((res) => {
        setPlatform(res);
      });
    }
  }, []);

  const newMenus = menus.map(({ onClick, ...menuItem }) => {
    return {
      ...menuItem,
    };
  });

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.openContextMenu(newMenus);
    }
  };

  return (
    <div className={styles.container}>
      {platform.startsWith('win') && <div className={styles.titleBar}></div>}
      <div className={styles.main}>
        <div className={styles.tree} onContextMenu={onContextMenu}>
          <Space className={styles.treeContent} direction="vertical" size="middle">
            <Input style={{ backgroundColor: 'var(--color-input-bg)' }} prefix={<Search />} placeholder="请输入" />
            <Database className={styles.database}></Database>
          </Space>
        </div>
        <Draggable minSize={100} bgColor="transparent"></Draggable>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.menu}>
              <Dropdown menus={menus}>
                <Button size={'small'} type="text" title="New Connected">
                  <ConnectedAndDownSvg />
                </Button>
              </Dropdown>
              <Button size={'small'} type="text" title="Query Console">
                <ConsoleSvg />
              </Button>
            </div>
          </div>
          <div className={styles.workbench}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const tabs: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

export default function Index() {
  return (
    <Layout>
      <Tabs type="editable-card" size={'small'} items={tabs}/>
    </Layout>
  );
}
