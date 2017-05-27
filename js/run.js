
var run = function() {
	var bullets = [];
	const full_width = window.innerWidth;
	const full_height = window.innerHeight;

	var gameZone = {
	    canvas : document.getElementById("dodge"),
	    start : function() {
          this.base_speed = Math.pow(full_width * full_height / 500000, 1/2);
					this.bullet_number = Math.floor(full_width * full_height / 1000);
					console.log(this.bullet_number);
          this.canvas.width = full_width;
          this.canvas.height = full_height;
					this.score = 0;
					this.difficulty = 50;
          this.canvas.style.width = this.canvas.width;
          this.canvas.style.height = this.canvas.height;
	        this.context = this.canvas.getContext("2d");
	        this.interval = setInterval(updateGameZone, 20);
          this.canvas.style.cursor = 'none';
					this.running = true;
	    },
			continue: function() {
				gameZone.canvas.style.cursor = 'none';
				document.getElementById('game-over').innerHTML = "游戏结束";
				document.getElementById('controller').style.display = 'none';
				this.interval = setInterval(updateGameZone, 20);
			},
			clear : function() {
				this.score += 1;
				this.context.fillStyle = '#123';
				this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
				this.context.font = '22px Arial';
				this.context.fillStyle = '#fff';
				this.context.fillText(this.score, 20, 40);
			},
			stop: function() {
				clearInterval(this.interval);
				if(gameZone.score >　(localStorage.getItem('score') || 0)) {
					localStorage.setItem('score',gameZone.score);
				}
	      gameZone.canvas.style.cursor = 'default';
				document.getElementById('game-over').style.display = 'block';
				document.getElementById('controller').style.display = 'block';
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
		target: function(bullet) {
      bullet.targetX = this.x + Math.random() * gameZone.difficulty - gameZone.difficulty / 2 - bullet.x;
      bullet.targetY = this.y + Math.random() * gameZone.difficulty - gameZone.difficulty / 2 - bullet.y;
			bullet.speed = Math.pow(Math.pow(bullet.targetX, 2) + Math.pow(bullet.targetY, 2), 1 / 2) + Math.random() * 4;
      bullet.speedX = gameZone.base_speed * bullet.targetX / bullet.speed;
      bullet.speedY = gameZone.base_speed * bullet.targetY / bullet.speed;
		},
    update: function() {
      this.left = this.x - 4;
      this.right = this.x + 4;
      this.top = this.y;
      this.bottom = this.y + 6;
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
				document.getElementById('score').innerHTML = "总分：" + gameZone.score;
				document.getElementById('game-over').innerHTML = '游戏结束';
      };
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


	function updateGameZone() {
		gameZone.clear();
    ship.update();

		for(var i=0; i<bullets.length; i++) {
			bullets[i].update();
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

	document.onmousemove = function(evnt) {
		evnt = evnt || window.event;
    ship.x = evnt.clientX + document.body.scrollLeft - document.body.clientLeft;
		ship.y = evnt.clientY + document.body.scrollTop - document.body.clientTop;
		if(ship.pause && ship.x >= 0 && ship.x <= full_width && ship.y >= 0 && ship.y <= full_height) {
			ship.pause = false;
			gameZone.continue();
		}
		if(gameZone.running && (ship.x < 0 || ship.x > full_width || ship.y < 0 || ship.y > full_height)) {
			ship.pause = true;
			document.getElementById('game-over').innerHTML = "游戏暂停";
			document.getElementById('score').innerHTML = "当前得分：" + gameZone.score;
			gameZone.stop();
		}
	}

	var init = function() {
		document.getElementById('score').innerHTML = "最高分：" + (localStorage.getItem('score') || 0);
		document.getElementById('clear-score').addEventListener('click', function() {
			localStorage.setItem('score', 0);
			document.getElementById('score').innerHTML = "最高分：0";
		});
		document.getElementById('start').addEventListener('click', function() {
			get_bullets();
		});
	}();

}();
