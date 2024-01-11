
// создание поля

let field = document.createElement('div')
document.body.appendChild(field)
field.classList.add('field')

// создание ячеек внутри поля
for (var i = 1; i < 101; i++) {
	let excel = document.createElement('div')
	field.appendChild(excel)
	excel.classList.add('excel')
}

// присваивание координат ячейкам поля
let excel = document.getElementsByClassName('excel')


let x = 1;
let y = 10;

for (var i = 0; i < excel.length; i++) {
	if (x > 10) {
		x = 1;
		y--
	}
	excel[i].setAttribute('posX', x)
	excel[i].setAttribute('posY', y)
	x++;
}

// создание змеи

function generateSnake() {
	let posX = Math.round(Math.random() * (10-3) + 3);
	let posY = Math.round(Math.random() * (10-1) + 1);
	return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX ="' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX ="' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX ="' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]') ];

for (let i = 0; i < snakeBody.length; i++) {
	snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

//создание еды

let mouse;
function createMouse() {
	function generateMouse() {
		let posX = Math.round(Math.random() * (10-1) + 1);
		let posY = Math.round(Math.random() * (10-1) + 1);
		return [posX, posY];
	}

	let mouseCoordinates = generateMouse()
	mouse = document.querySelector('[posX ="' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

	while(mouse.classList.contains('snakeBody')) {
		let mouseCoordinates = generateMouse()
		mouse = document.querySelector('[posX ="' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
	}
	mouse.classList.add('mouse');
}
createMouse();



//Движение змеи

let direction = 'right';
let steps = false;

let div = document.createElement('div');
document.body.appendChild(div);
div.classList.add('score')


let score = 0;
div.innerHTML = `Счёт: ${score}`;







function move() {
	let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
	snakeBody[0].classList.remove('head');
	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
	snakeBody.pop();

	if (direction == 'right') {
		if (snakeCoordinates[0] < 10) {
			snakeBody.unshift(document.querySelector('[posX ="' + (+snakeCoordinates[0] +1) + '"][posY = "' + snakeCoordinates[1] + '"]'))
		} else {
			snakeBody.unshift(document.querySelector('[posX ="1"][posY = "' + snakeCoordinates[1] + '"]'))
		}
	} else if (direction == 'left') {
		if (snakeCoordinates[0] > 1) {
			snakeBody.unshift(document.querySelector('[posX ="' + (+snakeCoordinates[0] -1) + '"][posY = "' + snakeCoordinates[1] + '"]'))
		} else {
			snakeBody.unshift(document.querySelector('[posX ="10"][posY = "' + snakeCoordinates[1] + '"]'))
		}
	} else if (direction == 'up') {
		if (snakeCoordinates[1] < 10) {
			snakeBody.unshift(document.querySelector('[posX ="' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'))
		} else {
			snakeBody.unshift(document.querySelector('[posX ="' + snakeCoordinates[0] + '"][posY = "1"]'))
		}
	} else if (direction == 'down') {
		if (snakeCoordinates[1] > 1) {
			snakeBody.unshift(document.querySelector('[posX ="' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1]-1) + '"]'))
		} else {
			snakeBody.unshift(document.querySelector('[posX ="' + snakeCoordinates[0] + '"][posY = "10"]'))
		}
	}
	// съедание еды

	if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
		mouse.classList.remove('mouse');
		let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
		let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
		snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
		createMouse();
		score++;
		div.innerHTML = `Счёт: ${score}`;
	}
// КОНЕЦ ИГРЫ
	if (snakeBody[0].classList.contains('snakeBody')) {
		let highScorePlayer = {
			name: gamerName,
			recording: score,
		}

		ranking_acc.push(highScorePlayer);
		localStorage.setItem('record', JSON.stringify(ranking_acc));


		setTimeout(() => {
			alert(`Игра окончена, Ваш результат: ${score}`);
			location.reload();
			
		}, 200);
		
		clearInterval(interval);
		snakeBody[0].style.backgroundColor = 'white';
	}

	snakeBody[0].classList.add('head');
	for (let i = 0; i < snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}
	steps = true;
}

let interval = setInterval(move, 999999);

window.addEventListener('keydown', function (e) {
	if (steps == true) {
		if (e.keyCode == 37 && direction != 'right') {
			direction = 'left';
			steps = false;
		}
		if (e.keyCode == 38 && direction != 'down') {
			direction = 'up';
			steps = false;
		}
		if (e.keyCode == 39 && direction != 'left') {
			direction = 'right';
			steps = false;
		}
		if (e.keyCode == 40 && direction != 'up') {
			direction = 'down';
			steps = false;
		}
	}
});


// Уровни сложности
var gamerName;
var game = false;
let button = document.querySelector('.level_link')
function easy() {
	gamerName = prompt('Введите ваш никнейм', '')
	if (gamerName === '') {
		easy()
	} else if (gamerName) {
	
	clearInterval(interval);
	interval = setInterval(move, 500)
	game = true;
	if (game != false) {
		levels.style.display = "none";
		field.style.display = "flex";
		div.style.display = "block";
	} 
	} else {
		easy()
	}
}
function medium() {
	gamerName = prompt('Введите ваш никнейм', '')
	if (gamerName === '') {
		medium()
	} else if (gamerName) {

	game = true;
	clearInterval(interval);
	interval = setInterval(move, 300)
	if (game != false) {
		levels.style.display = "none";
		field.style.display = "flex";
		div.style.display = "block";
		
	}
	} else {
		medium()
	}

}
function hard() {
	gamerName = prompt('Введите ваш никнейм', '')
	if (gamerName === '') {
		hard()
	} else if (gamerName) {
	game = true;
	clearInterval(interval);
	interval = setInterval(move, 100)
	if (game != false) {
		levels.style.display = "none";
		field.style.display = "flex";
		div.style.display = "block";
	}
	} else {
		hard()
	}

}
function fast() {
	gamerName = prompt('Введите ваш никнейм', '')
	if (gamerName === '') {
		fast()
	} else if (gamerName) {
	game = true;
	clearInterval(interval);
	interval = setInterval(move, 50)
	if (game != false) {
		levels.style.display = "none";
		field.style.display = "flex";
		div.style.display = "block";
	}
	} else {
		fast()
	}

}
// menu
let mainMenu = document.querySelector('.menu_nav');
mainMenu.addEventListener('click', startGame)

let levels = document.querySelector('.level_link');
let records = document.querySelector('.records');

let menu = false;
field.style.display = "none";
div.style.display = "none";
levels.style.display = "none";




function startGame() {
	mainMenu.style.display = "none"
	records.style.display = "none"
	let menu = true;
	if (menu != false) {
		console.log('true');
		levels.style.display = "block";
	} 
	
}

// // таблица лидеров


let ranking_acc = [];
if (localStorage.getItem('record')) {
	ranking_acc = JSON.parse(localStorage.getItem('record'))
}
var rankingTable = ranking_acc.sort((prev, next) => next.recording - prev.recording)
if (rankingTable.length >= 10) {
	rankingTable.splice(10, 1)
	
}


function ranking() {
	mainMenu.style.display = "none";
	records.style.display = "none";

	rankingTable.forEach(ranking_acc => {
		
		let recordTable = document.createElement('div')
		document.body.appendChild(recordTable)
		recordTable.classList.add('recordTable')
		recordTable.innerHTML = `<div class="recName">${ranking_acc.name}</div>` + `<div class="recScore">${ranking_acc.recording}</div>`
	})

	let mainMenuReturn = document.createElement('div')
	document.body.appendChild(mainMenuReturn)
	mainMenuReturn.classList.add('menuReturn')
	mainMenuReturn.innerHTML = '<div onclick="location.reload()">Main menu</div>'

}
