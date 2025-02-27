'use client';
import { FiPlus } from 'react-icons/fi';
import Button from './button';
import styles from './home.module.css';
import Tree from './tree';
import Draggable from './draggable';
import { MessageProvider } from '@/hooks/MessageContext';
import Space from './space';
import Connected from './svg/Connected';
import { useEffect } from 'react';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      { title: 'leaf 1', key: '0-0-0' },
      { title: 'leaf 2', key: '0-0-1' },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    children: [{ title: 'leaf 3', key: '0-1-0' }],
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
          <Tree treeData={treeData}></Tree>
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

export default function Home() {
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
    })
  }

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  return (
    <Layout>
      <div>首页</div>
      <div>
        <button onClick={connect}>连接</button>
        <button onClick={query}>查询</button>
        <button onClick={disconnect}>断开连接</button>
        <button onClick={getConfig}>获取config</button>
      </div>
    </Layout>
  );
}
