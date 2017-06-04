"use strict";var run=function(){function t(){this.endX=c.canvas.width,this.endY=c.canvas.height,Math.floor(2*Math.random())?(this.x=this.endX*Math.random(),this.y=this.endY*(.75*Math.floor(2*Math.random())+.25*Math.random())):(this.x=this.endX*(.75*Math.floor(2*Math.random())+.25*Math.random()),this.y=this.endY*Math.random()),l.target(this),this.context=c.canvas.getContext("2d"),this.update=function(){if(this.x+=this.speedX,this.y+=this.speedY,this.x>=l.left&&this.x<=l.right&&this.y>=l.top&&this.y<=l.bottom&&(c.running=!1,c.stop(),document.getElementById("score").innerHTML="Your Score: "+c.score,document.getElementById("game-over").innerHTML="Game Over"),l.shield&&Math.pow(Math.pow(l.x-this.x,2)+Math.pow(l.y-this.y,2),.5)<30&&(this.x=this.endX),this.x<=0||this.x>=this.endX||this.y<=0||this.y>=this.endY){switch(Math.floor(4*Math.random().toFixed(3))){case 0:this.x=0,this.y=this.endY*Math.random().toFixed(3);break;case 1:this.x=this.endX,this.y=this.endY*Math.random().toFixed(3);break;case 2:this.x=this.endX*Math.random().toFixed(3),this.y=0;break;case 3:this.x=this.endX*Math.random().toFixed(3),this.y=this.endY}l.target(this)}this.context.beginPath(),this.context.arc(this.x,this.y,1,0,2*Math.PI,!0),this.context.closePath(),this.context.fillStyle="#fff",this.context.fill()}}function e(){switch(this.radius=15,this.endX=c.canvas.width,this.endY=c.canvas.height,this.context=c.canvas.getContext("2d"),this.speed=20,Math.floor(4*Math.random().toFixed(3))){case 0:this.x=0,this.y=this.endY*Math.random().toFixed(3);break;case 1:this.x=this.endX,this.y=this.endY*Math.random().toFixed(3);break;case 2:this.x=this.endX*Math.random().toFixed(3),this.y=0;break;case 3:this.x=this.endX*Math.random().toFixed(3),this.y=this.endY}this.targetX=l.x-this.x,this.targetY=l.y-this.y,this.distance=Math.pow(Math.pow(this.targetX,2)+Math.pow(this.targetY,2),.5),this.speedX=this.targetX*this.speed/this.distance,this.speedY=this.targetY*this.speed/this.distance,l.target(this),this.update=function(){this.x+=this.speedX,this.y+=this.speedY,this.x<=0||this.x>=this.endX?this.speedX*=-1:(this.y<=0||this.y>=this.endY)&&(this.speedY*=-1),Math.pow(Math.pow(l.x-this.x,2)+Math.pow(l.y-this.y,2),.5)<=this.radius+5&&(l.shield_num++,o.shift(),l.shield_num<3&&setTimeout(function(){c.bonus=1e3},5e3)),this.context.beginPath(),this.context.arc(this.x,this.y,this.radius,0,2*Math.PI),this.context.closePath(),this.context.fillStyle="rgba(255, 255, 255, .3)",this.context.fill(),this.context.beginPath(),this.context.arc(this.x-6,this.y-3,12,0,Math.PI/3),this.context.arc(this.x+6,this.y-3,12,2*Math.PI/3,Math.PI),this.context.arc(this.x,this.y+5,12,2*-Math.PI/3,-Math.PI/3),this.context.closePath(),this.context.fillStyle="rgba(255, 223, 191, .5)",this.context.fill()}}function i(){c.clear(),l.update(),Math.random()*c.bonus>999&&(c.bonus=0,o.push(new e));for(t=0;t<h.length;t++)h[t].update();for(var t=0;t<o.length;t++)o[t].update()}function s(){c.canvas.style.cursor="none",document.getElementById("controller").style.display="none",c.start();for(var e=0;e<c.bullet_number;e++)h[e]=new t}var h=[],o=[],n=window.innerWidth,a=window.innerHeight,c={canvas:document.getElementById("dodge"),start:function(){h=[],o=[],this.base_speed=Math.pow(n*a/5e5,.5),this.bullet_number=Math.floor(Math.pow(n*a/3,.5)),this.canvas.width=n,this.canvas.height=a,this.score=0,this.difficulty=50,this.bonus=1e3,this.canvas.style.width=this.canvas.width,this.canvas.style.height=this.canvas.height,this.context=this.canvas.getContext("2d"),this.interval=setInterval(i,20),this.canvas.style.cursor="none",this.running=!0},clear:function(){this.score+=1,this.context.fillStyle="#123",this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.context.font="22px Arial",this.context.fillStyle="#fff",this.context.fillText(this.score,20,40)},stop:function(){l.shield||(clearInterval(this.interval),c.score>(localStorage.getItem("score")||0)&&localStorage.setItem("score",c.score),l.shield_num=1,c.canvas.style.cursor="default",document.getElementById("game-over").style.display="block",document.getElementById("controller").style.display="block")}},l={context:c.canvas.getContext("2d"),x:n/2,y:a/2,left:n/2-5,right:n/2+5,top:a/2,bottom:a/2+5,shield:!1,radius_speed:Math.PI/36,radiu_start:0,shield_color:"#fff",shield_num:1,target:function(t){t.targetX=this.x+Math.random()*c.difficulty-c.difficulty/2-t.x,t.targetY=this.y+Math.random()*c.difficulty-c.difficulty/2-t.y,t.speed=Math.pow(Math.pow(t.targetX,2)+Math.pow(t.targetY,2),.5)+4*Math.random(),t.speedX=c.base_speed*t.targetX/t.speed,t.speedY=c.base_speed*t.targetY/t.speed},bonus:{shield:function(){l.shield_num--,l.shield=!0,setTimeout(function(){c.bonus=1e3},5e3),setTimeout(function(){l.shield_color="#ccc"},6e3),setTimeout(function(){l.shield_color="#999"},6500),setTimeout(function(){l.shield_color="#666"},7e3),setTimeout(function(){l.shield_color="#999"},7500),setTimeout(function(){l.shield_color="#ccc"},8e3),setTimeout(function(){l.shield_color="#999"},8500),setTimeout(function(){l.shield_color="#666"},9e3),setTimeout(function(){l.shield_color="#333"},9500),setTimeout(function(){l.shield=!1,l.shield_color="#fff"},1e4)}},update:function(){this.left=this.x-4,this.right=this.x+4,this.top=this.y,this.bottom=this.y+6,this.radiu_start+=this.radius_speed,this.shield&&(this.context.beginPath(),this.context.arc(this.x,this.y,30,this.radiu_start,this.radiu_start+Math.PI/6),this.context.closePath(),this.context.fillStyle=this.shield_color,this.context.fill(),this.context.beginPath(),this.context.arc(this.x,this.y,30,this.radiu_start+Math.PI/3,this.radiu_start+Math.PI/2),this.context.closePath(),this.context.fillStyle=this.shield_color,this.context.fill(),this.context.beginPath(),this.context.arc(this.x,this.y,30,this.radiu_start+2*Math.PI/3,this.radiu_start+5*Math.PI/6),this.context.closePath(),this.context.fillStyle=this.shield_color,this.context.fill(),this.context.beginPath(),this.context.arc(this.x,this.y,30,this.radiu_start+Math.PI,this.radiu_start+7*Math.PI/6),this.context.closePath(),this.context.fillStyle=this.shield_color,this.context.fill(),this.context.beginPath(),this.context.arc(this.x,this.y,30,this.radiu_start+4*Math.PI/3,this.radiu_start+3*Math.PI/2),this.context.closePath(),this.context.fillStyle=this.shield_color,this.context.fill(),this.context.beginPath(),this.context.arc(this.x,this.y,30,this.radiu_start+5*Math.PI/3,this.radiu_start+11*Math.PI/6),this.context.closePath(),this.context.fillStyle=this.shield_color,this.context.fill()),this.shield_num>0&&(this.context.font="14px Arial",this.context.fillStyle="#fff",this.context.fillText("shield: "+this.shield_num,n-104,a-40)),this.context.beginPath(),this.context.moveTo(this.left+-3,this.top+7),this.context.lineTo(this.left+3,this.top+5),this.context.lineTo(this.left+3,this.top+-3),this.context.moveTo(this.left+5,this.top+-3),this.context.lineTo(this.left+5,this.top+5),this.context.lineTo(this.left+11,this.top+7),this.context.closePath(),this.context.fillStyle="#38c",this.context.fill()}};!function(){document.onmousemove=function(t){t=t||window.event,l.x=t.clientX+document.body.scrollLeft-document.body.clientLeft,l.y=t.clientY+document.body.scrollTop-document.body.clientTop},window.addEventListener("keydown",function(t){83==t.keyCode&&l.shield_num>0&&l.bonus.shield()}),document.getElementById("score").innerHTML="Best: "+(localStorage.getItem("score")||0),document.getElementById("clear-score").addEventListener("click",function(){localStorage.setItem("score",0),document.getElementById("score").innerHTML="Best: 0"}),document.getElementById("start").addEventListener("click",function(){s()})}()}();