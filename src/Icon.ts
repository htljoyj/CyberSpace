class Icon {
  private xPos: number;
  private yPos: number;
  private scale: number;
  private img: HTMLImageElement;
  private questions: any;
  private platformQuestions: any;
  private whatsappQuestions: any;
  private facebookQuestions: any;
  private snapchatQuestions: any;
  private youtubeQuestions: any;
  private twitterQuestions: any;
  private tiktokQuestions: any;
  private instagramQuestions: any;
  private platform: string;
  private answeringQuestion: boolean;
  private keyboardListener: KeyboardListener;

  public constructor(
    xPos: number,
    yPos: number,
    scale: number,
    platform: string
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.scale = scale;
    this.keyboardListener = new KeyboardListener();
    this.questions = [];
    this.platformQuestions = [];
    this.instagramQuestions = [
      {
       " platform": "instagram",
      "question":
          " Op jouw Instagram foto’s zie je een heleboel haatreacties staan van onbekende personen.",
       " a": "Je wordt er verdrietig van.",
       " b":
          "Je reageert terug door middel van een soortgelijke reactie te plaatsen.",
        "c": "Je rapporteert de profielen en zet jouw account op privé.",
        "answer": "c"
      }
    ];
    this.twitterQuestions = [
      {
        "platform": "twitter",
        "question": "Ben jij ook schuldig als je een gemene tweet retweet?",
        "a": "Ja",
        "b": "Nee",
        "c": "Misschien",
        "answer": "a"
      },
      {
        "platform": "twitter",
        "question":
          " Een groepje besluit het nieuw meisje in de klas een les te leren.>Samen besluiten zij om twitter account met haar naam aan te maken en beledigende berichten te versturen.> Jouw beste vriend/vriendin behoort ook tot de groep en vind het een goed plan.> Hoe ga je hiermee om?",
        "a":
          "Je geeft dit meteen door aan de leraar, omdat je weet hoe het aanvoelt om gepest te worden. ",
        "b": "Je bemoeit je er niet mee, want ook jij werd in het begin gepest.",
        "c": "",
       "answer": "a"
      }
    ];
    this.whatsappQuestions = [
      {
        "platform": "whatsapp",
        "question":
          "Wat doe je als iemand belachelijk word gemaakt in de klassen app?",
        "a": "Ik bemoei me er niet mee, straks ben ik de volgende.",
        "b": "Diegene verdient het.",
       "c":
          "Ik maak een screenshot van wat er gezegd is als bewijs en stel de persoon die belachelijk wordt > gemaakt op zijn gemak.",
        "answer": "c"
      },
      {
        "platform": "whatsapp",
        "question":
          "Na de schooltrip ontvang je een Whatsapp berichtje in de groepsapp,> waarin een minder leuke foto van een schoolgenoot is doorgegestuurd door je beste vriend/vriendin.> Hoe reageer jij?",
        "a": "HAHAHA!!!, anders hoor ik niet tot de groep.",
       " b": "Ik reageer niet.",
        "c": "Ik maak een screenshot en geef het door aan de leraar. ",
        "answer": "c"
      },
      {
       "platform": "whatsapp",
       "question":
          "Je krijgt een vreemd bericht binnen van een onbekend nummer, hoe reageer jij?",
        "a": "Ik probeer te achterhalen wie het is.",
        "b": "Ik stuur iets vreemds terug.",
        "c": "Ik blokkeer en verwijder het nummer.",
        "answer": "c"
      }
    ];
    this.youtubeQuestions = [
      {
        "platform": "youtube",
        
        "question":
          "Je ontvangt een YouTube link van je vriend/vriendin met het verzoek om een haatreactie onder het filmpje te plaatsen omdat hij/zij dat ook heeft gedaan.> In de video bespreekt de vlogger het over internetgevaren voor de jeugd en waarom het niet handig is dat kinderen van groep 7 op social media zitten.",
        "a":
          "Je bent oneens met het filmpje en vindt het gepast om een haatreactie te plaatsen.",
        "b":
          "Je gaat in op het verzoek, omdat het je vriend/vriendin dat ook voor jou zou doen.",
        "c":
          "Ik wijs mijn vriendin erop dat het niet netjes is en ik zal dan ook geen reactie plaatsen.",
        "answer": "c"
      },
      {
        "platform": "youtube",
        "question":
          "Wat doe je als iemand ongevraagd een filmpje van jouw op youtube zet?",
        "a": "Ik vraag de persoon om het direct te verwijderen.",
        "b": "Ik durf niet zo goed te vragen of ze het weghalen.",
        "c": "Ik hoop stilletjes dat niemand het ziet.",

      }
    ];
    this.facebookQuestions = [
      {
        "platform": "facebook",
        "question":
          "Accepteer jij zomaar een vriendschap verzoek van een onbekend persoon?",
        
        "a": "Ja",
        "b": "Nee",
        "c": "Soms",
        "answer" : "b"
      },
      {
        "platform": "facebook",
        "question":
          "Je wordt door een schoolgenoot, waarmee jij ook op Facebook bevriend ben, benaderd over je vreemde statussen.> Na deze tezien te hebben weet jij zeker dat deze niet door jou geplaatst zijn.> Alleen je beste vriend/vriendin kent jouw gebruikersnaam en wachtwoord.>Wat is jou reactie?",
       "a":
          "Je logt in op zijn/haar account en plaats ook een soortgelijk status.",
        "b":
          "Je verandert meteen jouw inloggegevens en spreekt hem/haar hierop aan.",
        "c":
          "Je gaat er niet op in, want het is je beste vriend/vriendin met wie je alle geheimen deelt.",
        "answer": "b"
      }
    ];
    this.snapchatQuestions = [
      {
       "platform": "snapchat",
        "question": "Wat is een expose groep?",
        "a": "Een groep waarin word gelachen.",
        "b": "Een groep waarin men niets vermoedende mensen belachelijk maakt.",
        "c": "Een groep om de nieuwste films in te bespreken.",
        "answer": "b"
      },
      {
        "platform": "snapchat",
        "question":
          "In de kantine hoor je een groepje lachen over pikante foto’s die een klasgenoot op Snapchat geplaatst heeft van zichzelf. ",
        "a":
          ". Je sluit je aan bij de groep, omdat je de foto’s ook hebt gezien en lacht mee.",
        "b":
          "Je vertelt ook aan de overige klasgenoten over de foto’s, anders weten zij het niet.",
        "c":
          "Je benadert de klasgenoot en legt uit wat de consequenties kunnen zijn van zijn/haar handeling.",
        "answer": "c"
      }
    ];
    this.tiktokQuestions = [
      {
        "platform": "tiktok",
        "question":
          "Waarom is het niet zo handig om in een topje en een kortbroekje een Tik Tok filmpje te maken?",
       "a": "Daar is niks mis mee.",
        "b":
          "Er zitten pedofielen op Tik Tok die misbruik kunnen maken van jouw beeldmateriaal!",
        "c": "Hrt kan soms koud zijn.",
        "answer": "b"
      }
    ];

    this.questions = [];

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
        this.img = Game.loadImage("./assets/socialmedia/youtube.png");
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

    if (this.platformQuestions.length > 0) console.log(this.platformQuestions);
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
  public drawQuestion(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    if (this.isAnsweringQuestion()) {
      if (
        this.platformQuestions.length == 0 ||
        this.platformQuestions == undefined
      ) {
        this.writeTextToCanvas(
          ctx,
          "Je hebt alle " + this.platform + "vragen al beantwoord",
          20,
          canvas.width / 2,
          canvas.height / 2
        );
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
          this.setAnsweringQuestion(false);
          this.playerAnswer = "";
        }
      } else {
        if (this.playerAnswer == "") {
          // this.writeTextToCanvas(ctx, this.platformQuestions[0].question, 20, canvas.width / 2, canvas.height / 2);
          // this.writeTextToCanvas(ctx, "1: " + this.platformQuestions[0].a, 20, canvas.width / 2, canvas.height / 2 + 75);
          // this.writeTextToCanvas(ctx, "2: " + this.platformQuestions[0].b, 20, canvas.width / 2, canvas.height / 2 + 150);
          // this.writeTextToCanvas(ctx, "3: " + this.platformQuestions[0].c, 20, canvas.width / 2, canvas.height / 2 + 225);

          this.writeTextToCanvas(
            ctx,
            this.platformQuestions[0].question +
              ">1: " +
              this.platformQuestions[0].a +
              ">2: " +
              this.platformQuestions[0].b +
              ">3: " +
              this.platformQuestions[0].c,
            20,
            canvas.width / 2,
            canvas.height / 2
          );

          if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)) {
            this.playerAnswer = "a";
          } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_2)) {
            this.playerAnswer = "b";
          } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_3)) {
            this.playerAnswer = "c";
          }
        } else {
          if (this.playerAnswer == this.platformQuestions[0].answer) {
            this.writeTextToCanvas(
              ctx,
              "Dat klopt",
              20,
              canvas.width / 2,
              canvas.height / 2
            );
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
              this.setAnsweringQuestion(false);
              this.playerAnswer = "";
              this.platformQuestions.shift();
            }
          } else {
            this.writeTextToCanvas(
              ctx,
              "Dat klopt niet",
              20,
              canvas.width / 2,
              canvas.height / 2
            );
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
  public writeTextToCanvas(
    ctx: CanvasRenderingContext2D,
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "black"
  ) {
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) == ">") {
        this.writeTextToCanvas(
          ctx,
          text.substr(i + 1, text.length),
          fontSize,
          xCoordinate,
          yCoordinate + 75 / 2,
          alignment,
          color
        );
        text = text.substr(0, i);
      }
    }

    ctx.font = `${fontSize}px Minecraft`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    if (text.trim() !== "3:")
      ctx.fillText(text.trim(), xCoordinate, yCoordinate);
  }

  public getXPos() {
    return this.xPos; // + this.getImgWidth();
  }
  public setY(y: number) {
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
