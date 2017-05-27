
var run = function() {
	var bullets = [];
	var boosts = [];
	const full_width = window.innerWidth;
	const full_height = window.innerHeight;

	var gameZone = {
    canvas : document.getElementById("dodge"),
    start : function() {
				bullets = [];
				boosts = [];
        this.base_speed = Math.pow(full_width * full_height / 500000, 1/2);
				this.bullet_number = Math.floor(Math.pow(full_width * full_height / 3, 1/2));
        this.canvas.width = full_width;
        this.canvas.height = full_height;
				this.score = 0;
				this.difficulty = 50;
				this.bonus = 1000;
        this.canvas.style.width = this.canvas.width;
        this.canvas.style.height = this.canvas.height;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameZone, 20);
        this.canvas.style.cursor = 'none';
				this.running = true;
    },
		clear : function() {
			this.score += 1;
			this.context.fillStyle = '#123';
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.context.font = '22px Arial';
			this.context.fillStyle = '#fff';
			this.context.fillText(this.score, 20, 40);
			if(ship.shield_num > 0) {
				this.context.font = '14px Arial';
				this.context.fillStyle = '#fff';
				this.context.fillText('hield: '+ship.shield_num, this.canvas.width - 104, this.canvas.height - 40);

				this.context.fillStyle = '#4D5A67';
				this.context.fillRect(this.canvas.width - 145, this.canvas.height - 75, 40, 40);
				this.context.fillStyle = 'rgba(255, 255, 255, .5)';
				this.context.fillRect(this.canvas.width - 140, this.canvas.height - 70, 30, 30);

				this.context.font = '30px Arial';
				this.context.fillStyle = '#123';
				this.context.fillText('S', this.canvas.width - 135, this.canvas.height - 44);
			}
		},
		stop: function() {
			if(!ship.shield) {
				clearInterval(this.interval);
				if(gameZone.score >　(localStorage.getItem('score') || 0)) {
					localStorage.setItem('score',gameZone.score);
				}
				ship.shield_num = 0;
	      gameZone.canvas.style.cursor = 'default';
				document.getElementById('game-over').style.display = 'block';
				document.getElementById('controller').style.display = 'block';
			}
		}
	}

	var ship = {
    context: gameZone.canvas.getContext("2d"),
    x: full_width / 2,
    y: full_height / 2,
    left: full_width / 2 - 5,
    right: full_width / 2 + 5,
    top: full_height / 2,
    bottom: full_height / 2 + 5,
		shield: false,
		radius_speed : Math.PI / 36,
		radiu_start : 0,
		shield_color: '#fff',
		shield_num : 0,
		target: function(bullet) {
      bullet.targetX = this.x + Math.random() * gameZone.difficulty - gameZone.difficulty / 2 - bullet.x;
      bullet.targetY = this.y + Math.random() * gameZone.difficulty - gameZone.difficulty / 2 - bullet.y;
			bullet.speed = Math.pow(Math.pow(bullet.targetX, 2) + Math.pow(bullet.targetY, 2), 1 / 2) + Math.random() * 4;
      bullet.speedX = gameZone.base_speed * bullet.targetX / bullet.speed;
      bullet.speedY = gameZone.base_speed * bullet.targetY / bullet.speed;
		},
		bonus: {
			shield: function() {
				ship.shield_num--;
				ship.shield = true;
				setTimeout(function() {gameZone.bonus = 1000}, 5000);
				setTimeout(function() {ship.shield_color = '#ccc'}, 6000);
				setTimeout(function() {ship.shield_color = '#999'}, 6500);
				setTimeout(function() {ship.shield_color = '#666'}, 7000);
				setTimeout(function() {ship.shield_color = '#999'}, 7500);
				setTimeout(function() {ship.shield_color = '#ccc'}, 8000);
				setTimeout(function() {ship.shield_color = '#999'}, 8500);
				setTimeout(function() {ship.shield_color = '#666'}, 9000);
				setTimeout(function() {ship.shield_color = '#333'}, 9500);
				setTimeout(function() {
					ship.shield = false;
					ship.shield_color = '#fff';
				}, 10000);
			}
		},
    update: function() {
      this.left = this.x - 4;
      this.right = this.x + 4;
      this.top = this.y;
      this.bottom = this.y + 6;
			this.radiu_start += this.radius_speed;
			if(this.shield) {
				this.context.beginPath();
				this.context.arc(this.x, this.y, 30,this.radiu_start, this.radiu_start + Math.PI / 6);
				this.context.closePath();
				this.context.fillStyle = this.shield_color;
				this.context.fill();
				this.context.beginPath();
				this.context.arc(this.x, this.y, 30,this.radiu_start + Math.PI / 3, this.radiu_start + Math.PI / 2);
				this.context.closePath();
				this.context.fillStyle = this.shield_color;
				this.context.fill();
				this.context.beginPath();
				this.context.arc(this.x, this.y, 30,this.radiu_start + Math.PI * 2 / 3, this.radiu_start + Math.PI * 5 / 6);
				this.context.closePath();
				this.context.fillStyle = this.shield_color;
				this.context.fill();
				this.context.beginPath();
				this.context.arc(this.x, this.y, 30,this.radiu_start + Math.PI, this.radiu_start + Math.PI * 7 / 6);
				this.context.closePath();
				this.context.fillStyle = this.shield_color;
				this.context.fill();
				this.context.beginPath();
				this.context.arc(this.x, this.y, 30,this.radiu_start + Math.PI * 4 / 3, this.radiu_start + Math.PI * 3 / 2);
				this.context.closePath();
				this.context.fillStyle = this.shield_color;
				this.context.fill();
				this.context.beginPath();
				this.context.arc(this.x, this.y, 30,this.radiu_start + Math.PI * 5 / 3, this.radiu_start + Math.PI * 11 / 6);
				this.context.closePath();
				this.context.fillStyle = this.shield_color;
				this.context.fill();
			}
			this.context.beginPath();
			this.context.moveTo(this.left + -3, this.top + 7);
			this.context.lineTo(this.left + 3, this.top + 5);
			this.context.lineTo(this.left + 3, this.top + -3);
			this.context.moveTo(this.left + 5, this.top + -3);
			this.context.lineTo(this.left + 5, this.top + 5);
			this.context.lineTo(this.left + 11, this.top + 7);
			this.context.closePath();
			this.context.fillStyle = '#38c';
			this.context.fill();
    }
  }

	function Bullets() {
		this.endX = gameZone.canvas.width;
		this.endY = gameZone.canvas.height;
		if(!!Math.floor(Math.random() * 2)) {
			this.x = this.endX * Math.random();
			this.y = this.endY * (Math.floor(Math.random() * 2) * .75 + Math.random() * .25);
		} else {
			this.x = this.endX * (Math.floor(Math.random() * 2) * .75 + Math.random() * .25);
			this.y = this.endY * Math.random();
		}
    ship.target(this);

		this.context = gameZone.canvas.getContext("2d");
		this.update = function() {
			this.x += this.speedX;
			this.y += this.speedY;
      if(
        this.x >= ship.left &&
        this.x <= ship.right &&
        this.y >= ship.top &&
        this.y <= ship.bottom
      ) {
				gameZone.running = false;
	      gameZone.stop();
				document.getElementById('score').innerHTML = "Your Score: " + gameZone.score;
				document.getElementById('game-over').innerHTML = 'Game Over';
      };
			if(ship.shield && Math.pow(Math.pow(ship.x - this.x, 2) + Math.pow(ship.y - this.y, 2), 1 / 2) < 30) {
				this.x = this.endX;
			}
			if(this.x <= 0 || this.x >= this.endX || this.y <= 0 || this.y >= this.endY) {
        switch(Math.floor(4 * Math.random().toFixed(3))) {
          case 0:
            this.x = 0;
            this.y = this.endY * Math.random().toFixed(3);
            break;
          case 1:
            this.x = this.endX;
            this.y = this.endY * Math.random().toFixed(3);
            break;
          case 2:
            this.x = this.endX * Math.random().toFixed(3);
            this.y = 0;
            break;
          case 3:
            this.x = this.endX * Math.random().toFixed(3);
            this.y = this.endY;
            break;
        }
		    ship.target(this);
      }
			this.context.beginPath();
			this.context.arc(this.x, this.y, 1, 0, Math.PI * 2, true);
			this.context.closePath();
			this.context.fillStyle = '#fff';
			this.context.fill();
		}
	}

	function Boosts() {
		this.radius = 15;
		this.endX = gameZone.canvas.width;
		this.endY = gameZone.canvas.height;
		this.context = gameZone.canvas.getContext("2d");
		this.speed = .5;
		switch(Math.floor(4 * Math.random().toFixed(3))) {
			case 0:
				this.x = 0;
				this.y = this.endY * Math.random().toFixed(3);
				break;
			case 1:
				this.x = this.endX;
				this.y = this.endY * Math.random().toFixed(3);
				break;
			case 2:
				this.x = this.endX * Math.random().toFixed(3);
				this.y = 0;
				break;
			case 3:
				this.x = this.endX * Math.random().toFixed(3);
				this.y = this.endY;
				break;
		}
    this.targetX = ship.x - this.x;
    this.targetY = ship.y - this.y;
    this.speedX = gameZone.base_speed * this.targetX / this.speed;
    this.speedY = gameZone.base_speed * this.targetY / this.speed;
		ship.target(this);
		this.update = function() {
			this.x += this.speedX;
			this.y += this.speedY;

			if(this.x <= 0 || this.x >= this.endX){
				this.speedX *= -1;
			} else if (this.y <= 0 || this.y >= this.endY) {
				this.speedY *= -1;
			}
			if(Math.pow(Math.pow(ship.x - this.x, 2) + Math.pow(ship.y - this.y, 2), 1 / 2) <= (this.radius + 5)) {
				ship.shield_num++;
				boosts.shift();
				if(ship.shield_num < 3) {
					setTimeout(function() {gameZone.bonus = 1000}, 5000);
				}
			}
			this.context.beginPath();
			this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			this.context.closePath();
			this.context.fillStyle = 'rgba(255, 255, 255, .3)';
			this.context.fill();
			this.context.beginPath();
			this.context.arc(this.x - 6, this.y - 3, 12, 0, Math.PI / 3);
			this.context.arc(this.x + 6, this.y - 3, 12, Math.PI * 2 / 3, Math.PI);
			this.context.arc(this.x, this.y + 5, 12, - Math.PI * 2 / 3, - Math.PI / 3,);
			this.context.closePath();
			this.context.fillStyle = 'rgba(255, 223, 191, .5)';
			this.context.fill();
		}
	}


	function updateGameZone() {
		gameZone.clear();
		ship.update();
		var ran = Math.random();
		if(ran * gameZone.bonus > 999) {
			gameZone.bonus = 0;
			boosts.push(new Boosts());
		}

		for(var i=0; i<bullets.length; i++) {
			bullets[i].update();
		}
		for(var i=0; i<boosts.length; i++) {
			boosts[i].update();
		}
	}

	function get_bullets() {
			gameZone.canvas.style.cursor = 'none';
			document.getElementById('controller').style.display = 'none';
	    gameZone.start();

			for(var i=0; i<gameZone.bullet_number; i++) {
				bullets[i] = new Bullets();
			}

	}

	var init = function() {
		document.onmousemove = function(evnt) {
			evnt = evnt || window.event;
	    ship.x = evnt.clientX + document.body.scrollLeft - document.body.clientLeft;
			ship.y = evnt.clientY + document.body.scrollTop - document.body.clientTop;
		};

		window.addEventListener('keydown', function(evnt) {
			if(evnt.keyCode == 83 && ship.shield_num > 0) {
				ship.bonus.shield();
			}
		});

		document.getElementById('score').innerHTML = "Best: " + (localStorage.getItem('score') || 0);

		document.getElementById('clear-score').addEventListener('click', function() {
			localStorage.setItem('score', 0);
			document.getElementById('score').innerHTML = "Best: 0";
		});

		document.getElementById('start').addEventListener('click', function() {
			get_bullets();
		});
	}();

}();
