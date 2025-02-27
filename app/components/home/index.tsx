'use client';
import { FiPlus } from 'react-icons/fi';
import Button from '../button';
import styles from './index.module.css';
import Draggable from '../draggable';
import { MessageProvider } from '@/hooks/MessageContext';
import Space from '../space';
import Connected from '../svg/Connected';
import React, { useEffect, useState } from 'react';
import Database from '@/components/home/databse';
import Dialog from '@/components/dialog';

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
    <Space>
      <Button onClick={onClick} type="link" icon={<Connected />}></Button>
      <Button type="link" icon={<FiPlus />}></Button>
      <Button type="link" icon={<FiPlus />}></Button>
    </Space>
  );
}

function Layout({
                  children,
                }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Menu />
      </header>
      <main className={styles.main}>
        <div className={`${styles.menuContainer}`}>
          <Database></Database>
        </div>
        <Draggable minSize={100} bgColor="transparent"></Draggable>
        <div className={styles.content}>
          <MessageProvider>{children}</MessageProvider>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

export default function Index() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const connect = () => {
    fetch('/api/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: 1,
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (data.code === 0) {
        }
      });
    });
  };

  const query = () => {
    fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: 1,
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (data.code === 0) {
        }
      });
    });
  };

  const disconnect = () => {
    fetch('/api/disconnect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: 1,
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (data.code === 0) {
        }
      });
    });
  };

  const getConfig = () => {
    fetch('/api/config', {
      method: 'GET',
    }).then((res) => {
      res.json().then((data) => {
        if (data.code === 0) {
        }
      });
    });
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const Content = () => {
    return (
      <div>
        <h1>11</h1>
        <h1>11</h1>
        <h1>11</h1>
        <h1>11</h1>
        <h1>11</h1>
      </div>
    );
  }
    return (
      <Layout>
        <div>首页</div>
        <div>
          <button onClick={connect}>连接</button>
          <button onClick={query}>查询</button>
        <button onClick={disconnect}>断开连接</button>
        <button onClick={getConfig}>获取config</button>
        <button onClick={() => setDialogVisible(true)}>显示对话框</button>
        <Dialog visible={dialogVisible} title={'test'}
                content={<Content></Content>}
                onCancel={() => setDialogVisible(false)} maskClosable={false}>

      </Dialog>
    </div>
</Layout>
)
  ;
}
