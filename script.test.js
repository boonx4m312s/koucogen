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

  test('getChukou(中勾) returns 44.72135955', () => {
    expect(calc.getChukou()).toBeCloseTo(44.72135955);
  });

  test('getTangen(短玄) returns 22.36067977', () => {
    expect(calc.getTangen()).toBeCloseTo(22.36067977);
  });

  test('getChougen(長玄) returns 89.4427191', () => {
    expect(calc.getChougen()).toBeCloseTo(89.4427191);
  });

  test('getHarfTangen(短玄の2分の1) returns 11.18033989', () => {
    expect(calc.getHarfTangen()).toBeCloseTo(11.18033989);
  });

  test('getCo1(殳1) returns 80', () => {
    expect(calc.getCo1()).toBeCloseTo(80);
  });

  test('getSyoco(小殳) returns 20', () => {
    expect(calc.getSyoco()).toBeCloseTo(20);
  });

  test('getSyochukou(小中勾) returns 8.94427191', () => {
    expect(calc.getSyochukou()).toBeCloseTo(8.94427191);
  });

  test('getKeccou(欠勾) returns 40', () => {
    expect(calc.getKeccou()).toBeCloseTo(40);
  });

  test('getShotangen(小短玄) returns 4.47213594', () => {
    expect(calc.getShotangen()).toBeCloseTo(4.47213594);
  });
  test('getHirakoubaiKeccouChukou(平勾配欠勾～中勾) returns 35.77708764', () => {
    expect(calc.getHirakoubaiKeccouChukou()).toBeCloseTo(35.77708764);
  });

  test('getFunc1(辺1) returns 32', () => {
    expect(calc.getFunc1()).toBeCloseTo(32);
  });
  test('getFunc2(辺2) returns 16', () => {
    expect(calc.getFunc2()).toBeCloseTo(16);
  });
  test('getFunc3(辺3) returns 7.15541751', () => {
    expect(calc.getFunc3()).toBeCloseTo(7.15541751);
  });

  test('getHogen(補玄) returns 55.90169944', () => {
    expect(calc.getHogen()).toBeCloseTo(55.90169944);
  });

  test('getGrad(勾配) returns 50', () => {
    expect(calc.getGrad()).toBeCloseTo(50);
  });

  test('getSumikou(隅勾) returns 35.35533906', () => {
    expect(calc.getSumikou()).toBeCloseTo(35.35533906);
  });

  test('getSumikoubai(隅勾配) returns 35.35533906', () => {
    expect(calc.getSumikoubai()).toBeCloseTo(35.35533906);
  });

  test('getkeccouSumikou(欠勾隅勾) returns 28.28427125', () => {
    expect(calc.getkeccouSumikou()).toBeCloseTo(28.28427125);
  });

  test('getSumiKeccou(隅欠勾) returns 31.42696805', () => {
    expect(calc.getSumiKeccou()).toBeCloseTo(31.42696805);
  });

  test('getSumiGen1(隅玄) returns 106.0660172', () => {
    expect(calc.getSumiGen1()).toBeCloseTo(106.0660172);
  });

  test('getSumiGen1(隅長玄) returns 106.0660172', () => {
    expect(calc.getSumiGen1()).toBeCloseTo(106.0660172);
  });

  test('getSumiChukou(隅中勾) returns 33.33333333', () => {
    expect(calc.getSumiChukou()).toBeCloseTo(33.33333333);
  });

  test('getSumiGen2(隅玄2) returns 150', () => {
    expect(calc.getSumiGen2()).toBeCloseTo(150);
  });

  test('getSumiChougen2(隅長玄2) returns 133.3333333', () => {
    expect(calc.getSumiChougen2()).toBeCloseTo(133.3333333);
  });

  test('getCoUraMe(裏目殳) returns 141.4213562', () => {
    expect(calc.getCoUraMe()).toBeCloseTo(141.4213562);
  });

  test('getSumiChukou2(隅中勾2) returns 47.14045208', () => {
    expect(calc.getSumiChukou2()).toBeCloseTo(47.14045208);
  });
  test('getSumiToChougen(隅投長玄) returns 84.85281374', () => {
    expect(calc.getSumiToChougen()).toBeCloseTo(84.85281374);
  });

  test('getKouUraMe(裏目勾) returns 70.71067812', () => {
    expect(calc.getKouUraMe()).toBeCloseTo(70.71067812);
  });

  test('getTaruki1(垂木栓勾配1) returns 22.22222222', () => {
    expect(calc.getTaruki1()).toBeCloseTo(22.22222222);
  });

  test('getTaruki2(垂木栓勾配2) returns 22.22222222', () => {
    expect(calc.getTaruki2()).toBeCloseTo(22.22222222);
  });
});


describe('例100:55の計算', () => {
  beforeEach(() => {
    calc = new Koucogen(55, 100, 114.1271221, 55);
  });
  test('getTaruki(垂木栓勾配) returns 23.88707925', () => {
    expect(calc.getTaruki1()).toBeCloseTo(23.88707925);
  });
  test('getkeccouSumikou(欠勾隅勾) returns 29.85863567', () => {
    expect(calc.getkeccouSumikou()).toBeCloseTo(29.85863567);
  });
});
