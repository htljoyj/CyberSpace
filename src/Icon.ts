class Icon {
    private xPos: number;
    private yPos: number;
    private scale: number;
    private img: HTMLImageElement;
    private questions: any;
    private platformQuestions: any;
    private platform: string;
    private answeringQuestion: boolean;
    private keyboardListener: KeyboardListener;

    public constructor(xPos: number, yPos: number, scale: number, platform: string) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.keyboardListener = new KeyboardListener();
        this.questions = [];
        this.platformQuestions = [];
        this.questions = [{
            "platform": "snapchat",
            "question": "Wat is een expose groep?",
            "a": "Een groep waarin word gelachen.",
            "b": "Een groep waarin men niets vermoedende mensen belachelijk maakt.",
            "c": "Een groep om de nieuwste films in te bespreken.",
            "answer": "b"
        }, {
            "platform": "facebook",
            "question": "Accepteer jij zomaar een vriendschap verzoek van een onbekend persoon?",
            "a": "ja",
            "b": "nee",
            "c": "",
            "answer": "b"
        }, {
            "platform": "tiktok",
            "question": "Waarom is het niet zo handig om in een topje en een kortbroekje een Tik Tok filmpje te maken?",
            "a": "Daar is niks mis mee.",
            "b": "Er zitten pedofielen op Tik Tok die misbruik kunnen maken van jouw beeldmateriaal!",
            "c": "",
            "answer": "b"
        }, {
            "platform": "whatsapp",
            "question": "Wat doe je als iemand belachelijk word gemaakt in de klassen app?",
            "a": "Ik bemoei me er niet mee, straks ben ik de volgende.",
            "b": "Diegene verdient het.",
            "c": "Ik maak een screenshot van wat er gezegd is als bewijs en stel de persoon die belachelijk wordt gemaakt op zijn gemak.",
            "answer": "c"
        }, {
            "platform": "whatsapp",
            "question": "Na de schooltrip ontvang je een Whatsapp berichtje in de groepsapp, waarin een minder leuke foto van een schoolgenoot is doorgegestuurd door je beste vriend/vriendin. Hoe reageer jij?",
            "a": "Ik bemoei me er niet mee, straks ben ik de volgende.",
            "b": "Diegene verdient het.",
            "c": "Ik maak een screenshot van wat er gezegd is als bewijs en stel de persoon die belachelijk wordt gemaakt op zijn gemak.",
            "answer": "c"
        }, {
            "platform": "whatsapp",
            "question": "Tijdens het spelen van een game popt er een scherm op waarin staat dat jij de hoogste score hebt. Om dit te registeren wordt er gevraagd naar je voor -en achternaam.",
            "a": "Ik vul dit naar waarheid in en ga verder met de game.",
            "b": "Ik verzin een mooie nickname en vul deze in.",
            "c": "Ik klik het schermpje weg",
            "answer": "c"
        }, {
            "platform": "twitter",
            "question": "hallo>hoi",
            "a": "ja",
            "b": "nee",
            "c": "zzz",
            "answer": "a"
        }];

        switch (platform) {
            case "twitter":
                this.img = Game.loadImage("./assets/socialmedia/twitter.png");
                this.platform = "twitter";
                break;
            case "whatsapp":
                this.img = Game.loadImage("./assets/socialmedia/wApp.png");
                this.platform = "whatsapp";
                break;
            case "tiktok":
                this.img = Game.loadImage("./assets/socialmedia/tiktok.png");
                this.platform = "tiktok";
                break;
            case "youtube":
                this.img = Game.loadImage("./assets/socialmedia/youtube.png")
                this.platform = "youtube";
                break;
            case "facebook":
                this.img = Game.loadImage("./assets/socialmedia/fb.png");
                this.platform = "facebook";
                break;
            case "snapchat":
                this.img = Game.loadImage("./assets/socialmedia/snapchat.png");
                this.platform = "snapchat";
                break;
            case "instagram":
                this.img = Game.loadImage("./assets/socialmedia/ins.png");
                this.platform = "instagram";
                break;
        }

        this.questions.forEach((questions: any) => {
            if (questions.platform == this.platform) {
                this.platformQuestions.push(questions);
            }
        });

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
            if (this.platformQuestions.length == 0 || this.platformQuestions == undefined) {
                this.writeTextToCanvas(ctx, "Je hebt alle " + this.platform + "vragen al beantwoord", 20, canvas.width / 2, canvas.height / 2);
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                    this.setAnsweringQuestion(false);
                    this.playerAnswer = "";
                }
            } else {
                if (this.playerAnswer == "") {
                    this.writeTextToCanvas(ctx, this.platformQuestions[0].question, 20, canvas.width / 2, canvas.height / 2);
                    this.writeTextToCanvas(ctx, "1: " + this.platformQuestions[0].a, 20, canvas.width / 2, canvas.height / 2 + 75);
                    this.writeTextToCanvas(ctx, "2: " + this.platformQuestions[0].b, 20, canvas.width / 2, canvas.height / 2 + 150);
                    this.writeTextToCanvas(ctx, "3: " + this.platformQuestions[0].c, 20, canvas.width / 2, canvas.height / 2 + 225);
                    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)) {
                        this.playerAnswer = "a";
                    } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_2)) {
                        this.playerAnswer = "b";
                    } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_3)) {
                        this.playerAnswer = "c";
                    }
                } else {
                    if (this.playerAnswer == this.platformQuestions[0].answer) {
                        this.writeTextToCanvas(ctx, "Dat klopt", 20, canvas.width / 2, canvas.height / 2);
                        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                            this.setAnsweringQuestion(false);
                            this.playerAnswer = "";
                            this.platformQuestions.shift();
                        }
                    } else {
                        this.writeTextToCanvas(ctx, "Dat klopt niet", 20, canvas.width / 2, canvas.height / 2);
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

        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
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
