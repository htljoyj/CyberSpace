
class Icon {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private xPos: number;
    private yPos: number;
    private width: number;
    private height: number;
    private img: HTMLImageElement;


    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, xPos: number, yPos: number, width: number, height: number, imgUrl: string) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.img = Game.loadImage(imgUrl);

    }

    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this asteroid
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;

        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }


    }
}