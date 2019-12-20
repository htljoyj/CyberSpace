///<reference path="GameObject.ts"/>
class Enemy extends GameObject {

    private xVel: number;
    public gravity: number;
    public gravitySpeed: number;

    public constructor(xPos: number, yPos: number, xVel: number, imgUrl: string) {
        super(xPos, yPos, imgUrl);
        this.xVel = xVel;
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
        this.gravitySpeed += 2 * this.gravity;
        this.yPos += this.gravitySpeed;
    }

    // public isColliding(gameObject: Terrain): boolean {
    //     if (this.yPos + this.img.height > gameObject.getYPos()
    //         && this.yPos < gameObject.getYPos() + gameObject.getImgHeight()
    //         && this.xPos + this.img.width > gameObject.getXPos()
    //         && this.xPos < gameObject.getXPos() + gameObject.getImgWidth()
    //     ) {
    //         return true;
    //     }
    //     return false;
    // }

    public collision() {
        // console.log("Collision!");
        // console.log(this.gravitySpeed);
        this.yPos -= this.gravitySpeed;
        this.gravity = 0;
        this.gravitySpeed = 0;
    }

    public getXPos() {
        return this.xPos;
    }

    public getYPos() {
        return this.yPos;
    }
    public getImgHeight() {
        return this.img.height;
    }
    public getImgWidth() {
        return this.img.width;
    }
}
