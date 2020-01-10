/// <reference path = "BaseScreen.ts"/>
class UnderwaterScreen extends BaseScreen {

  public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx)
    canvas.style.backgroundImage =
      "url('./assets/backgrounds/underwater-gif-background.gif')";
    this.terrainArray = []
    this.terrainArray = [
      {
        x: 75,
        y: this.canvas.height - 50,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 820,
        y: this.canvas.height - 150,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 1300,
        y: 600,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 1100,
        y: 650,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 320,
        y: 570,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 1300,
        y: this.canvas.height - 250,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },

      {
        x: 600,
        y: 650,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 820,
        y: 300,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 450,
        y: 300,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 180,
        y: 300,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 1060,
        y: 300,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 1120,
        y: 150,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 620,
        y: 380,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 520,
        y: 50,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 320,
        y: 200,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 150,
        y: -100,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },{
          x:630,
          y:-100,
          speed:0,
          img:"./assets/bricks/eel.png"
      },
      {
        x: 1300,
        y: -100,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 820,
        y: -250,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 620,
        y: -350,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 1050,
        y: -480,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 1300,
        y: -650,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 150,
        y: -650,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 600,
        y: -850,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 940,
        y: -750,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 350,
        y: -800,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 1180,
        y: -950,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 400,
        y: -1050,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 1050,
        y: -1080,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 420,
        y: -1000,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 820,
        y: -1250,
        speed: 0,
        img: "./assets/bricks/eel.png"
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
