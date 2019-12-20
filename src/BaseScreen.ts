class BaseScreen {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected terrain: Terrain[];
    protected icon: Icon[];
    protected jewel: Jewel[];
    protected flag:Terrain;

    protected player: Player;
    protected enemy: Enemy[];
    protected enemyArray: any;
    protected iconArray: any;
    protected jewelArray: any;
    protected terrainArray: any;
    public static live: number;
    public static life: HTMLImageElement;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        canvas.style.backgroundImage = "";
        BaseScreen.live = 3;
        BaseScreen.life = new Image();
        BaseScreen.life.src = './assets/heart-icon-png-transparent.png';

        this.player = new Player(80, 520, 4, 4, "./assets/player/player_cheer2.png");
        this.flag = new Terrain(680,-1300,0,'./assets/greenFlag.png',this.canvas,this.ctx)
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
                // Draw the image at the curren x and y coordinates

                this.ctx.save();
                this.ctx.translate(x + BaseScreen.life.x / 2, y + BaseScreen.life.y / 2);
                this.ctx.scale(0.3, 0.3);
                // ctx.translate(-this.img.x, -this.img.y);
                this.ctx.drawImage(BaseScreen.life, -BaseScreen.life.width / 2, -BaseScreen.life.height / 2);
                this.ctx.restore();
                // Increase the x-coordinate for the next image to draw
                x += 25;
            }}}

            public draw(){
                this.flag.draw(this.ctx)
                this.terrain.forEach((terrain) => {
                    if (this.player.isColliding(terrain)) {
                        this.player.collision();
                        console.log(terrain.getXPos(),terrain.getYPos())
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
        
                for(let i = 0; i < this.jewel.length; i++) {
                    if(this.player.isColliding(this.jewel[i])) {
                        Game.score += this.jewel[i].getValue();
                        this.jewel.splice(i, 1);
                        console.log(Game.score);
                    }
                }
        
                this.icon.forEach((icon) => {
                    icon.draw(this.ctx, this.canvas);
                    if (this.player.isColliding(icon)) {
                        console.log("Boem!");
                    }
                });
        
                this.enemy.forEach((enemy) => {
                    if (this.player.isColliding(enemy)) {
                        this.player.playerDied();
                    }
                });
        
                this.player.move(this.canvas);
                this.player.draw(this.ctx);
                for (let i = 0; i < this.enemy.length; i++) {
                    this.enemy[i].move(this.canvas);
                    this.enemy[i].draw(this.ctx);
                }
        
                this.terrain.forEach((terrain) => {
                    terrain.draw(this.ctx);
                });
        
                
        
                this.jewel.forEach((jewel) => {
                    jewel.draw(this.ctx)
        
                })
                
                this.writeLifeImagesToLevelScreen()
        
                if (this.player.getY() < 150) {
                    this.flag.setY(1)
                   this.terrain.forEach(element => {
                    
                       element.getYPos()
                       element.setY(1)
                        console.log('trying')
        
                    });
                     this.icon.forEach(element => {
                        element.getYPos()
                        element.setY(1)
                        console.log('tryng 2')
                     })
        
                    this.jewel.forEach(element => {
                        element.getYPos()
                        element.setY(1)
        
                       console.log('trying 3')
        
                    })
        
               
                
                }
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