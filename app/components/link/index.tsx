import NextLink from 'next/link';
import styles from './index.module.css';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, children }: LinkProps) {
  return (
    <NextLink className={styles.link} href={href}>
      {children}
    </NextLink>
  );
}
