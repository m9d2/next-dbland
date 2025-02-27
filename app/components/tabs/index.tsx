interface TabsProps {
  children: React.ReactNode;
}

export default function Tabs({ children }: TabsProps) {
  return <div style={{ margin: '20px' }}>{children}</div>;
}
