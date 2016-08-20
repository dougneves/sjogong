var config = {
  minNum: 1, //o menor numero que ira aparecer na arena
  maxNum: 9, //o maior numero que ira aparecer na arena
  qtdNum: 200, //a quantidade de cada um dos numeros que deve aparecer
  size: {x:800,y:480}, //tamanho do tabuleiro
  playersInterval: 5,
  loopInterval: 6,
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
