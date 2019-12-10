class Asteroid {
    constructor(imgUrl, xPos, yPos, xVel, yVel) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.loadImage(imgUrl);
    }
    getX() {
        return this.xPos;
    }
    getY() {
        return this.yPos;
    }
    getXVel() {
        return this.xVel;
    }
    setXVel(xVel) {
        this.xVel = xVel;
    }
    getYVel() {
        return this.yVel;
    }
    setYVel(yVel) {
        this.yPos;
    }
    getImg() {
        return this.img;
    }
    move(canvas) {
        if (this.xPos + this.img.width / 2 > canvas.width ||
            this.xPos - this.img.width / 2 < 0) {
            this.xVel = -this.xVel;
        }
        if (this.yPos + this.img.height / 2 > canvas.height ||
            this.yPos - this.img.height / 2 < 0) {
            this.yVel = -this.yVel;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
    loadImage(source) {
        this.img = new Image();
        this.img.src = source;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.switchScreen();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 3;
        this.ctx = this.canvas.getContext("2d");
        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new StartScreen(this.canvas, this.ctx);
        this.loop();
    }
    switchScreen() {
        if (this.currentScreen instanceof StartScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)) {
            this.currentScreen = new LevelScreen(this.canvas, this.ctx, this.keyboardListener);
        }
        if (this.currentScreen instanceof LevelScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
    }
}
let init = () => {
    const Asteroids = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameObject {
    constructor(xPos, yPos, xVel, yVel) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_ESC = 27;
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_S = 83;
class LevelScreen {
    constructor(canvas, ctx, keyboardListener) {
        this.frames = 0;
        this.lastCollision = false;
        this.canvas = canvas;
        this.ctx = ctx;
        this.lives = 3;
        this.score = 400;
        this.keyboardListener = keyboardListener;
        this.life = new Image();
        this.life.src = "./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png";
        const asteroidFilenames = [
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big4.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png",
        ];
        this.asteroids = [];
        for (let i = 0; i < this.randomNumber(5, 7); i++) {
            const randomIndex = this.randomNumber(0, asteroidFilenames.length);
            this.asteroids.push(new Asteroid(asteroidFilenames[randomIndex], this.randomNumber(0, this.canvas.width - 120), this.randomNumber(0, this.canvas.height - 98), this.randomNumber(0, 10), this.randomNumber(0, 10)));
        }
        this.ship = new Ship("./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png", this.canvas.width / 2, this.canvas.height / 2, 3, 3, this.keyboardListener);
    }
    collision() {
        let r = false;
        this.asteroids.forEach((element) => {
            let distX = (element.getX() - element.getImg().width / 2) - (this.ship.getX() - this.ship.getImg().width / 2);
            let distY = (element.getY() - element.getImg().height / 2) - (this.ship.getY() - this.ship.getImg().height / 2);
            let distance = Math.sqrt((distX * distX) + (distY * distY));
            if (distance <= element.getImg().width / 2 + this.ship.getImg().width / 2) {
                r = true;
            }
        });
        return r;
    }
    draw() {
        if (this.frames > (60 * 3)) {
            if (this.collision() && !this.lastCollision) {
                this.lives--;
                this.ship.setX((this.canvas.width + this.ship.getImg().width) / 2);
                this.ship.setY((this.canvas.height + this.ship.getImg().height) / 2);
                this.frames = 0;
            }
        }
        else {
            this.frames++;
        }
        this.lastCollision = this.collision();
        this.writeLifeImagesToLevelScreen();
        this.writeTextToCanvas(`Your score: ${this.score}`, 20, this.canvas.width - 100, 30, "right");
        this.asteroids.forEach((asteroid) => {
            asteroid.move(this.canvas);
            asteroid.draw(this.ctx);
        });
        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);
    }
    writeLifeImagesToLevelScreen() {
        if (this.life.naturalWidth > 0) {
            let x = 10;
            const y = this.life.height - 10;
            for (let life = 0; life < this.lives; life++) {
                this.ctx.drawImage(this.life, x, y);
                x += this.life.width + 10;
            }
        }
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Ship {
    constructor(imgUrl, xPos, yPos, xVel, yVel, keyboardListener) {
        this.angle = 0;
        this.isAlive = true;
        this.xPos = xPos;
        this.yPos = yPos;
        this.vel = 3;
        this.loadImage(imgUrl);
        this.keyboardListener = keyboardListener;
    }
    getX() {
        return this.xPos;
    }
    setX(x) {
        this.xPos = x;
    }
    getY() {
        return this.yPos;
    }
    setY(y) {
        this.yPos = y;
    }
    getImg() {
        return this.img;
    }
    move(canvas) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)
            && this.xPos + this.img.width / 2 < canvas.width) {
            this.angle += 13;
        }
        else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)
            && this.xPos - this.img.width / 2 > 0) {
            this.angle -= 13;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)
            && this.yPos - this.img.height / 2 > 0) {
            console.log(this.angle);
            this.xPos -= this.vel * Math.cos(this.angle * Math.PI / 180);
            this.yPos -= this.vel * Math.sin(this.angle * Math.PI / 180);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)
            && this.yPos + this.img.height / 2 < canvas.height) {
            this.yPos += this.vel;
        }
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.save();
            ctx.translate(x + this.img.x / 2, y + this.img.y / 2);
            ctx.rotate(this.angle * Math.PI / 180);
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
            ctx.restore();
        }
    }
    loadImage(source) {
        this.img = new Image();
        this.img.src = source;
    }
}
class StartScreen {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.button = new Image();
        this.button.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
        this.asteroid = new Image();
        this.asteroid.src = "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png";
    }
    draw() {
        this.writeTextToCanvas("Asteroids", 140, this.canvas.width / 2, 150);
        this.writeTextToCanvas("PRESS S TO PLAY", 40, this.canvas.width / 2, this.canvas.height / 2 - 20);
        const asteroidX = this.canvas.width / 2 - this.asteroid.width / 2;
        const asteroidY = this.canvas.height / 2 + this.asteroid.height / 2;
        if (this.asteroid.naturalWidth > 0) {
            this.ctx.drawImage(this.asteroid, asteroidX, asteroidY);
        }
        const buttonX = this.canvas.width / 2;
        const buttonY = this.canvas.height / 2 + 219;
        if (this.button.naturalWidth > 0) {
            this.ctx.drawImage(this.button, buttonX - this.button.width / 2, buttonY);
            this.writeTextToCanvas("Press s to play", 20, buttonX, buttonY + 26, "center", "black");
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class TitleScreen {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = "Player one";
        this.score = 400;
        this.highscores = [
            {
                playerName: "Loek",
                score: 40000,
            },
            {
                playerName: "Daan",
                score: 34000,
            },
            {
                playerName: "Rimmert",
                score: 200,
            },
        ];
    }
    draw() {
        const x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        this.writeTextToCanvas(`${this.player} score is ${this.score}`, 80, x, y - 100);
        this.writeTextToCanvas("HIGHSCORES", 40, x, y);
        for (let i = 0; i < this.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.highscores[i].playerName} - ${this.highscores[i].score}`;
            this.writeTextToCanvas(text, 20, x, y);
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=app.js.map