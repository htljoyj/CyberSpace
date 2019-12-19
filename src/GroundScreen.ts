///<reference path = "BaseScreen.ts"/>
class GroundScreen extends BaseScreen {
   

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas,ctx)
       
        canvas.style.backgroundImage = "url('./assets/backgrounds/RevolvingAdolescentCougar-size_restricted.gif')";
       
        
        this.enemyArray = [
            {
                x: 170,
                y: 120,
                img: "./assets/monsters/gorilla-png-37880.png"
            },
            {
                x: 500,
                y: 400,
                img: "./assets/monsters/gorilla-png-37880.png"
            },
            {
                x: 850,
                y: -100,
                img: "./assets/monsters/gorilla-png-37880.png"
            },
            {
                x: 300,
                y: -100,
                img: "./assets/monsters/gorilla-png-37880.png"
            },
            {
                x: 850,
                y: -950,
                img: "./assets/monsters/gorilla-png-37880.png"
            }
        ];
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemy.push(new Enemy(this.enemyArray[i].x, this.enemyArray[i].y, 3, this.enemyArray[i].img));   
        }


        this.icon = [];
        this.iconArray = [
            {
                x: 1100,
                y: this.canvas.height + 8,
                scale: 0.3,
                img: "facebook"
            },
            {
                x: 200,
                y: 120,
                scale: 0.3,
                img: "instagram"
            },
            {
                x: 850,
                y: 150,
                scale: 0.5,
                img: "whatsapp"
            },
            {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                scale: 0.5,
                img: "snapchat"
            },
            {
                x: 350,
                y: this.canvas.height - 190,
                scale: 0.5,
                img: "twitter"
            },
            {
                x: 1100,
                y: 195,
                scale: 0.7,
                img: "youtube"
            },
            {
                x: 200,
                y: 335,
                scale: 0.3,
                img: "tiktok"
            }, {
                x: 800,
                y: -300,
                scale: 0.3,
                img: "facebook"
            },
            {
                x: 550,
                y: -250,
                scale: 0.3,
                img: "instagram"
            },
            {
                x: 950,
                y: -654,
                scale: 0.5,
                img: "whatsapp"
            },
            {
                x:1065,
                y: -975,
                scale: 0.5,
                img: "snapchat"
            },
            {
                x: 360,
                y: -865,
                scale: 0.5,
                img: "twitter"
            },
            {
                x: 545,
                y: -1064,
                scale: 0.7,
                img: "youtube"
            },
            {
                x: 450,
                y: -640,
                scale: 0.3,
                img: "tiktok"
            }
        ];



        for (let i = 0; i < this.iconArray.length; i++) {
            this.icon.push(new Icon(this.iconArray[i].x, this.iconArray[i].y, this.iconArray[i].scale, this.iconArray[i].img));   
        }

        this.jewel = [];
        this.jewelArray = [
            {
                x: 1150,
                y: 52,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 890,
                y: 310,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 450,
                y: 515,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 450,
                y: 209,
                scale: 0.5,
                img: "blue"
            },
            {
                x: 920,
                y: -265,
                scale: 0.5,
                img: "blue"
            },{
                x: 220,
                y: -320,
                scale: 0.5,
                img: "blue"
            },{
                x: 860,
                y: -1080,
                scale: 0.5,
                img: "blue"
            },
        ];
        for (let i = 0; i < this.jewelArray.length; i++) {
            this.jewel.push(new Jewel(this.jewelArray[i].x, this.jewelArray[i].y, this.jewelArray[i].scale, this.jewelArray[i].img));   
        }


        this.terrain = [];
        this.terrainArray = [
            {
                x: 75,
                y: this.canvas.height - 50,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 200,
                y: this.canvas.height - 100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 325,
                y: this.canvas.height - 200,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 440,
                y: this.canvas.height - 100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 600,
                y: this.canvas.height - 100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 725,
                y: this.canvas.height - 200,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 850,
                y: this.canvas.height - 300,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 975,
                y: this.canvas.height - 50,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1050,
                y: this.canvas.height - 50,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width / 2 - 50,
                y: this.canvas.height / 2,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: this.canvas.width / 2 - 200,
                y: 200,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 150,
                y: 100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 200,
                y: 300,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 150,
                y: 300,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1100,
                y: 200,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1075,
                y: 375,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 850,
                y: 150,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 650,
                y: 100,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },
            {
                x: 1150,
                y: 50,
                speed: 0,
                img: "./assets/bricks/newBrick.png"
            },

            {
                x:400,
                y:350,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
            {
                x:300,
                y:-50,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
            {
                x:1050,
                y:-100,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
            {
                x:700,
                y:-150,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
            {
                x:500,
                y:-100,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
            {
                x:850,
                y:-50,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
            {
                x:500,
                y:-250,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
            {
                x:200,
                y:-300,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:700,
                y:-350,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:700,
                y:-550,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:900,
                y:-650,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:400,
                y:-650,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:350,
                y:-850,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
            {
                x:650,
                y:-750,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
            {
                x:850,
                y:-850,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:1050,
                y:-950,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:500,
                y:-1050,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:850,
                y:-1080,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:500,
                y:-450,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:900,
                y:-250,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:700,
                y:-1000,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },{
                x:700,
                y:-1250,
                speed:0,
                img:"./assets/bricks/newBrick.png"
            },
        ];
        
        
        for (let i = 0; i < this.terrainArray.length; i++) {
            this.terrain.push(new Terrain(this.terrainArray[i].x, this.terrainArray[i].y, this.terrainArray[i].speed, this.terrainArray[i].img, this.canvas, this.ctx));   
        }


        
    }

    

}  

