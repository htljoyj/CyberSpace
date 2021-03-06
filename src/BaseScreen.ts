class BaseScreen {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected terrain: Terrain[];
    protected icon: Icon[];
    protected jewel: Jewel[];
    protected flag: Terrain;
    protected finish: boolean = false;
    protected allIcons: boolean = false;
    protected keyboardListener: KeyboardListener;
    public static playerImg: string = "./assets/player/slime1.png"
    protected player: Player;
    protected enemy: Enemy[];
    protected enemyArray: any;
    protected iconArray: any;
    protected jewelArray: any;
    protected terrainArray: any;
    public static live: number;
    public static life: HTMLImageElement;
    private screen: number = 0;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        canvas.style.backgroundImage = "";
        this.keyboardListener = new KeyboardListener();
        BaseScreen.live = 3;
        BaseScreen.life = new Image();
        BaseScreen.life.src = './assets/heart-icon-png-transparent.png';

        this.player = new Player(80, 520, 4, 4, BaseScreen.playerImg);
        this.flag = new Terrain(680, -1300, 0, './assets/greenFlag.png', this.canvas, this.ctx)
        this.enemy = [];
        this.enemyArray = [];
        this.terrain = [];
        this.terrainArray = [];
        this.icon = [];
        this.iconArray = [];

        this.jewel = [];
        this.jewelArray = [];
    }

    /**
     * Uses the loaded life image to remaining lives of the player on the rop
     * left of the screen.
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    public writeLifeImagesToLevelScreen() {
        if (BaseScreen.life.naturalWidth > 0) {
            let x = 10;
            const y = 10;
            // Start a loop for each life in lives
            for (let life = 0; life < BaseScreen.live; life++) {
                // Draw the image at the current x and y coordinates

                this.ctx.save();
                this.ctx.translate(x + BaseScreen.life.x / 2, y + BaseScreen.life.y / 2);
                this.ctx.scale(0.3, 0.3);
                // ctx.translate(-this.img.x, -this.img.y);
                this.ctx.drawImage(BaseScreen.life, -BaseScreen.life.width / 2, -BaseScreen.life.height / 2);
                this.ctx.restore();
                // Increase the x-coordinate for the next image to draw
                x += 25;
            }
        }
    }

    public setPlayer(player:string){
        BaseScreen.playerImg = player;
        this.player = new Player(this.player.getX(), this.player.getY() -0.4, 4, 4, player);
    }

    public draw() {

        

        let isAnsweringQuestion = false;
        for (let i = 0; i < this.icon.length; i++) {
            if (this.player.isColliding(this.icon[i])) {
                this.icon[i].setAnsweringQuestion(true);
                isAnsweringQuestion = true;
                this.icon[i].drawQuestion(this.ctx, this.canvas);
                if (!this.icon[i].isAnsweringQuestion()) {
                    this.icon.splice(i, 1);
                    isAnsweringQuestion = false;
                }
            }
        }

        if (!isAnsweringQuestion) {
            this.flag.draw(this.ctx)
            this.finish = false;
            if (this.player.isColliding(this.flag)) {
                this.finish = true;
                // console.log("gelukt1");
            }
            this.terrain.forEach((terrain) => {
                if (this.player.isColliding(terrain)) {
                    this.player.collision();
                    console.log(terrain.getXPos(), terrain.getYPos())
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

            for (let i = 0; i < this.jewel.length; i++) {
                if (this.player.isColliding(this.jewel[i])) {
                    Game.score += this.jewel[i].getValue();
                    this.jewel.splice(i, 1);
                    console.log(Game.score);
                    let audio = new Audio("./assets/sounds/collect achievement.mp3");
                    audio.play();
                }
            }

            this.icon.forEach((icon) => {
                icon.draw(this.ctx, this.canvas);
                if (this.player.isColliding(icon)) {
                    // console.log("Boem!");
                }
            });

            for (let i = 0; i < this.icon.length; i++) {
                if (this.player.isColliding(this.icon[i])) {
                    this.icon[i].setAnsweringQuestion(true);
                    this.icon[i].drawQuestion(this.ctx, this.canvas);
                    if (!this.icon[i].isAnsweringQuestion()) {
                        this.icon.splice(i, 1);
                    }
                }
            }

            this.enemy.forEach((enemy) => {
                if (this.player.isColliding(enemy)) {
                    this.player.playerDied();
                    this.moveScreenDown();
                }
            });


            this.player.move(this.canvas);
            this.player.draw(this.ctx);
            for (let i = 0; i < this.enemy.length; i++) {
                this.enemy[i].move(this.canvas);
                this.enemy[i].draw(this.ctx);
            }

            if(this.player.getY() > this.canvas.height){
                this.player.playerDied();
                this.moveScreenDown();
            }

            this.terrain.forEach((terrain) => {
                terrain.draw(this.ctx);
            });



            this.jewel.forEach((jewel) => {
                jewel.draw(this.ctx)

            })

            this.writeLifeImagesToLevelScreen()

            let speed = 2;
            if (this.player.getY() < 150) {
                this.screen += speed;
                this.flag.setY(speed)
                this.terrain.forEach(element => {

                    element.getYPos()
                    element.setY(speed)
                    // console.log('trying')

                });
                this.icon.forEach(element => {
                    element.getYPos()
                    element.setY(speed)
                    // console.log('tryng 2')
                })
                this.enemy.forEach(element => {
                    element.getYPos()
                    element.setY(speed)

                    // console.log('trying 3')

                })
                this.jewel.forEach(element => {
                    element.getYPos()
                    element.setY(speed)

                    // console.log('trying 3')

                })
                this.player.getY()
                this.player.setY(speed)
            }

            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SHIFT)) {
                this.screen--;
                this.flag.setY(-speed)
                this.terrain.forEach(element => {

                    element.getYPos()
                    element.setY(-speed)
                    // console.log('trying')

                });
                this.icon.forEach(element => {
                    element.getYPos()
                    element.setY(-speed)
                    // console.log('tryng 2')
                })

                this.jewel.forEach(element => {
                    element.getYPos()
                    element.setY(-speed)

                    // console.log('trying 3')

                })
                this.enemy.forEach(element => {
                    element.getYPos()
                    element.setY(-speed)

                    // console.log('trying 3')

                })
                this.player.getY()
                this.player.setY(-speed)
            }
        }

        this.allIcons = false;

        if (this.icon.length == 0) {
            this.allIcons = true;
            console.log("hij doet het");
        }

        this.writeTextToCanvas(`Jouw score: ${Game.score}`, 20, this.canvas.width - 100, 40);
        this.writeTextToCanvas(`Aantal vragen: ${this.icon.length}`, 20, this.canvas.width - 120, 20);
    }

    private moveScreenDown() {
        this.flag.setY(-this.screen);
        this.terrain.forEach(element => {
            element.setY(-this.screen)
            // console.log('trying')

        });
        this.icon.forEach(element => {
            element.setY(-this.screen)
            // console.log('tryng 2')
        })
        this.enemy.forEach(element => {
            element.setY(-this.screen)

            // console.log('trying 3')

        })
        this.jewel.forEach(element => {
            element.setY(-this.screen)

            // console.log('trying 3')

        })
        this.player.setY(1);
        this.screen =0;
    }

    public getFinish() {
        return this.finish;
    }

    public getIcons() {
        return this.allIcons;
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