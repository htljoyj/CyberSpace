class LevelScreen {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private terrain: Terrain[];

    private player: Player;
    
    

    private GRASS: string = "./assets/bricks/autumn/128x128/Grass.png";

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.terrain = [];
        this.player = new Player(500, 50, 4, 4, "./assets/player/player_cheer2.png");
        this.addBrick(300, 300, 0, this.GRASS);
        this.addBrick(500, 500, 0, this.GRASS);
        
    }

    public draw() {

        this.player.draw(this.ctx);
        // this.terrain2.draw(this.ctx);
        this.terrain.forEach((terrain) => {
            terrain.draw(this.ctx);
        });
    }

    private addBrick(xPos: number, yPos: number, speed: number, img: string) {
        this.terrain.push(new Terrain(xPos, yPos, speed, img, this.canvas, this.ctx));
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
