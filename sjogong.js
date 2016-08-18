//onde tudo começa
$(document).ready(function(){
  //cria os divs dos jogadores
  players.forEach(function(p,index){
    $("#players").append("<div id='player_"+p.id+"' class='player'><p>Jogador["+p.id+"]: "+p.name+"</p><p id='player_"+p.id+"_points'>Pontos: 0</p><p id='player_"+p.id+"_pos'>Posição: 0,0</p><p id='player_"+p.id+"_direction'>Direcao: up</p></div>");
    $("#player_"+p.id).css('color',config.colors[index]);
  });

  //cria o canvas da arena
  $("#arena_div").append("<canvas id='arena' width='"+arena.size.x+"' height='"+arena.size.y+"' style='background-color:black;'></canvas>");
  arena.canvas = document.getElementById("arena").getContext("2d");

  arena.num.forEach(function(n,i){
    arena.canvas.fillStyle=config.colors[n.value];
    arena.canvas.fillRect(n.x,n.y,1,1);
  });

  //inicia a palhaçada em 5 segundos
  console.log("Iniciando os bots em 5 segundos...");
  setTimeout(function(){
    console.log("Iniciando os players...");
    players.forEach(function(player,index){
      console.log("Iniciando o player["+player.id+"]: "+player.name);
      setInterval(function(player,index,arena){
        if(!player.running) {
          player.running = true;
          player.go = config.bots[index](Object.create(player),Object.create(arena));
          player.running = false;
        }
        else {
          console.log("O player["+player.id+"] ainda tá pensando...");
        }
      },5,player,index,arena);
    });

    console.log("Iniciando o gameloop!!!");
    var gameLoopRunning = false;
    setInterval(function(){
      if(gameLoopRunning) return false;
      gameLoopRunning = true;
      for(var i=0;i<config.bots.length;i++) {
        playerStep(players[i]);
        computePoints(arena,players[i]);
        drawPlayer(arena.canvas,players[i]);
      }
      gameLoopRunning = false;
    },10);
  },5000);

  console.log("Iniciando a atualização das pontuações...");
  setInterval(function(){
    players.forEach(function(player,index){
      //console.log("Player["+player.id+"]:"+player.name+" pontos:"+player.points+" posicao:"+player.pos.x+","+player.pos.y);
      $("#player_"+player.id+"_pos").text("posicao: "+player.pos.x+","+player.pos.y);
      $("#player_"+player.id+"_direction").text("direcao: "+player.go);
      $("#player_"+player.id+"_points").text("pontos: "+player.points);
    });

  },1000);
});

var random = function(min,max){
  return Math.floor((Math.random()*(max-min))+min);
};

var config = {
  bots: [
    botExtremamenteBurro,botExtremamenteBurro,botExtremamenteBurro,botExtremamenteBurro,botExtremamenteBurro,botExtremamenteBurro,botExtremamenteBurro,botExtremamenteBurro,botExtremamenteBurro,botExtremamenteBurro //os bots que estao competindo (functions)
  ],
  colors: [
    '#000080','#0000FF',
    '#008000','#008080','#0080FF','#00FF00','#00FF80','#00FFFF',
    '#800000','#808000','#808080','#8080FF','#80FF00','#80FF80','#80FFFF',
    '#FF0000','#FF8000','#FF8080','#FF80FF','#FFFF00','#FFFF80','#FFFFFF',
  ]
};

console.log(config);

var arena = {
  num:[],
  minNum: 1, //o menor numero que ira aparecer na arena
  maxNum: 9, //o maior numero que ira aparecer na arena
  qtdNum: 3000, //a quantidade de cada um dos numeros que deve aparecer
  size: {x:2000,y:1000},
  players:players
};

var players = [];
for(var i=0;i<config.bots.length;i++) {
  var r1 = random(0,arena.size.x);
  var r2 = random(0,arena.size.y);
  players.push({
    pos: {
      x: r1,
      y: r2
    },
    go: 'up',
    running: false,
    name: 'sou incrivel jogador '+i,
    id: i,
    points: 0
  });
};
players[0].name = "RANDOMIX";
players[1].name = "BOT EXTREMAMENTE BURRO";

for(var i=arena.minNum;i<=arena.maxNum;i++) { //para cada um dos numeros
  for(var j=0;j<arena.qtdNum;j++){
    var r1 = random(0,arena.size.x);
    var r2 = random(0,arena.size.y);
    arena.num.push({
      x:r1,
      y:r2,
      value:i
    });
  }
};

var playerStep = function(player){
    if(player.go === 'up') player.pos.y--;
    if(player.go === 'down') player.pos.y++;
    if(player.go === 'left') player.pos.x--;
    if(player.go === 'right') player.pos.x++;
    if(player.pos.x < 0) player.pos.x = 0;
    if(player.pos.y < 0) player.pos.y = 0;
    if(player.pos.x > arena.size.x) player.pos.x = arena.size.x;
    if(player.pos.y > arena.size.y) player.pos.y = arena.size.y;
}
var computePoints = function(arena,player){
  for(var i=0;i<arena.num.length;i++){
    var num = arena.num[i];
    if(player.pos.x === num.x && player.pos.y === num.y){
      console.log("Jogador "+player.name+" coletou numero "+  num.value);
      player.points+=num.value;
      arena.num.splice(i,1);
      return;
    }
  }
}

var drawPlayer = function(canvas,player){
  arena.canvas.fillStyle=config.colors[player.id];
  arena.canvas.fillRect(player.pos.x,player.pos.y,1,1);
}

//atualizacao da tela 1x por segundo
console.log(arena);
