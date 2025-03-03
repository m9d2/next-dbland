'use client';
import Button from '../button';
import styles from './index.module.css';
import Draggable from '../draggable';
import Space from '../space';
import React, { useEffect } from 'react';
import Database from '@/components/home/databse';
import ConnectedSvg from '@/components/svg/connected';
import QuerySvg from '@/components/svg/query';
import DownSvg from '@/components/svg/down';
import ConsoleSvg from '@/components/svg/console';
import useContextMenu from '@/hooks/useContextMenu';

const menus = [
  { id: '1', label: 'one' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' },
  { id: '2', label: 'two' },
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
  const { openMenu, menuClickData } = useContextMenu();
  const ConnectedAndDownSvg = () => {
    return <>
      <ConnectedSvg />
      <DownSvg />
    </>;
  };

  const onClick = () => {
    openMenu(menus);
  };

  useEffect(() => {
    console.log(menuClickData);
  }, [menuClickData]);

  useEffect(() => {
    const moveWindow = (e: MouseEvent) => {
      console.log(e)
      window.electronAPI.drawWindow(e.movementX, e.movementY);
    };

    document.addEventListener('mousedown', () => {
      document.addEventListener('mousemove', moveWindow);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveWindow);
    });

    return () => {
      document.removeEventListener('mousedown', () => {});
      document.removeEventListener('mousemove', moveWindow);
      document.removeEventListener('mouseup', () => {});
    };
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.tree}>
        <Database></Database>
      </div>
      <Draggable minSize={100} bgColor="transparent"></Draggable>
      <div className={styles.content}>
        <div className={styles.menu}>
          <Button icon={(<ConnectedAndDownSvg />)} type="link"
                  onClick={onClick}>
          </Button>
          <Button icon={(<ConsoleSvg />)} type="link"></Button>
        </div>
        <div className={styles.main}>
          main
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
