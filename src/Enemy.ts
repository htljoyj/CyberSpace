class Enemy {
    private xPos:number;
    private yPos:number;
    private xVel:number;
    private img:HTMLImageElement;
     
    public constructor(xPos:number, yPos:number, xVel:number, imgUrl:string){
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.img = Game.loadImage(imgUrl);
    }
}