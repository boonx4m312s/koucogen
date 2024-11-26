const button = document.getElementById('button1');
button.addEventListener("click", calculation);

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

  a = (kou * co) / gen; //中勾
  b = (kou * kou) / gen; // 短玄
  c = (co * co) / gen; // 長玄
  d = (co * ((co * co) / gen)) / gen; //殳1
  e = getSyoco(kou, co); //殳2 小殳も同じ
  f = (kou * ((kou * kou) / gen)) / gen; // 小勾
  g = (((kou * ((kou * kou) / gen)) / gen) * ((co * ((kou * kou) / gen)) / gen)) / ((kou * kou) / gen); //小中勾
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

  document.getElementById("tspan18").textContent = `殳 ${co.toFixed(9)}`;
  document.getElementById("tspan18-6").textContent = `殳2 ${e.toFixed(9)}`;
  document.getElementById("tspan18-51").textContent = `殳1 ${d.toFixed(9)}`;
  document.getElementById("tspan18-7").textContent = `小殳 ${e.toFixed(9)}`;  //小殳 = 殳2
  document.getElementById("tspan18-5").textContent = `玄 ${gen.toFixed(9)}`;
  document.getElementById("tspan18-5-8").textContent = `短玄 ${b.toFixed(9)}`;
  document.getElementById("tspan18-5-9").textContent = `長玄 ${c.toFixed(9)}`;
  document.getElementById("tspan18-5-3").textContent = `勾 ${kou.toFixed(9)}`;
  document.getElementById("tspan18-5-3-9").textContent = `補玄 ${i.toFixed(9)}`;
  document.getElementById("tspan18-5-3-7").textContent = `中勾 ${a.toFixed(9)}`;
  document.getElementById("tspan18-5-3-7-49").textContent = `小中勾 ${g.toFixed(9)}`;
  document.getElementById("tspan18-5-3-7-4").textContent = `欠勾 ${h.toFixed(9)}`;
  document.getElementById("text18-0-3").textContent = `勾配 ${θ.toFixed(9)} / 100`;

  document.getElementById("text9").textContent = `欠勾隅勾 ${l.toFixed(9)}`;
  document.getElementById("text9-2").textContent = `隅欠勾 ${m.toFixed(9)}`;
  document.getElementById("text9-1").textContent = `平垂木栓勾配 ${o.toFixed(9)}`;
  document.getElementById("text9-1-1").textContent = `殳の裏目\n${j.toFixed(9)}`;
  document.getElementById("text9-1-1-3").textContent = `隅勾配 ${k.toFixed(9)}`;
}