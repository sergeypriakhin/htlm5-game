"use strict";

// variables

var map, ctxMap;

var gameWidth = 800, gameHeigth = 400;

var bgGame = new Image();
	bgGame.src = 'img/bg.jpg';

var bgGame1 = new Image();
	bgGame1.src = 'img/bg.jpg';

var pl, ctxPl;

var plBg = new Image();
	plBg.src = 'img/player.png';

var enemy, ctxEnemy;

var enemies = [];

var enemyBg = new Image();
	enemyBg.src = 'img/enemy.png';

var btnDraw, btnClear;

var objPlayer, objMap, objEnemy;

var requestAnimationFrame = window.requestAnimationFrame || 
							window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

var isPlay;

var health;

var ctxText;
var canText;

var mapX = 0, map1X = gameWidth;

// var spawnInterval;
// var spawnTime = 6000;
// var spawnAmout = 3;


// инициализация --> старт
window.onload = init;

// func init

function init() {
	
    // btnDraw = document.getElementById('btnDraw');
    // btnClear = document.getElementById('btnClear');

    // btnDraw.addEventListener('click', drawRect, false);
    // btnClear.addEventListener('click', clear, false);
    canText = document.getElementById('text');
	ctxText = canText.getContext('2d');
	canText.width = gameWidth;
	canText.height = gameHeigth;

	ctxText.fillStyle = "#3dd";
    ctxText.font = "bold 15px Arial";

    objMap = new Map();
    objMap.init();

    objPlayer = new Player();
    objPlayer.init();

    // objEnemy = new Enemy();
    // objEnemy.init();
    
    // draw();
    startLoop();    

    document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);

    health = 100;
	

};

// конструктор Map
function Map() {
	this.width = gameWidth;
	this.height = gameHeigth;
};

Map.prototype.init = function() {
	map = document.getElementById("map"),
    ctxMap = map.getContext('2d');
    map.width = this.width;
    map.height = this.height;
};

Map.prototype.drawBg = function() {
	ctxMap.clearRect(0, 0, gameWidth, gameHeigth);
	ctxMap.drawImage(bgGame, 0, 0, 3000, 1500, 
   		mapX, 0, this.width, this.height);
	ctxMap.drawImage(bgGame1, 0, 0, 3000, 1500, 
   		map1X, 0, this.width, this.height);
};

// конструктор Player
function Player() {
	this.srcX = 0;
	this.srxY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.sizeImgX = 400;
	this.sizeImgY = 400;
	this.width = 100;
	this.height = 100;

	this.speed = 4;

	// keys
	this.isUp = false;
	this.isDown = false;
	this.isLeft = false;
	this.isRigth = false;
};

Player.prototype.init = function() {
	pl = document.getElementById('player');
    ctxPl = pl.getContext('2d');
    pl.width = 800;
    pl.height = 400;
};

