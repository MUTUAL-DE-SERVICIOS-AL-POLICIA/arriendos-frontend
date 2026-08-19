/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOST_BACKEND: string;
    readonly VITE_HOST: string;
    readonly VITE_PORT: string;
    readonly VITE_DEPLOY_ENV: 'dev' | 'test' | 'prod';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
