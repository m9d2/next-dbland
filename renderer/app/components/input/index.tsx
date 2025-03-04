'use client';
import React, { useEffect, useState } from 'react';
import styles from './input.module.css';
import Search from '@/components/svg/search';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>{
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function Input({ defaultValue, onChange, placeholder, className, ...rest }: InputProps) {
  const [input, setInput] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  useEffect(() => {
    if (defaultValue) setInput(defaultValue);
  }, [defaultValue]);

  return (
    <div className={`${styles.inputWrapper} ${className}`} {...rest}>
      <span className={styles.inputIcon}>
        <Search />
      </span>
      <input className={styles.input} placeholder={placeholder} type="text" defaultValue={input}
             onChange={handleChange} />
    </div>

  );
}


