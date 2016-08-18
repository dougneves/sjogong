var botRandom = function(me){
  var ret = 'up'
  var g = random(0,4);
  if(g==0) ret = 'up';
  if(g==1) ret = 'right';
  if(g==2) ret = 'down';
  if(g==3) ret = 'left';
  return ret;
};
