//Primeiro coloca tudo aqui, depois arruma :)
var bot1 = function(me){
  me.running=true;
  var ret = 'up'
  var g = random(0,4);
  if(g==0) ret = 'up';
  if(g==1) ret = 'right';
  if(g==2) ret = 'down';
  if(g==3) ret = 'left';
  me.point+=1000;
  me.running=false;
  return ret;
};

var random = function(min,max){
  return Math.floor((Math.random()*(max-min))+min);
};

var config = {
  arenaX: 1024, //tamanho da arena horizontal
  arenaY: 768, //tamanho da arena vertical
  bots: [
    bot1,bot1 //os bots que estao competindo (functions)
  ],
  minNum: 1, //o menor numero que ira aparecer na arena
  maxNum: 9, //o maior numero que ira aparecer na arena
  qtdNum: 300 //a quantidade de cada um dos numeros que deve aparecer
};

console.log(config);

var arena = {
  num:[]
};

var players = [];
for(var i=0;i<config.bots.length;i++) {
  var r1 = random(0,config.arenaX);
  var r2 = random(0,config.arenaY);
  players.push({
    pos: {
      x: r1,
      y: r2
    },
    go: 'up',
    running: false,
    name: i,
    points: 0
  });
};

for(var i=config.minNum;i<=config.maxNum;i++) { //para cada um dos numeros
  for(var j=0;j<config.qtdNum;j++){
    var r1 = random(0,config.arenaX);
    var r2 = random(0,config.arenaY);
    arena.num.push({
      x:r1,
      y:r2,
      value:i
    });
  }
};

//inicia os bots
setTimeout(function(){
    setInterval(function(){if(!players[0].running) config.bots[0](Object.create(players[0]));},100);
    setInterval(function(){if(!players[1].running) config.bots[1](Object.create(players[1]));},100);
},5000);

var playerStep = function(player){
    console.log("Verificando se o jogador "+player.name+" vai andar.")
    if(player.go === 'up') player.pos.x--;
    if(player.go === 'down') player.pos.x++;
    if(player.go === 'left') player.pos.y--;
    if(player.go === 'right') player.pos.y++;
    if(player.pos.x < 0) player.pos.x = 0;
    if(player.pos.y < 0) player.pos.y = 0;
    if(player.pos.x > config.arenaX) player.pos.x = config.arenaX;
    if(player.pos.y > config.arenaY) player.pos.y = config.arenaY;
}
var computePoints = function(arena,player){
  console.log("Verificando se o jogador "+player.name+" pegou algo.")
  for(var i=0;i<arena.num.length;i++){
    var num = arena.num[i];
    if(player.pos.x === num.x && player.pos.y === num.y){
      console.log("Jogador "+player.name+" coletou numero "+  num.value);
      player.points+=num.value;
      arena.num.splice(i,1);
      console.log(arena);
      return;
    }
  }
  console.log("Jogador "+player.name+" nao pegou nada. Ainda temos "+arena.num.length+" numeros espalhados pela arena!");
}

//atualizacao da tela 1x por segundo
var gameLoopRunning = false
setInterval(function(){
  if(gameLoopRunning) return false;
  gameLoopRunning = true;
  console.log("----- vai bots!");
  for(var i=0;i<config.bots.length;i++) {
    console.log("O jogador "+i+" está indo -> "+players[i].go);
    playerStep(players[i]);
    console.log("O jogador "+i+" está em ("+players[i].pos.x+","+players[i].pos.y+")");
    computePoints(arena,players[i]);
    console.log("O jogador "+i+" está com "+players[i].points+" pontos");
  }
  gameLoopRunning = false;
},200)

console.log(arena);
