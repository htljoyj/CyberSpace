class Terrain {
    private xPos:number;
    private yPos:number;
    private speed:number;
    private img:HTMLImageElement


    public constructor(xPos:number, yPos:number, speed:number, imgUrl:string){
        this.xPos = xPos;
        this.yPos = xPos;
        this.speed = speed;
        this.loadImage(imgUrl)

    }
      public draw(){
          
      }

    /**
     * Loads an image file into the DOM. The image is stored in the img
     * attribute of this class before it is loaded. This means that this.img
     * always holds an HTMLImageElement, but it might be empty
     *
     * @param {string} source - the name of the image file to load
     */
    private loadImage(source: string) {
        this.img = new Image();
        // Now, set the src to start loading the image
        this.img.src = source;
    }
}