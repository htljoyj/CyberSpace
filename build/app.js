class BaseScreen {
    constructor(canvas, ctx) {
        this.finish = false;
        this.allIcons = false;
        this.screen = 0;
        this.canvas = canvas;
        this.ctx = ctx;
        canvas.style.backgroundImage = "";
        this.keyboardListener = new KeyboardListener();
        BaseScreen.live = 3;
        BaseScreen.life = new Image();
        BaseScreen.life.src = './assets/heart-icon-png-transparent.png';
        this.player = new Player(80, 520, 4, 4, BaseScreen.playerImg);
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
    setPlayer(player) {
        BaseScreen.playerImg = player;
        this.player = new Player(this.player.getX(), this.player.getY() - 0.4, 4, 4, player);
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
                    this.moveScreenDown();
                }
            });
            if (this.player.getY() > this.canvas.height) {
                this.player.playerDied();
                this.moveScreenDown();
            }
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
            let speed = 2;
            if (this.player.getY() < 150) {
                this.screen += speed;
                this.flag.setY(speed);
                this.terrain.forEach(element => {
                    element.getYPos();
                    element.setY(speed);
                });
                this.icon.forEach(element => {
                    element.getYPos();
                    element.setY(speed);
                });
                this.enemy.forEach(element => {
                    element.getYPos();
                    element.setY(speed);
                });
                this.jewel.forEach(element => {
                    element.getYPos();
                    element.setY(speed);
                });
                this.player.getY();
                this.player.setY(speed);
            }
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SHIFT)) {
                this.screen--;
                this.flag.setY(-speed);
                this.terrain.forEach(element => {
                    element.getYPos();
                    element.setY(-speed);
                });
                this.icon.forEach(element => {
                    element.getYPos();
                    element.setY(-speed);
                });
                this.jewel.forEach(element => {
                    element.getYPos();
                    element.setY(-speed);
                });
                this.enemy.forEach(element => {
                    element.getYPos();
                    element.setY(-speed);
                });
                this.player.getY();
                this.player.setY(-speed);
            }
        }
        this.allIcons = false;
        if (this.icon.length == 0) {
            this.allIcons = true;
            console.log("hij doet het");
        }
        this.writeTextToCanvas(`Jouw score: ${Game.score}`, 20, this.canvas.width - 100, 40);
        this.writeTextToCanvas(`Aantal vragen: ${this.icon.length}`, 20, this.canvas.width - 120, 20);
    }
    moveScreenDown() {
        this.flag.setY(-this.screen);
        this.terrain.forEach(element => {
            element.setY(-this.screen);
        });
        this.icon.forEach(element => {
            element.setY(-this.screen);
        });
        this.enemy.forEach(element => {
            element.setY(-this.screen);
        });
        this.jewel.forEach(element => {
            element.setY(-this.screen);
        });
        this.player.setY(1);
        this.screen = 0;
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
BaseScreen.playerImg = "./assets/player/slime1.png";
class CloudScreen extends BaseScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        canvas.style.backgroundImage =
            "url('./assets/backgrounds/cloudscreen.gif')";
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
                x: 355,
                y: 650,
                scale: 0.3,
                img: "facebook",
                index: 2,
            },
            {
                x: 500,
                y: 210,
                scale: 0.3,
                img: "instagram",
                index: 2
            },
            {
                x: 465,
                y: -130,
                scale: 0.3,
                img: "tiktok",
                index: 2
            },
            {
                x: 620,
                y: -10,
                scale: 0.5,
                img: "snapchat",
                index: 2
            },
            {
                x: 1095,
                y: 480,
                scale: 0.7,
                img: "youtube",
                index: 2
            },
            {
                x: 120,
                y: 90,
                scale: 0.5,
                img: "twitter",
                index: 2
            },
            {
                x: 1120,
                y: -120,
                scale: 0.7,
                img: "whatsapp",
                index: 2
            },
            {
                x: 1090,
                y: -450,
                scale: 0.3,
                img: "facebook",
                index: 3
            },
            {
                x: 660,
                y: -580,
                scale: 0.3,
                img: "instagram",
                index: 3
            },
            {
                x: 1400,
                y: -710,
                scale: 0.3,
                img: "tiktok",
                index: 3
            },
            {
                x: 415,
                y: -820,
                scale: 0.7,
                img: "youtube",
                index: 3
            },
            {
                x: 1350,
                y: -1160,
                scale: 0.5,
                img: "snapchat",
                index: 3
            },
            {
                x: 220,
                y: -1160,
                scale: 0.5,
                img: "twitter",
                index: 3
            },
            {
                x: 1015,
                y: -1015,
                scale: 0.7,
                img: "whatsapp",
                index: 3
            }
        ];
        for (let i = 0; i < this.iconArray.length; i++) {
            this.icon.push(new Icon(this.iconArray[i].x, this.iconArray[i].y, this.iconArray[i].scale, this.iconArray[i].img, this.iconArray[i].index));
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
            { x: 715,
                y: -910,
                scale: 0.5,
                img: "green"
            },
        ];
        for (let i = 0; i < this.jewelArray.length; i++) {
            this.jewel.push(new Jewel(this.jewelArray[i].x, this.jewelArray[i].y, this.jewelArray[i].scale, this.jewelArray[i].img));
        }
    }
}
class EndScreen {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        canvas.style.backgroundImage = "url('./assets/backgrounds/IrF.gif')";
    }
    draw() {
        this.writeTextToCanvas("CYBERSPACE", 100, this.canvas.width / 2, this.canvas.height / 2 - 50, "center", "white");
        this.writeTextToCanvas("Bedankt voor het spelen!", 50, this.canvas.width / 2, this.canvas.height / 2 + 50, "center", "white");
        this.writeTextToCanvas(`Score: ${Game.score}`, 50, this.canvas.width / 2, this.canvas.height / 2 + 110, "center", "white");
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class GameObject {
    constructor(xPos, yPos, imgUrl) {
        this.lastKeyLeft = false;
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
            if (this.lastKeyLeft) {
                ctx.translate(x, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(this.img, -this.img.width, y);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
            else {
                ctx.drawImage(this.img, x, y);
            }
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
        Game.level = 1;
        this.canvas.width = 1400;
        this.canvas.height = 700;
        this.ctx = this.canvas.getContext("2d");
        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        this.loop();
    }
    switchScreen() {
        if (this.currentScreen instanceof TitleScreen && this.keyboardListener.isKeyDown(KeyboardListener.KEY_H)) {
            this.currentScreen = new Tutorial(this.canvas, this.ctx);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if ((this.currentScreen instanceof TitleScreen && Game.level === 1 && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))) {
            this.currentScreen = new GroundScreen(this.canvas, this.ctx);
        }
        if ((this.currentScreen instanceof TitleScreen && Game.level === 2 && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))) {
            this.currentScreen = new CloudScreen(this.canvas, this.ctx);
        }
        if ((this.currentScreen instanceof TitleScreen && Game.level === 3 && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))) {
            this.currentScreen = new SpaceScreen(this.canvas, this.ctx);
        }
        if ((this.currentScreen instanceof TitleScreen && Game.level === 4 && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))) {
            this.currentScreen = new UnderwaterScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof GroundScreen && Game.level === 2) {
            this.currentScreen = new CloudScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof CloudScreen && Game.level === 3) {
            this.currentScreen = new SpaceScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof SpaceScreen && Game.level === 4) {
            this.currentScreen = new UnderwaterScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof GroundScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof CloudScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof SpaceScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof UnderwaterScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof UnderwaterScreen && Game.level === 5) {
            this.currentScreen = new EndScreen(this.canvas, this.ctx);
            Game.level = 1;
        }
        if ((this.currentScreen instanceof GroundScreen || this.currentScreen instanceof CloudScreen || this.currentScreen instanceof SpaceScreen || this.currentScreen instanceof UnderwaterScreen) && this.currentScreen.getFinish() && this.currentScreen.getIcons()) {
            Game.level++;
            console.log(Game.level);
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
                img: "facebook",
                index: 0
            },
            {
                x: 200,
                y: 120,
                scale: 0.3,
                img: "instagram",
                index: 0
            },
            {
                x: 850,
                y: 150,
                scale: 0.5,
                img: "whatsapp",
                index: 0
            },
            {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                scale: 0.5,
                img: "snapchat",
                index: 0
            },
            {
                x: 330,
                y: this.canvas.height - 140,
                scale: 0.5,
                img: "twitter",
                index: 0
            },
            {
                x: 1100,
                y: 195,
                scale: 0.7,
                img: "youtube",
                index: 0
            },
            {
                x: 110,
                y: 335,
                scale: 0.3,
                img: "tiktok",
                index: 0
            },
            {
                x: 780,
                y: -310,
                scale: 0.3,
                img: "facebook",
                index: 1,
            },
            {
                x: 550,
                y: -250,
                scale: 0.3,
                img: "instagram",
                index: 1,
            },
            {
                x: 1050,
                y: -654,
                scale: 0.5,
                img: "whatsapp",
                index: 1,
            },
            {
                x: 1065,
                y: -975,
                scale: 0.5,
                img: "snapchat",
                index: 1,
            },
            {
                x: 360,
                y: -865,
                scale: 0.5,
                img: "twitter",
                index: 1,
            },
            {
                x: 545,
                y: -1064,
                scale: 0.7,
                img: "youtube",
                index: 1,
            },
            {
                x: 450,
                y: -640,
                scale: 0.3,
                img: "tiktok",
                index: 1,
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
}
class Icon {
    constructor(xPos, yPos, scale, platform, index = 0) {
        this.img1 = "";
        this.img2 = "";
        this.img1x = 0;
        this.img1y = 0;
        this.img2x = 0;
        this.img2y = 0;
        this.playerAnswer = "";
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.keyboardListener = new KeyboardListener();
        this.platformQuestion = [];
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
                "question": "Je wordt door een schoolgenoot, waarmee jij ook op Facebook bevriend bent, benaderd over je vreemde statussen.> Na deze tezien te hebben weet jij zeker dat deze niet door jou geplaatst zijn.> Alleen je beste vriend/vriendin kent jouw gebruikersnaam en wachtwoord.>Wat is jou reactie?",
                "a": "Je logt in op zijn/haar account en plaats ook een soortgelijk status.",
                "b": "Je verandert meteen jouw inloggegevens en spreekt hem/haar hierop aan.",
                "c": "Je gaat er niet op in, want het is je beste vriend/vriendin met wie je alle geheimen deelt.",
                "answer": "b"
            }, {
                "platform": "facebook",
                "question": "Als iemand iets post over een onderwerp waar jij het niet mee eens bent,> is het dan nodig om erop te reageren?>",
                "a": "Nee, ik scroll door naar iets wat ik wél leuk vind!",
                "b": "Natuurlijk hoe durft diegene zoiets te plaatsen!",
                "c": "Misschien",
                "answer": "a"
            }, {
                "platform": "facebook",
                "question": "Hoe herken je een fake account?",
                "a": "Wanneer het profiel al meer dan vijf jaar oud is.",
                "b": "Als iemand geen profiel foto heeft.",
                "c": "Als het profiel net aangemaakt is en meer dan 4000 vrienden heeft.",
                "answer": "c"
            }, {
                "platform": "facebook",
                "question": "Je krijgt een vriendschapsverzoek van je nicht, alleen je nicht heeft al een facebook profiel.>Iemand heeft een account aangemaakt die precies op die van haar lijkt!> Waar is hier sprake van?",
                "a": "Account stelen",
                "b": "Profieltje-pik",
                "c": "Identiteitshack",
                "answer": "c"
            }, {
                "platform": "facebook",
                "question": "Een onbekende wil via facebook zijn oude spelcomputer verkopen door bij jou langs te gaan.>Hij vraagt hierom om jouw adres.>Geef jij dit?",
                "a": "Ja",
                "b": "Nee, want ik geef niet zomaar mijn adres aan onbekenden.",
                "c": "",
                "answer": "b"
            }, {
                "platform": "facebook",
                "question": "Een zogenaamde oude bekende stuurt een berichtje dat hij je weer een keer wil zien.>Hoe reageer je hier op?",
                "a": "Ik spreek af wanneer ik kan.",
                "b": "Ik probeer er achter te komen of het klopt dat ik hem/haar ken.",
                "c": "",
                "answer": "b"
            }, {
                "platform": "facebook",
                "question": "Je ziet dat iemand jouw identiteit gebruikt om nare dingen over mensen te plaatsen.>Wat doe je?",
                "a": "Ik stuur een persoonlijk bericht of diegene wil stoppen.",
                "b": "Ik rapporteer het profiel.",
                "c": "Ik doe niks.",
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
                "question": "In de kantine hoor je een groepje lachen over pikante foto’s die een klasgenoot op Snapchat geplaatst heeft van zichzelf.",
                "a": ". Je sluit je aan bij de groep, omdat je de foto’s ook hebt gezien en lacht mee.",
                "b": "Je vertelt ook aan de overige klasgenoten over de foto’s, anders weten zij het niet.",
                "c": "Je benadert de klasgenoot en legt uit wat de consequenties kunnen zijn van zijn/haar handeling.",
                "answer": "c"
            }, {
                "platform": "snapchat",
                "question": "Heeft Snapchat het recht jouw foto's te gebruiken?",
                "a": "Absoluut niet daar heb ik niet voor getekend!",
                "b": "Ja, daar heb ik Snapchat recht opgegeven bij het downloaden van de app.",
                "c": "Als ze ervoor betalen wel.",
                "answer": "b"
            },
            {
                "platform": "snapchat",
                "question": "Als je een foto prive naar je vriend of vriendin stuurt is het dan gegarandeert alleen tussen jullie?",
                "a": "Ja natuurlijk dat is mijn vriendin of vriend",
                "b": "Nee iedereen kan het dan zien.",
                "c": "Ik hoef mijn vriend niet te wantrouwen,> maar ik moet wel opletten wat ik stuur er kunnen altijd screenshots worden genomen!.",
                "answer": "c"
            }, {
                "platform": "snapchat",
                "question": "Wat is het gevaar van Snap Map?",
                "a": "Iedereen die jou volgt kan je nauwkeurig volgen en zien waar je bent.",
                "b": "Het is niet gevaarlijk",
                "c": "Mijn ouders kunnen zien waar ik ben.",
                "answer": "a"
            }, {
                "platform": "snapchat",
                "question": "Hoe scherm je de Snap Map af?",
                "a": "Door het op onzichtbare modus in te stellen.",
                "b": "Door Snapchat te verwijderen",
                "c": "Door je locatie uit te zetten",
                "answer": "a"
            }, {
                "platform": "snapchat",
                "question": "Je krijgt een vies plaatje binnen die 3 sec te zien is. > Wat doe je hiermee?",
                "a": "Ik negeer het.",
                "b": "Ik bespreek het met mijn ouders.",
                "c": "Ik rapporteer, blokkeer en verwijder het profiel en bespreek het met mijn ouders om eventueel verdere stappen te ondernemen.",
                "answer": "c"
            }, {
                "platform": "snapchat",
                "question": "Weet je waar je terecht kunt mocht jij slachtoffer worden van een expose groep?",
                "a": "Bij mijn ouders en docenten",
                "b": "Bij de politie en hulplijnen",
                "c": "Al het bovenstaande",
                "answer": "c"
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
                "question": "Na de schooltrip ontvang je een Whatsapp berichtje in de groepsapp,> waarin een minder leuke foto van een schoolgenoot is doorgestuurd door je beste vriend/vriendin.> Hoe reageer jij?",
                "a": "HAHAHA!!!, anders hoor ik niet tot de groep.",
                "b": "Ik reageer niet.",
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
            }, {
                "platform": "whatsapp",
                "question": "Je vriend/vriendin stuurt dat hij je graag zou willen kussen en vraagt wat jij dan zou doen.> Je voelt je eigenlijk niet zo prettig bij dit gesprek.> Hoe ga jij hiermee om?",
                "a": "Ik antwoord helemaal niet.",
                "b": "Ik geef aan dat ik het niet prettig vind, want als het echt mijn vriend is respecteert hij die keuzen.",
                "c": "Ik stuur terug dat ik het ook zou willen anders vindt hij mij misschien preuts.",
                "answer": "b"
            },
            {
                "platform": "whatsapp",
                "question": "Je hebt ooit een naaktfoto gestuurd naar je vriend/vriendin.> Nu word je bedreigt dat als je er niet nog een stuurt, de foto rond zal gaan.> Hoe heet dit begrip?",
                "a": "Sextortation",
                "b": "Cyberpesten",
                "c": "Grooming",
                "answer": "a"
            }, {
                "platform": "whatsapp",
                "question": "Er wordt een naaktfoto van je schoolgenoot rondgestuurd.> Als je die foto in bezit hebt, ben jij dan ook strafbaar voor kinderpornografie?",
                "a": "Nee, want we zijn allebei minderjarig.",
                "b": "Nee, want ze heeft hem zelf gemaakt.",
                "c": "Ja, want het meisje is jonger dan achttien dan valt dat onder kinderporno, ongeacht hoe oud ik zelf ben!",
                "answer": "c"
            }, {
                "platform": "whatsapp",
                "question": "Hoe kan ik mijzelf het beste beschermen tegen ongewilde berichtjes?",
                "a": "Alle instellingen instellen op alleen zichtbaar voor mijn contacten",
                "b": "Alle instellingen instellen op alleen zichtbaar voor mijn contacten> en alleen mijn nummer delen met mensen die ik vertrouw en echt ken. ",
                "c": "Geen profielfoto plaatsen",
                "answer": "b"
            }, {
                "platform": "whatsapp",
                "question": "img1>>>Valt dit onder cyberpesten?",
                "a": "Ja",
                "b": "Nee",
                "c": "Het ligt aan hoe de persoon het opneemt",
                "answer": "a"
            }
        ];
        this.instagramQuestions = [
            {
                "platform": "instagram",
                "question": " Op jouw Instagram foto’s zie je een heleboel haat reacties staan van onbekende personen.",
                "a": "Je wordt er verdrietig van.",
                "b": "Je reageert terug door middel van een soortgelijke reactie te plaatsen.",
                "c": "Je rapporteert de profielen en zet jouw account op privé.",
                "answer": "c"
            }, {
                "platform": "instagram",
                "question": "Waarom is het beter om je profiel op privé te zetten?",
                "a": "Het is niet beter",
                "b": "Zo heb je een beter overzicht over wie jouw foto's kunnen bekijken.",
                "c": "Je kunt de likes dan beter in de gaten houden.",
                "answer": "b"
            }, {
                "platform": "instagram",
                "question": "Hoelang blijft je foto nog op het internet nadat jij het hebt verwijdert?",
                "a": "Het is meteen weg.",
                "b": "3 maanden.",
                "c": "Het blijft voor altijd op het internet.",
                "answer": "c"
            },
            {
                "platform": "instagram",
                "question": "Waarom kun je beter geen halfnaakte foto's posten?",
                "a": "Het lokt de verkeerde personen en het gaat nooit meer van het internet af.",
                "b": "Je kunt die wel gewoon plaatsen.",
                "c": "Je kunt die plaatsen als je account prive is.",
                "answer": "a"
            },
            {
                "platform": "instagram",
                "question": "Welke foto kun je beter niet posten?",
                "a": "img1",
                "b": "img2",
                "c": "Ik weet het niet zeker",
                "answer": "b"
            },
            {
                "platform": "instagram",
                "question": "Welke foto kun je posten?",
                "a": "img1",
                "b": "img2",
                "c": "Allebei",
                "answer": "a"
            }, {
                "platform": "instagram",
                "question": "Waar heb je kans op als je op een linkje voor meer followers klikt?",
                "a": "Meer followers",
                "b": "Virussen",
                "c": "Virussen en gehackt worden",
                "answer": "c"
            },
            {
                "platform": "instagram",
                "question": ">>Welke foto van je lichaam is niet gepast om te posten?",
                "a": "img1",
                "b": "img2",
                "c": "Allebei zijn oke om te plaatsen",
                "answer": "a"
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
            }, {
                "platform": "youtube",
                "question": "Wat doe je als iemand ongevraagd een filmpje van jouw op youtube zet?",
                "a": "Ik vraag de persoon om het direct te verwijderen.",
                "b": "Ik durf niet zo goed te vragen of ze het weghalen.",
                "c": "Ik hoop stilletjes dat niemand het ziet.",
                "answer": "a"
            }, {
                "platform": "youtube",
                "question": "Je kijkt al 6 maanden naar Charlie de 14-jarige game vlogger waar je ook regelmatig op reageert.> Je vindt het heel tof wat hij altijd doet!> Op een dag wilt hij samen gamen, wat ga je doen?",
                "a": "Ik spreek meteen een tijd en dag af!",
                "b": "Ik heb  Charlie zijn gezicht eigenlijk nooit gezien en realiseer me dat hij misschien helemaal geen 14 is.> Ik sla het direct af!",
                "c": "Ik denk er een paar nachtjes over na.",
                "answer": "b"
            }, {
                "platform": "youtube",
                "question": "Je upload een filmpje op youtube, je krijgt gelijk van een aantal personen gemene reacties> het lijkt wel alsof ze het met elkaar afgesproken hebben!> Hoe noem je dit?",
                "a": "Grooming",
                "b": "Cyberpesten",
                "c": "Grooming",
                "answer": "b"
            }, {
                "platform": "youtube",
                "question": "Waarom kun je het best reacties uitschakelen op je youtube kanaal?",
                "a": "Sommige pedofielen zijn ook actief op Youtube channels en gebruiken de comments om contact met je te krijgen.",
                "b": "Zo zie je de meningen van andere mensen niet.",
                "c": "Zo letten de kijkers meer op het filmpje zelf",
                "answer": "a"
            }, {
                "platform": "youtube",
                "question": "Je ziet een filmpje op youtube waarin iemand wordt gepest.>Hoe reageer je hier op?",
                "a": "Ik plaats een reactie dat ik het een leuk filmpje vindt.",
                "b": "Ik doe niks.",
                "c": "Ik meld het filmpje.",
                "answer": "c"
            }, {
                "platform": "youtube",
                "question": "Wat kan je het beste doen als je een vervelende reactie van iemand krijgt onder een video?",
                "a": "Negeren",
                "b": "Boos terug reageren.",
                "c": "Reactie verwijderen.",
                "answer": "b"
            }, {
                "platform": "youtube",
                "question": "Wat doe je als youtubers zeggen dat je hun kleding moet kopen?",
                "a": "Ik koop het.",
                "b": "Ik vraag het aan mijn ouders.",
                "c": "Ik koop het niet",
                "answer": "b"
            }
        ];
        this.tiktokQuestions = [
            {
                "platform": "tiktok",
                "question": "Waarom is het niet zo handig om in een topje en een kortbroekje een Tik Tok filmpje te maken?",
                "a": "Daar is niks mis mee.",
                "b": "Er zitten pedofielen op Tik Tok die misbruik kunnen maken van jouw beeldmateriaal!",
                "c": "Het kan soms koud zijn.",
                "answer": "b"
            },
            {
                "platform": "tiktok",
                "question": "Je krijgt een reactie op je filmpje van Frederik1979 > die aangeeft dat hij een keer samen een filmpje zou willen maken.> Hoe reageer jij?",
                "a": "Lijkt me leuk, hoe meer zielen hoe meer vreugd!.",
                "b": "Ik negeer het",
                "c": "Ik blokkeer en rapporteer het profiel direct!",
                "answer": "c"
            },
            {
                "platform": "tiktok",
                "question": "Ik kan mijn account het beste delen met :",
                "a": "Familie en vrienden.",
                "b": "Iedereen.",
                "c": "Alleen mensen die in Nederland wonen.",
                "answer": "a"
            },
            {
                "platform": "tiktok",
                "question": "Je reageert vaak op een leuke meid van jou leeftijd en andersom.>Het blijkt dat die leuke meid een man van 45 is die misbruik van je wilde maken.> Over welk begrip hebben we het?",
                "a": "Xenofobie",
                "b": "Pedofilie",
                "c": "Grooming",
                "answer": "c"
            }, {
                "platform": "tiktok",
                "question": "Wat maakt Tik Tok zo aantrekkelijk voor pedofielen?",
                "a": "Het is anoniem.",
                "b": "De chat en de niets vermoedende dansende meiden.",
                "c": "De verschillende soorten filmpjes die er te zien zijn.",
                "answer": "b"
            }, {
                "platform": "tiktok",
                "question": "Je profiel op Tik Tok staat standaard op .... ingesteld.",
                "a": "Openbaar",
                "b": "Prive",
                "c": "Alleen voor familie",
                "answer": "a"
            }, {
                "platform": "tiktok",
                "question": "Je ouders zeggen dat je te veel tijd besteed aan tiktok.>Wat doe je dan?",
                "a": "Ik ga stiekem verder als mijn ouders weg zijn.",
                "b": "Ik word boos.",
                "c": "Ik maak regels over bijvoorbeeld 1 uur per dag.",
                "answer": "c"
            }, {
                "platform": "tiktok",
                "question": "Wat doe je als je een filmpje ziet wat jij niet geschikt vindt?",
                "a": "Ik doe niks.",
                "b": "Ik zeg er wat van via de reacties.",
                "c": "",
                "answer": "b"
            }
        ];
        this.twitterQuestions = [{
                "platform": "twitter",
                "question": "Ben jij ook schuldig als je een gemene tweet retweet?",
                "a": "Ja",
                "b": "Nee",
                "c": "Misschien",
                "answer": "a"
            }, {
                "platform": "twitter",
                "question": "Een groepje besluit het nieuwe meisje in de klas een les te leren.>Samen besluiten zij om een twitter account met haar naam aan te maken en beledigende berichten te versturen.> Jouw beste vriend/vriendin behoort ook tot de groep en vind het een goed plan.> Hoe ga je hiermee om?",
                "a": "Je geeft dit meteen door aan de leraar, omdat je weet hoe het aanvoelt om gepest te worden.",
                "b": "Je bemoeit je er niet mee, want ook jij werd in het begin gepest.",
                "c": "Ik doe mee ik mag het meisje ook niet!",
                "answer": "a"
            }, {
                "platform": "twitter",
                "question": "Kan je alles tweeten ook al is het niet zo netjes wat je zegt? ",
                "a": "Nee dat kan niet.",
                "b": "Tuurlijk wel we leven immers in Nederland waar vrijheid van meningsuiting belangrijk is.",
                "c": "Ondanks dat er vrijheid van meningsuiting is, is het wel belangrijk om over de consequenties van je tweet na te denken.",
                "answer": "c"
            }, {
                "platform": "twitter",
                "question": "Soms tweeten mensen vanuit een account met een heel ander identiteit dan dat zij zelf zijn.> Hoe noem je zo'n account?",
                "a": "Detective account.",
                "b": "Fake account.",
                "c": "Alias account.",
                "answer": "b"
            },
        ];
        switch (platform) {
            case "twitter":
                this.img = Game.loadImage("./assets/socialmedia/twitter.png");
                this.platform = "twitter";
                if (index == 0) {
                    this.img1 = "";
                    this.img2 = "";
                    this.img1x = 500;
                    this.img1y = 500;
                    this.img2x = 300;
                    this.img2y = 300;
                }
                this.platformQuestion.push(this.twitterQuestions[index]);
                break;
            case "whatsapp":
                this.img = Game.loadImage("./assets/socialmedia/wApp.png");
                this.platform = "whatsapp";
                if (index === 7) {
                    this.img1 = "./assets/socialmedia/pesten.jpg";
                    this.img1x = 400;
                    this.img1y = 50;
                    console.log("whatsap question");
                }
                this.platformQuestion.push(this.whatsappQuestions[index]);
                console.log(this.platformQuestion[0]);
                break;
            case "tiktok":
                this.img = Game.loadImage("./assets/socialmedia/tiktok.png");
                this.platform = "tiktok";
                this.platformQuestion.push(this.tiktokQuestions[index]);
                console.log(this.platformQuestion);
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
                if (index === 4) {
                    this.img1 = "./assets/socialmedia/goodpic.jpg";
                    this.img1x = 400;
                    this.img1y = 100;
                    this.img2x = 650;
                    this.img2y = 130;
                    this.img2 = "./assets/socialmedia/badpicture.jpg";
                }
                if (index === 7) {
                    this.img1 = "./assets/socialmedia/goodselfie.jpg";
                    this.img1x = 400;
                    this.img1y = 100;
                    this.img2x = 650;
                    this.img2y = 100;
                    this.img2 = "./assets/socialmedia/duckface.jpg";
                }
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
            if (this.platformQuestion[0] == undefined) {
                this.writeTextToCanvas(ctx, "Je hebt alle " + this.platform + "vragen al beantwoord", 25, canvas.width / 2, canvas.height / 2);
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                    this.setAnsweringQuestion(false);
                    this.playerAnswer = "";
                }
            }
            else {
                if (this.playerAnswer == "") {
                    this.writeTextToCanvas(ctx, this.platformQuestion[0].question + ">>1: " + this.platformQuestion[0].a + ">2: " + this.platformQuestion[0].b + ">3: " + this.platformQuestion[0].c, 25, canvas.width / 2, canvas.height / 2);
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
                        this.writeTextToCanvas(ctx, "Dat klopt", 25, canvas.width / 2, canvas.height / 2);
                        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                            this.setAnsweringQuestion(false);
                            this.playerAnswer = "";
                        }
                    }
                    else {
                        this.writeTextToCanvas(ctx, "Dat klopt niet", 25, canvas.width / 2, canvas.height / 2);
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
        if (Game.level == 3 || Game.level == 4) {
            color = "white";
        }
        ctx.font = `${fontSize}px Patrick Hand`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        if (text.trim() !== "3:") {
            if (text.trim() == "1: img1")
                ctx.fillText("1 Links ", xCoordinate, yCoordinate);
            else if (text.trim() == "2: img2")
                ctx.fillText("2:Rechts", xCoordinate, yCoordinate);
            else if (text.trim() === "img1") { }
            else
                ctx.fillText(text.trim(), xCoordinate, yCoordinate);
        }
        if (text.includes("img1"))
            this.drawImg(Game.loadImage(this.img1), ctx, this.img1x, this.img1y);
        if (text.includes("img2"))
            this.drawImg(Game.loadImage(this.img2), ctx, this.img2x, this.img2y);
    }
    drawImg(img, ctx, xPos, yPos) {
        const x = xPos - img.width / 2;
        const y = yPos - img.height / 2;
        if (img.naturalWidth > 0) {
            ctx.drawImage(img, xPos, yPos);
        }
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
KeyboardListener.KEY_4 = 52;
KeyboardListener.KEY_SHIFT = 16;
KeyboardListener.KEY_H = 72;
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
            this.lastKeyLeft = true;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
            this.xPos += this.xVel;
            this.lastKeyLeft = false;
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
    getX() {
        return this.xPos;
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
            "url('./assets/backgrounds/space2.gif')";
        this.terrainArray = [
            {
                x: 75,
                y: 650,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 330,
                y: 480,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 50,
                y: 300,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 150,
                y: 300,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 600,
                y: 350,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 660,
                y: 600,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 1200,
                y: 670,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 1100,
                y: 530,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 950,
                y: 400,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 1300,
                y: 300,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 1070,
                y: 400,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 465,
                y: 230,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 75,
                y: 110,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 370,
                y: 50,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 750,
                y: 150,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 1100,
                y: 125,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 700,
                y: -85,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 800,
                y: -85,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 1150,
                y: -150,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 250,
                y: -250,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 1000,
                y: -300,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 400,
                y: -400,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 800,
                y: -400,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 600,
                y: -600,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 1000,
                y: -500,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 400,
                y: -800,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 1300,
                y: -250,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 150,
                y: -600,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 900,
                y: -725,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 1350,
                y: -725,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 700,
                y: -900,
                speed: 0,
                img: "./assets/bricks/spacerocket2,png"
            },
            {
                x: 1000,
                y: -1000,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 1300,
                y: -1150,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 100,
                y: -1150,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 200,
                y: -1150,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 300,
                y: -1150,
                speed: 0,
                img: "./assets/bricks/spacerocket3.png"
            },
            {
                x: 400,
                y: -1050,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            },
            {
                x: 680,
                y: -1225,
                speed: 0,
                img: "./assets/bricks/spacerocket2.png"
            }
        ];
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));
        }
        this.iconArray = [
            {
                x: 340,
                y: 460,
                scale: 0.7,
                img: "whatsapp",
                index: 4
            },
            {
                x: 220,
                y: 305,
                scale: 0.3,
                img: "facebook",
                index: 4
            },
            {
                x: 695,
                y: 580,
                scale: 0.7,
                img: "youtube",
                index: 4
            },
            {
                x: 1270,
                y: 680,
                scale: 0.3,
                img: "tiktok",
                index: 4
            },
            {
                x: 1330,
                y: 280,
                scale: 0.5,
                img: "snapchat",
                index: 4
            },
            {
                x: 780,
                y: 130,
                scale: 0.5,
                img: "twitter",
                index: 2
            },
            {
                x: 430,
                y: 56,
                scale: 0.3,
                img: "instagram",
                index: 4
            },
            {
                x: 740,
                y: -110,
                scale: 0.7,
                img: "whatsapp",
                index: 5
            },
            {
                x: 320,
                y: -240,
                scale: 0.3,
                img: "instagram",
                index: 5
            },
            {
                x: 1060,
                y: -500,
                scale: 0.3,
                img: "tiktok",
                index: 5
            },
            {
                x: 190,
                y: -625,
                scale: 0.7,
                img: "youtube",
                index: 5
            },
            {
                x: 440,
                y: -1075,
                scale: 0.5,
                img: "snapchat",
                index: 5
            },
            {
                x: 220,
                y: -1175,
                scale: 0.3,
                img: "facebook",
                index: 5
            }
        ];
        for (let i = 0; i < this.iconArray.length; i++) {
            this.icon.push(new Icon(this.iconArray[i].x, this.iconArray[i].y, this.iconArray[i].scale, this.iconArray[i].img, this.iconArray[i].index));
        }
        this.jewelArray = [
            {
                x: 390,
                y: 460,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 650,
                y: 330,
                scale: 0.5,
                img: "red"
            },
            {
                x: 75,
                y: 280,
                scale: 0.5,
                img: "green"
            },
            {
                x: 1130,
                y: 510,
                scale: 0.5,
                img: "yellow"
            },
            {
                x: 1090,
                y: 380,
                scale: 0.5,
                img: "red"
            },
            {
                x: 1125,
                y: 380,
                scale: 0.5,
                img: "green"
            },
            {
                x: 1140,
                y: 110,
                scale: 0.5,
                img: "yellow"
            },
            {
                x: 110,
                y: 280,
                scale: 0.5,
                img: "yellow"
            },
            {
                x: 850,
                y: -120,
                scale: 0.5,
                img: "yellow"
            },
            {
                x: 1190,
                y: -190,
                scale: 0.5,
                img: "red"
            },
            {
                x: 1000,
                y: -1030,
                scale: 0.5,
                img: "red"
            },
            {
                x: 75,
                y: 280,
                scale: 0.5,
                img: "green"
            },
            {
                x: 1340,
                y: -275,
                scale: 0.5,
                img: "yellow"
            },
            {
                x: 840,
                y: -425,
                scale: 0.5,
                img: "red"
            },
            {
                x: 600,
                y: -625,
                scale: 0.5,
                img: "green"
            },
            {
                x: 1375,
                y: -750,
                scale: 0.5,
                img: "red"
            },
            {
                x: 140,
                y: -1190,
                scale: 0.5,
                img: "yellow"
            },
            {
                x: 340,
                y: -1190,
                scale: 0.5,
                img: "yellow"
            },
            {
                x: 370,
                y: -1190,
                scale: 0.5,
                img: "red"
            },
        ];
        for (let i = 0; i < this.jewelArray.length; i++) {
            this.jewel.push(new Jewel(this.jewelArray[i].x, this.jewelArray[i].y, this.jewelArray[i].scale, this.jewelArray[i].img));
        }
        this.enemyArray = [
            {
                x: 470,
                y: 110,
                img: "./assets/monsters/spacemonster.png"
            },
            {
                x: 955,
                y: 250,
                img: "./assets/monsters/spacemonster.png"
            },
            {
                x: 1000,
                y: -400,
                img: "./assets/monsters/spacemonster.png"
            },
            {
                x: 400,
                y: -500,
                img: "./assets/monsters/spacemonster.png"
            },
            {
                x: 400,
                y: -900,
                img: "./assets/monsters/spacemonster.png"
            },
            {
                x: 1300,
                y: -1250,
                img: "./assets/monsters/spacemonster.png"
            }
        ];
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
        canvas.style.backgroundImage = "url('./assets/backgrounds/titlescreen.gif')";
    }
    draw() {
        this.writeTextToCanvas("CYBERSPACE", 100, this.canvas.width / 2, this.canvas.height / 2 - 50, "center", "white");
        this.writeTextToCanvas("Druk op spatie om te beginnen", 50, this.canvas.width / 2, this.canvas.height / 2 + 50, "center", "white");
        this.writeTextToCanvas("Druk op H voor karakterkeuze", 50, this.canvas.width / 2, this.canvas.height / 2 + 110, "center", "white");
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Tutorial extends BaseScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        this.canvas = canvas;
        this.ctx = ctx;
        canvas.style.backgroundImage = "url('./assets/backgrounds/IrF.gif')";
        this.keyboardListener = new KeyboardListener();
        this.terrain = [];
        this.terrainArray = [
            {
                x: this.canvas.width / 5 * 1,
                y: 220,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width / 5 * 2,
                y: 220,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width / 5 * 3,
                y: 220,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width / 5 * 4,
                y: 220,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 20,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 120,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 220,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 320,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 420,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 520,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 620,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 720,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 820,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 920,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1020,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1120,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1220,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1320,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1420,
                y: canvas.height + 10,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            }
        ];
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));
        }
        this.enemyArray = [
            {
                x: this.canvas.width / 5 * 1,
                y: 0,
                img: "./assets/player/slime1.png"
            },
            {
                x: this.canvas.width / 5 * 2,
                y: 0,
                img: "./assets/player/slime2.png"
            },
            {
                x: this.canvas.width / 5 * 3,
                y: 0,
                img: "./assets/player/slime3.png"
            },
            {
                x: this.canvas.width / 5 * 4,
                y: 0,
                img: "./assets/player/slime4.png"
            }
        ];
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemy.push(new Enemy(this.enemyArray[i].x, this.enemyArray[i].y, 3, this.enemyArray[i].img));
        }
    }
    draw() {
        super.draw();
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)) {
            this.setPlayer("./assets/player/slime1.png");
            console.log("check1");
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_2)) {
            this.setPlayer("./assets/player/slime2.png");
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_3)) {
            this.setPlayer("./assets/player/slime3.png");
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_4)) {
            this.setPlayer("./assets/player/slime4.png");
        }
        this.writeTextToCanvas("1", 50, this.canvas.width / 5, 100, "center", "white");
        this.writeTextToCanvas("2", 50, this.canvas.width / 5 * 2, 100, "center", "white");
        this.writeTextToCanvas("3", 50, this.canvas.width / 5 * 3, 100, "center", "white");
        this.writeTextToCanvas("4", 50, this.canvas.width / 5 * 4, 100, "center", "white");
        this.writeTextToCanvas("Gebruik 1 tot en met 4 om je kleur te kiezen", 35, this.canvas.width / 2, 320, "center", "white");
        this.writeTextToCanvas("Esc - Naar het start scherm", 35, this.canvas.width / 2, 360, "center", "white");
        this.writeTextToCanvas("Shift - Beweeg level omlaag", 35, this.canvas.width / 2, 400, "center", "white");
        this.writeTextToCanvas("Pijltjes - Beweeg je player", 35, this.canvas.width / 2, 440, "center", "white");
        this.writeTextToCanvas("Beantwoord alle vragen om naar het volgende level te kunnen", 35, this.canvas.width / 2, 480, "center", "white");
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Tomorrow`;
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
        this.terrainArray = [
            {
                x: 75,
                y: this.canvas.height - 50,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 820,
                y: this.canvas.height - 150,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1340,
                y: 600,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1100,
                y: 650,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 320,
                y: 570,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1200,
                y: this.canvas.height - 250,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 600,
                y: 650,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 820,
                y: 300,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 450,
                y: 300,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 180,
                y: 300,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1060,
                y: 300,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1250,
                y: 150,
                speed: 0,
                img: "./assets/bricks/eel.png"
            }, {
                x: 1000,
                y: 50,
                speed: 0,
                img: "./assets/bricks/eel.png"
            }, {
                x: 800,
                y: -5,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 620,
                y: 380,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 520,
                y: 50,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 320,
                y: 200,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 150,
                y: -100,
                speed: 0,
                img: "./assets/bricks/eel.png"
            }, {
                x: 630,
                y: -100,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1300,
                y: -100,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 820,
                y: -250,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 525,
                y: -320,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 250,
                y: -450,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1100,
                y: -200,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1100,
                y: -500,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1300,
                y: -650,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 150,
                y: -650,
                speed: 0,
                img: "./assets/bricks/eel.png"
            }, {
                x: 500,
                y: -550,
                speed: 0,
                img: "./assets/bricks/eel.png"
            }, {
                x: 750,
                y: -650,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 600,
                y: -850,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 940,
                y: -750,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 350,
                y: -800,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1180,
                y: -950,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 400,
                y: -1050,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 1050,
                y: -1080,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 700,
                y: -1000,
                speed: 0,
                img: "./assets/bricks/eel.png"
            },
            {
                x: 680,
                y: -1250,
                speed: 0,
                img: "./assets/bricks/eel.png"
            }
        ];
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));
        }
        this.iconArray = [{
                x: 380,
                y: 610,
                scale: 0.3,
                img: "facebook",
                index: 6,
            },
            {
                x: 590,
                y: 90,
                scale: 0.3,
                img: "instagram",
                index: 6
            },
            {
                x: 870,
                y: 30,
                scale: 0.3,
                img: "tiktok",
                index: 6
            },
            {
                x: 1130,
                y: -190,
                scale: 0.5,
                img: "snapchat",
                index: 6
            },
            {
                x: 1230,
                y: 455,
                scale: 0.7,
                img: "youtube",
                index: 6
            },
            {
                x: 490,
                y: 315,
                scale: 0.5,
                img: "twitter",
                index: 3
            },
            {
                x: 180,
                y: -110,
                scale: 0.7,
                img: "whatsapp",
                index: 6
            },
            {
                x: 1150,
                y: -460,
                scale: 0.3,
                img: "facebook",
                index: 7
            },
            {
                x: 220,
                y: -610,
                scale: 0.3,
                img: "instagram",
                index: 7
            },
            {
                x: 800,
                y: -615,
                scale: 0.3,
                img: "tiktok",
                index: 7
            },
            {
                x: 435,
                y: -1050,
                scale: 0.7,
                img: "youtube",
                index: 7
            },
            {
                x: 630,
                y: -850,
                scale: 0.5,
                img: "snapchat",
                index: 7
            },
            {
                x: 1090,
                y: -1090,
                scale: 0.7,
                img: "whatsapp",
                index: 7
            }];
        for (let i = 0; i < this.iconArray.length; i++) {
            this.icon.push(new Icon(this.iconArray[i].x, this.iconArray[i].y, this.iconArray[i].scale, this.iconArray[i].img, this.iconArray[i].index));
        }
        this.jewelArray = [{
                x: 850,
                y: 550,
                scale: 0.5,
                img: "purple"
            }, {
                x: 1365,
                y: 595,
                scale: 0.5,
                img: "red"
            }, {
                x: 350,
                y: 200,
                scale: 0.5,
                img: "red"
            }, {
                x: 1040,
                y: 50,
                scale: 0.5,
                img: "purple"
            }, {
                x: 840,
                y: -250,
                scale: 0.5,
                img: "red"
            }, {
                x: 275,
                y: -460,
                scale: 0.5,
                img: "purple"
            }, {
                x: 1340,
                y: -635,
                scale: 0.5,
                img: "red"
            }, {
                x: 390,
                y: -800,
                scale: 0.5,
                img: "red"
            }, {
                x: 1200,
                y: -950,
                scale: 0.5,
                img: "purple"
            }];
        for (let i = 0; i < this.jewelArray.length; i++) {
            this.jewel.push(new Jewel(this.jewelArray[i].x, this.jewelArray[i].y, this.jewelArray[i].scale, this.jewelArray[i].img));
        }
        this.enemyArray = [{
                x: 620,
                y: 280,
                img: "./assets/monsters/seahorse.gif"
            }, {
                x: 1120,
                y: 550,
                img: "./assets/monsters/seahorse.gif"
            },
            {
                x: 630,
                y: -250,
                img: "./assets/monsters/seahorse.gif"
            }, {
                x: 940,
                y: -900,
                img: "./assets/monsters/seahorse.gif"
            },
        ];
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemy.push(new Enemy(this.enemyArray[i].x, this.enemyArray[i].y, 3, this.enemyArray[i].img));
        }
    }
}
//# sourceMappingURL=app.js.map