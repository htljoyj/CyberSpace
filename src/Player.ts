class Player {

    private xPos: number;
    private yPos: number;
    private xVel: number;
    private yVel: number;
    private img: HTMLImageElement;
    private keyboardListener:KeyboardListener;
    private gravity: number = 0.05;
    private gravitySpeed: number = 0;


    /**
     * Construct a new Player object.
     *
     * @param xPos X coordinate 
     * @param yPos Y coordinate 
     * @param xVel X velocity
     * @param yVel Y velocity
     * @param imgUrl Url of the image to load
     */
    public constructor(xPos:number, yPos:number, xVel:number, yVel:number, imgUrl:string){
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
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

    public move(canvas:HTMLCanvasElement){
        this.gravitySpeed += this.gravity;
        this.yPos += this.yVel + this.gravitySpeed;  
        if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)){
            this.xPos -= this.xVel;
        }
        if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)){
            this.xPos += this.xVel;
        }
        if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)){
            this.jump();
        }
    }

    public jump(){
        console.log("jump");

    }
}