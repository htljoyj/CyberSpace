class Enemy {
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
        this.canvas.width = window.innerWidth - 3;
        this.canvas.height = window.innerHeight - 3;
        this.ctx = this.canvas.getContext("2d");
        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new LevelScreen(this.canvas, this.ctx);
        this.loop();
    }
    switchScreen() {
    }
    static loadImage(source) {
        let img = new Image();
        img.src = source;
        return img;
    }
}
let init = () => {
    const game = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameEntity {
}
class Icon {
    constructor(canvas, ctx, xPos, yPos, width, height, imgUrl) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.img = Game.loadImage(imgUrl);
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
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
    constructor(canvas, ctx) {
        this.GRASS = "./assets/bricks/autumn/128x128/Grass.png";
        this.canvas = canvas;
        this.ctx = ctx;
        this.terrain = [];
        this.player = new Player(500, 700, 4, 4, "./assets/player/player_cheer2.png");
        this.addBrick(300, 300, 0, this.GRASS);
        this.addBrick(500, 500, 0, this.GRASS);
    }
    draw() {
        this.writeTextToCanvas("hoi", 20, 400, 400, "center", "black");
        this.player.move();
        this.player.draw(this.ctx);
        this.terrain.forEach((terrain) => {
            terrain.draw(this.ctx);
        });
    }
    addBrick(xPos, yPos, speed, img) {
        this.terrain.push(new Terrain(xPos, yPos, speed, img, this.canvas, this.ctx));
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Player {
    constructor(xPos, yPos, xVel, yVel, imgUrl) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.keyboardListener = new KeyboardListener();
        this.img = Game.loadImage(imgUrl);
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
    move() {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
            this.xPos -= this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
            this.xPos += this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.jump();
        }
    }
    jump() {
        console.log("jump");
    }
}
class Terrain {
    constructor(xPos, yPos, speed, imgUrl, canvas, ctx) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.canvas = canvas;
        this.ctx = ctx;
        this.img = Game.loadImage(imgUrl);
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
    move() { }
}
class TitleScreen {
}
//# sourceMappingURL=app.js.map