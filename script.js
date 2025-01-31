window.calculation = calculation;
window.refreshText = refreshText;

/**
 * テキストボックスの値をクリアする
 * @return {void}
 */
export function refreshText() {
  document.getElementById('kou').value = "";
  document.getElementById('co').value = "";
  document.getElementById('gen').value = "";
  document.getElementById('grad').value = "";
  document.getElementById('kou').focus();

  const tdElements = document.querySelectorAll("#table_koucogen td");
  // 各<td>の内容を空文字に設定
  tdElements.forEach(td => {
    td.textContent = "";
  });
}

class Koucogen {
  constructor(kou, co, gen, grad) {
    this.kou = kou;
    this.co = co;
    this.gen = gen;
    this.grad = grad;
  }

  getKou() {
    return this.kou;
  }

  getCo() {
    return this.co;
  }

  getGen() {
    return this.gen;
  }

  getGrad() {
    return this.grad;
  }

  /**
   * 
   * @returns { number } 中勾の数値
   */
  getChukou() {
    return (this.kou * this.co) / this.gen;
  }

  /**
   * 小殳の数値を取得
   * 殳2 小殳も同じ
   * @returns { number } 小殳の数値
   */
  getSyoco() {
    return (this.co * (Math.pow(this.kou, 2) / this.gen)) / this.gen;
  }

  /**
   * 
   * @returns { number } 小中勾の数値 
   */
  getSyochukou() {
    let f = (this.kou * ((Math.pow(this.kou,2)) / this.gen)) / this.gen; // 小勾
    let e = this.getSyoco();
    let bb = Math.pow(this.kou,2) / this.gen; // 短玄
    return (f * e) / bb;
  }

  /**
   * 
   * @returns { number } 欠勾の数値
   */
  getKeccou() {
    return this.kou - ((this.kou * (Math.pow(this.kou,) / this.gen)) / this.gen);
  }

  /**
   * 平垂木栓勾配の計算
   * @returns { number } 平垂木栓勾配の数値
   */
  getTaruki() {
    let A = Math.sqrt(this.kou * this.kou + this.co * this.co);
    let S1 = (this.kou * this.co * (1 / 2)) - (this.kou * (this.co / 2) * (1 / 2));
    let B = (S1 * 2) / A;
    let C = Math.sqrt((this.kou / 2) * (this.kou / 2) - B * B);
    let D = A - C;
    return (B * co) / D;
  }

  /**
   * 短玄の数値を取得
   * @returns { number } 短玄の数値
   */
  getTangen(){
    return Math.pow(this.kou,2) / this.gen; // 短玄
  }

  /**
   * 長玄の数値を取得
   * @returns { number } 長玄の数値
   */
  getChougen(){
    return Math.pow(this.co,2) / this.gen; // 長玄
  }

  /**
   * 殳1の数値を取得
   * @returns { number } 殳1の数値
   */
  getCo1(){
    return (this.co * (Math.pow(this.co,2) / this.gen)) / this.gen; //殳1
  }

  /**
   * 小勾
   * @returns { number } 小勾の数値
   */
  getSyoukou(){
    return (this.kou * ((Math.pow(this.kou,2) ) / this.gen)) / this.gen;
  }

  /**
   * 底辺と角度から高さを計算
   * @param {*} base  底辺
   * @param {*} angle 角度  
   * @returns { number } 高さ
  */
  #calculateHeight(base, angle) {
    // 角度をラジアンに変換
    const radian = angle * Math.PI / 180;
    // 高さを計算
    const height = base * Math.tan(radian);
    return height;
  }

  /**
   * 底辺と高さから角度を計算
   * @param {*} base 底辺
   * @param {*} height 高さ
   * @returns 
   */
  #calculateAngle(base, height) {
    // 正接を計算
    const tangent = height / base;
    // ラジアンで角度を求める
    const radian = Math.atan(tangent);
    // ラジアンを度数法に変換
    const degree = radian * 180 / Math.PI;
    return degree;
  }
}

/**
 * 有効桁数を指定して数値を切り捨てる
 * @param { number } num 有効桁数
 * @returns { number } 切り捨てた数値
 */
