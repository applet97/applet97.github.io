window.onload = function() {

	let playerXSign = 'X';
	let playerOSign = 'O';
	let currentPlayer = playerXSign;
	let board = document.querySelector('#board');
	let leftSide = document.querySelector('.leftSide');
	let rightSide = document.querySelector('.rightSide');
	let currentSide = leftSide;
	

	let combs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
	let resetButton = document.createElement('button');
	resetButton.className = 'resetButton';
	resetButton.innerHTML = 'RESET';

	document.querySelector('body').appendChild(resetButton);

	for(let i = 0; i < 9; i++) {
		let square = document.createElement('div');
		square.className = 'square';
		board.appendChild(square);
	}

	let squares = document.querySelectorAll('.square');

	board.addEventListener('click', function(e) {

		if(String(e.target.innerHTML).length > 0) return;

		e.target.innerHTML = currentPlayer;
		

		if(currentPlayer === 'X') {
			e.target.classList.add('squareX');
		} else {
			e.target.classList.add('squareO');
		}

		let el = document.createElement('div');
		el.className = "log";
		el.innerHTML = currentPlayer + ' clicked';
		currentSide.appendChild(el);
		
		let res = checkForWinner();
		console.log(res);

		if(res) {
			
			let el = document.querySelector('.modal');
			let el1 = document.querySelector('.msg');

			el.classList.add('open');
			let nel = document.createElement('h4');
			
			
			let line;

			if(res === 'draw') {
				nel.innerHTML = 'Draw!';
			} else {
				nel.innerHTML = 'Winner is ' + currentPlayer + '!';
				line = document.querySelector('.line' + res);
				line.classList.add('trace');
			}

			el1.appendChild(nel);
			
			
			setTimeout(function() {
				// console.log(line);
				el.classList.remove('open');
				nel.innerHTML = '';

				if(res === 'draw') {
					reset();
				} else {
					reset(currentPlayer);
				}

			}, 3000);

		} else {
			currentPlayer = currentPlayer === playerXSign ? playerOSign : playerXSign;
			currentSide = currentSide === leftSide ? rightSide : leftSide;	
		}
	});


	resetButton.addEventListener('click', function(e) {
	 	reset();
	});

 	let reset = (cur) => {
 		let span1 = document.querySelector('.scoreX');
 		let span2 = document.querySelector('.scoreO');
 		let sc1 = Number(span1.innerHTML);
 		let sc2 = Number(span2.innerHTML);
 		console.log(sc1, sc2);

 		currentPlayer = playerXSign;
 		currentSide = leftSide;
 		leftSide.innerHTML = '';
 		rightSide.innerHTML = '';

 		
 		let score1 = document.createElement('div');
 		let score2 = document.createElement('div');
 		score1.className = 'score';
 		score2.className = 'score';

 		
 		let txt1 = document.createElement('h4');
 		let txt2 = document.createElement('h4');
 		
 		txt1.innerHTML = 'Score: ';
 		txt2.innerHTML = 'Score: ';

 		let sp1 = document.createElement('span');
 		let sp2 = document.createElement('span');
 		sp1.className = 'scoreX';
 		sp2.className = 'scoreO';
 		
 		if(cur =='X') {
 			sc1++;
 		} else if(cur == 'O') {
 			sc2++;
 		}

 		
 		sp1.innerHTML = sc1;
 		sp2.innerHTML = sc2;

 		txt1.appendChild(sp1);
 		score1.appendChild(txt1);
 		
 		txt2.appendChild(sp2);
 		score2.appendChild(txt2);
		

 		leftSide.appendChild(score1);
 		rightSide.appendChild(score2);

 		for(let i = 0; i < squares.length; i++) {
 			squares[i].innerHTML = '';
 			squares[i].classList.remove('squareO');
 			squares[i].classList.remove('squareX');
 		}

 		for(let i = 1; i <= 8; i++) {

 			let line = document.querySelector('.line' + i);
 			line.classList.remove('trace');
 		}
 	}


 	let checkForWinner = () => {
 		let res = 'draw';

 		for(let i = 0; i < combs.length; i++) {
 			let comb = combs[i];
 			if(((squares[comb[0]].innerHTML === 'O') || (squares[comb[0]].innerHTML === 'X'))
 				&& squares[comb[0]].innerHTML === squares[comb[1]].innerHTML 
 				&& squares[comb[1]].innerHTML === squares[comb[2]].innerHTML) {
 				res = i + 1;
 				break;
 			}
 		}
 		

 		
 		if(res !== 'draw') return res;

 		for(let i = 0; i < 9; i++) {
 			if(((squares[i].innerHTML !== 'O') && (squares[i].innerHTML !== 'X'))) {
 				return false;
 			}
 		}

 		return res;
 	}
}