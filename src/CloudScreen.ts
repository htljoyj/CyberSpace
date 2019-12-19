///<reference path = 'BaseScreen.ts'/>
class CloudScreen extends BaseScreen{
  

    constructor(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
        super(canvas,ctx)
     
        canvas.style.backgroundImage = "url('./assets/backgrounds/1_O-F1YaJaFMeijf6ewskl7A.gif')";
        this.terrainArray =[
            {x:75,
            y:this.canvas.height - 50,
            speed:0,
            img: "./assets/bricks/whiteCloud.png"
        },{
            x:150,
            y:600,
            speed:0,
            img: "./assets/bricks/whiteCloud.png",
        },{
            x:300,
            y:400,
            speed:0,
            img: "./assets/bricks/whiteCloud.png",
        },
        {
            x:500,
            y:300,
            speed:0,
            img: "./assets/bricks/whiteCloud.png",
        },
        {
            x:600,
            y:300,
            speed:0,
            img: "./assets/bricks/whiteCloud.png",
        },


        ];
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));   
        }


    }
}