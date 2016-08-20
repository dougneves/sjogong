var arena = {
  num:[],
  minNum: config.minNum,
  maxNum: config.maxNum,
  qtdNum: config.qtdNum,
  size: config.size
};

var populaArena = function(){
  for(var i=arena.minNum;i<=arena.maxNum;i++) { //para cada um dos numeros
    for(var j=0;j<arena.qtdNum;j++){
      var jaTem = false; //evita colocar 2 numeros no mesmo lugar
      do{
        jaTem=false;
        var r1 = random(0,arena.size.x);
        var r2 = random(0,arena.size.y);
        arena.num.forEach(function(num,index){
          if(num.x===r1 && num.y===r2){
            jaTem = true;
          }
        });
        if(!jaTem) {
            arena.num.push({
            x:r1,
            y:r2,
            value:i
          });
        }
      }while(jaTem);
    }
  };
};


//ve se algum jogador fez ponto
var computePoints = function(arena,player){
  arena.num.forEach(function(num,index){
    if(player.pos.x === num.x && player.pos.y === num.y){
      if(player.lastNum <= num.value){
        console.log("Jogador "+player.name+" coletou numero "+  num.value);
        arena.num.splice(index,1);
        player.points+=num.value;
        player.lastNum = num.value;
        return;
      }
      else {
        console.log("Jogador "+player.name+" tentou pegar um número que não podia: "+  num.value);
      }
    }
  });
}
