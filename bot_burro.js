//vai até o numero mais proximo dele, que seja o menor possível, e tenta desviar dos outros números enquando isso
var botBurro = function(me,arena){
  var ret = 'up';
  var numAim = {};
  var ultimaDistancia = arena.size.x*arena.size.y;
  var menorDisponivel = arena.maxNum;
  var numsProximos = [];

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
    //aproveita o loop e ve se tem algum número do lado dele
    if(
      ((me.pos.x === num.x) && ((me.pos.y === num.y-1) || (me.pos.y === num.y+1))) ||
      ((me.pos.y === num.y) && ((me.pos.x === num.x-1) || (me.pos.x === num.x+1)))
    ) {
      if(num.value != numAim.value) {
        numsProximos.push(num);
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

  //desvia dos numsProximos caso necessario
  numsProximos.forEach(function(num, index){
    //console.log("tem um número proximo aqui que eu quero evitar! "+num.value+": "+num.x+","+num.y);

    //se esta indo para esquerda, ve se tem numero la
    if(ret==='left') {
      if(num.x > me.pos.x){
        console.log("o maldito está em "+ret);
        //vai pra cima ou para baixo
        ret = 'up';
        if(me.pos.y < numAim.y) ret = 'down';
        console.log(me.name+" eu vou para "+ret);
      }
    }
    else if(ret==='right') {
      if(num.x < me.pos.x){
        console.log("o maldito está em "+ret);
        //vai pra cima ou para baixo
        ret = 'up';
        if(me.pos.y < numAim.y) ret = 'down';
        console.log(me.name+" eu vou para "+ret);
      }
    }
    else if(ret==='up') {
      if(num.y < me.pos.y){
        console.log("o maldito está em "+ret);
        //vai pra esq ou dir
        ret = 'left';
        if(me.pos.x < numAim.x) ret = 'right';
        console.log(me.name+" eu vou para "+ret);
      }
    }
    else if(ret==='down') {
      if(num.y > me.pos.y){
        console.log("o maldito está em "+ret);
        //vai pra esq ou dir
        ret = 'left';
        if(me.pos.x < numAim.x) ret = 'right';
        console.log(me.name+" eu vou para "+ret);
      }
    }
  });

  //console.log(me.name+" eu vou para "+ret);

  return ret;
};

var calculaDistancia = function(x1,y1,x2,y2){
  return Math.abs(x1-x2)+Math.abs(y1-y2);
};
