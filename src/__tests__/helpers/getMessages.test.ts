import { describe, it, expect } from 'vitest';
import { getMessagesES } from '@/helpers/getMessages';

describe('getMessagesES', () => {
  it('returns Spanish calendar messages', () => {
    const msgs = getMessagesES();
    expect(msgs.allDay).toBe('Todo el día');
    expect(msgs.today).toBe('Hoy');
    expect(msgs.month).toBe('Mes');
    expect(msgs.week).toBe('Semana');
    expect(msgs.day).toBe('Día');
    expect(msgs.agenda).toBe('Agenda');
    expect(msgs.previous).toBe('<');
    expect(msgs.next).toBe('>');
  });

  it('showMore returns formatted string', () => {
    const msgs = getMessagesES();
    expect(msgs.showMore(5)).toBe('+ Ver más (5)');
    expect(msgs.showMore(1)).toBe('+ Ver más (1)');
  });
});
