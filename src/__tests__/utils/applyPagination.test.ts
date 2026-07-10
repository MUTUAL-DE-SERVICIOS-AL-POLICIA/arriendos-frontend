import { describe, it, expect } from 'vitest';
import { applyPagination } from '@/utils/applyPagination';

describe('applyPagination', () => {
  const items = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

  it('returns first page', () => {
    const result = applyPagination(items, 0, 10);
    expect(result).toHaveLength(10);
    expect(result[0].id).toBe(1);
  });

  it('returns second page', () => {
    const result = applyPagination(items, 1, 10);
    expect(result).toHaveLength(10);
    expect(result[0].id).toBe(11);
  });

  it('returns partial last page', () => {
    const result = applyPagination(items, 2, 10);
    expect(result).toHaveLength(5);
    expect(result[0].id).toBe(21);
  });

  it('returns empty for out-of-range page', () => {
    const result = applyPagination(items, 5, 10);
    expect(result).toHaveLength(0);
  });

  it('handles empty array', () => {
    const result = applyPagination([], 0, 10);
    expect(result).toHaveLength(0);
  });

  it('handles rowsPerPage larger than array', () => {
    const result = applyPagination(items, 0, 100);
    expect(result).toHaveLength(25);
  });
});
