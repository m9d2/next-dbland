import { useEffect, useState } from 'react';

export enum PlatformType {
  mac = 'mac',
  win = 'win',
  linux = 'linux',
  web = 'web',
}

export default function usePlatform() {
  const [platform, setPlatform] = useState<PlatformType>(PlatformType.web);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.getPlatform().then((res: string) => {
        setPlatform(res as PlatformType);
      });
    }
  }, []);

  return platform;
}