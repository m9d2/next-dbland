export default function usePlatform() {
    let platform = '';
    window.electronAPI.getPlatform().then((res) => {
        platform = res;
    });
    return platform;
}