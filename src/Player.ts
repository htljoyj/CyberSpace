/// <reference path="GameObject.ts"/>
class Player extends GameObject {

    private xVel: number;
    // private yVel: number;
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
        super(xPos,yPos,imgUrl);
        this.xVel = xVel;
        // this.yVel = yVel;
        this.keyboardListener = new KeyboardListener();
    }

    // public draw(ctx: CanvasRenderingContext2D) {
    //     // We want the center of the image to be the position of this asteroid
    //     const x = this.xPos - this.img.width / 2 - 10;
    //     const y = this.yPos - 10;

    //     // If the image is not yet loaded, don't draw anything
    //     if (this.img.naturalWidth > 0) {
    //         ctx.drawImage(this.img, x, y);
    //     }
    // }

    public move(canvas: HTMLCanvasElement) {        
        this.gravitySpeed += 2*this.gravity;
        this.yPos += this.gravitySpeed;
        if (this.gravity === 0) {
            // this.canJump = true;
        }
        if (this.gravity < 0) {
            this.gravity += 0.1;
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
            this.gravity = -0.62;
            this.canJump = false;
            let audio = new Audio("./assets/sounds/jump.mp3");
            audio.play();
        }
        if(this.yPos > canvas.height){
            this.playerDied();
        }
        if(this.xPos > canvas.width){
            this.xPos = 0;
        }
        if(this.xPos < 0){
            this.xPos = canvas.width;
        }
    }
    
    public playerDied(){
        this.xPos = 80;
        this.yPos = 440;
        console.log("playerDied");
        LevelScreen.live--;
      
    }

    public collision() {
        // console.log("Collision!");
        // console.log(this.gravitySpeed);
        this.yPos -= this.gravitySpeed;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.canJump = true; 
    }

    public getY(){
        return this.yPos
    }
}
