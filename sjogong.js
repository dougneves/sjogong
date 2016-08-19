//onde tudo começa
$(document).ready(function(){

  //popula arena
  populaArena();

  //cria os divs dos jogadores
  players.forEach(function(p,index){
    $("#players").append("<div id='player_"+p.id+"' class='player'><p>Jogador["+p.id+"]: "+p.name+"</p><p id='player_"+p.id+"_points'>Pontos: 0</p><p id='player_"+p.id+"_pos'>Posição: 0,0</p><p id='player_"+p.id+"_direction'>Direcao: up</p><p id='player_"+p.id+"_lastnum'>Último número: up</p></div>");
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
          player.go = player.func(Object.create(player),Object.create(arena));
          player.running = false;
        }
        else {
          console.log("O player["+player.id+"] ainda tá pensando...");
        }
      },config.playersInterval,player,index,arena);
    });

    console.log("Iniciando o gameloop!!!");
    var gameLoopRunning = false;
    setInterval(function(){
      if(gameLoopRunning) return false;
      gameLoopRunning = true;
      for(var i=0;i<players.length;i++) {
        playerStep(players[i]);
        computePoints(arena,players[i]);
        drawPlayers(arena.canvas,players[i]);
      }
      gameLoopRunning = false;
    },config.loopInterval);
  },5000);

  console.log("Iniciando a atualização das pontuações...");
  setInterval(function(){
    drawPlayersInfo(players);
    //drawArenaInfo(arena);
  },1000);
});
