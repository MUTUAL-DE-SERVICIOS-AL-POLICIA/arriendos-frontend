import { describe, it, expect } from 'vitest';
import { formatDate, getDateJSON, virifyDate } from '@/helpers/formatDate';

describe('formatDate', () => {
  it('converts ISO date string to Date object', () => {
    const result = formatDate('2024-06-15T10:30:00.000Z');
    expect(result).toBeInstanceOf(Date);
  });

  it('preserves the date value', () => {
    const result = formatDate('2024-01-01T00:00:00.000Z');
    expect(result.getUTCFullYear()).toBe(2024);
  });
});

describe('getDateJSON', () => {
  it('formats Date to JSON-compatible string', () => {
    const date = new Date(2024, 5, 15, 10, 30, 45);
    const result = getDateJSON(date);
    expect(result).toBe('2024-06-15T10:30:45.000Z');
  });

  it('returns null for falsy input', () => {
    expect(getDateJSON(null)).toBeNull();
    expect(getDateJSON(undefined)).toBeNull();
  });

  it('pads single digits with zeros', () => {
    const date = new Date(2024, 0, 5, 8, 5, 3);
    const result = getDateJSON(date);
    expect(result).toBe('2024-01-05T08:05:03.000Z');
  });
});

describe('virifyDate', () => {
  it('returns true for today', () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    expect(virifyDate(today)).toBe(true);
  });

  it('returns true for future date', () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    expect(virifyDate(future)).toBe(true);
  });

  it('returns false for past date', () => {
    const past = new Date();
    past.setDate(past.getDate() - 1);
    expect(virifyDate(past)).toBe(false);
  });
});
