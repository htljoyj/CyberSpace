class Player {

    private xPos: number;
    private yPos: number;
    private xVel: number;
    private yVel: number;
    private img: HTMLImageElement;
    private keyboardListener: KeyboardListener;
    public gravity: number;
    public gravitySpeed: number;
    private canJump: boolean;


    /**
     * Construct a new Player object.
     *
     * @param xPos X coordinate 
     * @param yPos Y coordinate 
     * @param xVel X velocity
     * @param yVel Y velocity
     * @param imgUrl Url of the image to load
     */
    public constructor(xPos: number, yPos: number, xVel: number, yVel: number, imgUrl: string) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.keyboardListener = new KeyboardListener();
        this.gravity = 0.2;
        this.gravitySpeed = 0;
        // this.canJump = true;
        this.img = Game.loadImage(imgUrl);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this asteroid
        const x = this.xPos - this.img.width / 2 - 10;
        const y = this.yPos - 10;

        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }

    public move(canvas: HTMLCanvasElement) {        
        this.gravitySpeed += this.gravity;
        this.yPos += this.gravitySpeed;
        if (this.gravity === 0) {
            // this.canJump = true;
        }
        if (this.gravity < 0) {
            this.gravity += 0.05;
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
            this.gravity = -0.45;
            this.canJump = false;
        }
        if(this.yPos > canvas.height){
            this.xPos = 80;
            this.yPos = 520;
        }
    }

    public isColliding(gameObject: Terrain): boolean {
        if (this.yPos + this.img.height > gameObject.getYPos()
            && this.yPos < gameObject.getYPos() + gameObject.getImgHeight()
            && this.xPos + this.img.width > gameObject.getXPos()
            && this.xPos < gameObject.getXPos() + gameObject.getImgWidth()
        ) {
            return true;
        }
        return false;
    }
    
    public collision() {
        console.log("Collision!");
        console.log(this.gravitySpeed);
        this.yPos -= this.gravitySpeed;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.canJump = true;        
    }
}