export function truncateToDigits(num) {
  let decimalPlaces = 8;
  // 8桁目までを残すために10の7乗をかける
  let Digits = Math.pow(10, decimalPlaces);
  return Math.floor(num * Digits) / Digits;
}

export function calculation() {
  
  let kou = parseFloat(document.getElementById('kou').value);
  let co = parseFloat(document.getElementById('co').value);
  let gen = parseFloat(document.getElementById('gen').value);
  let grad = parseFloat(document.getElementById('grad').value); //勾配
  let θ = 0;
  var nullCount = 0;
  var nullstr = "";
  if (isNaN(grad)) {
    if (isNaN(kou)) {
      nullCount += 1;
      nullstr = "kou";
    }
    if (isNaN(co)) {
      nullCount += 1;
      nullstr = "co";
    }
    if (isNaN(gen)) {
      nullCount += 1;
      nullstr = "gen";
    }
    if (nullCount === 1) {
      if (isNaN(kou)) {
        kou = Math.sqrt(co * co + gen * gen);
        //document.getElementById('kou').value = kou;
      }
      if (isNaN(co)) {
        co = Math.sqrt(kou * kou + gen * gen);
        //document.getElementById('co').value = co;
      }
      if (isNaN(gen)) {
        gen = Math.sqrt(kou * kou + co * co);
        //document.getElementById('gen').value = gen;
      }
    }
  } else {
    if (isNaN(kou)) {
      nullCount += 1;
      nullstr += "kou";
    }
    if (isNaN(co)) {
      nullCount += 1;
      nullstr += "co";
    }
    if (isNaN(gen)) {
      nullCount += 1;
      nullstr += "gen";
    }

    if (nullCount === 2) {
      θ = grad / 100
      if (nullstr.indexOf('kou') === -1) {
        co = kou / θ;
        gen = Math.sqrt(kou * kou + co * co);
      }
      if (nullstr.indexOf('co') === -1) {
        kou = θ * co;
        gen = Math.sqrt(kou * kou + co * co);;
      }
      if (nullstr.indexOf('gen') === -1) {
        kou = Math.sqrt((θ * θ) * (gen * gen));
        co = Math.sqrt(θ * θ - kou * kou);
      }
    }
  }
  let calc = new Koucogen(kou,co,gen,θ);
  
  // const a = getChukou(kou, co); //中勾
  // const b = (kou * kou) / gen; // 短玄
  // const c = (co * co) / gen; // 長玄
  // const d = (co * ((co * co) / gen)) / gen; //殳1
  // const e = getSyoco(kou, co); //殳2 小殳も同じ
  // const f = (kou * ((kou * kou) / gen)) / gen; // 小勾
  const g = getSyochukou(kou, co); //小中勾
  const h = getKeccou(kou, co); //欠勾
  const i = gen * (kou / co); //補玄

  if (isNaN(grad)) {
    θ = (kou / co) * 100;
  } else {
    θ = grad;
  }

  // 殳の裏目
  const j = Math.sqrt(co * co + co * co);
  //隅勾配の勾
  const k = (kou * co) / j;

  // 欠勾隅勾
  const l = (k * d) / co;
  //隅欠勾
  const m = getKeccou(k, co);
  // 隅小殳(仮称)
  const n = getSyoco(k, co);
  // 平垂木栓勾配
  const o = (h * n) / e;
  // 小短玄
  const p = ((kou - h) ** 2) / b; //( (勾‐欠勾) *  ) / 短玄
  // 平勾配欠勾～中勾
  const q = (h * (co - e)) / c; //(欠勾* (殳-小殳))/ 長玄

  // 1
  const r = getKeccou(h, d);
  //2 
  const s = getSyoco(h, d);
  //3 
  const t = getSyochukou(h, d);

  //半勾配
  const u = kou / 2;
  //隅勾配 (半勾配*裏目) /co
  const v = (u * j) / co;

  // 隅中勾
  const w = getChukou(k, co);
  // 隅中勾2
  const x = getChukou(kou, j);

  // 隅投長玄
  const y = Math.sqrt((l ** 2) + ((co - e) ** 2));

  //隅玄1
  const z = Math.sqrt(k * k + co * co);

  // 隅長玄1
  const aa = (co * co) / z;
  // 隅玄2
  const ab = Math.sqrt(v * v + j * j);
  // 隅長玄2
  const ac = (j * j) / ab;

  //平垂木栓勾配 (隅勾配図2)
  const ag = getTaruki(kou, co);
  //

  //投勾配
  // 殳 * 勾裏目の角度
  const ak = calculateAngle(co, ((kou * j) / co));
  // 隅勾 * 裏目殳の角度
  const al = calculateAngle(co, k);
  const an = ak - al;
  const am = calculateHeight(co, an);
  const decimalPlaces = 8;
  let myTable = document.getElementById("table_koucogen");
  myTable.rows[0].cells[1].textContent = truncateToDigits(calc.getKou());
  myTable.rows[1].cells[1].textContent = truncateToDigits(calc.getCo());  
  myTable.rows[2].cells[1].textContent = truncateToDigits(calc.getGen());
  myTable.rows[3].cells[1].textContent = truncateToDigits(calc.getChukou()); //中勾
  myTable.rows[4].cells[1].textContent = truncateToDigits(c); //長玄
  myTable.rows[5].cells[1].textContent = truncateToDigits(b); //短玄
  myTable.rows[6].cells[1].textContent = truncateToDigits((b / 2)); //短玄の2分の1
  myTable.rows[7].cells[1].textContent = truncateToDigits(d); //殳1
  myTable.rows[8].cells[1].textContent = truncateToDigits(getSyoco(kou, co)); //小殳
  myTable.rows[9].cells[1].textContent = truncateToDigits(f); //小勾
  myTable.rows[10].cells[1].textContent = truncateToDigits(g); //小中勾
  myTable.rows[11].cells[1].textContent = truncateToDigits(h); //欠勾
  myTable.rows[12].cells[1].textContent = truncateToDigits(p); //小短玄
  myTable.rows[13].cells[1].textContent = truncateToDigits(q); //平勾配欠勾～中勾
  myTable.rows[14].cells[1].textContent = truncateToDigits(r); //1
  myTable.rows[15].cells[1].textContent = truncateToDigits(s); //2
  myTable.rows[16].cells[1].textContent = truncateToDigits(t); //3
  myTable.rows[17].cells[1].textContent = truncateToDigits(i); //補玄
  myTable.rows[18].cells[1].textContent = truncateToDigits(θ).toString() + " /100"; //勾配

  myTable = document.getElementById("table_sumikoubai1");
  myTable.rows[0].cells[1].textContent = truncateToDigits(v).toString() + "/100";  //隅勾配
  myTable.rows[1].cells[1].textContent = truncateToDigits(k); //隅勾
  myTable.rows[2].cells[1].textContent = truncateToDigits(l);  //欠勾隅勾
  myTable.rows[3].cells[1].textContent = truncateToDigits(m); //隅欠勾
  myTable.rows[4].cells[1].textContent = truncateToDigits(w); //隅中勾
  myTable.rows[5].cells[1].textContent = truncateToDigits(x); //隅中勾2
  myTable.rows[6].cells[1].textContent = truncateToDigits(y); //隅投長玄
  myTable.rows[7].cells[1].textContent = truncateToDigits(ag); //平垂木栓勾配
  myTable.rows[8].cells[1].textContent = truncateToDigits(u); //半勾配

  myTable = document.getElementById("table_sumikoubai2");
  myTable.rows[0].cells[1].textContent = truncateToDigits(aa);  //隅長玄1
  myTable.rows[1].cells[1].textContent = truncateToDigits(ac); //隅長玄2
  myTable.rows[2].cells[1].textContent = truncateToDigits(z);  //隅玄1
  myTable.rows[3].cells[1].textContent = truncateToDigits(ab); //隅玄2
  myTable.rows[4].cells[1].textContent = truncateToDigits(am); //投勾配
  myTable.rows[5].cells[1].textContent = truncateToDigits(w); //隅中勾
  myTable.rows[6].cells[1].textContent = truncateToDigits(x); //隅中勾2
  myTable.rows[7].cells[1].textContent = truncateToDigits(o); //平垂木栓勾配
}