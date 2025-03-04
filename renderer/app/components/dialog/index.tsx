import React, { useEffect } from 'react';
import styles from './index.module.scss';

interface DialogProps {
  visible: boolean;
  title?: string;
  content?: React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  maskClosable?: boolean;
  children?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ visible, title, content, onCancel, onOk, maskClosable= true }) => {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (maskClosable && e.target === e.currentTarget) {
      onCancel();
    }
  };

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={handleBackgroundClick}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <button className={styles.close} onClick={onCancel}>
            ×
          </button>
        </div>
        <div className={styles.body}>{content}</div>
        <div className={styles.footer}>
          <button className={styles.button} onClick={onCancel}>
            取消
          </button>
          <button className={`${styles.button} ${styles.ok}`} onClick={onOk}>
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;