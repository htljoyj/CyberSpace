///<reference path = "BaseScreen.ts"/>
class GroundScreen extends BaseScreen {
  public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx);

    canvas.style.backgroundImage =
      "url('./assets/backgrounds/RevolvingAdolescentCougar-size_restricted.gif')";

    this.enemyArray = [
      {
        x: 400,
        y: 200,
        img: "./assets/monsters/gorilla-png-37880.png"
      },
      {
        x: 525,
        y: 400,
        img: "./assets/monsters/gorilla-png-37880.png"
      },
      {
        x: 850,
        y: -150,
        img: "./assets/monsters/gorilla-png-37880.png"
      },
      {
        x: 300,
        y: -150,
        img: "./assets/monsters/gorilla-png-37880.png"
      },
      {
        x: 850,
        y: -950,
        img: "./assets/monsters/gorilla-png-37880.png"
      }
    ];
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

    this.icon = [];
    this.iconArray = [
      {
        x: 1370,
        y: this.canvas.height-20,
        scale: 0.3,
        img: "facebook",
        index: 0
      },
      {
        x: 200,
        y: 120,
        scale: 0.3,
        img: "instagram",
        index:0
      },
      {
        x: 850,
        y: 150,
        scale: 0.5,
        img: "whatsapp",
        index:0

      },
      {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        scale: 0.5,
        img: "snapchat",
        index:0
      },
      {
        x: 330,
        y: this.canvas.height - 140,
        scale: 0.5,
        img: "twitter",
        index:0
      },
      {
        x: 1100,
        y: 195,
        scale: 0.7,
        img: "youtube",
        index:0
      },
      {
        x: 110,
        y: 335,
        scale: 0.3,
        img: "tiktok",
        index:0
      },
      {
        x: 780,
        y: -310,
        scale: 0.3,
        img: "facebook",
        index:1
      },
      {
        x: 550,
        y: -250,
        scale: 0.3,
        img: "instagram",
        index:1
      },
      {
        x: 1050,
        y: -654,
        scale: 0.5,
        img: "whatsapp",
        index:1
      },
      {
        x: 1065,
        y: -975,
        scale: 0.5,
        img: "snapchat",
        index:1
      },
      {
        x: 360,
        y: -865,
        scale: 0.5,
        img: "twitter",
        index:1
      },
      {
        x: 545,
        y: -1064,
        scale: 0.7,
        img: "youtube",
        index:1
      },
      {
        x: 450,
        y: -640,
        scale: 0.3,
        img: "tiktok",
        index:1
      }
    ];

    for (let i = 0; i < this.iconArray.length; i++) {
      this.icon.push(
        new Icon(
          this.iconArray[i].x,
          this.iconArray[i].y,
          this.iconArray[i].scale,
          this.iconArray[i].img,
          this.iconArray[i].index
        )
      );
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
        x: 1200,
        y: 375,
        scale: 0.5,
        img: "blue"
      },
      {
        x: 1020,
        y: 600,
        scale: 0.5,
        img: "blue"
      },
      {
        x: 525,
        y: 195,
        scale: 0.5,
        img: "blue"
      },
      {
        x: 920,
        y: -265,
        scale: 0.5,
        img: "blue"
      },
      {
        x: 220,
        y: -320,
        scale: 0.5,
        img: "blue"
      },
      { x: 150, y: 300, scale: 0.5, img: "blue" },
      { x: 200, y: 300, scale: 0.5, img: "blue" },
      { x: 250, y: 300, scale: 0.5, img: "blue" },{
          x:1300,
          y:-100,
          scale:0.5,
          img:"blue"
      }
    ];
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

    this.terrain = [];
    this.terrainArray = [
      {
        x: 75,
        y: this.canvas.height - 50,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 300,
        y: this.canvas.height - 150,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 525,
        y: this.canvas.height - 100,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 1000,
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
        x: 950,
        y: this.canvas.height - 250,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },

      {
        x: 1300,
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
        x: 175,
        y: 300,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 75,
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
        x: 1175,
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
        x: 400,
        y: 350,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 300,
        y: -50,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 1050,
        y: -100,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },{
          x:1300,
          y:-100,
          speed:0,
          img:"./assets/bricks/newBrick.png"

      },
      {
        x: 1150,
        y: -250,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 600,
        y: -100,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 850,
        y: -50,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 500,
        y: -250,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 200,
        y: -300,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 700,
        y: -350,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 700,
        y: -550,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 1000,
        y: -650,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 400,
        y: -650,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 350,
        y: -850,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 650,
        y: -750,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 850,
        y: -850,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 1050,
        y: -950,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 500,
        y: -1050,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 850,
        y: -1080,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },

       {
        x: 900,
        y: -250,
        speed: 0,
     img: "./assets/bricks/newBrick.png"
      },
      {
        x: 700,
        y: -1000,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      },
      {
        x: 700,
        y: -1250,
        speed: 0,
        img: "./assets/bricks/newBrick.png"
      }
    ];

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
  }


}
