'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Button, Divider, Input, Select, Space, Table, Tabs, TabsProps, Tree } from 'antd';
import Search from '@/components/svg/search';
import { useTreeData } from '@/hooks/useTreeData';
import Dropdown from '@/components/dropdown';
import ConnectedSvg from '@/components/svg/connected';
import ConsoleSvg from '@/components/svg/console';
import RunSvg from '@/components/svg/run';
import StopSvg from '@/components/svg/Stop';
import Draggable from '@/components/draggable';
import { query, getDatabase } from '@/tools/api';
import { useTreeStore } from '@/store/useTreeStore';
import MonacoEditor from 'react-monaco-editor/lib/editor';
import {
  LeftOutlined, PlusOutlined,
  ReloadOutlined,
  RightOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons';
import { userConfigStore } from '@/store/useConfigStore';

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
  const [editorValue, setEditorValue] = useState<string>(null);
  const [datasource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableHeight, setTableHeight] = useState(0);
  const {configs} = userConfigStore()
  const [databases, setDatabases] = useState<any[]>([])
  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [selectedDatabase, setSelectedDatabase] = useState<any>(null);
  const handleEditorChange = (newValue: string) => {
    setEditorValue(newValue);
  };
  const selectedNode = useTreeStore((state) => state.selectedNode);

  const querySql = () => {
    setLoading(true);
    query(selectedConfig, selectedDatabase, editorValue).then((res) => {
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
          // datasource item 设置key
          res.forEach((item) => {
            item.key = item.ID;
          });
          console.log(item);
          setDataSource(res);
          setLoading(false);
        }
      }
    });
  };

  const monacoOptions = {
    selectOnLineNumbers: true,
    roundedSelection: true,
    readOnly: false,
    automaticLayout: true,
    fontSize: 13,
    language: 'sql',
    minimap: {
      enabled: false,
    },
  };
  
  useEffect(() => {
    setEditorValue(`select * from SYS_TEMPLATE;`)
  }, [selectedNode]);
  
  const onSelectConfig = async (item: any) => {
    const res = await getDatabase(item)
    setDatabases(res)
    setSelectedConfig(item)
  }

  return (
    <div className={styles.console}>
      <Space className={styles.consoleHeader}>
        <Select
          style={{width: 120}}
          size="small"
          placeholder="选择实例"
          options={configs.map((item) => ({
            value: item.id,
            label: item.label,
          }))}
          onSelect={onSelectConfig}
        />
        <Select
          style={{width: 120}}
          size="small"
          placeholder="选择数据库"
          options={databases.map((item) => ({
            value: item.name,
            label: item.name,
          }))}
          onSelect={(value) => setSelectedDatabase(value)}
        />
        <Button title="运行" type="link" icon={<RunSvg />} onClick={querySql} />
        <Button title="停止" type="link" icon={<StopSvg />} />
      </Space>
      <MonacoEditor
        className={styles.monacoEditor}
        value={editorValue}
        height="150"
        theme="vs-light"
        options={monacoOptions}
        onChange={handleEditorChange}
      />
      <Draggable minSize={100} bgColor="transparent" direction={'column'} />
      <div className={styles.tableWrapper} ref={(ref) => setTableHeight(ref?.clientHeight - 60)}>
        <div className={styles.tableMenu}>
          <Button size='small' type="text" icon={<VerticalRightOutlined />}></Button>
          <Button size='small' type="text" icon={<LeftOutlined />}></Button>
          <Button size='small' type="text" icon={<RightOutlined />}></Button>
          <Button size='small' type="text" icon={<VerticalLeftOutlined />}></Button>
          <Divider type='vertical'/>
          <Button size='small' type="text" icon={<ReloadOutlined />}></Button>
          <Button size='small' type="text" icon={<PlusOutlined />}></Button>
        </div>
        <div className={styles.tableContent}>
          {datasource.length > 0 ?
            <Table bordered scroll={{ y: tableHeight }} loading={loading} className={styles.table} pagination={false}
                   size="small"
                   dataSource={datasource} columns={columns} /> : <div className={styles.noTable}>暂无数据</div>}
        </div>
        <div className={styles.tableFooter}>
          <span className={styles.executeInfo}>总计: 2000, 执行时间: 1s</span>
          <span className={styles.executeSql}>select * from sys_user</span>
        </div>
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
    </div>
  );
}

export default Home;