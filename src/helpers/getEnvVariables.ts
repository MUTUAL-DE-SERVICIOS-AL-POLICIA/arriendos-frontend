


export const getEnvVariables = () => {

    return {
        VITE_HOST_BACKEND: import.meta.env.VITE_HOST_BACKEND,
    }
}

export const getMediaUrl = (relativePath: string | null | undefined): string => {
    if (!relativePath) return '';
    const backend = import.meta.env.VITE_HOST_BACKEND;
    if (!backend) {
        if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
            const url = new URL(relativePath);
            return url.pathname;
        }
        if (relativePath.startsWith('/media/')) return relativePath;
        return `/media/${relativePath}`;
    }
    const base = backend.replace(/\/$/, '').replace(/\/api$/, '');
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
        const url = new URL(relativePath);
        return `${base}${url.pathname}`;
    }
    return `${base}/media/${relativePath}`;
}