class BaseScreen {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        canvas.style.backgroundImage = "";
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
        this.flag.draw(this.ctx);
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
            }
        }
        this.icon.forEach((icon) => {
            icon.draw(this.ctx, this.canvas);
            if (this.player.isColliding(icon)) {
                console.log("Boem!");
            }
        });
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
                console.log('trying');
            });
            this.icon.forEach(element => {
                element.getYPos();
                element.setY(1);
                console.log('tryng 2');
            });
            this.jewel.forEach(element => {
                element.getYPos();
                element.setY(1);
                console.log('trying 3');
            });
        }
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
                x: 1090,
                y: -450,
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
        this.canvas.width = 1400;
        this.canvas.height = 700;
        this.ctx = this.canvas.getContext("2d");
        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new GroundScreen(this.canvas, this.ctx);
        this.loop();
    }
    switchScreen() {
        if (this.currentScreen instanceof TitleScreen && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.currentScreen = new GroundScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof GroundScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
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
                y: -100,
                img: "./assets/monsters/gorilla-png-37880.png"
            },
            {
                x: 300,
                y: -100,
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
                x: 1380,
                y: this.canvas.height + 8,
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
                x: 800,
                y: -300,
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
                x: 950,
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
                x: 890,
                y: 400,
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
            { x: 250, y: 300, scale: 0.5, img: "blue" }
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
                x: 850,
                y: this.canvas.height - 300,
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
            },
            {
                x: 700,
                y: -150,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 500,
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
                x: 900,
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
                x: 500,
                y: -450,
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
    constructor(xPos, yPos, scale, platform) {
        this.playerAnswer = "";
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.keyboardListener = new KeyboardListener();
        this.questions = [];
        this.platformQuestions = [];
        this.questions = [{
                "platform": "snapchat",
                "question": "Wat is een expose groep?",
                "a": "Een groep waarin word gelachen.",
                "b": "Een groep waarin men niets vermoedende mensen belachelijk maakt.",
                "c": "Een groep om de nieuwste films in te bespreken.",
                "answer": "b"
            }, {
                "platform": "facebook",
                "question": "Accepteer jij zomaar een vriendschap verzoek van een onbekend persoon?",
                "a": "ja",
                "b": "nee",
                "c": "",
                "answer": "b"
            }, {
                "platform": "tiktok",
                "question": "Waarom is het niet zo handig om in een topje en een kortbroekje een Tik Tok filmpje te maken?",
                "a": "Daar is niks mis mee.",
                "b": "Er zitten pedofielen op Tik Tok die misbruik kunnen maken van jouw beeldmateriaal!",
                "c": "",
                "answer": "b"
            }, {
                "platform": "whatsapp",
                "question": "Wat doe je als iemand belachelijk word gemaakt in de klassen app?",
                "a": "Ik bemoei me er niet mee, straks ben ik de volgende.",
                "b": "Diegene verdient het.",
                "c": "Ik maak een screenshot van wat er gezegd is als bewijs en stel de persoon die belachelijk wordt gemaakt op zijn gemak.",
                "answer": "c"
            }, {
                "platform": "whatsapp",
                "question": "Na de schooltrip ontvang je een Whatsapp berichtje in de groepsapp, waarin een minder leuke foto van een schoolgenoot is doorgegestuurd door je beste vriend/vriendin. Hoe reageer jij?",
                "a": "Ik bemoei me er niet mee, straks ben ik de volgende.",
                "b": "Diegene verdient het.",
                "c": "Ik maak een screenshot van wat er gezegd is als bewijs en stel de persoon die belachelijk wordt gemaakt op zijn gemak.",
                "answer": "c"
            }, {
                "platform": "whatsapp",
                "question": "Tijdens het spelen van een game popt er een scherm op waarin staat dat jij de hoogste score hebt. Om dit te registeren wordt er gevraagd naar je voor -en achternaam.",
                "a": "Ik vul dit naar waarheid in en ga verder met de game.",
                "b": "Ik verzin een mooie nickname en vul deze in.",
                "c": "Ik klik het schermpje weg",
                "answer": "c"
            }];
        switch (platform) {
            case "twitter":
                this.img = Game.loadImage("./assets/socialmedia/twitter.png");
                this.platform = "twitter";
                break;
            case "whatsapp":
                this.img = Game.loadImage("./assets/socialmedia/wApp.png");
                this.platform = "whatsapp";
                break;
            case "tiktok":
                this.img = Game.loadImage("./assets/socialmedia/tiktok.png");
                this.platform = "tiktok";
                break;
            case "youtube":
                this.img = Game.loadImage("./assets/socialmedia/youtube.png");
                this.platform = "youtube";
                break;
            case "facebook":
                this.img = Game.loadImage("./assets/socialmedia/fb.png");
                this.platform = "facebook";
                break;
            case "snapchat":
                this.img = Game.loadImage("./assets/socialmedia/snapchat.png");
                this.platform = "snapchat";
                break;
            case "instagram":
                this.img = Game.loadImage("./assets/socialmedia/ins.png");
                this.platform = "instagram";
                break;
        }
        this.questions.forEach((questions) => {
            if (questions.platform == this.platform) {
                this.platformQuestions.push(questions);
            }
        });
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
            if (this.platformQuestions.length == 0 || this.platformQuestions == undefined) {
                this.writeTextToCanvas(ctx, "Je hebt alle " + this.platform + "vragen al beantwoord", 20, canvas.width / 2, canvas.height / 2);
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                    this.setAnsweringQuestion(false);
                    this.playerAnswer = "";
                }
            }
            else {
                if (this.playerAnswer == "") {
                    this.writeTextToCanvas(ctx, this.platformQuestions[0].question, 20, canvas.width / 2, canvas.height / 2);
                    this.writeTextToCanvas(ctx, "1: " + this.platformQuestions[0].a, 20, canvas.width / 2, canvas.height / 2 + 50);
                    this.writeTextToCanvas(ctx, "2: " + this.platformQuestions[0].b, 20, canvas.width / 2, canvas.height / 2 + 100);
                    this.writeTextToCanvas(ctx, "3: " + this.platformQuestions[0].c, 20, canvas.width / 2, canvas.height / 2 + 150);
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
                    if (this.playerAnswer == this.platformQuestions[0].answer) {
                        this.writeTextToCanvas(ctx, "Dat klopt", 20, canvas.width / 2, canvas.height / 2);
                        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                            this.setAnsweringQuestion(false);
                            this.playerAnswer = "";
                            this.platformQuestions.shift();
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
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    getXPos() {
        return this.xPos;
    }
    setY(y) {
        this.yPos += y;
    }
    getYPos() {
        return this.yPos;
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
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP) && this.canJump) {
            console.log("jump");
            this.yPos -= 1;
            this.gravity = -0.62;
            this.canJump = false;
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
//# sourceMappingURL=app.js.map