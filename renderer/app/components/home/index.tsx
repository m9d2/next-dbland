'use client';
import Button from '../button';
import styles from './index.module.css';
import Draggable from '../draggable';
import Space from '../space';
import React from 'react';
import Database from '@/components/home/databse';
import ConnectedSvg from '@/components/svg/connected';
import QuerySvg from '@/components/svg/query';
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

function Menu() {
  const onClick = () => {
    console.log(window.electronAPI);
    if (window.electronAPI) {
      window.electronAPI.createChildWindow('https://www.baidu.com');
    } else {
      alert('打开窗');
    }
  };

  return (
    <Space size={'medium'}>
      <Button onClick={onClick} type="link" icon={<ConnectedSvg />}></Button>
      <Button onClick={onClick} type="link" icon={<QuerySvg />}></Button>
    </Space>
  );
}

function Layout({
                  children,
                }: Readonly<{
  children: React.ReactNode;
}>) {
  const ConnectedAndDownSvg = () => {
    return <>
      <ConnectedSvg />
    </>;
  };

  const onMenuClick = () => {
    window.electronAPI.getClickPosition().then((res: any) => {
      console.log(res);
    });
  };
  return (
    <div className={styles.container}>
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
        <div className={styles.main}>
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
