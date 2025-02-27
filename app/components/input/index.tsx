'use client';
import { useEffect, useState } from 'react';
import styles from './input.module.css';

interface InputProps {
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({ defaultValue, onChange }: InputProps) {
  const [input, setInput] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  useEffect(() => {
    if (defaultValue) setInput(defaultValue);
  }, [defaultValue]);

  return (
    <input className={styles.input} type="text" defaultValue={input} onChange={handleChange} />
  );
}
