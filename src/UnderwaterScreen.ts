/// <reference path = "BaseScreen.ts"/>
class UnderwaterScreen extends BaseScreen{

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    super(canvas,ctx)
    canvas.style.backgroundImage =
    "url('./assets/backgrounds/underwater-gif-background.gif')";
     this.terrainArray = []

     for (let i = 0; i < this.terrainArray.length; i++) {
        this.terrain.push(
          new Terrain(
            this.terrainArray[i].x,
            this.terrainArray[i].y,
            this.terrainArray[i].speed,
            this.terrainArray[i].img,
            this.canvas,
            this.ctx
          )
        );
      }

      this.iconArray = []
      for (let i = 0; i < this.iconArray.length; i++) {
        this.icon.push(
          new Icon(
            this.iconArray[i].x,
            this.iconArray[i].y,
            this.iconArray[i].scale,
            this.iconArray[i].img
          )
        );
      }

      this.jewelArray = []
      
    for (let i = 0; i < this.jewelArray.length; i++) {
        this.jewel.push(
          new Jewel(
            this.jewelArray[i].x,
            this.jewelArray[i].y,
            this.jewelArray[i].scale,
            this.jewelArray[i].img
          )
        );
      }

      this.enemyArray = []
      for (let i = 0; i < this.enemyArray.length; i++) {
        this.enemy.push(
          new Enemy(
            this.enemyArray[i].x,
            this.enemyArray[i].y,
            3,
            this.enemyArray[i].img
          )
        );
      }

}
}
