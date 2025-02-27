import React from 'react';
import styles from './index.module.scss';

interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  size?: 'small' | 'medium' | 'large';
}

export default function Space({
  children,
  direction = 'horizontal',
  align = 'start',
  size = 'small',
  style,
}: SpaceProps) {
  // 动态生成 className
  const classNames = [
    styles.space,
    direction === 'horizontal' ? styles.horizontal : styles.vertical,
    align === 'start'
      ? styles.alignStart
      : align === 'end'
        ? styles.alignEnd
        : align === 'center'
          ? styles.alignCenter
          : styles.alignBaseline,
    size === 'small' ? styles.small : size === 'medium' ? styles.medium : styles.large,
  ].join(' ');

  return (
    <div style={style} className={classNames}>
      {children}
    </div>
  );
}
