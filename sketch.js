var holesSound;
var lake, babyBox;
var thinFlowers, ringFlowers;
var holes;
var grandpaBill, golfball;
// var golf, divorced, bktwosev, bkTheMan, p5RHungry, winter, flower, clap;

function preload() {
	/* drop ball in cup https://freesound.org/people/AGFX/sounds/20428/ by Tony Gort http://www.tonygort.com/
	This work is licensed under the Attribution License 3.0 https://creativecommons.org/licenses/by/3.0/ 
	*/
	holesSound = loadSound("assets/20428__agfx__drop-ball-in-cup-1.wav");

	lake = loadAnimation('assets/lake_0000.png', 'assets/lake_0001.png');
	babyBox = loadAnimation('assets/babyBox_0000.png', 'assets/babyBox_0001.png');
	grandpaBill = loadAnimation('assets/grandpaBill_0000.png', 'assets/grandpaBill_0001.png');
	golfball = loadImage('assets/golfball.png');
	// 	divorced = loadAnimation('assets/divorced_0000.png', 'assets/divorced_0001.png');
	// 	bktwosev = loadAnimation('assets/bktwosev_0000.png', 'assets/bktwosev_0001.png');
	// 	bkTheMan = loadAnimation('assets/bkTheMan_0000.png', 'assets/bkTheMan_0001.png');
	// 	clap = loadAnimation('assets/clap_0000.png', 'assets/clap_0001.png');
	// 	winter = loadAnimation('assets/winter_0000.png', 'assets/winter_0001.png');
	// 	flower = loadAnimation('assets/flower_0000.png', 'assets/flower_0001.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	//create empty groups
	thinFlowers = new Group();
	for (var i = 0; i < 3; i++) {
		var box = createSprite(random(0, width), random(0, height));
		box.addAnimation('assets/thinFlowers_0000.png', 'assets/thinFlowers_0000.png');
		thinFlowers.add(box);
	}

	//create empty groups
	ringFlowers = new Group();
	for (var j = 0; j < 2; j++) {
		var ringFlower = createSprite(random(0, width), random(0, height));
		ringFlower.addAnimation('assets/ringFlowers_0000.png', 'assets/ringFlowers_0000.png');
		//setting immovable to true makes the sprite immune to bouncing and displacements
		//as if with infinite mass
		ringFlower.immovable = true;
		//rotation rotates the collider too but it will always be an axis oriented
		//bounding box, that is an ortogonal rectangle

		ringFlowers.add(ringFlower);
	}

	//create empty groups
	holes = new Group();
	//assign new sprites to the respective groups
	for (var k = 0; k < 10; k++) {
		var newHole = createSprite(random(0, width), random(0, height));
		newHole.addAnimation('assets/holes.png', 'assets/holes.png');
		holes.add(newHole);
	}
}

function draw() {
	background(50, 100, 0);

	//check and resolve the interactions between sprites

	//sprite.overlap() returns true if overlapping occours
	//note: by default the check is performed on the images bounding box
	//press mouse button to visualize them
	// if (golfball.overlap(holes))
	// 	golfball.remove();

	animation(lake, windowWidth / 1.11, windowHeight / 6.05);
	animation(babyBox, windowWidth / 1.15, windowHeight / 2);
	drawSprites(holes);
	// SOSF medium https://medium.com/@maggieumber/how-a-10th-grade-biology-paper-inspired-a-graphic-novel-7c0aa65fccca
	// animation(divorced, 250, 700); // Getting Dvcd in Comics medium https://medium.com/@maggieumber/getting-divorced-in-comics-81f3aa6ed2ff
	// animation(bktwosev, 1500, 900); // 270 utube https://youtu.be/i8N-R4yjRl0 linocut utube https://youtu.be/BHiTdMF0aDQ
	// animation(bkTheMan, windowWidth - 250, windowHeight + 0); // medium article
	// animation(clap, windowWidth / 6, windowHeight / 1.15);
	// animation(winter, windowWidth / 13, windowHeight / 6);
	// animation(flower, 800, 100);

	//all sprites bounce at the screen edges
	for (var i = 0; i < allSprites.length; i++) {
		var s = allSprites[i];
		if (s.position.x < 0) {
			s.position.x = 1;
			s.velocity.x = abs(s.velocity.x);
		}

		if (s.position.x > width) {
			s.position.x = width - 1;
			s.velocity.x = -abs(s.velocity.x);
		}

		if (s.position.y < 0) {
			s.position.y = 1;
			s.velocity.y = abs(s.velocity.y);
		}

		if (s.position.y > height) {
			s.position.y = height - 1;
			s.velocity.y = -abs(s.velocity.y);
		}
		//golfball collides against all the sprites in the group thinFlowers
		// s.collide(thinFlowers);

		//sprite.overlap() returns true if overlapping occours
		//note: by default the check is performed on the images bounding box
		//press mouse button to visualize them
		if (s.overlap(holes))
			s.remove();
	}

	drawSprites();

	//playing an pausing an animation
	if (mouseIsPressed)
		grandpaBill.play();
	else
		grandpaBill.stop();

	if (mouseIsPressed)
		holesSound.play();

	animation(grandpaBill, mouseX, mouseY);
}

function mousePressed() {

	//create a sprite at the mouse position and store it in a temporary variable
	var s = createSprite(mouseX, mouseY + 200, 20, 20);
	s.addImage(golfball, 'assets/golfball.png');
	//if no image or animation is associated it will be a rectancle of the specified size
	//and a random color

	//now you can use the variable to set properties
	//e.g. a random velocity on the x and y coordinates
	s.velocity.x = random(-5, 5);
	s.velocity.y = random(-5, 5);

	// if (s.overlap(babyBox))
	// 	babyBox.play();
	// else
	// 	babyBox.stop();
}