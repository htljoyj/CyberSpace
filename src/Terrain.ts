class Terrain {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private xPos: number;
    private yPos: number;
    private speed: number;
    private img: HTMLImageElement



    public constructor(xPos: number, yPos: number, speed: number, imgUrl: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.canvas = canvas
        this.ctx = ctx;


        this.img = Game.loadImage(imgUrl);
    }
 public up() {
    window.scrollBy(0, -200);
}
    public getXPos(){
        return this.xPos;
    }

    public getYPos(){
        return this.yPos;
    }
    public getImgHeight(){
        return this.img.height;
    }
    public getImgWidth(){
        return this.img.width;
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

    public move() { }
}
