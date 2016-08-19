var config = {
  playersInterval: 10,
  loopInterval: 10,
  colors: [
    '#0000FF',
    '#008000','#008080','#0080FF','#00FF00','#00FF80','#00FFFF',
    '#808000','#808080','#8080FF','#80FF00','#80FF80','#80FFFF',
    '#FF0000','#FF8000','#FF8080','#FF80FF','#FFFF00','#FFFF80','#FFFFFF',
  ]
};

var random = function(min,max){
  return Math.floor((Math.random()*(max-min))+min);
};
