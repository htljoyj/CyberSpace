///<reference path="BaseScreen.ts"/>
class Tutorial extends BaseScreen {

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);
        this.canvas = canvas;
        this.ctx = ctx;
        canvas.style.backgroundImage = "url('./assets/backgrounds/IrF.gif')";
        this.keyboardListener = new KeyboardListener();

        this.terrain = [];
        this.terrainArray = [
            {
                x: this.canvas.width/5*1,
                y: 220,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width/5*2,
                y: 220,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width/5*3,
                y: 220,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width/5*4,
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
            this.terrain.push(
                new Terrain(
                    this.terrainArray[i].x,
                    this.terrainArray[i].y,
                    this.terrainArray[i].speed,
                    this.terrainArray[i].img,
                    this.canvas,
                    this.ctx
                )
            );
        }

        this.enemyArray = [
            {
              x: this.canvas.width/5*1,
              y: 0,
              img: "./assets/player/slime1.png"
            },
            {
              x: this.canvas.width/5*2,
              y: 0,
              img: "./assets/player/slime2.png"
            },
            {
              x: this.canvas.width/5*3,
              y: 0,
              img: "./assets/player/slime3.png"
            },
            {
              x: this.canvas.width/5*4,
              y: 0,
              img: "./assets/player/slime4.png"
            }
          ];
          for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemy.push(
              new Enemy(
                this.enemyArray[i].x,
                this.enemyArray[i].y,
                3,
                this.enemyArray[i].img
              )
            );
          }
    }

    public draw() {
        super.draw();
        // console.log("check2")
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)) {
            this.setPlayer("./assets/player/slime1.png");
            console.log("check1")
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
        this.writeTextToCanvas("Gebruik 1 tot en met 4 om je kleur te kiezen", 35, this.canvas.width/2, 320, "center", "white");
        this.writeTextToCanvas("Esc - Naar het start scherm", 35, this.canvas.width/2, 360, "center", "white");
        this.writeTextToCanvas("Shift - Beweeg level omlaag", 35, this.canvas.width/2, 400, "center", "white");
        this.writeTextToCanvas("Pijltjes - Beweeg je player", 35, this.canvas.width/2, 440, "center", "white");
        
    }

    /**
 * Writes text to the canvas
 * @param {string} text - Text to write
 * @param {number} fontSize - Font size in pixels
 * @param {number} xCoordinate - Horizontal coordinate in pixels
 * @param {number} yCoordinate - Vertical coordinate in pixels
 * @param {string} alignment - Where to align the text
 * @param {string} color - The color of the text
 */

    public writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px Tomorrow`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }








}