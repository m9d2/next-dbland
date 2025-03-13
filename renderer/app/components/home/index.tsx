'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Button, Input, Select, Space, Table, Tabs, TabsProps, Tree } from 'antd';
import Search from '@/components/svg/search';
import { useTreeData } from '@/hooks/useTreeData';
import Dropdown from '@/components/dropdown';
import ConnectedSvg from '@/components/svg/connected';
import ConsoleSvg from '@/components/svg/console';
import RunSvg from '@/components/svg/run';
import StopSvg from '@/components/svg/Stop';
import MonacoEditor from '@/components/MonacoEditor';
import Draggable from '@/components/draggable';
import { query } from '@/tools/api';
import { useTreeStore } from '@/store/useTreeStore';

const { DirectoryTree } = Tree;


function DatabaseSection({ className }: { className: string }) {
  const { treeData, onLoadData } = useTreeData();
  const setSelectedNode = useTreeStore((state) => state.setSelectedNode); // 获取 setSelectedNode 方法

  return (
    <div className={styles.tree}>
      <DirectoryTree
        expandAction="doubleClick"
        loadData={onLoadData}
        treeData={treeData}
        onSelect={(selectedKeys, e) => {
          console.log(selectedKeys, e);
          const selectedNodeKey = selectedKeys[0] as string | null;
          setSelectedNode(selectedNodeKey);
        }}
      />
    </div>
  );
}

function HeaderSection({ menus }) {
  return (
    <>
      <Dropdown menus={menus}>
        <Button size={'small'} type="text" title="New Connected">
          <ConnectedSvg />
        </Button>
      </Dropdown>
      <Button size={'small'} type="text" title="Query Console">
        <ConsoleSvg />
      </Button>
    </>
  );
}

function TabsSection({ tabs, activeKey, onTabChange, onEdit }) {
  return (
    <Tabs
      style={{ height: '100%' }}
      hideAdd
      activeKey={activeKey}
      onChange={onTabChange}
      onEdit={onEdit}
      type="editable-card"
      size="small"
      items={tabs}
    />
  );
}

function ConsoleSection() {
  const [editorValue, setEditorValue] = useState<string>(`select * from tradevl.SYS_TEMPLATE;`);
  const [datasource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleEditorChange = (newValue: string) => {
    setEditorValue(newValue);
  };
  const selectedNode = useTreeStore((state) => state.selectedNode);

  const querySql = () => {
    setLoading(true);
    query(1, 'tradevl', editorValue).then((res) => {
      if (res) {
        //获取column
        const item = res[0];
        if (item) {
          const columns = Object.keys(item).map((key) => ({
            title: key,
            dataIndex: key,
            key: key,
            width: 150,
            ellipsis: true,
          }));
          setColumns(columns);
          setDataSource(res);
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className={styles.console}>
      <Space className={styles.consoleHeader}>
        <Select
          size="small"
          showSearch
          placeholder="选择实例"
        />
        <Select
          size="small"
          showSearch
          placeholder="选择数据库"
        />
        <Button type="link" icon={<RunSvg />} onClick={querySql} />
        <Button type="link" icon={<StopSvg />} />
      </Space>
      <MonacoEditor
        className={styles.monacoEditor}
        value={editorValue}
        language="sql"
        onChange={handleEditorChange}
      />
      <Draggable minSize={100} bgColor="transparent" direction={'column'} />
      <div className={styles.tableWrapper}>
        <div className={styles.tableMenu}></div>
        {datasource && <Table loading={loading} scroll={{ y: 400 }} className={styles.tableContent} pagination={false} size="small"
                              dataSource={datasource} columns={columns} />}
        <div className={styles.tableFooter}></div>
      </div>
    </div>
  );
}

function Home() {
  const [platform, setPlatform] = useState<string>('');
  const [tabs, setTabs] = useState<TabsProps['items']>([]);
  const [activeKey, setActiveKey] = useState('1');

  const menus = [
    {
      id: '1',
      label: '新建查询',
      accelerator: 'CmdOrCtrl+O',
      onClick: () => add(),
    },
    { type: 'separator' },
    {
      id: '2',
      label: '新建数据库连接',
      submenu: [
        { id: 'mysql', label: 'MySQL' },
        { id: 'oracle', label: 'Oracle' },
        { id: 'postgresql', label: 'PostgreSQL' },
      ],
    },
  ];

  const add = () => {
    const newKey = String(tabs.length + 1);
    setTabs([
      ...tabs,
      {
        label: `Tab ${newKey}`,
        key: newKey,
        children: <ConsoleSection />,
      },
    ]);
    setActiveKey(newKey);
  };

  const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    }
    if (action === 'remove') {
      setTabs(tabs.filter((pane) => pane.key !== targetKey));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.getPlatform().then((res) => {
        setPlatform(res);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      {platform.startsWith('win') && <div className={styles.titleBar}></div>}
      <div className={styles.main}>
        <div className={styles.database}>
          <div className={styles.inputWrapper}>
            <Input className={styles.input} prefix={<Search />} placeholder="请输入" />
          </div>
          <DatabaseSection className={styles.database} />
        </div>
        <Draggable minSize={100} bgColor="transparent" />
        <div className={styles.content}>
          <div className={styles.header}>
            <HeaderSection menus={menus} />
          </div>
          <div className={styles.workbench}>
            <TabsSection
              tabs={tabs}
              activeKey={activeKey}
              onEdit={onEdit}
              onTabChange={setActiveKey}
            />
          </div>
        </div>
      </div>
      {/*<footer className={styles.footer}>*/}
      {/*</footer>*/}
    </div>
  );
}

export default Home;