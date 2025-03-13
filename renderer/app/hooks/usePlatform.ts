export default function usePlatform() {
    let platform = '';
    if (!window.electronAPI) {
        platform = PlatformType.web
    } else {
        window.electronAPI.getPlatform().then((res) => {
            platform = res;
        });
    }
    return platform;
}

export enum PlatformType {
    mac = 'mac',
    win = 'win',
    linux = 'linux',
    web = 'web',
}