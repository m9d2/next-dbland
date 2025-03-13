import './globals.css';
import './reset.css';
import './theme.scss';
import React from 'react';
import { ConfigProvider } from 'antd';

// export const metadata: Metadata = {
//   title: 'DBLand',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
          },
          Table: {
            headerBg: '#fafafa',
            headerBorderRadius: 0,
          },
          Tree: {
            indentSize: 12,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
    </body>
    </html>
  );
}
