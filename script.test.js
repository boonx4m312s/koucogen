import { describe, test, expect, beforeEach } from 'vitest';
import { Koucogen } from './script';

let calc;
beforeEach(() => {
  // 各テストの前に新しいインスタンスを作成
  calc = new Koucogen(3, 4, 5, 4);
});

describe('規矩術に掲載の値でチェック', () => {
  test('getKou returns 3', () => {
    expect(calc.getKou()).toBe(3);
  });
  test('getChukou(中勾) returns 2.4', () => {
    expect(calc.getChukou()).toBe(2.4);
  });

  test('getTangen(短玄) returns 1.8', () => {
    expect(calc.getTangen()).toBe(1.8);
  });

  test('getChougen(長玄) returns 3.2', () => {
    expect(calc.getChougen()).toBe(3.2);
  });

  test('getCo1(殳1) returns 2.56', () => {
    expect(calc.getCo1()).toBe(2.56);
  });
  test('getSyoco(小殳) returns 1.44', () => {
    expect(calc.getSyoco()).toBe(1.44);
  });

  test('getSyoukou(小勾) returns 1.08', () => {
    expect(calc.getSyoukou()).toBe(1.08);
  });

  test('getSyochukou(小中勾) returns 0.864', () => {
    expect(calc.getSyochukou()).toBeCloseTo(0.864);
  });

  test('getKeccou(欠勾) returns 1.92', () => {
    expect(calc.getKeccou()).toBeCloseTo(1.92);
  });

  test('getHogen(補玄) returns 3.75', () => {
    expect(calc.getHogen()).toBeCloseTo(3.75);
  });
});


describe('例100:50の計算', () => {
  beforeEach(() => {
    calc = new Koucogen(50, 100, 111.8033989, 50);
  });
  test('getShotangen(小短玄) returns ', () => {
    expect(calc.getShotangen()).toBeCloseTo(4.47213594);
  });
  test('getHirakoubaiKeccouChukou(平勾配欠勾～中勾) returns ', () => {
    expect(calc.getHirakoubaiKeccouChukou()).toBeCloseTo(35.77708763);
  });

  test('getFunc1(辺1) returns ', () => {
    expect(calc.getFunc1()).toBeCloseTo(32);
  });
  test('getFunc2(辺2) returns ', () => {
    expect(calc.getFunc2()).toBeCloseTo(16);
  });
  test('getFunc3(辺3) returns ', () => {
    expect(calc.getFunc3()).toBeCloseTo(7.15541751);
  });

  test('短玄の1/2 returns ', () => {
    expect(calc.getHarfTangen()).toBeCloseTo(11.18033988);
  });
});


describe('例100:55の計算', () => {
  beforeEach(() => {
    calc = new Koucogen(55, 100, 114.1271221, 55);
  });
  test('getTaruki(垂木栓勾配) returns ', () => {
    expect(calc.getTaruki()).toBeCloseTo(23.88707925);
  });
  test('getkeccouSumikou(欠勾隅勾) returns ', () => {
    expect(calc.getkeccouSumikou()).toBeCloseTo(29.85863567);
  });
});