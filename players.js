var players = [];
arena.players = players;


//depois adiciona a funcao deles aqui, e da um nome
//players.push({name:"RANDOMIX",func:botRandom});
//players.push({name:"BOT EXTREM-BURRO",func:botExtremamenteBurro});
//players.push({name:"BOT MUITO-BURRO",func:botMuitoBurro});
players.push({name:"BOT BURRO 1",func:botBurro});
//players.push({name:"BOT BURRO 2",func:botBurro});
//players.push({name:"BOT BURRO 3",func:botBurro});
//players.push({name:"BOT BURRO 4",func:botBurro});
//players.push({name:"BOT BURRO 5",func:botBurro});

//o resto é automático
players.forEach(function(player,index){
  var r1 = random(0,arena.size.x);
  var r2 = random(0,arena.size.y);

  players[index].pos = {
    x: r1,
    y: r2
  };
  players[index].go = 'up';
  players[index].running = false;
  players[index].points = 0;
  players[index].lastNum = 0;
  players[index].id = index;
});

console.log(players);

//o jogador anda
var playerStep = function(player){
    if(player.go === 'up') player.pos.y--;
    if(player.go === 'down') player.pos.y++;
    if(player.go === 'left') player.pos.x--;
    if(player.go === 'right') player.pos.x++;
    if(player.pos.x < 0) player.pos.x = 0;
    if(player.pos.y < 0) player.pos.y = 0;
    if(player.pos.x > arena.size.x) player.pos.x = arena.size.x;
    if(player.pos.y > arena.size.y) player.pos.y = arena.size.y;
};
