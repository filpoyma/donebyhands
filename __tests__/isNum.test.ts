import { it, describe, expect } from '@jest/globals';
import { isNumeric } from '../src/utils/helpers.utils';

describe('isNumeric', () => {
  it('should return true for numeric strings', () => {
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('-123')).toBe(true);
    expect(isNumeric('123.45')).toBe(true);
    expect(isNumeric('-123.45')).toBe(true);
  });

  it('should return false for non-numeric strings', () => {
    expect(isNumeric('abc')).toBe(false);
    expect(isNumeric('123abc')).toBe(false);
    expect(isNumeric('')).toBe(false);
    expect(isNumeric('123.45abc')).toBe(false);
    expect(isNumeric('abc123.45')).toBe(false);
    expect(isNumeric({})).toBe(false);
    expect(isNumeric(null)).toBe(false);
  });

  it('should return false for empty strings', () => {
    expect(isNumeric('')).toBe(false);
  });
});
