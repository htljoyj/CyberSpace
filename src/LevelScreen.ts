class LevelScreen {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private terrain: Terrain[];
    private icon: Icon[];
    private jewel: Jewel[];

    private player: Player;
    private enemy: Enemy[];

    private live: number;
    private life: HTMLImageElement;

    private GRASS: string = "./assets/bricks/newBrick.png";

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.live = 3;
        this.life = new Image();
        this.life.src = './assets/heart-icon-png-transparent.png';

        this.terrain = [];
        this.enemy = [];
        this.player = new Player(80, 440, 4, 4, "./assets/player/player_cheer2.png");
        this.enemy.push(new Enemy(170, 120, 3, "./assets/monsters/gorilla-png-37880.png"));
        this.enemy.push(new Enemy(600, 400, 3, "./assets/monsters/gorilla-png-37880.png"));
        this.icon = [];
        this.icon.push(new Icon(1100, this.canvas.height + 8, 0.3, "./assets/socialmedia/fb.png"));
        this.icon.push(new Icon(200, 120, 0.3, "./assets/socialmedia/ins.png"));
        this.icon.push(new Icon(850, 150, 0.5, "./assets/socialmedia/wApp.png"));
        this.icon.push(new Icon(this.canvas.width / 2, this.canvas.height / 2, 0.5, "./assets/socialmedia/snapchat.png"));
        this.icon.push(new Icon(350, this.canvas.height - 190, 0.5, "./assets/socialmedia/twitter.png"));
        this.icon.push(new Icon(1100, 200 - 5, 0.7, "./assets/socialmedia/youtube.png"));
        this.icon.push(new Icon(200, 340 - 5, 0.3, "./assets/socialmedia/tiktok.png"));
        this.jewel = [];
        this.jewel.push(new Jewel(1150, 52, 0.5, "blue"));
        this.jewel.push(new Jewel(890, 310, 0.5, "blue"));
        this.jewel.push(new Jewel(450, 515, 0.5, "blue"));
        this.jewel.push(new Jewel(450, 209, 0.5, "blue"));
        this.jewel.push(new Jewel(700, 110, 0.5, "blue"));






        this.addBrick(75, this.canvas.height - 50, 0, './assets/bricks/newBrick.png')
        this.addBrick(200, this.canvas.height - 100, 0, './assets/bricks/newBrick.png')
        this.addBrick(325, this.canvas.height - 200, 0, './assets/bricks/newBrick.png')
        this.addBrick(440, this.canvas.height - 100, 0, this.GRASS)
        this.addBrick(600, this.canvas.height - 100, 0, './assets/bricks/newBrick.png')
        this.addBrick(725, this.canvas.height - 200, 0, this.GRASS)
        this.addBrick(850, this.canvas.height - 300, 0, this.GRASS)
        this.addBrick(975, this.canvas.height - 50, 0, this.GRASS)
        this.addBrick(1050, this.canvas.height - 50, 0, this.GRASS)
        this.addBrick(this.canvas.width / 2 - 50, this.canvas.height / 2, 0, this.GRASS)
        this.addBrick(this.canvas.width / 2 - 200, 200, 0, this.GRASS)
        this.addBrick(150, 100, 0, this.GRASS)
        this.addBrick(200, 300, 0, this.GRASS)
        this.addBrick(150, 300, 0, this.GRASS)
        this.addBrick(1100, 200, 0, this.GRASS)
        this.addBrick(1075, 375, 0, this.GRASS)
        this.addBrick(850, 150, 0, this.GRASS)
        this.addBrick(650, 100, 0, this.GRASS)
        this.addBrick(1150, 50, 0, this.GRASS)


        
    }

    public draw() {
        this.terrain.forEach((terrain) => {
            if (this.player.isColliding(terrain)) {
                this.player.collision();
                // this.player.gravity = 0.2;
                // this.player.move(this.canvas);
            } else if (this.player.gravity === 0) {
                this.player.gravity = 0.2;
            }
            for (let i = 0; i < this.enemy.length; i++) {
                if (this.enemy[i].isColliding(terrain)) {
                    this.enemy[i].collision();
                    // this.player.gravity = 0.2;
                    // this.player.move(this.canvas);
                } else if (this.enemy[i].gravity === 0) {
                    this.enemy[i].gravity = 0.2;
                }


            }
        });
        this.enemy.forEach((enemy) => {
            if (this.player.isColliding(enemy)) {
                this.player.playerDied();
            }
        })
        this.player.move(this.canvas);
        this.player.draw(this.ctx);
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemy[i].move(this.canvas);
            this.enemy[i].draw(this.ctx);
        }

        this.terrain.forEach((terrain) => {
            terrain.draw(this.ctx);
        });

        this.icon.forEach((icon) => {
            icon.draw(this.ctx);
        });

        this.jewel.forEach((jewel) => {
            jewel.draw(this.ctx)

        })
        
        this.writeLifeImagesToLevelScreen()
        if (this.player.getY() < 100) {
           this.terrain.forEach(element => {
            
               element.getYPos()-200
                console.log('trying')

            });
             this.icon.forEach(element => {
                element.getYPos()-200
                console.log('tryng 2')
             })

            this.jewel.forEach(element => {
                element.getYPos()-200

               console.log('trying 3')

            })

        }

    }

    private addBrick(xPos: number, yPos: number, speed: number, img: string) {
        this.terrain.push(new Terrain(xPos, yPos, speed, img, this.canvas, this.ctx));
    }

    /**
     * Uses the loaded life image to remaining lives of the player on the rop
     * left of the screen.
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    private writeLifeImagesToLevelScreen() {
        if (this.life.naturalWidth > 0) {
            let x = 10;
            const y = 10;
            // Start a loop for each life in lives
            for (let life = 0; life < this.live; life++) {
                // Draw the image at the curren x and y coordinates

                this.ctx.save();
                this.ctx.translate(x + this.life.x / 2, y + this.life.y / 2);
                this.ctx.scale(0.3, 0.3);
                // ctx.translate(-this.img.x, -this.img.y);
                this.ctx.drawImage(this.life, -this.life.width / 2, -this.life.height / 2);
                this.ctx.restore();
                // Increase the x-coordinate for the next image to draw
                x += 25;
            }
        }
    }

    /***
     * This function makes the y position move up by 200px
     */
    public up() {
        window.scrollBy(0, -200);
      
    }

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    public writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
