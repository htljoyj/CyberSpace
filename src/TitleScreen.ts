/// <reference path="BaseScreen.ts"/>
class TitleScreen extends BaseScreen {

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx)
        this.canvas = canvas;
        this.ctx = ctx;
        // canvas.style.backgroundColor = "lightgreen";
        canvas.style.backgroundImage = "url('./assets/backgrounds/IrF.gif')";
        this.keyboardListener = new KeyboardListener();

        this.terrain = [];
        this.terrainArray = [
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
    }

    public draw() {
        super.draw();
        // console.log("check2")
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)) {
            this.setPlayer("./assets/player/slime1.png");
            console.log("check1")
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)) {
            this.setPlayer("./assets/player/slime2.png");
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)) {
            this.setPlayer("./assets/player/slime3.png");
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)) {
            this.setPlayer("./assets/player/slime4.png");
        }
        this.writeTextToCanvas("CYBERSPACE", 100, this.canvas.width / 2, this.canvas.height / 2, "center", "white");
        this.writeTextToCanvas("Press spacebar to start", 50, this.canvas.width / 2, this.canvas.height / 2 + 100, "center", "white")
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
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
