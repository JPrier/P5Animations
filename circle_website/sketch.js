var innerBalls = [];
var outerBalls = [];
var randomLines = [];
var innerCircleAmt = 20;
var outerCircleAmt = 40;
var randomLinesAmt = 10;
var innerRadius = 200;
var outerRadius = 300;
var lineLength = 5;

var ballSize = 10;
var canSize = 1000;
var cnv;

var indexTotal = 1000;
var speed = .25;
var lineDistance = 250;
var linespeed = [1, 40];
var spread = 25;

var width;
var height = 1000;

function setup() {	

	cnv = createCanvas(windowWidth, height);
	cnv.parent('sketch-holder');

	width = getWidth();

	for (var i = 0; i < innerCircleAmt; i++) {
		innerBalls[i] = new Ball();
		innerBalls[i].create(innerRadius, i, true);
	}

	for (var i = 0; i < outerCircleAmt; i++) {
		outerBalls[i] = new Ball();
		outerBalls[i].create(outerRadius, i, false);
	}
	/*
	for (var i = 0; i < randomLinesAmt; i++) {
		randomLines[i] = new LineBall();
		randomLines[i].create();
	}*/
	

}

function draw() {

	background(0);

	width = getWidth();
  
  	for (var i = 0; i < innerCircleAmt; i++) {
		innerBalls[i].update();
	}

	for (var i = 0; i < outerCircleAmt; i++) {
		outerBalls[i].update();
	}
	/*
	for (var i = 0; i < randomLinesAmt; i++) {
		randomLines[i].update();
	}*/
}

function Ball() {

	this.i;
	this.r;
	this.x;
	this.y;
	this.location;
	this.lines = [];
	this.inner;
	this.center;
	this.lines;

	this.create = function(r, i, inner) {

		this.inner = inner;
		this.r = r;

		if (inner) {
			this.i = i * (indexTotal/innerCircleAmt);
			this.center = createVector(width/2, height/2);
		} else {
			this.i = i * (indexTotal/outerCircleAmt);
			this.center = createVector(width/2, height/2);
		}

		this.x = this.center.x + this.r * (Math.sin(((2*Math.PI)/indexTotal) * i));
		this.y = this.center.y + this.r * (Math.cos(((2*Math.PI)/indexTotal) * i));
		

		this.location = createVector(this.x, this.y);

		this.lines = 0;
	}

	this.update = function() {

		if (this.inner && this.i < indexTotal) {
			this.i += speed;

		} else if (!this.inner && this.i > -indexTotal) {
			this.i -= speed;

		} else {
			this.i = 0;
		}

		this.center.x = min(width, windowWidth)/2;

		this.x = this.center.x + this.r * (Math.sin(((2*Math.PI)/indexTotal) * this.i));
		this.y = this.center.y + this.r * (Math.cos(((2*Math.PI)/indexTotal) * this.i));

		this.location.x = this.x;
		this.location.y = this.y;

		this.show();
		this.showLines();
	}

	this.show = function() {
		noStroke();
		fill(255);
		ellipse(this.x, this.y, ballSize, ballSize);
	}

	this.showLines = function() {
		if (this.inner) {

			for (var i = 0; i < outerBalls.length; i++) {

				var other = outerBalls[i];
				var distance = this.location.dist(other.location);

				if (distance < lineDistance) {
					this.lines++;
					stroke(255, 2 * (lineDistance-distance));
					noFill();
					line(this.x, this.y, other.x, other.y);
				}
			}
		}
	}
}
/*
function LineBall() {

	this.ox;
	this.x;
	this.y;
	this.location;
	this.lines = [];
	this.balls = [];

	this.create = function() {
		this.ox = Math.random() >= 0.5;

		if (this.ox) {
			this.x = random(0, width);
			
		} else {
			this.x = random(0, width);
		}

		this.y = random(100, height-100);

		this.location = createVector(this.x, this.y);

	}

	this.update = function() {

		if (this.x > width || this.x < 0) {
			if (this.ox) {
				this.x = 0;
			} else {
				this.x = width;
			}
			this.y = random(100, height-100);
			this.location.y = this.y;

		} else {
			if (this.ox) {
				this.x += random(linespeed[0], linespeed[1]) * speed;
			} else {
				this.x -= random(linespeed[0], linespeed[1]) * speed;
			}
		}

		this.location.x = this.x;

		this.show();
		this.showLines();

		for (var i = 0; i < lineLength; i++) {
			this.balls[i] = createVector(this.x + (spread*i), this.y);
		}

	}

	this.show = function() {

		noStroke();
		fill(255);

		for (var i = 0; i < this.balls.length; i++) {
			ellipse(this.balls[i].x, this.balls[i].y, ballSize, ballSize);
		}
	}

	this.showLines = function() {
		for (var j = 0; j < this.balls.length; j++) {
			for (var i = 0; i < outerBalls.length; i++) {

					var other = outerBalls[i];
					var distance = this.balls[j].dist(other.location);

					if (distance < lineDistance) {
						stroke(255, 2 * (lineDistance-distance));
						noFill();
						line(this.balls[j].x, this.y, other.x, other.y);
					}
				}
			for (var i = 0; i < innerBalls.length; i++) {

				var other = innerBalls[i];
				var distance = this.balls[j].dist(other.location);

				if (distance < lineDistance) {
					stroke(255, 2 * (lineDistance-distance));
					noFill();
					line(this.balls[j].x, this.y, other.x, other.y);
				}
			}

			for (var i = 0; i < randomLines.length; i++) {

				var other = randomLines[i];
				if (other.location != this.balls[j].location) {
					var distance = this.balls[j].dist(other.location);

					if (distance < lineDistance) {
						stroke(255, 2 * (lineDistance-distance));
						noFill();
						line(this.balls[j].x, this.y, other.x, other.y);
					}
				}
			}
		}
	}
}
*/
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

function windowResized() {
	width = getWidth();
	resizeCanvas(min(width, windowWidth), height);

}
