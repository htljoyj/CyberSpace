class Player {

    private xPos: number;
    private yPos: number;
    private xVel: number;
    private yVel: number;
    private img: HTMLImageElement;
    private keyboardListener:KeyboardListener;


    /**
     * Construct a new Player object.
     *
     * @param xPos X coordinate 
     * @param yPos Y coordinate 
     * @param xVel X velocity
     * @param yVel Y velocity
     * @param imgUrl Url of the image to load
     */
    public constructor(xPos:number, yPos:number, xVel:number, yVel:number, imgUrl:string){
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        // this.loadImage(imgUrl);
    }




    /**
     * Loads an image file into the DOM. The image is stored in the img
     * attribute of this class before it is loaded. This means that this.img
     * always holds an HTMLImageElement, but it might be empty
     *
     * @param {string} source - the name of the image file to load
     */
    // private loadImage(source: string) {
        // this.img = new Image();
        // Now, set the src to start loading the image
        // this.img.src = source;
    // }
}