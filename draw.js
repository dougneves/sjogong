var drawPlayers = function(canvas,player){
  arena.canvas.fillStyle=config.colors[player.id];
  arena.canvas.fillRect(player.pos.x,player.pos.y,1,1);
}

var drawPlayersInfo = function(players){
  players.forEach(function(player,index){
    //console.log("Player["+player.id+"]:"+player.name+" pontos:"+player.points+" posicao:"+player.pos.x+","+player.pos.y);
    $("#player_"+player.id+"_pos").text("position: "+player.pos.x+","+player.pos.y);
    $("#player_"+player.id+"_direction").text("direction: "+player.go);
    $("#player_"+player.id+"_points").text("points: "+player.points);
    $("#player_"+player.id+"_lastnum").text("last_number: "+player.lastNum);
  });
};

var drawArenaInfo = function(arena) {
  var arenainfo = $("#arena_info");
  arenainfo.text("");
  var qtdnums = [];

  for(var i=arena.minNum;i<=arena.maxNum;i++){
    qtdnums.push(0);
  }
  arena.num.forEach(function(num, index){
    qtdnums[num.value-1]++;
  });
  var total = 0;
  qtdnums.forEach(function(qtdnum,index){
    total+=(qtdnum*(index+1));
    arenainfo.append("<p style='color:"+config.colors[index]+"'>"+(index+1)+": "+qtdnum+" ("+(qtdnum*(index+1))+" avaliable points)</p>");
  });
  arenainfo.append("<p style='color:#FFFFFF'>"+total+" total avaliable points</p>");
};
