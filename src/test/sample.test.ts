import {getUser} from "../lib/getUser";
import {colors} from "../lib/colors";


test('equal', () => {
  expect(true).toEqual(true);
});

describe('비교', function () {
  test('같음', () => {
    expect(true).toEqual(true);
  });

  test('다름', () => {
    expect(true).not.toEqual(false);
  });
});

test('not', () => {
  expect(true).not.toBeFalsy();
  expect(false).not.toBeTruthy();
  expect(getUser(1)).not.toBe({ id: 1, name: "name-1" });
});

describe('toEqual & toBe', function () {
  test('toEqual', () => {
    expect(getUser(1)).toEqual({ id: 1, name: 'name-1' });
  });

  test('toBe', () => {
    expect(true).toBe(true);
    expect(getUser(1)).not.toBe({ id: 1, name: 'name-1' });
  });
});

describe('toBeTruthy & toBeFalsy', function () {
  test('toBeTruthy', () => {
    expect(true).toBeTruthy();
    expect(-1).toBeTruthy();
    expect(1).toBeTruthy();
    expect('a').toBeTruthy();
    expect(['a']).toBeTruthy();
    expect([]).toBeTruthy();
  });

  test('toBeFalsy', () => {
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
  });
});

describe('toHaveLength & toContain', function () {
  test('toHaveLength', () => {
    expect(colors).toHaveLength(3);
    expect(colors.length).toBe(3);
  });

  test('toContain', () => {
    expect(colors).toContain('red');
    expect(colors).toContain('blue');
    expect(colors).toContain('green');
  });
});

describe('toBeGreaterThan & toBeGreaterThanOrEqual', function () {
  test('toBeGreaterThan', () => {
    expect(colors.length).toBeGreaterThan(0);
  });

  test('toBeGreaterThanOrEqual', () => {
    expect(colors.length).toBeGreaterThanOrEqual(3);
  });
});

describe('toBeLessThan & toBeLessThanOrEqual', function () {
  test('toBeLessThan', () => {
    expect(colors.length).toBeLessThan(4);
  });

  test('toBeLessThanOrEqual', () => {
    expect(colors.length).toBeLessThanOrEqual(3);
  });
});

test('toMatch', () => {
  expect(getUser(1).name).toMatch(/^name-\d$/);
  expect(getUser(2).name).toMatch(/^name-\d$/);
});

test('toThrow', () => {
  expect(() => getUser(0)).toThrow();
  expect(() => getUser(-1)).toThrow('Invalid ID');
});

test('toHaveProperty', () => {
  expect(getUser(1)).toHaveProperty('id');
});
