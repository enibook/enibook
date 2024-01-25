export function system() {
    const os = navigator.userAgent;
    if (os.search('Windows') !== -1) {
        return 'windows';
    }
    if (os.search('Mac') !== -1) {
        return 'mac';
    }
    if (os.search('X11') !== -1) {
        return 'unix';
    }
    if (os.search('Linux') !== -1) {
        return 'linux';
    }
    return 'unknown';
}
