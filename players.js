var players = [];
arena.players = players;

//para cada bot, da um nome e fala qual é a function aqui
players.push({name:"RANDOMIX_____1",func:botRandom});
players.push({name:"RANDOMIX_____2",func:botRandom});
players.push({name:"EXTREM-BURRO_1",func:botExtremamenteBurro});
players.push({name:"EXTREM-BURRO_2",func:botExtremamenteBurro});
players.push({name:"MUITO-BURRO__1",func:botMuitoBurro});
players.push({name:"MUITO-BURRO__2",func:botMuitoBurro});
players.push({name:"BURRO________1",func:botBurro});
players.push({name:"BURRO________2",func:botBurro});

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
