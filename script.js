const button = document.getElementById('button1');
const paragraph = document.querySelector("p");

button.addEventListener("click", calculation);

function calculation() {
    let kou = parseFloat(document.getElementById('kou').value);
    let co = parseFloat(document.getElementById('co').value);
    let gen = parseFloat(document.getElementById('gen').value);
    
    var nullCount = 0;
    var nullstr = "";
    if(isNaN(kou)){
      nullCount +=1;
      nullstr = "kou";
    }
    if(isNaN(co)){
      nullCount +=1;
      nullstr = "co";
    }
    if(isNaN(gen)){
      nullCount +=1;
      nullstr = "gen";
    }
    if(nullCount ===1){
      if(isNaN(kou)){
        kou = Math.sqrt(co * co + gen * gen);
      }
      if(isNaN(co)){
        co = Math.sqrt(kou * kou + gen * gen);
      }
      if(isNaN(gen)){
        gen = Math.sqrt(kou * kou + co * co);
      }

      a = (kou + co)/gen; //中勾
      b = (kou * kou)/gen; // 短玄
      c = (co * co)/gen; // 長玄
      d = (co * ((co * co)/gen)) /gen; //股1
      e = (co * ((kou * kou)/gen))/gen; //股2 小股も同じ
      f = (kou*((kou*kou)/gen))/gen; // 小勾
      g = (((kou*((kou*kou)/gen))/gen)* ((co*((kou*kou)/gen))/gen))/((kou*kou)/gen); //小中勾
      h = kou-((kou*((kou*kou)/gen))/gen); //欠勾
      i = gen*(kou/co); //補玄

      paragraph.textContent = `計算は${g} ${h} ${i}`;
    }else{
      paragraph.textContent ="エラー";
    }
}