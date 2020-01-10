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
        x: 1340,
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
        x: 1200,
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
        x: 1250,
        y: 150,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },{
        x: 1000,
        y: 50,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },{
        x: 800,
        y: -5,
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
        x: 525,
        y: -320,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
        {
          x: 250,
          y: -450,
          speed: 0,
          img: "./assets/bricks/eel.png"
      },
        {
          x: 1100,
          y: -200,
          speed: 0,
          img: "./assets/bricks/eel.png"
      },

      {
        x: 1100,
        y: -500,
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
      },{
        x: 500,
        y: -550,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },{
      x: 750,
      y: -650,
      speed: 0,
      img: "./assets/bricks/eel.png"},
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
        x: 700,
        y: -1000,
        speed: 0,
        img: "./assets/bricks/eel.png"
      },
      {
        x: 680,
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

    this.iconArray = [{
      x: 380,
      y: 610,
      scale: 0.3,
      img: "facebook",
      index:6,
    },
    {
      x: 590,
      y: 90,
      scale: 0.3,
      img: "instagram",
      index:6
    },
    {
      x: 870,
      y: 30,
      scale: 0.3,
      img: "tiktok",
      index:6
    },
    {
      x: 1130,
      y: -190,
      scale: 0.5,
      img: "snapchat",
      index:6
    },
    {
      x: 1230,
      y: 455,
      scale: 0.7,
      img: "youtube",
      index:6
    },
    {
      x: 490,
      y: 315,
      scale: 0.5,
      img: "twitter",
      index:3
    },
    {
      x: 180,
      y: -110,
      scale: 0.7,
      img: "whatsapp",
      index:6
    },
    {
      x: 1150,
      y: -460,
      scale: 0.3,
      img: "facebook",
      index:7
    },
    {
      x: 220,
      y: -610,
      scale: 0.3,
      img: "instagram",
      index:7
    },
    {
      x: 800,
      y: -615,
      scale: 0.3,
      img: "tiktok",
      index:7
    },
    {
      x: 435,
      y: -1050,
      scale: 0.7,
      img: "youtube",
      index:7
    },
    {
      x: 630,
      y: -850,
      scale: 0.5,
      img: "snapchat",
      index:7
    },
   
    {
      x: 1090,
      y: -1090,
      scale: 0.7,
      img: "whatsapp",
      index:7}]
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

    this.jewelArray =[ {
      x: 850,
      y: 550,
      scale: 0.5,
      img: "purple"
    }, {
      x: 1365,
      y: 595,
      scale: 0.5,
      img: "red"
    }, {
      x: 350,
      y: 200,
      scale: 0.5,
      img: "red"
    }, {
      x: 1040,
      y: 50,
      scale: 0.5,
      img: "purple"
    }, {
      x: 840,
      y: -250,
      scale: 0.5,
      img: "red"
    }, {
      x: 275,
      y: -460,
      scale: 0.5,
      img: "purple"
    }, {
      x: 1340,
      y: -635,
      scale: 0.5,
      img: "red"
    }, {
      x: 390,
      y: -800,
      scale: 0.5,
      img: "red"
    },{
      x: 1200,
      y: -950,
      scale: 0.5,
      img: "purple"
    }]

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

    this.enemyArray = [ {
      x: 620,
      y: 280,
      img: "./assets/monsters/seahorse.gif"
    }, {
      x: 1120,
      y: 550,
      img: "./assets/monsters/seahorse.gif"},
        {
          x: 630,
          y: -250,
          img: "./assets/monsters/seahorse.gif"
      },  {
          x: 940,
          y: -900,
          img: "./assets/monsters/seahorse.gif"
      },
    ]
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
