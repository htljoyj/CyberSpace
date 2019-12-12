///<reference path = 'GameEntity.ts'/>
class Jewel extends GameEntity {
    private value: number;
    private color: string;

    public constructor(xPos: number, yPos: number, scale: number, imgUrl: string, color: string) {
        super(xPos, yPos, scale, imgUrl)
        switch (color) {
            case "blue":
                this.value = 15
                break;
            case "green":
                this.value = 20
                break;
            case 'yellow':
                this.value = 35
                break;
            case "purple":
                this.value = 50
                break;
            case "red":
                this.value = 100
                break;

            default:
                this.value = 15
        }
    }
    public getDiamondValue() {
        return this.value;
    }
}