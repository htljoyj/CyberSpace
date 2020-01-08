class BaseScreen {
    constructor(canvas, ctx) {
        this.finish = false;
        this.allIcons = false;
        this.canvas = canvas;
        this.ctx = ctx;
        canvas.style.backgroundImage = "";
        this.keyboardListener = new KeyboardListener();
        BaseScreen.live = 3;
        BaseScreen.life = new Image();
        BaseScreen.life.src = './assets/heart-icon-png-transparent.png';
        this.player = new Player(80, 520, 4, 4, "./assets/player/player_cheer2.png");
        this.flag = new Terrain(680, -1300, 0, './assets/greenFlag.png', this.canvas, this.ctx);
        this.enemy = [];
        this.enemyArray = [];
        this.terrain = [];
        this.terrainArray = [];
        this.icon = [];
        this.iconArray = [];
        this.jewel = [];
        this.jewelArray = [];
    }
    writeLifeImagesToLevelScreen() {
        if (BaseScreen.life.naturalWidth > 0) {
            let x = 10;
            const y = 10;
            for (let life = 0; life < BaseScreen.live; life++) {
                this.ctx.save();
                this.ctx.translate(x + BaseScreen.life.x / 2, y + BaseScreen.life.y / 2);
                this.ctx.scale(0.3, 0.3);
                this.ctx.drawImage(BaseScreen.life, -BaseScreen.life.width / 2, -BaseScreen.life.height / 2);
                this.ctx.restore();
                x += 25;
            }
        }
    }
    draw() {
        let isAnsweringQuestion = false;
        for (let i = 0; i < this.icon.length; i++) {
            if (this.player.isColliding(this.icon[i])) {
                this.icon[i].setAnsweringQuestion(true);
                isAnsweringQuestion = true;
                this.icon[i].drawQuestion(this.ctx, this.canvas);
                if (!this.icon[i].isAnsweringQuestion()) {
                    this.icon.splice(i, 1);
                    isAnsweringQuestion = false;
                }
            }
        }
        if (!isAnsweringQuestion) {
            this.flag.draw(this.ctx);
            this.finish = false;
            if (this.player.isColliding(this.flag)) {
                this.finish = true;
            }
            this.terrain.forEach((terrain) => {
                if (this.player.isColliding(terrain)) {
                    this.player.collision();
                    console.log(terrain.getXPos(), terrain.getYPos());
                }
                else if (this.player.gravity === 0) {
                    this.player.gravity = 0.2;
                }
                for (let i = 0; i < this.enemy.length; i++) {
                    if (this.enemy[i].isColliding(terrain)) {
                        this.enemy[i].collision();
                    }
                    else if (this.enemy[i].gravity === 0) {
                        this.enemy[i].gravity = 0.2;
                    }
                }
            });
            for (let i = 0; i < this.jewel.length; i++) {
                if (this.player.isColliding(this.jewel[i])) {
                    Game.score += this.jewel[i].getValue();
                    this.jewel.splice(i, 1);
                    console.log(Game.score);
                    let audio = new Audio("./assets/sounds/collect achievement.mp3");
                    audio.play();
                }
            }
            this.writeTextToCanvas(`Jouw score: ${Game.score}`, 20, this.canvas.width - 100, 20);
            this.icon.forEach((icon) => {
                icon.draw(this.ctx, this.canvas);
                if (this.player.isColliding(icon)) {
                }
            });
            for (let i = 0; i < this.icon.length; i++) {
                if (this.player.isColliding(this.icon[i])) {
                    this.icon[i].setAnsweringQuestion(true);
                    this.icon[i].drawQuestion(this.ctx, this.canvas);
                    if (!this.icon[i].isAnsweringQuestion()) {
                        this.icon.splice(i, 1);
                    }
                }
            }
            this.enemy.forEach((enemy) => {
                if (this.player.isColliding(enemy)) {
                    this.player.playerDied();
                }
            });
            this.player.move(this.canvas);
            this.player.draw(this.ctx);
            for (let i = 0; i < this.enemy.length; i++) {
                this.enemy[i].move(this.canvas);
                this.enemy[i].draw(this.ctx);
            }
            this.terrain.forEach((terrain) => {
                terrain.draw(this.ctx);
            });
            this.jewel.forEach((jewel) => {
                jewel.draw(this.ctx);
            });
            this.writeLifeImagesToLevelScreen();
            if (this.player.getY() < 150) {
                this.flag.setY(1);
                this.terrain.forEach(element => {
                    element.getYPos();
                    element.setY(1);
                });
                this.icon.forEach(element => {
                    element.getYPos();
                    element.setY(1);
                });
                this.enemy.forEach(element => {
                    element.getYPos();
                    element.setY(1);
                });
                this.jewel.forEach(element => {
                    element.getYPos();
                    element.setY(1);
                });
                this.player.getY();
                this.player.setY(1);
            }
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SHIFT)) {
                this.flag.setY(-1);
                this.terrain.forEach(element => {
                    element.getYPos();
                    element.setY(-1);
                });
                this.icon.forEach(element => {
                    element.getYPos();
                    element.setY(-1);
                });
                this.jewel.forEach(element => {
                    element.getYPos();
                    element.setY(-1);
                });
                this.enemy.forEach(element => {
                    element.getYPos();
                    element.setY(-1);
                });
                this.player.getY();
                this.player.setY(-1);
            }
        }
        this.allIcons = false;
        if (this.icon.length == 0) {
            this.allIcons = true;
            console.log("hij doet het");
        }
    }
    getFinish() {
        return this.finish;
    }
    getIcons() {
        return this.allIcons;
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class CloudScreen extends BaseScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        canvas.style.backgroundImage =
            "url('./assets/backgrounds/cloudscreen.gif')";
        this.enemyArray = [
            {
                x: 655,
                y: 400,
                img: "./assets/monsters/bat1.png"
            },
            {
                x: 1000,
                y: 100,
                img: "./assets/monsters/bat1.png"
            },
            {
                x: 300,
                y: 100,
                img: "./assets/monsters/bat1.png"
            },
            {
                x: 170,
                y: -450,
                img: "./assets/monsters/bat2.png"
            },
            {
                x: 1250,
                y: -450,
                img: "./assets/monsters/bat1.png"
            },
            {
                x: 250,
                y: -550,
                img: "./assets/monsters/bat1.png"
            },
            {
                x: 640,
                y: -920,
                img: "./assets/monsters/bat1.png"
            }
        ];
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemy.push(new Enemy(this.enemyArray[i].x, this.enemyArray[i].y, 3, this.enemyArray[i].img));
        }
        this.terrainArray = [
            {
                x: 75,
                y: this.canvas.height - 50,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 275,
                y: 600,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 225,
                y: 300,
                speed: 2,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 475,
                y: 500,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 870,
                y: 550,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 660,
                y: this.canvas.height - 50,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 675,
                y: 350,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: this.canvas.width - 125,
                y: 400,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 1075,
                y: 500,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 1050,
                y: 250,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 450,
                y: 200,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 100,
                y: 100,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 300,
                y: 0,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 600,
                y: 0,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 900,
                y: 0,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 1100,
                y: -100,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 700,
                y: -200,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 400,
                y: -150,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 75,
                y: -250,
                speed: 2,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 1000,
                y: -300,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 400,
                y: -400,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 800,
                y: -400,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 600,
                y: -600,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 1000,
                y: -500,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 400,
                y: -800,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 1300,
                y: -250,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 150,
                y: -600,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 900,
                y: -725,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 1350,
                y: -725,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 700,
                y: -900,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 1000,
                y: -1000,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 1300,
                y: -1150,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 75,
                y: -1150,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 200,
                y: -1150,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 400,
                y: -1050,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 680,
                y: -1225,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            }
        ];
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));
        }
        this.iconArray = [
            {
                x: 340,
                y: 610,
                scale: 0.3,
                img: "facebook"
            },
            {
                x: 500,
                y: 210,
                scale: 0.3,
                img: "instagram"
            },
            {
                x: 465,
                y: -130,
                scale: 0.3,
                img: "tiktok"
            },
            {
                x: 620,
                y: -10,
                scale: 0.5,
                img: "snapchat"
            },
            {
                x: 1095,
                y: 480,
                scale: 0.7,
                img: "youtube"
            },
            {
                x: 120,
                y: 90,
                scale: 0.5,
                img: "twitter"
            },
            {
                x: 1120,
                y: -120,
                scale: 0.7,
                img: "whatsapp"
            },
            {
                x: 1060,
                y: -480,
                scale: 0.3,
                img: "facebook"
            },
            {
                x: 660,
                y: -580,
                scale: 0.3,
                img: "instagram"
            },
            {
                x: 1400,
                y: -710,
                scale: 0.3,
                img: "tiktok"
            },
            {
                x: 415,
                y: -820,
                scale: 0.7,
                img: "youtube"
            },
            {
                x: 1350,
                y: -1160,
                scale: 0.5,
                img: "snapchat"
            },
            {
                x: 220,
                y: -1160,
                scale: 0.5,
                img: "twitter"
            },
            {
                x: 1015,
                y: -1015,
                scale: 0.7,
                img: "whatsapp"
            }
        ];
        for (let i = 0; i < this.iconArray.length; i++) {
            this.icon.push(new Icon(this.iconArray[i].x, this.iconArray[i].y, this.iconArray[i].scale, this.iconArray[i].img));
        }
        this.jewelArray = [
            {
                x: 700,
                y: 325,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 1300,
                y: 375,
                scale: 0.5,
                img: "green"
            },
            {
                x: 1070,
                y: 220,
                scale: 0.5,
                img: "green"
            },
            {
                x: 250,
                y: 270,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 920,
                y: -20,
                scale: 0.5,
                img: "green"
            },
            {
                x: 1020,
                y: -320,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 1320,
                y: -300,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 75,
                y: -260,
                scale: 0.5,
                img: "green"
            },
            {
                x: 90,
                y: -1170,
                scale: 0.5,
                img: "green"
            },
            { x: 715, y: -910, scale: 0.5, img: "green" }
        ];
        for (let i = 0; i < this.jewelArray.length; i++) {
            this.jewel.push(new Jewel(this.jewelArray[i].x, this.jewelArray[i].y, this.jewelArray[i].scale, this.jewelArray[i].img));
        }
    }
}
class GameObject {
    constructor(xPos, yPos, imgUrl) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.gravity = 0.3;
        this.gravitySpeed = 0;
        this.img = Game.loadImage(imgUrl);
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
    draw(ctx) {
        const x = this.xPos - this.img.width / 2 - 10;
        const y = this.yPos - 10;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class Enemy extends GameObject {
    constructor(xPos, yPos, xVel, imgUrl) {
        super(xPos, yPos, imgUrl);
        this.xVel = xVel;
    }
    move(canvas) {
        this.gravitySpeed += 2 * this.gravity;
        this.yPos += this.gravitySpeed;
    }
    collision() {
        this.yPos -= this.gravitySpeed;
        this.gravity = 0;
        this.gravitySpeed = 0;
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
    setY(y) {
        this.yPos += y;
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
        this.level = 1;
        this.canvas.width = 1400;
        this.canvas.height = 700;
        this.ctx = this.canvas.getContext("2d");
        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        this.loop();
    }
    switchScreen() {
        if (this.currentScreen instanceof TitleScreen && this.level === 1 && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new GroundScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof GroundScreen && this.level === 2) {
            this.currentScreen = new CloudScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof CloudScreen && this.level === 3) {
            this.currentScreen = new SpaceScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof GroundScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof CloudScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if ((this.currentScreen instanceof GroundScreen || this.currentScreen instanceof CloudScreen || this.currentScreen instanceof SpaceScreen) && this.currentScreen.getFinish() && this.currentScreen.getIcons()) {
            this.level++;
            console.log(this.level);
        }
    }
    static loadImage(source) {
        let img = new Image();
        img.src = source;
        return img;
    }
}
Game.score = 0;
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
class GroundScreen extends BaseScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        canvas.style.backgroundImage =
            "url('./assets/backgrounds/RevolvingAdolescentCougar-size_restricted.gif')";
        this.enemyArray = [
            {
                x: 400,
                y: 200,
                img: "./assets/monsters/gorilla-png-37880.png"
            },
            {
                x: 525,
                y: 400,
                img: "./assets/monsters/gorilla-png-37880.png"
            },
            {
                x: 850,
                y: -150,
                img: "./assets/monsters/gorilla-png-37880.png"
            },
            {
                x: 300,
                y: -150,
                img: "./assets/monsters/gorilla-png-37880.png"
            },
            {
                x: 850,
                y: -950,
                img: "./assets/monsters/gorilla-png-37880.png"
            }
        ];
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemy.push(new Enemy(this.enemyArray[i].x, this.enemyArray[i].y, 3, this.enemyArray[i].img));
        }
        this.icon = [];
        this.iconArray = [
            {
                x: 1370,
                y: this.canvas.height - 20,
                scale: 0.3,
                img: "facebook"
            },
            {
                x: 200,
                y: 120,
                scale: 0.3,
                img: "instagram"
            },
            {
                x: 850,
                y: 150,
                scale: 0.5,
                img: "whatsapp"
            },
            {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                scale: 0.5,
                img: "snapchat"
            },
            {
                x: 330,
                y: this.canvas.height - 140,
                scale: 0.5,
                img: "twitter"
            },
            {
                x: 1100,
                y: 195,
                scale: 0.7,
                img: "youtube"
            },
            {
                x: 110,
                y: 335,
                scale: 0.3,
                img: "tiktok"
            },
            {
                x: 780,
                y: -310,
                scale: 0.3,
                img: "facebook"
            },
            {
                x: 550,
                y: -250,
                scale: 0.3,
                img: "instagram"
            },
            {
                x: 1050,
                y: -654,
                scale: 0.5,
                img: "whatsapp"
            },
            {
                x: 1065,
                y: -975,
                scale: 0.5,
                img: "snapchat"
            },
            {
                x: 360,
                y: -865,
                scale: 0.5,
                img: "twitter"
            },
            {
                x: 545,
                y: -1064,
                scale: 0.7,
                img: "youtube"
            },
            {
                x: 450,
                y: -640,
                scale: 0.3,
                img: "tiktok"
            }
        ];
        for (let i = 0; i < this.iconArray.length; i++) {
            this.icon.push(new Icon(this.iconArray[i].x, this.iconArray[i].y, this.iconArray[i].scale, this.iconArray[i].img));
        }
        this.jewel = [];
        this.jewelArray = [
            {
                x: 1150,
                y: 52,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 1200,
                y: 375,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 1020,
                y: 600,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 525,
                y: 195,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 920,
                y: -265,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 220,
                y: -320,
                scale: 0.5,
                img: "blue"
            },
            { x: 150, y: 300, scale: 0.5, img: "blue" },
            { x: 200, y: 300, scale: 0.5, img: "blue" },
            { x: 250, y: 300, scale: 0.5, img: "blue" }, {
                x: 1300,
                y: -100,
                scale: 0.5,
                img: "blue"
            }
        ];
        for (let i = 0; i < this.jewelArray.length; i++) {
            this.jewel.push(new Jewel(this.jewelArray[i].x, this.jewelArray[i].y, this.jewelArray[i].scale, this.jewelArray[i].img));
        }
        this.terrain = [];
        this.terrainArray = [
            {
                x: 75,
                y: this.canvas.height - 50,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 300,
                y: this.canvas.height - 150,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 525,
                y: this.canvas.height - 100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1000,
                y: this.canvas.height - 100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 725,
                y: this.canvas.height - 200,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 950,
                y: this.canvas.height - 250,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1300,
                y: this.canvas.height - 50,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width / 2 - 50,
                y: this.canvas.height / 2,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width / 2 - 200,
                y: 200,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 150,
                y: 100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 175,
                y: 300,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 75,
                y: 300,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1100,
                y: 200,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1175,
                y: 375,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 850,
                y: 150,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 650,
                y: 100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1150,
                y: 50,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 400,
                y: 350,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 300,
                y: -50,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1050,
                y: -100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            }, {
                x: 1300,
                y: -100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1150,
                y: -250,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 600,
                y: -100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 850,
                y: -50,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 500,
                y: -250,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 200,
                y: -300,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 700,
                y: -350,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 700,
                y: -550,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1000,
                y: -650,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 400,
                y: -650,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 350,
                y: -850,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 650,
                y: -750,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 850,
                y: -850,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1050,
                y: -950,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 500,
                y: -1050,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 850,
                y: -1080,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 900,
                y: -250,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 700,
                y: -1000,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 700,
                y: -1250,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            }
        ];
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));
        }
    }
    init() {
        console.log("hoi");
    }
}
class Icon {
    constructor(xPos, yPos, scale, platform, index = 0) {
        this.playerAnswer = "";
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.keyboardListener = new KeyboardListener();
        this.platformQuestion = [];
        this.instagramQuestions = [
            {
                " platform": "instagram",
                "question": " Op jouw Instagram foto’s zie je een heleboel haatreacties staan van onbekende personen.",
                " a": "Je wordt er verdrietig van.",
                " b": "Je reageert terug door middel van een soortgelijke reactie te plaatsen.",
                "c": "Je rapporteert de profielen en zet jouw account op privé.",
                "answer": "c"
            }, {
                " platform": "instagram",
                "question": "Waarom is het beter om je profiel op privé te zetten?",
                " a": "Het is niet beter",
                " b": "Zo heb je een beter overzicht over wie jouw foto's kunnen bekijken.",
                "c": "Je kunt de likes dan beter in de gaten houden..",
                "answer": "b"
            }, {
                " platform": "instagram",
                "question": "Waarom is het beter om je profiel op privé te zetten?",
                " a": "Het is niet beter",
                " b": "Zo heb je een beter overzicht over wie jouw foto's kunnen bekijken.",
                "c": "Je kunt de likes dan beter in de gaten houden..",
                "answer": "b"
            }
        ];
        this.twitterQuestions = [
            {
                "platform": "twitter",
                "question": "Ben jij ook schuldig als je een gemene tweet retweet?",
                "a": "Ja",
                "b": "Nee",
                "c": "Misschien",
                "answer": "a"
            },
            {
                "platform": "twitter",
                "question": " Een groepje besluit het nieuw meisje in de klas een les te leren.>Samen besluiten zij om twitter account met haar naam aan te maken en beledigende berichten te versturen.> Jouw beste vriend/vriendin behoort ook tot de groep en vind het een goed plan.> Hoe ga je hiermee om?",
                "a": "Je geeft dit meteen door aan de leraar, omdat je weet hoe het aanvoelt om gepest te worden. ",
                "b": "Je bemoeit je er niet mee, want ook jij werd in het begin gepest.",
                "c": "",
                "answer": "a"
            }
        ];
        this.whatsappQuestions = [
            {
                "platform": "whatsapp",
                "question": "Wat doe je als iemand belachelijk word gemaakt in de klassen app?",
                "a": "Ik bemoei me er niet mee, straks ben ik de volgende.",
                "b": "Diegene verdient het.",
                "c": "Ik maak een screenshot van wat er gezegd is als bewijs en stel de persoon die belachelijk wordt > gemaakt op zijn gemak.",
                "answer": "c"
            },
            {
                "platform": "whatsapp",
                "question": "Na de schooltrip ontvang je een Whatsapp berichtje in de groepsapp,> waarin een minder leuke foto van een schoolgenoot is doorgegestuurd door je beste vriend/vriendin.> Hoe reageer jij?",
                "a": "HAHAHA!!!, anders hoor ik niet tot de groep.",
                " b": "Ik reageer niet.",
                "c": "Ik maak een screenshot en geef het door aan de leraar. ",
                "answer": "c"
            },
            {
                "platform": "whatsapp",
                "question": "Je krijgt een vreemd bericht binnen van een onbekend nummer, hoe reageer jij?",
                "a": "Ik probeer te achterhalen wie het is.",
                "b": "Ik stuur iets vreemds terug.",
                "c": "Ik blokkeer en verwijder het nummer.",
                "answer": "c"
            }
        ];
        this.youtubeQuestions = [
            {
                "platform": "youtube",
                "question": "Je ontvangt een YouTube link van je vriend/vriendin met het verzoek om een haatreactie onder het filmpje te plaatsen omdat hij/zij dat ook heeft gedaan.> In de video bespreekt de vlogger het over internetgevaren voor de jeugd en waarom het niet handig is dat kinderen van groep 7 op social media zitten.",
                "a": "Je bent oneens met het filmpje en vindt het gepast om een haatreactie te plaatsen.",
                "b": "Je gaat in op het verzoek, omdat het je vriend/vriendin dat ook voor jou zou doen.",
                "c": "Ik wijs mijn vriendin erop dat het niet netjes is en ik zal dan ook geen reactie plaatsen.",
                "answer": "c"
            },
            {
                "platform": "youtube",
                "question": "Wat doe je als iemand ongevraagd een filmpje van jouw op youtube zet?",
                "a": "Ik vraag de persoon om het direct te verwijderen.",
                "b": "Ik durf niet zo goed te vragen of ze het weghalen.",
                "c": "Ik hoop stilletjes dat niemand het ziet.",
            }
        ];
        this.facebookQuestions = [
            {
                "platform": "facebook",
                "question": "Accepteer jij zomaar een vriendschap verzoek van een onbekend persoon?",
                "a": "Ja",
                "b": "Nee",
                "c": "Soms",
                "answer": "b"
            },
            {
                "platform": "facebook",
                "question": "Je wordt door een schoolgenoot, waarmee jij ook op Facebook bevriend ben, benaderd over je vreemde statussen.> Na deze tezien te hebben weet jij zeker dat deze niet door jou geplaatst zijn.> Alleen je beste vriend/vriendin kent jouw gebruikersnaam en wachtwoord.>Wat is jou reactie?",
                "a": "Je logt in op zijn/haar account en plaats ook een soortgelijk status.",
                "b": "Je verandert meteen jouw inloggegevens en spreekt hem/haar hierop aan.",
                "c": "Je gaat er niet op in, want het is je beste vriend/vriendin met wie je alle geheimen deelt.",
                "answer": "b"
            }
        ];
        this.snapchatQuestions = [
            {
                "platform": "snapchat",
                "question": "Wat is een expose groep?",
                "a": "Een groep waarin word gelachen.",
                "b": "Een groep waarin men niets vermoedende mensen belachelijk maakt.",
                "c": "Een groep om de nieuwste films in te bespreken.",
                "answer": "b"
            },
            {
                "platform": "snapchat",
                "question": "In de kantine hoor je een groepje lachen over pikante foto’s die een klasgenoot op Snapchat geplaatst heeft van zichzelf. ",
                "a": ". Je sluit je aan bij de groep, omdat je de foto’s ook hebt gezien en lacht mee.",
                "b": "Je vertelt ook aan de overige klasgenoten over de foto’s, anders weten zij het niet.",
                "c": "Je benadert de klasgenoot en legt uit wat de consequenties kunnen zijn van zijn/haar handeling.",
                "answer": "c"
            }
        ];
        this.tiktokQuestions = [
            {
                "platform": "tiktok",
                "question": "Waarom is het niet zo handig om in een topje en een kortbroekje een Tik Tok filmpje te maken?",
                "a": "Daar is niks mis mee.",
                "b": "Er zitten pedofielen op Tik Tok die misbruik kunnen maken van jouw beeldmateriaal!",
                "c": "Hrt kan soms koud zijn.",
                "answer": "b"
            },
        ];
        switch (platform) {
            case "twitter":
                this.img = Game.loadImage("./assets/socialmedia/twitter.png");
                this.platform = "twitter";
                this.platformQuestion.push(this.twitterQuestions[index]);
                break;
            case "whatsapp":
                this.img = Game.loadImage("./assets/socialmedia/wApp.png");
                this.platform = "whatsapp";
                this.platformQuestion.push(this.whatsappQuestions[index]);
                break;
            case "tiktok":
                this.img = Game.loadImage("./assets/socialmedia/tiktok.png");
                this.platform = "tiktok";
                this.platformQuestion.push(this.tiktokQuestions[index]);
                break;
            case "youtube":
                this.img = Game.loadImage("./assets/socialmedia/youtube.png");
                this.platform = "youtube";
                this.platformQuestion.push(this.youtubeQuestions[index]);
                break;
            case "facebook":
                this.img = Game.loadImage("./assets/socialmedia/fb.png");
                this.platform = "facebook";
                this.platformQuestion.push(this.facebookQuestions[index]);
                break;
            case "snapchat":
                this.img = Game.loadImage("./assets/socialmedia/snapchat.png");
                this.platform = "snapchat";
                this.platformQuestion.push(this.snapchatQuestions[index]);
                break;
            case "instagram":
                this.img = Game.loadImage("./assets/socialmedia/ins.png");
                this.platform = "instagram";
                this.platformQuestion.push(this.instagramQuestions[index]);
                break;
        }
    }
    draw(ctx, canvas) {
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
    setAnsweringQuestion(bool) {
        this.answeringQuestion = bool;
    }
    isAnsweringQuestion() {
        return this.answeringQuestion;
    }
    drawQuestion(ctx, canvas) {
        if (this.isAnsweringQuestion()) {
            if (this.platformQuestion == undefined) {
                this.writeTextToCanvas(ctx, "Je hebt alle " + this.platform + "vragen al beantwoord", 20, canvas.width / 2, canvas.height / 2);
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                    this.setAnsweringQuestion(false);
                    this.playerAnswer = "";
                }
            }
            else {
                if (this.playerAnswer == "") {
                    this.writeTextToCanvas(ctx, this.platformQuestion[0].question + ">1: " + this.platformQuestion[0].a + ">2: " + this.platformQuestion[0].b + ">3: " + this.platformQuestion[0].c, 20, canvas.width / 2, canvas.height / 2);
                    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)) {
                        this.playerAnswer = "a";
                    }
                    else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_2)) {
                        this.playerAnswer = "b";
                    }
                    else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_3)) {
                        this.playerAnswer = "c";
                    }
                }
                else {
                    if (this.playerAnswer == this.platformQuestion[0].answer) {
                        this.writeTextToCanvas(ctx, "Dat klopt", 20, canvas.width / 2, canvas.height / 2);
                        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                            this.setAnsweringQuestion(false);
                            this.playerAnswer = "";
                        }
                    }
                    else {
                        this.writeTextToCanvas(ctx, "Dat klopt niet", 20, canvas.width / 2, canvas.height / 2);
                        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                            this.playerAnswer = "";
                        }
                    }
                }
            }
        }
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "black") {
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) == ">") {
                this.writeTextToCanvas(ctx, text.substr(i + 1, text.length), fontSize, xCoordinate, yCoordinate + (75 / 2), alignment, color);
                text = text.substr(0, i);
            }
        }
        ctx.font = `${fontSize}px Patrick Hand`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        if (text.trim() !== "3:")
            ctx.fillText(text.trim(), xCoordinate, yCoordinate);
    }
    getXPos() {
        return this.xPos;
    }
    setY(y) {
        this.yPos += y;
    }
    getYPos() {
        return this.yPos - this.img.height;
    }
    getImgHeight() {
        return this.img.height * this.scale;
    }
    getImgWidth() {
        return this.img.width * this.scale;
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
    getValue() {
        return this.value;
    }
    getImgHeight() {
        return this.img.height / 2;
    }
    setY(y) {
        this.yPos += y;
    }
    getYPos() {
        return this.yPos - this.img.height;
    }
    up() {
        window.scrollBy(0, -200);
    }
    getXPos() {
        return this.xPos;
    }
    getImgWidth() {
        return this.img.width / 2;
    }
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
KeyboardListener.KEY_1 = 49;
KeyboardListener.KEY_2 = 50;
KeyboardListener.KEY_3 = 51;
KeyboardListener.KEY_SHIFT = 16;
class Player extends GameObject {
    constructor(xPos, yPos, xVel, yVel, imgUrl) {
        super(xPos, yPos, imgUrl);
        this.xVel = xVel;
        this.keyboardListener = new KeyboardListener();
    }
    move(canvas) {
        this.gravitySpeed += 2 * this.gravity;
        this.yPos += this.gravitySpeed;
        if (this.gravity === 0) {
        }
        if (this.gravity < 0) {
            this.gravity += 0.1;
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
            this.yPos += 2;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP) && this.canJump) {
            console.log("jump");
            this.yPos -= 1;
            this.gravity = -0.62;
            this.canJump = false;
            let audio = new Audio("./assets/sounds/jump.mp3");
            audio.play();
        }
        if (this.yPos > canvas.height) {
            this.playerDied();
        }
        if (this.xPos > canvas.width) {
            this.xPos = 0;
        }
        if (this.xPos < 0) {
            this.xPos = canvas.width;
        }
    }
    playerDied() {
        this.xPos = 80;
        this.yPos = 440;
        console.log("playerDied");
        BaseScreen.live--;
    }
    collision() {
        this.yPos -= this.gravitySpeed;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.canJump = true;
    }
    getY() {
        return this.yPos;
    }
    setY(y) {
        this.yPos += y;
    }
}
class SpaceScreen extends BaseScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        canvas.style.backgroundImage =
            "url('./assets/backgrounds/RevolvingAdolescentCougar-size_restricted.gif')";
        this.terrainArray = [];
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));
        }
        this.iconArray = [];
        for (let i = 0; i < this.iconArray.length; i++) {
            this.icon.push(new Icon(this.iconArray[i].x, this.iconArray[i].y, this.iconArray[i].scale, this.iconArray[i].img));
        }
        this.jewelArray = [];
        for (let i = 0; i < this.jewelArray.length; i++) {
            this.jewel.push(new Jewel(this.jewelArray[i].x, this.jewelArray[i].y, this.jewelArray[i].scale, this.jewelArray[i].img));
        }
        this.enemyArray = [];
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemy.push(new Enemy(this.enemyArray[i].x, this.enemyArray[i].y, 3, this.enemyArray[i].img));
        }
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
    up() {
        window.scrollBy(0, -200);
    }
    setY(y) {
        this.yPos += y;
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
        canvas.style.backgroundImage = "url('./assets/backgrounds/IrF.gif')";
    }
    draw() {
        this.writeTextToCanvas("CYBERSPACE", 100, this.canvas.width / 2, this.canvas.height / 2, "center", "white");
        this.writeTextToCanvas("Press spacebar to start", 50, this.canvas.width / 2, this.canvas.height / 2 + 100, "center", "white");
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class UnderwaterScreen extends BaseScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        canvas.style.backgroundImage =
            "url('./assets/backgrounds/underwater-gif-background.gif')";
        this.terrainArray = [];
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));
        }
        this.iconArray = [];
        for (let i = 0; i < this.iconArray.length; i++) {
            this.icon.push(new Icon(this.iconArray[i].x, this.iconArray[i].y, this.iconArray[i].scale, this.iconArray[i].img));
        }
        this.jewelArray = [];
        for (let i = 0; i < this.jewelArray.length; i++) {
            this.jewel.push(new Jewel(this.jewelArray[i].x, this.jewelArray[i].y, this.jewelArray[i].scale, this.jewelArray[i].img));
        }
        this.enemyArray = [];
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemy.push(new Enemy(this.enemyArray[i].x, this.enemyArray[i].y, 3, this.enemyArray[i].img));
        }
    }
}
//# sourceMappingURL=app.js.map