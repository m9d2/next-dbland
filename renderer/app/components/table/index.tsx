import React, { useState } from 'react';
import styles from './index.module.css';

interface ColumnType {
  title: string;
  dataIndex: string;
  editable?: boolean;
}

interface TableProps {
  columns: ColumnType[];
  dataSource: Record<string, any>[];
}

export default function Table({ columns, dataSource }: TableProps) {
  const [data, setData] = useState(dataSource);
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; dataIndex: string } | null>(
    null
  );
  const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);

  // 处理双击事件，进入编辑模式
  const handleDoubleClick = (rowIndex: number, dataIndex: string) => {
    setEditingCell({ rowIndex, dataIndex });
  };

  // 处理输入框失焦事件，保存数据并退出编辑模式
  const handleBlur = (rowIndex: number, dataIndex: string, value: string) => {
    const newData = [...data];
    newData[rowIndex][dataIndex] = value;
    setData(newData);
    setEditingCell(null);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.dataIndex} className={styles.th}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex === currentRowIndex ? styles.active : ''}>
            {columns.map((column) => {
              const isEditing =
                editingCell?.rowIndex === rowIndex && editingCell?.dataIndex === column.dataIndex;
              return (
                <td
                  key={column.dataIndex}
                  onClick={() => setCurrentRowIndex(rowIndex)}
                  onDoubleClick={() =>
                    column.editable && handleDoubleClick(rowIndex, column.dataIndex)
                  }
                >
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={row[column.dataIndex]}
                      onBlur={(e) => handleBlur(rowIndex, column.dataIndex, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleBlur(
                            rowIndex,
                            column.dataIndex,
                            (e.target as HTMLInputElement).value
                          );
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    row[column.dataIndex]
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
