# SJogoNG
A javascript game about bots that run in an arena catching numbers

## Simples rules, complex IAs
SJogonNG is a game about making IAs to battle in an arena.
Rules are simple:
1. In each turn, a bot MUST make a step in one of this 4 positions: 'up', 'down', 'left' or 'right'
2. The arena has X numbers in random positions, and Y players in random positions too (the bots)
3. The numbers are from minNum to maxNum (usually, 1 to 9)
4. Each number that a bot catches, add the number value to the bot points (in other words, if the bot gets an 5, add 5 points to its score)
5. BUT, a bot cannot get a number smaller than the last number it collected (in other words, after collect a 5, a bot can only collect the numbers from value of 5 or more)
6. The game ends when the numbers are over or when no bots can collect any number
7. Win the bot with more points in the end

## How the bot works
In SJogoNG, every bot is a javascript function. This function is called 25 times per second, and must decide if the bot goes up, down, left or right in the arena. The bot function will not be called again until it returns. In other words, the bot function will not be called 25 times per second if it takes to long to respond, and the bot will continue to move to the last direction it returned.
### What are the function parameters
The bot function receives 2 parameters, has follow:
#### me (all the bot information)
The me parameter is an object that represents the bot, and is from the "Player" class.
This class has the following attributes:
1. .pos - the current position of the bot (pos.x,pos.y)
2. .go - the current direction of the bot
3. .points - the current score of the bot
4. .lastNum - the value of last number that the bot collected
5. .id - a number to identify the bot
#### arena
The arena object has everything a bot need to decide which direction to go. It is an object of the "Arena" class, and have the following parameters:
1. .num - a list of all numbers in the arena
  1. .num[x].pos - the position of the number (pos.x,pos.y)
  2. .num[x].value - what is the number value (1 to 9 usually)
2. .minNum - the smaller number (usually 1)
3. .maxNum - the greatest number (usually 9)
4. .qtdNum - how much of each number are in the initial arena (before the bots start to collect then)
5. .size - the arena size (.size.x, .size.y). A bot cannot walk outside the arena
6. .players - a list of all the bots that are playing the current match. Each object of the list has the information for a bot, has you see in the Players class explanation.
### What the function must return
The function must return a string, with one of the following values: 'up','down','left' or 'right'

## Please, explain to me using CODE!
Ok, lets make a bot! :)
This bot is named "Extremamente Burro", what in English means something like "Extremely Dumb".
What it does is go to the number that was closest.
Let's do a step by step:

### 1 Create the bot function, here is the simplest possible
```javascript
var botExtremamenteBurro = function(me,arena){
  return 'up'; //it must return a string, 'up', 'down', 'left' or 'right'
}
```

### 2 Lets find where is the closest number, by looking to the distance of all numbers in the arena
```javascript
var numAim; //this is the number that I want
var minorDistance = arena.size.x+arena.size.y; //you have to initialize it with the major distance possible in game
arena.num.forEach(function(num,index){ //for each number in the arena
  var distance = Math.abs(me.pos.x-num.x)+Math.abs(me.pos.y-num.y); //calculate the distance between bot and number
    if(distance <= minorDistance) { //if this number is the closest so far
      minorDistance = distance;
      numAim = num; //this is the number that I want
  }
});
```

### 3 Ok, now the bot knows what it wants (the number in numAim), but how to get there?
```javascript
if(me.pos.x > numAim.x)      direction = 'left';  //if the number has a X smaller than my position, let's go left!
else if(me.pos.x < numAim.x) direction = 'right'; //or right
else if(me.pos.y > numAim.y) direction = 'up';    //or up
else if(me.pos.y < numAim.y) direction = 'down';  //or down
```

### 4 The return
```javascript
return direction;
```

## For whom this project was made
For all who want to have fun programming a small specialist IA to battle with other small IAs experts.
It's great to spend a challenge in a class or group of programmers, and see their specilists AIs battling the numbers. :)
Me and my great friend Bruno Jesus (https://github.com/00cpxxx) have this idea in our Computer Science course at Mackenzie/São Paulo in 2004. The first version of this code was written in C.

# And who are me?
I'm Douglas Neves, a programmer living at the moment in Santos/Brasil, passionate about programming, javascript, web and games!
You can contact me in the e-mail dougneves@gmail.com, I'll glad to talk to you :)
