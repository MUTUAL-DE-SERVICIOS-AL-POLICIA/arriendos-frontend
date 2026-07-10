import { describe, it, expect } from 'vitest';
import { menuSettings } from '@/utils/menuSettings';

describe('menuSettings', () => {
  it('returns an array of setting groups', () => {
    const groups = menuSettings();
    expect(Array.isArray(groups)).toBe(true);
    expect(groups.length).toBeGreaterThan(0);
  });

  it('each group has title, permission, and group array', () => {
    const groups = menuSettings();
    groups.forEach((g) => {
      expect(g).toHaveProperty('title');
      expect(g).toHaveProperty('permission');
      expect(g).toHaveProperty('group');
      expect(Array.isArray(g.group)).toBe(true);
    });
  });

  it('each group item has path, title, icon, permission', () => {
    const groups = menuSettings();
    groups.forEach((g) => {
      g.group.forEach((item: any) => {
        expect(item).toHaveProperty('path');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('permission');
      });
    });
  });

  it('products settings has 3 items', () => {
    const groups = menuSettings();
    const products = groups.find((g) => g.permission === 'products.view');
    expect(products).toBeDefined();
    expect(products!.group.length).toBe(3);
  });

  it('users settings has 2 items', () => {
    const groups = menuSettings();
    const users = groups.find((g) => g.permission === 'users.view');
    expect(users).toBeDefined();
    expect(users!.group.length).toBe(2);
  });

  it('rooms settings has 1 item', () => {
    const groups = menuSettings();
    const rooms = groups.find((g) => g.permission === 'rooms.view');
    expect(rooms).toBeDefined();
    expect(rooms!.group.length).toBe(1);
  });

  it('hourRangesView path exists', () => {
    const groups = menuSettings();
    const allItems = groups.flatMap((g) => g.group);
    const item = allItems.find((i: any) => i.path === '/hourRangesView');
    expect(item).toBeDefined();
  });

  it('rolesView path exists', () => {
    const groups = menuSettings();
    const allItems = groups.flatMap((g) => g.group);
    const item = allItems.find((i: any) => i.path === '/rolesView');
    expect(item).toBeDefined();
  });

  it('propertiesView path exists', () => {
    const groups = menuSettings();
    const allItems = groups.flatMap((g) => g.group);
    const item = allItems.find((i: any) => i.path === '/propertiesView');
    expect(item).toBeDefined();
  });
});
