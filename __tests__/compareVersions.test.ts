import { it, describe, expect } from '@jest/globals';
import { isNewVerHigher } from '../src/utils/helpers.utils';

describe('compareVersions', () => {
  it('should return true if new version is bigger', () => {
    expect(isNewVerHigher('1.0.0', '1.0.10')).toBeTruthy();
    expect(isNewVerHigher('1.0.1', '1.1.0')).toBeTruthy();
    expect(isNewVerHigher('1.0.0', '1.1.10')).toBeTruthy();
    expect(isNewVerHigher('1.0.0', '2.0.0')).toBeTruthy();
  });

  it('should return false if new version is smaller or equal', () => {
    expect(isNewVerHigher('1.0.1', '1.0.0')).toBeFalsy();
    expect(isNewVerHigher('1.1.0', '1.0.1')).toBeFalsy();
    expect(isNewVerHigher('1.1.10', '1.0.0')).toBeFalsy();
    expect(isNewVerHigher('2.0.0', '1.0.0')).toBeFalsy();
    expect(isNewVerHigher('1.10.10', '1.10.10')).toBeFalsy();
  });
});
