export function getKeccou(kou, co) {
  gen = Math.sqrt(kou * kou + co * co);
  //欠勾を返す
  return kou - ((kou * ((kou * kou) / gen)) / gen);
}