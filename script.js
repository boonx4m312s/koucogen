const button = document.getElementById('button1');
button.addEventListener("click", calculation);

const button2 = document.getElementById('button2');
button2.addEventListener("click", refreshText);


function refreshText() {
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
function getKeccou(kou, co) {
  gen = Math.sqrt(kou * kou + co * co);
  //欠勾を返す
  return kou - ((kou * ((kou * kou) / gen)) / gen);
}
function getSyoco(kou, co) {
  //小殳を返す
  gen = Math.sqrt(kou * kou + co * co);
  return (co * ((kou * kou) / gen)) / gen;
}
function getSyochukou(kou,co){
  // 小中勾を返す
  gen = Math.sqrt(kou * kou + co * co);
  g = (((kou * ((kou * kou) / gen)) / gen) * ((co * ((kou * kou) / gen)) / gen)) / ((kou * kou) / gen); //小中勾
  return g;
}
function getChukou(kou, co ){
  //中勾を返す
  gen = Math.sqrt(kou * kou + co * co);
  return (kou * co) / gen;
} 
// 平垂木栓勾配を計算する関数
function getTaruki(kou, co) {
  // 平垂木栓勾配を計算
  A = Math.sqrt(kou *kou + co * co);
  S1 = (kou * co *(1/2)) - (kou * (co/2) *(1/2));
  B = (S1*2)/A;
  C = Math.sqrt((kou/2) *(kou/2) -B *B);
  D = A-C;
  return (B* co)/D;
}

function calculateAngle(base, height) {
  // 正接を計算
  const tangent = height / base;

  // ラジアンで角度を求める
  const radian = Math.atan(tangent);

  // ラジアンを度数法に変換
  const degree = radian * 180 / Math.PI;

  return degree;
}
function calculateHeight(base, angle) {
  // 角度をラジアンに変換
  const radian = angle * Math.PI / 180;

  // 高さを計算
  const height = base * Math.tan(radian);

  return height;
}

function calculation() {
  let kou = parseFloat(document.getElementById('kou').value);
  let co = parseFloat(document.getElementById('co').value);
  let gen = parseFloat(document.getElementById('gen').value);
  let grad = parseFloat(document.getElementById('grad').value); //勾配

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

  a = getChukou(kou,co); //中勾
  b = (kou * kou) / gen; // 短玄
  c = (co * co) / gen; // 長玄
  d = (co * ((co * co) / gen)) / gen; //殳1
  e = getSyoco(kou, co); //殳2 小殳も同じ
  f = (kou * ((kou * kou) / gen)) / gen; // 小勾
  g = getSyochukou(kou,co); //小中勾
  h = getKeccou(kou, co); //欠勾
  i = gen * (kou / co); //補玄

  if (isNaN(grad)) {
    θ = (kou / co) * 100;
  } else {
    θ = grad;
  }

  // 殳の裏目
  j = Math.sqrt(co * co + co * co);
  //隅勾配の勾
  k = (kou * co) / j;

  // 欠勾隅勾
  l = (k * d) / co;
  //隅欠勾
  m = getKeccou(k, co);
  // 隅小殳(仮称)
  n = getSyoco(k, co);
  // 平垂木栓勾配
  o = (h * n) / e;
  // 小短玄
  p = ((kou-h)**2) /b; //( (勾‐欠勾) *  ) / 短玄
  // 平勾配欠勾～中勾
  q = (h * (co-e)) / c; //(欠勾* (殳-小殳))/ 長玄

  // 1
  r = getKeccou(h, d);
  //2 
  s = getSyoco(h,d);
  //3 
  t = getSyochukou(h,d);

  //半勾配
  u = kou / 2;
  //隅勾配 (半勾配*裏目) /co
  v = (u*j)/co;

  // 隅中勾
  w = getChukou(k,co);
  // 隅中勾2
  x = getChukou(kou,j);
  
  // 隅投長玄
  y = Math.sqrt((l**2) + ((co-e)**2));

  //隅玄1
  z = Math.sqrt(k * k + co * co);
  
  // 隅長玄1
  aa =  (co * co) / z; 
  // 隅玄2
  ab = Math.sqrt(v * v + j * j);
  // 隅長玄2
  ac = (j * j) / ab; 
  
  //平垂木栓勾配 (隅勾配図2)
  ag = getTaruki(kou,co);
  //

  //投勾配
  // 殳 * 勾裏目の角度
  ak = calculateAngle(co,((kou*j)/co));
  // 隅勾 * 裏目殳の角度
  al = calculateAngle(co,k);
  an = ak-al;
  am = calculateHeight(co,an);
  
  decimalPlaces = 8

  var myTable = document.getElementById("table_koucogen");
  myTable.rows[0].cells[1].textContent = kou.toFixed(decimalPlaces);  // 隅勾配
  myTable.rows[1].cells[1].textContent = co.toFixed(decimalPlaces);
  myTable.rows[2].cells[1].textContent = gen.toFixed(decimalPlaces);
  myTable.rows[3].cells[1].textContent = i.toFixed(decimalPlaces); //中勾
  myTable.rows[4].cells[1].textContent = c.toFixed(decimalPlaces); //長玄
  myTable.rows[5].cells[1].textContent = b.toFixed(decimalPlaces); //短玄
  myTable.rows[6].cells[1].textContent = (b/2).toFixed(decimalPlaces); //短玄の2分の1
  myTable.rows[7].cells[1].textContent = d.toFixed(decimalPlaces); //殳1
  myTable.rows[8].cells[1].textContent = e.toFixed(decimalPlaces); //小殳
  myTable.rows[9].cells[1].textContent = f.toFixed(decimalPlaces); //小勾
  myTable.rows[10].cells[1].textContent = g.toFixed(decimalPlaces); //小中勾
  myTable.rows[11].cells[1].textContent = h.toFixed(decimalPlaces); //欠勾
  myTable.rows[12].cells[1].textContent = p.toFixed(decimalPlaces); //小短玄
  myTable.rows[13].cells[1].textContent = q.toFixed(decimalPlaces); //平勾配欠勾～中勾
  myTable.rows[14].cells[1].textContent = r.toFixed(decimalPlaces); //1
  myTable.rows[15].cells[1].textContent = s.toFixed(decimalPlaces); //2
  myTable.rows[16].cells[1].textContent = t.toFixed(decimalPlaces); //3
  myTable.rows[17].cells[1].textContent = i.toFixed(decimalPlaces); //補玄
  myTable.rows[18].cells[1].textContent = θ.toFixed(decimalPlaces)+ " /100"; //勾配

  myTable = document.getElementById("table_sumikoubai1");
  myTable.rows[0].cells[1].textContent = v.toFixed(decimalPlaces) + "/100";  //隅勾配
  myTable.rows[1].cells[1].textContent = k.toFixed(decimalPlaces); //隅勾
  myTable.rows[2].cells[1].textContent = l.toFixed(decimalPlaces);  //欠勾隅勾
  myTable.rows[3].cells[1].textContent = m.toFixed(decimalPlaces); //隅欠勾
  myTable.rows[4].cells[1].textContent = w.toFixed(decimalPlaces); //隅中勾
  myTable.rows[5].cells[1].textContent = x.toFixed(decimalPlaces); //隅中勾2
  myTable.rows[6].cells[1].textContent = y.toFixed(decimalPlaces); //隅投長玄
  myTable.rows[7].cells[1].textContent = ag.toFixed(decimalPlaces); //平垂木栓勾配
  myTable.rows[8].cells[1].textContent = u.toFixed(decimalPlaces); //半勾配

  myTable = document.getElementById("table_sumikoubai2");
  myTable.rows[0].cells[1].textContent = aa.toFixed(decimalPlaces);  //隅長玄1
  myTable.rows[1].cells[1].textContent = ac.toFixed(decimalPlaces); //隅長玄2
  myTable.rows[2].cells[1].textContent = z.toFixed(decimalPlaces);  //隅玄1
  myTable.rows[3].cells[1].textContent = ab.toFixed(decimalPlaces); //隅玄2
  myTable.rows[4].cells[1].textContent = am.toFixed(decimalPlaces); //投勾配
  myTable.rows[5].cells[1].textContent = w.toFixed(decimalPlaces); //隅中勾
  myTable.rows[6].cells[1].textContent = x.toFixed(decimalPlaces); //隅中勾2
  myTable.rows[7].cells[1].textContent = o.toFixed(decimalPlaces); //平垂木栓勾配
}