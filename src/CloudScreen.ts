///<reference path = 'BaseScreen.ts'/>
class CloudScreen extends BaseScreen {


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx)

        canvas.style.backgroundImage = "url('./assets/backgrounds/ezgif-1-847bffac6a61.gif')";



        this.terrainArray = [
            {
                x: 75,
                y: this.canvas.height - 50,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png"
            }, {
                x: 275,
                y: 600,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            },
            {
                x: 225,
                y: 300,
                speed: 2,
                img: "./assets/bricks/whiteCloud.png",

            }, {
                x: 475,
                y: 500,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            },
            {
                x: 870,
                y: 550,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            },
            {
                x: 660,
                y: this.canvas.height - 50,
                img: "./assets/bricks/whiteCloud.png"
            },
            {
                x: 675,
                y: 350,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",

            }, {
                x: this.canvas.width - 125,
                y: 400,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 1075,
                y: 500,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                    x:1050,
                    y:250,
                    speed:0,
                    img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 450,
                y: 200,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            },
             {
                x: 100,
                y: 100,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 300,
                y: 0,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 600,
                y: 0,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 900,
                y: 0,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 1100,
                y: -100,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 700,
                y: -200,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 500,
                y: -150,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 1000,
                y: -300,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 400,
                y: -400,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 800,
                y: -400,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 600,
                y: -600,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 1000,
                y: -500,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            }, {
                x: 400,
                y: -800,
                speed: 0,
                img: "./assets/bricks/whiteCloud.png",
            },


        ];
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));
        }

        this.iconArray = [{
            x: 355,
            y: 650,
            scale: 0.3,
            img: "facebook",

        }, {
            x: 500,
            y: 210,
            scale: 0.3,
            img: 'instagram',
        }, {
            x: 570,
            y: -125,
            scale: 0.3,
            img: 'tiktok',
        }, {
            x: 620,
            y: -10,
            scale: 0.5,
            img: 'snapchat',
        }, {
            x: 1095,
            y: 480,
            scale: 0.7,
            img: 'youtube',
        }, {
            x: 120,
            y: 90,
            scale: 0.5,
            img: 'twitter',
        }, {
            x: 1120,
            y: -120,
            scale: 0.7,
            img: 'whatsapp',

        },];

         for (let i = 0; i < this.iconArray.length; i++) {
            this.icon.push(new Icon(this.iconArray[i].x, this.iconArray[i].y, this.iconArray[i].scale, this.iconArray[i].img));   
        }


        this.jewelArray = [{ 
               x: 700,
                y: 325,
                scale: 0.5,
                img: "blue",

        },{ 
                x: 1300,
                y: 375,
                scale: 0.5,
                img: "green",

        },{ 
                x: 1070,
                y: 220,
                scale: 0.5,
                img: "green",

        },{ 
                x: 250,
                y: 270,
                scale: 0.5,
                img: "blue",

        },{ 
                x: 920,
                y: -20,
                scale: 0.5,
                img: "green",

        },{ 
                x: 1020,
                y: -320,
                scale: 0.5,
                img: "blue",

        }]
        
        for (let i = 0; i < this.jewelArray.length; i++) {
            this.jewel.push(new Jewel(this.jewelArray[i].x, this.jewelArray[i].y, this.jewelArray[i].scale, this.jewelArray[i].img));   

        }

        }


    
}