import { describe, it, expect, vi } from 'vitest';
import { getEnvVariables } from '@/helpers/getEnvVariables';

describe('getEnvVariables', () => {
  it('should return VITE_HOST_BACKEND from env', () => {
    vi.stubEnv('VITE_HOST_BACKEND', 'http://localhost:9005');
    const envs = getEnvVariables();
    expect(envs.VITE_HOST_BACKEND).toBe('http://localhost:9005');
  });

  it('should return undefined when VITE_HOST_BACKEND is not set', () => {
    vi.stubEnv('VITE_HOST_BACKEND', undefined);
    const envs = getEnvVariables();
    expect(envs.VITE_HOST_BACKEND).toBeUndefined();
  });

  it('should return an object with VITE_HOST_BACKEND key', () => {
    const envs = getEnvVariables();
    expect(envs).toHaveProperty('VITE_HOST_BACKEND');
  });
});
