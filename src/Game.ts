
class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private currentScreen: any;
    private keyboardListener: KeyboardListener;

    public static score: number = 0;
    public static level: number;


    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        Game.level = 1;


        this.canvas.width = 1400;
        this.canvas.height = 700;

        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");


        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new TitleScreen(this.canvas, this.ctx);

        this.loop();
    }

    /**
     * Method game loop
     */
    public loop = () => {
        // Decide which screen to draw
        this.switchScreen();

        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw the current screen
        this.currentScreen.draw();

        // Request the next animation frame
        requestAnimationFrame(this.loop);
    }

    private switchScreen() {

        if (this.currentScreen instanceof TitleScreen && this.keyboardListener.isKeyDown(KeyboardListener.KEY_H)) {
            this.currentScreen = new Tutorial(this.canvas, this.ctx);
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if ((this.currentScreen instanceof TitleScreen && Game.level === 1 && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))) {
            this.currentScreen = new GroundScreen(this.canvas, this.ctx);
        }
        if ((this.currentScreen instanceof TitleScreen && Game.level === 2 && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))) {
            this.currentScreen = new CloudScreen(this.canvas, this.ctx);
        }
        if ((this.currentScreen instanceof TitleScreen && Game.level === 3 && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))) {
            this.currentScreen = new SpaceScreen(this.canvas, this.ctx);
        }
        if ((this.currentScreen instanceof TitleScreen && Game.level === 4 && this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE))) {
            this.currentScreen = new UnderwaterScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof GroundScreen && Game.level === 2) {
            this.currentScreen = new CloudScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof CloudScreen && Game.level === 3) {
            this.currentScreen = new SpaceScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof SpaceScreen && Game.level === 4) {
            this.currentScreen = new UnderwaterScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof GroundScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof CloudScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof SpaceScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
        if (this.currentScreen instanceof UnderwaterScreen && BaseScreen.live === 0) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }

        if (this.currentScreen instanceof UnderwaterScreen && Game.level === 5) {
            this.currentScreen = new EndScreen(this.canvas, this.ctx);
        }
        
        
        // if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)){
        //     this.currentScreen = new GroundScreen(this.canvas, this.ctx);
        // }
        // if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_2)){
        //     this.currentScreen = new CloudScreen(this.canvas, this.ctx);
        // }
        //this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        
        if((this.currentScreen instanceof GroundScreen || this.currentScreen instanceof CloudScreen || this.currentScreen instanceof SpaceScreen)&& this.currentScreen.getFinish() && this.currentScreen.getIcons()){
            Game.level++
            console.log(Game.level);
        }
    }
    
    /**
     * Loads an image file into the DOM. The image is stored in the img
     * attribute of this class before it is loaded. This means that this.img
     * always holds an HTMLImageElement, but it might be empty
     *
     * @param {string} source - the name of the image file to load
     */
    public static loadImage(source: string) {
        let img = new Image();
        // Now, set the src to start loading the image
        img.src = source;
        return img;
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const game = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
