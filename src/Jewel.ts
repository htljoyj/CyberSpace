///<reference path = 'GameEntity.ts'/>
class Jewel extends GameEntity {
    private value: number;
    private color: string;;
    

    public constructor(xPos: number, yPos: number, scale: number, color: string) {
        super(xPos, yPos, scale, "");
        switch (color) {
            case "blue":
                this.value = 15
                this.setImg("./assets/jewels/blue-diamond.png");
                break;
            case "green":
                this.value = 20
                this.setImg("./assets/jewels/green-diamond.png");
                break;
            case 'yellow':
                this.value = 35
                this.setImg("./assets/jewels/yellow-diamond.png");
                break;
            case "purple":
                this.value = 50
                this.setImg("./assets/jewels/purple-diamond.png");
                break;
            case "red":
                this.value = 100
                this.setImg("./assets/jewels/red-diamond.png");
                break;

            default:
                this.value = 15
                this.setImg("./assets/jewels/blue-diamond.png");
                break;
        }
      
    }

    public setY(y:number){
        this.yPos += y;

    }
    public  getYPos(){
        return this.yPos
    }
    public up() {
        window.scrollBy(0, -200);
    }

    public getDiamondValue() {
        return this.value;
    }
}