Player.prototype.draw = function() {
	ctxPl.clearRect(0, 0, gameWidth, gameHeigth);
	ctxPl.drawImage(plBg, this.srcX, this.srxY, this.sizeImgX, this.sizeImgY, 
   		this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function() {
	if (this.drawX < 0) this.drawX = 0;
	if (this.drawX > gameWidth - this.width) this.drawX = gameWidth - this.width;
	if (this.drawY < 0) this.drawY = 0;
	if (this.drawY > gameHeigth - this.height) this.drawY = gameHeigth - this.height;
	// this.drawX += this.speed;
	for (var i = 0; i < enemies.length; i++) {
		if (this.drawX >= enemies[i].drawX &&
			this.drawY >= enemies[i].drawY &&
			this.drawX <= enemies[i].drawX + enemies[i].width &&
			this.drawY <= enemies[i].drawY + enemies[i].height) 
		{
			health--;
		}
	}

	if (health < 0) health = 100;

	this.chooseDir();

};

Player.prototype.chooseDir = function() {
	if(this.isUp) {
		console.log('isUp');
		this.drawY -= this.speed;
	}
	if(this.isDown) {
		console.log('isDown');
		this.drawY += this.speed;
	}
	if(this.isLeft) {
		console.log('isLeft');
		this.drawX -= this.speed;
	}
	if(this.isRigth) {
		console.log('isRigth');
		this. drawX += this.speed;
	}
};

Player.prototype.attack = function() {
	// body...
};

// end player


// конструктор Enemy
function Enemy() {
	this.srcX = 0;
	this.srxY = 0;
	this.drawX = Math.floor(Math.random() * gameWidth) + gameWidth;
	this.drawY = Math.floor(Math.random() * gameHeigth);
	this.sizeImgX = 157;
	this.sizeImgY = 182;
	this.width = 70;
	this.height = 95;

	this.speed = 3;
};

// Enemy.prototype.init = function() {
// 	enemy = document.getElementById('enemy');
// 	ctxEnemy = enemy.getContext('2d');
// 	enemy.width = 800;
// 	enemy.height = 400;
// };

Enemy.prototype.draw = function() {
	// clearEnemy();
	ctxMap.drawImage(enemyBg, this.srcX, this.srxY, this.sizeImgX, this.sizeImgY,
		this.drawX, this.drawY, this.width, this.height);
};
Enemy.prototype.update = function() {
	this.drawX -= this.speed;
	if (this.drawX + this.width < 0) {
		this.drawX = Math.floor(Math.random() * gameWidth) + gameWidth;
		this.drawY = Math.floor(Math.random() * gameHeigth);
		// this.delete();
	}
	if (this.drawY > gameHeigth - this.height) this.drawY = gameHeigth - this.height;
};
Enemy.prototype.delete = function() {
	enemies.splice(enemies.indexOf(this), 1);
};

function spawnEnemy(count) {
	for (var i = 0; i < count; i++) {
		enemies[i] = new Enemy();
	}
}

// function startCreateEnemies() {
// 	stopCreateEnemies();
// 	spawnInterval = setInterval(function(){spawnEnemy(spawnAmout)}, spawnTime);
// }

// function stopCreateEnemies() {
// 	clearInterval(spawnInterval);
// }

function loop() {
	if(isPlay) {
		draw();
		update();
		requestAnimationFrame(loop);
	}
};

function startLoop() {
	isPlay = true;
	loop();
	spawnEnemy(10);
};

function stopLoop() {
	isPlay = false;
};

function draw() {
	objMap.drawBg();
	objPlayer.draw();
	// objEnemy.draw();
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].draw();
	}
};

function update() {
	moveBg();
	updateText();
	objPlayer.update();
	// objEnemy.update();
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update();
	}
};

function checkKeyDown(e) {
	var key = e.keyCode || e.which;
	var keyChar = String.fromCharCode(key);

	if(keyChar == 'W') {
		objPlayer.isUp = true;
		e.preventDefault();
		console.log('keydown ' + keyChar);
	} 
	if(keyChar == 'S') {
		objPlayer.isDown = true;
		e.preventDefault();
		console.log('keydown ' + keyChar);
	}
	if(keyChar == 'A') {
		objPlayer.isLeft = true;
		e.preventDefault();
		console.log('keydown ' + keyChar);
	}
	if(keyChar == 'D') {
		objPlayer.isRigth = true;
		e.preventDefault();
		console.log('keydown ' + keyChar);
	}
};

function checkKeyUp(e) {
	var key = e.keyCode || e.which;
	var keyChar = String.fromCharCode(key);

	if(keyChar == 'W') {
		objPlayer.isUp = false;
		e.preventDefault();
		console.log('keyup ' + keyChar);
	}
	if(keyChar == 'S') {
		objPlayer.isDown = false;
		e.preventDefault();
		console.log('keyup ' + keyChar);
	}
	if(keyChar == 'A') {
		objPlayer.isLeft = false;
		e.preventDefault();
		console.log('keyup ' + keyChar);
	}
	if(keyChar == 'D') {
		objPlayer.isRigth = false;
		e.preventDefault();
		console.log('keyup ' + keyChar);
	} 
};

// // рисует прямоугольник
// function drawRect() {
// 	ctxMap.fillStyle = '#3D3D3D';
// 	ctxMap.fillRect(10, 10, 100, 100);
// 	console.log('click');
// };

// очищает холст
function updateText() {
	ctxText.clearRect(0, 0, gameWidth, gameHeigth);
	ctxText.fillText('Здоровье: ' + health , 20, 20);
}

function moveBg() {
	var speed = 2;
	mapX -= speed;
	map1X -= speed;
	if (mapX + gameWidth < 0) mapX = gameWidth - 5;
	if (map1X + gameWidth < 0) map1X = gameWidth - 5;
}

function pull() {
	ctxPl.fillStyle = '#3D3D3D';
	ctxPl.fillRect(this.drawX, this.drawY, 10, 10);
}