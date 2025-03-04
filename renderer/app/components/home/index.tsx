'use client';
import Button from '../button';
import styles from './index.module.css';
import Draggable from '../draggable';
import React, { use, useEffect, useState } from 'react';
import Database from '@/components/home/databse';
import ConnectedSvg from '@/components/svg/connected';
import ConsoleSvg from '@/components/svg/console';
import Dropdown from '@/components/dropdown';
import Input from '@/components/input';

const menus = [
  {
    id: '1', label: '新建查询', onClick: () => {
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

function Layout({
                  children,
                }: Readonly<{
  children: React.ReactNode;
}>) {
  const [plaform, setPlatform] = useState<string>('');
  const ConnectedAndDownSvg = () => {
    return <>
      <ConnectedSvg />
    </>;
  };

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getPlatform().then((res) => {
        setPlatform(res);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      {plaform.startsWith('win') && <div className={styles.titleBar}></div>}
      <div className={styles.main}>
        <div className={styles.tree}>
          <Input className={styles.input} placeholder={'搜索'}></Input>
          <Database></Database>
        </div>
        <Draggable minSize={100} bgColor="transparent"></Draggable>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.menu}>
              <Dropdown menus={menus}>
                <Button title="New Connected" icon={(<ConnectedAndDownSvg />)} type="link"
                >
                </Button>
              </Dropdown>
              <Button title="Query Console" icon={(<ConsoleSvg />)} type="link"></Button>
            </div>
          </div>
          <div className={styles.workbench}>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <Layout>
      <div>首页</div>
    </Layout>
  );
}
