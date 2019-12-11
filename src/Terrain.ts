class Terrain {
    private xPos:number;
    private yPos:number;
    private speed:number;
    private img:HTMLImageElement

    public constructor(xPos:number, yPos:number, speed:number, imgUrl:string){
        this.xPos = xPos;
        this.yPos = xPos;
        this.speed = speed;

        this.img = Game.loadImage(imgUrl);
    }
}