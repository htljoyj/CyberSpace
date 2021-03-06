class GameObject{
    protected xPos:number;
    protected yPos:number;
    protected gravity:number;
    protected gravitySpeed:number;
    protected img:HTMLImageElement;
    protected lastKeyLeft:boolean = false;

    public constructor(xPos:number, yPos:number, imgUrl:string){
        this.xPos = xPos;
        this.yPos = yPos;
        this.gravity = 0.3;
        this.gravitySpeed = 0;
        this.img = Game.loadImage(imgUrl);
    }

    public isColliding(gameObject: any): boolean {
        if (this.yPos + this.img.height > gameObject.getYPos()
            && this.yPos < gameObject.getYPos() + gameObject.getImgHeight()
            && this.xPos + this.img.width > gameObject.getXPos()
            && this.xPos < gameObject.getXPos() + gameObject.getImgWidth()
        ) {
            return true;
        }
        return false;
    }

    public draw(ctx: CanvasRenderingContext2D) {
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

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    protected randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    
}
