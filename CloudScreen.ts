///<reference path = 'BaseScreen.ts'/>
class CloudScreen extends BaseScreen {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx);

    canvas.style.backgroundImage =
      "url('./assets/backgrounds/cloudscreen.gif')";
      this.enemyArray = [
        {
          x: 655,
          y: 400,
          img: "./assets/monsters/bat1.png"
        },
        {
          x: 1000,
          y: 100,
          img: "./assets/monsters/bat1.png"
        },
        {
          x: 300,
          y: 100,
          img: "./assets/monsters/bat1.png"
        },
        {
          x: 170,
          y: -450,
          img: "./assets/monsters/bat2.png"
        },
        {
          x: 1250,
          y: -450,
          img: "./assets/monsters/bat1.png"
        },
        {
          x: 250,
          y: -550,
          img: "./assets/monsters/bat1.png"
        },
        {
          x: 640,
          y: -920,
          img: "./assets/monsters/bat1.png"
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
  
    this.terrainArray = [
      {
        x: 75,
        y: this.canvas.height - 50,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 275,
        y: 600,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 225,
        y: 300,
        speed: 2,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 475,
        y: 500,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 870,
        y: 550,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
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
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: this.canvas.width - 125,
        y: 400,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 1075,
        y: 500,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 1050,
        y: 250,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 450,
        y: 200,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 100,
        y: 100,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 300,
        y: 0,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 600,
        y: 0,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 900,
        y: 0,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 1100,
        y: -100,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 700,
        y: -200,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 400,
        y: -150,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 75,
        y: -250,
        speed: 2,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 1000,
        y: -300,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 400,
        y: -400,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 800,
        y: -400,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 600,
        y: -600,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 1000,
        y: -500,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 400,
        y: -800,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 1300,
        y: -250,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 150,
        y: -600,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 900,
        y: -725,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 1350,
        y: -725,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 700,
        y: -900,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 1000,
        y: -1000,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 1300,
        y: -1150,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 75,
        y: -1150,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 200,
        y: -1150,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 400,
        y: -1050,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
      },
      {
        x: 680,
        y: -1225,
        speed: 0,
        img: "./assets/bricks/whiteCloud.png"
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

    this.iconArray = [
      {
        x: 355,
        y: 650,
        scale: 0.3,
        img: "facebook",
        index:2,
      },
      {
        x: 500,
        y: 210,
        scale: 0.3,
        img: "instagram",
        index:2
      },
      {
        x: 465,
        y: -130,
        scale: 0.3,
        img: "tiktok",
        index:2
      },
      {
        x: 620,
        y: -10,
        scale: 0.5,
        img: "snapchat",
        index:2
      },
      {
        x: 1095,
        y: 480,
        scale: 0.7,
        img: "youtube",
        index:2
      },
      {
        x: 120,
        y: 90,
        scale: 0.5,
        img: "twitter",
        index:2
      },
      {
        x: 1120,
        y: -120,
        scale: 0.7,
        img: "whatsapp",
        index:2
      },
      {
        x: 1090,
        y: -450,
        scale: 0.3,
        img: "facebook",
        index:3
      },
      {
        x: 660,
        y: -580,
        scale: 0.3,
        img: "instagram",
        index:3
      },
      {
        x: 1400,
        y: -710,
        scale: 0.3,
        img: "tiktok",
        index:3
      },
      {
        x: 415,
        y: -820,
        scale: 0.7,
        img: "youtube",
        index:3
      },
      {
        x: 1350,
        y: -1160,
        scale: 0.5,
        img: "snapchat",
        index:3
      },
      {
        x: 220,
        y: -1160,
        scale: 0.5,
        img: "twitter",
        index:3
      },
      {
        x: 1015,
        y: -1015,
        scale: 0.7,
        img: "whatsapp",
        index:3

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

    this.jewelArray = [
      {
        x: 700,
        y: 325,
        scale: 0.5,
        img: "blue"
      },
      {
        x: 1300,
        y: 375,
        scale: 0.5,
        img: "green"
      },
      {
        x: 1070,
        y: 220,
        scale: 0.5,
        img: "green"
      },
      {
        x: 250,
        y: 270,
        scale: 0.5,
        img: "blue"
      },
      {
        x: 920,
        y: -20,
        scale: 0.5,
        img: "green"
      },
      {
        x: 1020,
        y: -320,
        scale: 0.5,
        img: "blue"
      },
      {
        x: 1320,
        y: -300,
        scale: 0.5,
        img: "blue"
      },
      {
        x: 75,
        y: -260,
        scale: 0.5,
        img: "green"
      },
      {
         x: 90,
         y: -1170,
          scale: 0.5, 
          img: "green"
         },
        { x: 715,
         y: -910,
          scale: 0.5,
           img: "green"
           },
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
  }
}
