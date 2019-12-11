
class Icon {
   
    private xPos: number;
    private yPos: number;
    private width: number;
    private height: number;
    private img: HTMLImageElement;


    public constructor( xPos: number, yPos: number, width: number, height: number, imgUrl: string) {
    
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
            // ctx.drawImage(this.img, x, y);

            ctx.save();
            ctx.translate(x+ this.img.x / 2, y+ this.img.y / 2);
            ctx.scale(0.5, 0.5);
            // ctx.translate(-this.img.x, -this.img.y);
            ctx.drawImage(this.img, -this.img.width/2, -this.img.height/2);
            ctx.restore();
        }


    }
}