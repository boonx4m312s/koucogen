const button = document.getElementById('button1');
button.addEventListener("click", calculation);

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

      }
      if (nullstr.indexOf('co') === -1) {

      }
      if (nullstr.indexOf('gen') === -1) {

      }
    }
  }


  a = (kou * co) / gen; //中勾
  b = (kou * kou) / gen; // 短玄
  c = (co * co) / gen; // 長玄
  d = (co * ((co * co) / gen)) / gen; //股1
  e = (co * ((kou * kou) / gen)) / gen; //股2 小股も同じ
  f = (kou * ((kou * kou) / gen)) / gen; // 小勾
  g = (((kou * ((kou * kou) / gen)) / gen) * ((co * ((kou * kou) / gen)) / gen)) / ((kou * kou) / gen); //小中勾
  h = kou - ((kou * ((kou * kou) / gen)) / gen); //欠勾
  i = gen * (kou / co); //補玄
  if (isNaN(grad)) {
    θ = ((Math.atan(kou / co )) * (180 / Math.PI));
  } else {
    θ = grad
  }

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

}