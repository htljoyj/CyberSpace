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
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
    constructor(xPos, yPos, scale, imgUrl) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.img = Game.loadImage(imgUrl);
    }
    setImg(imgUrl) {
        this.img = Game.loadImage(imgUrl);
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.save();
            ctx.translate(x + this.img.x / 2, y + this.img.y / 2);
            ctx.scale(this.scale, this.scale);
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
            ctx.restore();
        }
    }
}
class Icon {
    constructor(xPos, yPos, scale, imgUrl) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.img = Game.loadImage(imgUrl);
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.save();
            ctx.translate(x + this.img.x / 2, y + this.img.y / 2);
            ctx.scale(this.scale, this.scale);
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
            ctx.restore();
        }
    }
}
class Jewel extends GameEntity {
    constructor(xPos, yPos, scale, color) {
        super(xPos, yPos, scale, "");
        switch (color) {
            case "blue":
                this.value = 15;
                this.setImg("./assets/jewels/blue-diamond.png");
                break;
            case "green":
                this.value = 20;
                this.setImg("./assets/jewels/green-diamond.png");
                break;
            case 'yellow':
                this.value = 35;
                this.setImg("./assets/jewels/yellow-diamond.png");
                break;
            case "purple":
                this.value = 50;
                this.setImg("./assets/jewels/purple-diamond.png");
                break;
            case "red":
                this.value = 100;
                this.setImg("./assets/jewels/red-diamond.png");
                break;
            default:
                this.value = 15;
                this.setImg("./assets/jewels/blue-diamond.png");
                break;
        }
    }
    ;
    getDiamondValue() {
        return this.value;
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
KeyboardListener.KEY_W = 87;
KeyboardListener.KEY_A = 65;
KeyboardListener.KEY_S = 83;
KeyboardListener.KEY_D = 68;
class LevelScreen {
    constructor(canvas, ctx) {
        this.GRASS = "./assets/bricks/newBrick.png";
        this.canvas = canvas;
        this.ctx = ctx;
        this.terrain = [];
        this.live = 3;
        this.life = new Image();
        this.life.src = './assets/heart-icon-png-transparent.png';
        this.player = new Player(80, 520, 4, 4, "./assets/player/player_cheer2.png");
        this.icon = [];
        this.icon.push(new Icon(1100, this.canvas.height + 8, 0.3, "./assets/socialmedia/fb.png"));
        this.icon.push(new Icon(200, 120, 0.3, "./assets/socialmedia/ins.png"));
        this.icon.push(new Icon(850, 150, 0.5, "./assets/socialmedia/wApp.png"));
        this.icon.push(new Icon(this.canvas.width / 2, this.canvas.height / 2, 0.5, "./assets/socialmedia/snapchat.png"));
        this.icon.push(new Icon(350, this.canvas.height - 190, 0.5, "./assets/socialmedia/twitter.png"));
        this.icon.push(new Icon(1100, 200 - 5, 0.7, "./assets/socialmedia/youtube.png"));
        this.icon.push(new Icon(200, 340 - 5, 0.3, "./assets/socialmedia/tiktok.png"));
        this.jewel = [];
        this.jewel.push(new Jewel(1150, 52, 0.5, "blue"));
        this.jewel.push(new Jewel(890, 270, 0.5, "blue"));
        this.jewel.push(new Jewel(450, 470, 0.5, "blue"));
        this.jewel.push(new Jewel(450, 209, 0.5, "blue"));
        this.jewel.push(new Jewel(700, 110, 0.5, "blue"));
        this.addBrick(75, this.canvas.height - 50, 0, './assets/bricks/newBrick.png');
        this.addBrick(200, this.canvas.height - 100, 0, './assets/bricks/newBrick.png');
        this.addBrick(325, this.canvas.height - 200, 0, './assets/bricks/newBrick.png');
        this.addBrick(440, this.canvas.height - 100, 0, this.GRASS);
        this.addBrick(600, this.canvas.height - 100, 0, './assets/bricks/newBrick.png');
        this.addBrick(725, this.canvas.height - 200, 0, this.GRASS);
        this.addBrick(850, this.canvas.height - 300, 0, this.GRASS);
        this.addBrick(975, this.canvas.height - 50, 0, this.GRASS);
        this.addBrick(1050, this.canvas.height - 50, 0, this.GRASS);
        this.addBrick(this.canvas.width / 2 - 50, this.canvas.height / 2, 0, this.GRASS);
        this.addBrick(this.canvas.width / 2 - 200, 200, 0, this.GRASS);
        this.addBrick(150, 100, 0, this.GRASS);
        this.addBrick(200, 300, 0, this.GRASS);
        this.addBrick(150, 300, 0, this.GRASS);
        this.addBrick(1100, 200, 0, this.GRASS);
        this.addBrick(1075, 375, 0, this.GRASS);
        this.addBrick(850, 150, 0, this.GRASS);
        this.addBrick(650, 100, 0, this.GRASS);
        this.addBrick(1150, 50, 0, this.GRASS);
    }
    draw() {
        this.terrain.forEach((terrain) => {
            if (this.player.isColliding(terrain)) {
                this.player.collision();
            }
            else if (this.player.gravity === 0) {
                this.player.gravity = 0.2;
            }
        });
        this.player.move(this.canvas);
        this.player.draw(this.ctx);
        this.writeLifeImagesToLevelScreen();
        this.terrain.forEach((terrain) => {
            terrain.draw(this.ctx);
        });
        this.icon.forEach((icon) => {
            icon.draw(this.ctx);
        });
        this.jewel.forEach((jewel) => {
            jewel.draw(this.ctx);
        });
    }
    writeLifeImagesToLevelScreen() {
        if (this.life.naturalWidth > 0) {
            let x = 10;
            const y = 10;
            for (let life = 0; life < this.live; life++) {
                this.ctx.save();
                this.ctx.translate(x + this.life.x / 2, y + this.life.y / 2);
                this.ctx.scale(0.3, 0.3);
                this.ctx.drawImage(this.life, -this.life.width / 2, -this.life.height / 2);
                this.ctx.restore();
                x += 25;
            }
        }
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
        this.gravity = 0.2;
        this.gravitySpeed = 0;
        this.img = Game.loadImage(imgUrl);
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2 - 10;
        const y = this.yPos - 10;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
    move(canvas) {
        this.gravitySpeed += this.gravity;
        this.yPos += this.gravitySpeed;
        if (this.gravity === 0) {
        }
        if (this.gravity < 0) {
            this.gravity += 0.05;
            this.gravitySpeed += this.gravity;
            this.yPos += this.gravitySpeed;
        }
        if (this.gravity > 0) {
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
            this.xPos -= this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
            this.xPos += this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
            this.gravity = 0.5;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP) && this.canJump) {
            console.log("jump");
            this.yPos -= 1;
            this.gravity = -0.45;
            this.canJump = false;
        }
        if (this.yPos > canvas.height) {
            this.xPos = 80;
            this.yPos = 520;
        }
        if (this.xPos > canvas.width) {
            this.xPos = 0;
        }
        if (this.xPos < 0) {
            this.xPos = canvas.width;
        }
    }
    isColliding(gameObject) {
        if (this.yPos + this.img.height > gameObject.getYPos()
            && this.yPos < gameObject.getYPos() + gameObject.getImgHeight()
            && this.xPos + this.img.width > gameObject.getXPos()
            && this.xPos < gameObject.getXPos() + gameObject.getImgWidth()) {
            return true;
        }
        return false;
    }
    collision() {
        console.log("Collision!");
        console.log(this.gravitySpeed);
        this.yPos -= this.gravitySpeed;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.canJump = true;
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
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getImgHeight() {
        return this.img.height;
    }
    getImgWidth() {
        return this.img.width;
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
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    draw() {
    }
}
//# sourceMappingURL=app.js.map