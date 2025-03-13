import React, { forwardRef } from 'react';
import { Tabs as ATabs } from 'antd';
import { TabsProps as ATabsProps } from 'antd/es/tabs';

export interface TabsProps extends ATabsProps {
}


export const Tabs: React.FC<TabsProps> = forwardRef(function Tabs(
  props,
) {
  return <ATabs {...props} />;

});