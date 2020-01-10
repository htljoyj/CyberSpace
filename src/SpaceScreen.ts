///<reference path = 'BaseScreen.ts'/>
class SpaceScreen extends BaseScreen {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx);

    canvas.style.backgroundImage =
      "url('./assets/backgrounds/space2.gif')";

    this.terrainArray = [
      {
        x: 75,
        y: 650,
        speed: 0,
        img: "./assets/bricks/spacerocket2.png"
      },
      {
        x: 330,
        y: 480,
        speed: 0,
        img: "./assets/bricks/spacerocket3.png"
      },
      {
        x: 50,
        y: 300,
        speed: 0,
        img: "./assets/bricks/spacerocket3.png"
      },
      {
        x: 150,
        y: 300,
        speed: 0,
        img: "./assets/bricks/spacerocket2.png"
      },
      {
        x: 600,
        y: 350,
        speed: 0,
        img: "./assets/bricks/spacerocket2.png"
      },
      {
        x: 660,
        y: 600,
        img: "./assets/bricks/spacerocket2.png"
      },
      {
        x: 1200,
        y: 670,
        speed: 0,
        img: "./assets/bricks/spacerocket2.png"
      },
      {
        x: 1100,
        y: 530,
        speed: 0,
        img: "./assets/bricks/spacerocket3.png"
      },
      {
        x: 950,
        y: 400,
        speed: 0,
        img: "./assets/bricks/spacerocket3.png"
      },
      {
        x: 1300,
        y: 300,
        speed: 0,
        img: "./assets/bricks/spacerocket2.png"
      },
      {
        x: 1070,
        y: 400,
        speed: 0,
        img: "./assets/bricks/spacerocket2.png"
      },
      {
        x: 465,
        y: 230,
        speed: 0,
        img: "./assets/bricks/spacerocket3.png"
      },
      {
        x: 75,
        y: 110,
        speed: 0,
        img: "./assets/bricks/spacerocket2.png"
      },
      {
        x: 370,
        y: 50,
        speed: 0,
        img: "./assets/bricks/spacerocket3.png"
      },
      {
        x: 750,
        y: 150,
        speed: 0,
        img: "./assets/bricks/spacerocket2.png"
      },
      {
        x: 1100,
        y: 125,
        speed: 0,
        img: "./assets/bricks/spacerocket2.png"
      },/*
      {
        x: 900,
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
      }*/
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
        x: 340,
        y: 460,
        scale: 0.5,
        img: "whatsapp",
        index: 4
      },
      {
        x: 220,
        y: 305,
        scale: 0.3,
        img: "facebook",
        index: 4
      },
      {
        x: 695,
        y: 580,
        scale: 0.7,
        img: "youtube",
        index: 4
      },
      {
        x: 1270,
        y: 680,
        scale: 0.3,
        img: "tiktok",
        index: 4
      },
      {
        x: 1330,
        y: 280,
        scale: 0.5,
        img: "snapchat",
        index: 4
      },
      {
        x: 780,
        y: 130,
        scale: 0.7,
        img: "twitter",
        index: 4
      },
      {
        x: 430,
        y: 56,
        scale: 0.3,
        img: "instagram",
        index: 4
      },/*
      {
        x: 200,
        y: 320,
        scale: 0.7,
        img: "whatsapp",
        index: 5
      },
      
      {
        x: 300,
        y: 420,
        scale: 0.5,
        img: "twitter",
        index: 5
      },
      {
        x: 320,
        y: 400,
        scale: 0.5,
        img: "instagram",
        index: 5
      },
      {
        x: 370,
        y: 460,
        scale: 0.5,
        img: "youtube",
        index: 4
      },
      {
        x: 400,
        y: 500,
        scale: 0.5,
        img: "facebook",
        index: 5
      },
      {
        x: 200,
        y: 320,
        scale: 0.3,
        img: "tiktok",
        index: 4
      },
      {
        x: 220,
        y: 320,
        scale: 0.3,
        img: "snapchat",
        index:5
      }*/
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
        x: 390,
        y: 460,
        scale: 0.5,
        img: "blue"
      },
      {
        x: 650,
        y: 330,
        scale: 0.5,
        img: "red"
      },
      {
        x: 75,
        y: 280,
        scale: 0.5,
        img: "green"
      },
      {
        x: 1130,
        y: 510,
        scale: 0.5,
        img: "yellow"
      },
      {
        x: 1090,
        y: 380,
        scale: 0.5,
        img: "red"
      },
      {
        x: 1125,
        y: 380,
        scale: 0.5,
        img: "green"
      },
      {
        x: 1140,
        y: 110,
        scale: 0.5,
        img: "yellow"
      },
      {
        x: 110,
        y: 280,
        scale: 0.5,
        img: "yellow"
      },/*
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
           },*/
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

    this.enemyArray = [
      {
        x: 470,
        y: 110,
        img: "./assets/monsters/spacemonster.png"
      },
      {
        x: 955,
        y: 250,
        img: "./assets/monsters/spacemonster.png"
      },/*
      {
        x: 0,
        y: 0,
        img: "./assets/monsters/spacemonster.png"
      },
      {
        x: 170,
        y: -450,
        img: "./assets/monsters/spacemonster.png"
      },
      {
        x: 1250,
        y: -450,
        img: "./assets/monsters/spacemonster.png"
      },
      {
        x: 250,
        y: -550,
        img: "./assets/monsters/spacemonster.png"
      },
      {
        x: 640,
        y: -920,
        img: "./assets/monsters/spacemonster.png"
      }*/
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
  }
}