//vai até o numero mais proximo dele, que seja o menor possível
var botMuitoBurro = function(me,arena){
  var ret = 'up';
  var numAim = arena.num[0];
  var ultimaDistancia = calculaDistancia(numAim.x,numAim.y,me.pos.x,me.pos.y);
  var menorDisponivel = arena.maxNum;

  //acha o numero mais proximo de me que ele pode pegar
  arena.num.forEach(function(num,index){
    if(me.lastNum <= num.value) {
      var distancia = calculaDistancia(num.x,num.y,me.pos.x,me.pos.y);
      if(distancia < ultimaDistancia && num.value <= menorDisponivel ) {
        ultimaDistancia = distancia;
        menorDisponivel = num.value;
        numAim = num;
      }
    }
  });
  //console.log(me.name+" está em "+me.pos.x+","+me.pos.y+" e indo atrás do número "+numAim.value+" em "+numAim.x+","+numAim.y);

  //decide para onde andar para pegar o numAim
  //sempre tenta inverter a posicao (se esta indo up, tenta ir left, etc..)
  if(me.go === "up" || me.go === "down"){
    if(me.pos.y > numAim.y) ret = 'up';
    if(me.pos.y < numAim.y) ret = 'down';
    if(me.pos.x > numAim.x) ret = 'left';
    if(me.pos.x < numAim.x) ret = 'right';
  }
  else {
    if(me.pos.x > numAim.x) ret = 'left';
    if(me.pos.x < numAim.x) ret = 'right';
    if(me.pos.y > numAim.y) ret = 'up';
    if(me.pos.y < numAim.y) ret = 'down';
  }
  //console.log(me.name+" vai para "+ret);


  return ret;
};

var calculaDistancia = function(x1,y1,x2,y2){
  return Math.abs(x1-x2)+Math.abs(y1-y2);
};
