


export const getEnvVariables = () => {

    return {
        VITE_HOST_BACKEND: import.meta.env.VITE_HOST_BACKEND,
    }
}

export const getMediaUrl = (relativePath: string | null | undefined): string => {
    if (!relativePath) return '';
    const backend = import.meta.env.VITE_HOST_BACKEND;
    if (!backend) return relativePath;
    const base = backend.replace(/\/$/, '').replace(/\/api$/, '');
    return `${base}/media/${relativePath}`;
}