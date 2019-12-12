// tslint:disable member-ordering

class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private lives: number;

    private currentScreen: any;
    private keyboardListener: KeyboardListener;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;


        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");

        this.lives = 3;

        this.keyboardListener = new KeyboardListener();
        this.currentScreen = new LevelScreen(this.canvas, this.ctx);

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
