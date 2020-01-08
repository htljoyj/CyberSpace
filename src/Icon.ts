class Icon {
    private xPos: number;
    private yPos: number;
    private scale: number;
    private img: HTMLImageElement;
    private snapchatQuestions: any;
    private platformQuestion: any[];
    private platform: string;
    private answeringQuestion: boolean;
    private keyboardListener: KeyboardListener;
    private twitterQuestions: any[];
    private whatsappQuestions: any[];
    private tiktokQuestions: any[];
    private youtubeQuestions: any[];
    private facebookQuestions: any[];
    private instagramQuestions: any[];

    public constructor(xPos: number, yPos: number, scale: number, platform: string, index: number = 0)
    {
        // let index = 0;
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.keyboardListener = new KeyboardListener();
        this.platformQuestion = [];
        
        this.snapchatQuestions = [];
        this.twitterQuestions = [];
        this.whatsappQuestions = [];
        this.tiktokQuestions = [];
        this.youtubeQuestions = [];
        this.facebookQuestions = [];
        this.snapchatQuestions = [{
            "platform": "snapchat",
            "question": "Wat is een expose groep?",
            "a": "Een groep waarin word gelachen.",
            "b": "Een groep waarin men niets vermoedende mensen belachelijk maakt.",
            "c": "Een groep om de nieuwste films in te bespreken.",
            "answer": "b"
        }];
        this.instagramQuestions = [];

        switch (platform) {
            case "twitter":
                this.img = Game.loadImage("./assets/socialmedia/twitter.png");
                this.platform = "twitter";
                this.platformQuestion = this.twitterQuestions[index];
                break;
            case "whatsapp":
                this.img = Game.loadImage("./assets/socialmedia/wApp.png");
                this.platform = "whatsapp";
                this.platformQuestion = this.whatsappQuestions[index];
                break;
            case "tiktok":
                this.img = Game.loadImage("./assets/socialmedia/tiktok.png");
                this.platform = "tiktok";
                this.platformQuestion = this.tiktokQuestions[index];
                break;
            case "youtube":
                this.img = Game.loadImage("./assets/socialmedia/youtube.png")
                this.platform = "youtube";
                this.platformQuestion = this.youtubeQuestions[index];
                break;
            case "facebook":
                this.img = Game.loadImage("./assets/socialmedia/fb.png");
                this.platform = "facebook";
                this.platformQuestion = this.facebookQuestions[index];
                break;
            case "snapchat":
                this.img = Game.loadImage("./assets/socialmedia/snapchat.png");
                this.platform = "snapchat";
                this.platformQuestion.push(this.snapchatQuestions[index]);
                console.log(this.snapchatQuestions[index]);
                break;
            case "instagram":
                this.img = Game.loadImage("./assets/socialmedia/ins.png");
                this.platform = "instagram";
                this.platformQuestion = this.instagramQuestions[index];
                break;
        }
    console.log(this.platformQuestion);
        // if (this.platformQuestions.length > 0)
        //     console.log(this.platformQuestions);
    }

    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        // We want the center of the image to be the position of this asteroid
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;

        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            // ctx.drawImage(this.img, x, y);
            ctx.save();
            ctx.translate(x + this.img.x / 2, y + this.img.y / 2);
            ctx.scale(this.scale, this.scale);
            // ctx.translate(-this.img.x, -this.img.y);
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
            ctx.restore();
        }
    }

   

    public setAnsweringQuestion(bool: boolean) {
        this.answeringQuestion = bool;
    }

    public isAnsweringQuestion() {
        return this.answeringQuestion;
    }

    private playerAnswer: string = "";
    public drawQuestion(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        if (this.isAnsweringQuestion()) {
            if (this.platformQuestion == undefined) {
                this.writeTextToCanvas(ctx, "Je hebt alle " + this.platform + "vragen al beantwoord", 30, canvas.width / 2, canvas.height / 2);
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                    this.setAnsweringQuestion(false);
                    this.playerAnswer = "";
                }
        }else {
                if (this.playerAnswer == "") {
                    this.writeTextToCanvas(ctx, this.platformQuestion[0].question + ">1: " + this.platformQuestion[0].a + ">2: " + this.platformQuestion[0].b + ">3: " + this.platformQuestion[0].c, 30, canvas.width / 2, canvas.height / 2);

                    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)) {
                        this.playerAnswer = "a";
                    } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_2)) {
                        this.playerAnswer = "b";
                    } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_3)) {
                        this.playerAnswer = "c";
                    }
                } else {
                    if (this.playerAnswer == this.platformQuestion[0].answer) {
                        this.writeTextToCanvas(ctx, "Dat klopt", 30, canvas.width / 2, canvas.height / 2);
                        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                            this.setAnsweringQuestion(false);
                            this.playerAnswer = "";
                        }
                    } else {
                        this.writeTextToCanvas(ctx, "Dat klopt niet", 30, canvas.width / 2, canvas.height / 2);
                        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                            this.playerAnswer = "";
                        }
                    }
                }
            }
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
    public writeTextToCanvas(ctx: CanvasRenderingContext2D,
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "black",
    ) {
        for(let i = 0; i < text.length; i++) {
            if(text.charAt(i) == ">")
            {
                this.writeTextToCanvas(ctx, text.substr(i+1, text.length), fontSize, xCoordinate, yCoordinate + (75/2), alignment, color);
                text = text.substr(0, i);
            }
        }        

        ctx.font = `${fontSize}px Patrick Hand`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        if(text.trim() !== "3:")
            ctx.fillText(text.trim(), xCoordinate, yCoordinate);
    }

    public getXPos() {
        return this.xPos// + this.getImgWidth();
    }
    public setY(y:number){
        this.yPos += y;

    }
    public getYPos() {
        return this.yPos - this.img.height;
    }
    public getImgHeight() {
        return this.img.height * this.scale;
    }
    public getImgWidth() {
        return this.img.width * this.scale;
    }
} 
