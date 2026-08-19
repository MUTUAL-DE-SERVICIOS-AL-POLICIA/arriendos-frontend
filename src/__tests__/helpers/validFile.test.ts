import { describe, it, expect } from 'vitest';
import { isFile } from '@/helpers/validFile';

describe('isFile', () => {
  it('returns false for null file', () => {
    expect(isFile('image/png', null)).toBe(false);
  });

  it('returns true when file type matches', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    expect(isFile('image/png', file)).toBe(true);
  });

  it('returns false when file type does not match', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });
    expect(isFile('image/png', file)).toBe(false);
  });

  it('handles multiple accepted types', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    expect(isFile('image/png, image/jpeg', file)).toBe(true);
  });
});
