class EndScreen{
    
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        // canvas.style.backgroundColor = "lightgreen";
        canvas.style.backgroundImage = "url('./assets/backgrounds/titlescreen.gif')";
    }

    public draw() {
        this.writeTextToCanvas("CYBERSPACE", 100, this.canvas.width / 2, this.canvas.height / 2 - 50, "center", "white");
        this.writeTextToCanvas("Bedankt voor het spelen!", 50, this.canvas.width / 2, this.canvas.height / 2 + 50, "center", "white");
        this.writeTextToCanvas(`Score: ${Game.score}`, 50, this.canvas.width / 2, this.canvas.height / 2 + 110, "center", "white");
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