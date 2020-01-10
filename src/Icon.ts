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

    private img1: string = "";
    private img2: string = "";
    private img1x: number = 0;
    private img1y: number = 0;
    private img2x: number = 0;
    private img2y: number = 0;


    public constructor(xPos: number, yPos: number, scale: number, platform: string, index: number = 0) {
        // let index = 0;
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.keyboardListener = new KeyboardListener();
        this.platformQuestion = [];


        this.facebookQuestions = [
            {
                "platform": "facebook",
                "question":
                    "Accepteer jij zomaar een vriendschap verzoek van een onbekend persoon?",
                "a": "Ja",
                "b": "Nee",
                "c": "Soms",
                "answer": "b"
            },
            {
                "platform": "facebook",
                "question":
                    "Je wordt door een schoolgenoot, waarmee jij ook op Facebook bevriend bent, benaderd over je vreemde statussen.> Na deze tezien te hebben weet jij zeker dat deze niet door jou geplaatst zijn.> Alleen je beste vriend/vriendin kent jouw gebruikersnaam en wachtwoord.>Wat is jou reactie?",
                "a":
                    "Je logt in op zijn/haar account en plaats ook een soortgelijk status.",
                "b":
                    "Je verandert meteen jouw inloggegevens en spreekt hem/haar hierop aan.",
                "c":
                    "Je gaat er niet op in, want het is je beste vriend/vriendin met wie je alle geheimen deelt.",
                "answer": "b"
            }, {
                "platform": "facebook",
                "question":
                    "Als iemand iets post over een onderwerp waar jij het niet mee eens bent,> is het dan nodig om erop te reageren?>",
                "a":
                    "Nee, ik scroll door naar iets wat ik wél leuk vind!",
                "b":
                    "Natuurlijk hoe durft diegene zoiets te plaatsen!",
                "c":
                    "Misschien",
                "answer": "a"
            }, {
                "platform": "facebook",
                "question":
                    "Hoe herken je een fake account?",
                "a":
                    "Wanneer het profiel al meer dan vijf jaar oud is.",
                "b":
                    "Als iemand geen profiel foto heeft.",
                "c":
                    "Als het profiel net aangemaakt is en meer dan 4000 vrienden heeft.",
                "answer": "c"
            }, {
                "platform": "facebook",
                "question":
                    "Je krijgt een vriendschapsverzoek van je nicht, alleen je nicht heeft al een facebook profiel.>Iemand heeft een account aangemaakt die precies op die van haar lijkt!> Waar is hier sprake van?",
                "a":
                    "Account stelen",
                "b":
                    "Profieltje-pik",
                "c":
                    "Identiteitshack",
                "answer": "c"
            }, {
                "platform": "facebook",
                "question":
                    "Een onbekende wil via facebook zijn oude spelcomputer verkopen door bij jou langs te gaan.>Hij vraagt hierom om jouw adres.>Geef jij dit?",
                "a":
                    "Ja",
                "b":
                    "Nee, want ik geef niet zomaar mijn adres aan onbekenden.",
                "c":
                    "",
                "answer": "b"
            }, {
                "platform": "facebook",
                "question":
                    "Een zogenaamde oude bekende stuurt een berichtje dat hij je weer een keer wil zien.>Hoe reageer je hier op?",
                "a":
                    "Ik spreek af wanneer ik kan.",
                "b":
                    "Ik probeer er achter te komen of het klopt dat ik hem/haar ken.",
                "c":
                    "",
                "answer": "b"
            }, {
                "platform": "facebook",
                "question":
                    "Je ziet dat iemand jouw identiteit gebruikt om nare dingen over mensen te plaatsen.>Wat doe je?",
                "a":
                    "Ik stuur een persoonlijk bericht of diegene wil stoppen.",
                "b":
                    "Ik rapporteer het profiel.",
                "c":
                    "Ik doe niks.",
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
                    "In de kantine hoor je een groepje lachen over pikante foto’s die een klasgenoot op Snapchat geplaatst heeft van zichzelf.",
                "a":
                    ". Je sluit je aan bij de groep, omdat je de foto’s ook hebt gezien en lacht mee.",
                "b":
                    "Je vertelt ook aan de overige klasgenoten over de foto’s, anders weten zij het niet.",
                "c":
                    "Je benadert de klasgenoot en legt uit wat de consequenties kunnen zijn van zijn/haar handeling.",
                "answer": "c"
            }, {
                "platform": "snapchat",
                "question":
                    "Heeft Snapchat het recht jouw foto's te gebruiken?",
                "a":
                    "Absoluut niet daar heb ik niet voor getekend!",
                "b":
                    "Ja, daar heb ik Snapchat recht opgegeven bij het downloaden van de app.",
                "c":
                    "Als ze ervoor betalen wel.",
                "answer": "b"
            },
            {
                "platform": "snapchat",
                "question": "Als je een foto prive naar je vriend of vriendin stuurt is het dan gegarandeert alleen tussen jullie?",
                "a": "Ja natuurlijk dat is mijn vriendin of vriend",
                "b": "Nee iedereen kan het dan zien.",
                "c": "Ik hoef mijn vriend niet te wantrouwen,> maar ik moet wel opletten wat ik stuur er kunnen altijd screenshots worden genomen!.",
                "answer": "c"
            }, {
                "platform": "snapchat",
                "question": "Wat is het gevaar van Snap Map?",
                "a": "Iedereen die jou volgt kan je nauwkeurig volgen en zien waar je bent.",
                "b": "Het is niet gevaarlijk",
                "c": "Mijn ouders kunnen zien waar ik ben.",
                "answer": "a"
            }, {
                "platform": "snapchat",
                "question": "Hoe scherm je de Snap Map af?",
                "a": "Door het op onzichtbare modus in te stellen.",
                "b": "Door Snapchat te verwijderen",
                "c": "Door je locatie uit te zetten",
                "answer": "a"
            }, {
                "platform": "snapchat",
                "question": "Je krijgt een vies plaatje binnen die 3 sec te zien is. > Wat doe je hiermee?",
                "a": "Ik negeer het.",
                "b": "Ik bespreek het met mijn ouders.",
                "c": "Ik rapporteer, blokkeer en verwijder het profiel en bespreek het met mijn ouders om eventueel verdere stappen te ondernemen.",
                "answer": "c"
            }, {
                "platform": "snapchat",
                "question": "Weet je waar je terecht kunt mocht jij slachtoffer worden van een expose groep?",
                "a": "Bij mijn ouders en docenten",
                "b": "Bij de politie en hulplijnen",
                "c": "Al het bovenstaande",
                "answer": "c"
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
                    "Na de schooltrip ontvang je een Whatsapp berichtje in de groepsapp,> waarin een minder leuke foto van een schoolgenoot is doorgestuurd door je beste vriend/vriendin.> Hoe reageer jij?",
                "a": "HAHAHA!!!, anders hoor ik niet tot de groep.",
                "b": "Ik reageer niet.",
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
            }, {

                "platform": "whatsapp",
                "question": "Je vriend/vriendin stuurt dat hij je graag zou willen kussen en vraagt wat jij dan zou doen.> Je voelt je eigenlijk niet zo prettig bij dit gesprek.> Hoe ga jij hiermee om?",
                "a": "Ik antwoord helemaal niet.",
                "b": "Ik geef aan dat ik het niet prettig vind, want als het echt mijn vriend is respecteert hij die keuzen.",
                "c": "Ik stuur terug dat ik het ook zou willen anders vindt hij mij misschien preuts.",
                "answer": "b"
            },
            {

                "platform": "whatsapp",
                "question": "Je hebt ooit een naaktfoto gestuurd naar je vriend/vriendin.> Nu word je bedreigt dat als je er niet nog een stuurt, de foto rond zal gaan.> Hoe heet dit begrip?",
                "a": "Sextortation",
                "b": "Cyberpesten",
                "c": "Grooming",
                "answer": "a"
            }, {
                "platform": "whatsapp",
                "question": "Er wordt een naaktfoto van je schoolgenoot rondgestuurd.> Als je die foto in bezit hebt, ben jij dan ook strafbaar voor kinderpornografie?",
                "a": "Nee, want we zijn allebei minderjarig.",
                "b": "Nee, want ze heeft hem zelf gemaakt.",
                "c": "Ja, want het meisje is jonger dan achttien dan valt dat onder kinderporno, ongeacht hoe oud ik zelf ben!",
                "answer": "c"



            }, {
                "platform": "whatsapp",
                "question": "Hoe kan ik mijzelf het beste beschermen tegen ongewilde berichtjes?",
                "a": "Alle instellingen instellen op alleen zichtbaar voor mijn contacten",
                "b": "Alle instellingen instellen op alleen zichtbaar voor mijn contacten> en alleen mijn nummer delen met mensen die ik vertrouw en echt ken. ",
                "c": "Geen profielfoto plaatsen",
                "answer": "b"
            }, {
                "platform": "whatsapp",
                "question": "img1>>>Valt dit onder cyberpesten?",
                "a": "Ja",
                "b": "Nee",
                "c": "Het ligt aan hoe de persoon het opneemt",
                "answer": "a"
            }
        ];
        this.instagramQuestions = [
            {
                "platform": "instagram",
                "question":
                    " Op jouw Instagram foto’s zie je een heleboel haat reacties staan van onbekende personen.",
                "a": "Je wordt er verdrietig van.",
                "b":
                    "Je reageert terug door middel van een soortgelijke reactie te plaatsen.",
                "c": "Je rapporteert de profielen en zet jouw account op privé.",
                "answer": "c"
            }, {
                "platform": "instagram",
                "question":
                    "Waarom is het beter om je profiel op privé te zetten?",
                "a": "Het is niet beter",
                "b":
                    "Zo heb je een beter overzicht over wie jouw foto's kunnen bekijken.",
                "c": "Je kunt de likes dan beter in de gaten houden.",
                "answer": "b"
            }, {
                "platform": "instagram",
                "question": "Hoelang blijft je foto nog op het internet nadat jij het hebt verwijdert?",
                "a": "Het is meteen weg.",
                "b": "3 maanden.",
                "c": "Het blijft voor altijd op het internet.",
                "answer": "c"
            },
            {
                "platform": "instagram",
                "question": "Waarom kun je beter geen halfnaakte foto's posten?",
                "a": "Het lokt de verkeerde personen en het gaat nooit meer van het internet af.",
                "b": "Je kunt die wel gewoon plaatsen.",
                "c": "Je kunt die plaatsen als je account prive is.",
                "answer": "a"
            },
            {
                "platform": "instagram",
                "question": "Welke foto kun je beter niet posten?",
                "a": "img1",
                "b": "img2",
                "c": "Ik weet het niet zeker",
                "answer": "b"
            },
            {
                "platform": "instagram",
                "question": "Welke foto kun je posten?",
                "a": "img1",
                "b": "img2",
                "c": "Allebei",
                "answer": "a"
            }, {
                "platform": "instagram",
                "question": "Waar heb je kans op als je op een linkje voor meer followers klikt?",
                "a": "Meer followers",
                "b": "Virussen",
                "c": "Virussen en gehackt worden",
                "answer": "c"
            },
            {
                "platform": "instagram",
                "question": ">>Welke foto van je lichaam is niet gepast om te posten?",
                "a": "img1",
                "b": "img2",
                "c": "Allebei zijn oke om te plaatsen",
                "answer": "a"

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
            }, {
                "platform": "youtube",
                "question":
                    "Wat doe je als iemand ongevraagd een filmpje van jouw op youtube zet?",
                "a": "Ik vraag de persoon om het direct te verwijderen.",
                "b": "Ik durf niet zo goed te vragen of ze het weghalen.",
                "c": "Ik hoop stilletjes dat niemand het ziet.",
                "answer": "a"
            }, {
                "platform": "youtube",
                "question":
                    "Je kijkt al 6 maanden naar Charlie de 14-jarige game vlogger waar je ook regelmatig op reageert.> Je vindt het heel tof wat hij altijd doet!> Op een dag wilt hij samen gamen, wat ga je doen?",
                "a": "Ik spreek meteen een tijd en dag af!",
                "b": "Ik heb  Charlie zijn gezicht eigenlijk nooit gezien en realiseer me dat hij misschien helemaal geen 14 is.> Ik sla het direct af!",
                "c": "Ik denk er een paar nachtjes over na.",
                "answer": "b"
            }, {
                "platform": "youtube",
                "question": "Je upload een filmpje op youtube, je krijgt gelijk van een aantal personen gemene reacties> het lijkt wel alsof ze het met elkaar afgesproken hebben!> Hoe noem je dit?",
                "a": "Grooming",
                "b": "Cyberpesten",
                "c": "Grooming",
                "answer": "b"
            }, {
                "platform": "youtube",
                "question": "Waarom kun je het best reacties uitschakelen op je youtube kanaal?",
                "a": "Sommige pedofielen zijn ook actief op Youtube channels en gebruiken de comments om contact met je te krijgen.",
                "b": "Zo zie je de meningen van andere mensen niet.",
                "c": "Zo letten de kijkers meer op het filmpje zelf",
                "answer": "a"
            }, {
                "platform": "youtube",
                "question": "Je ziet een filmpje op youtube waarin iemand wordt gepest.>Hoe reageer je hier op?",
                "a": "Ik plaats een reactie dat ik het een leuk filmpje vindt.",
                "b": "Ik doe niks.",
                "c": "Ik meld het filmpje.",
                "answer": "c"
            }, {
                "platform": "youtube",
                "question": "Wat kan je het beste doen als je een vervelende reactie van iemand krijgt onder een video?",
                "a": "Negeren",
                "b": "Boos terug reageren.",
                "c": "Reactie verwijderen.",
                "answer": "b"
            }, {
                "platform": "youtube",
                "question": "Wat doe je als youtubers zeggen dat je hun kleding moet kopen?",
                "a": "Ik koop het.",
                "b": "Ik vraag het aan mijn ouders.",
                "c": "Ik koop het niet",
                "answer": "b"
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
                "c": "Het kan soms koud zijn.",
                "answer": "b"
            },
            {
                "platform": "tiktok",
                "question":
                    "Je krijgt een reactie op je filmpje van Frederik1979 > die aangeeft dat hij een keer samen een filmpje zou willen maken.> Hoe reageer jij?",
                "a": "Lijkt me leuk, hoe meer zielen hoe meer vreugd!.",
                "b": "Ik negeer het",
                "c": "Ik blokkeer en rapporteer het profiel direct!",
                "answer": "c"
            },
            {

                "platform": "tiktok",
                "question": "Ik kan mijn account het beste delen met :",
                "a": "Familie en vrienden.",
                "b": "Iedereen.",
                "c": "Alleen mensen die in Nederland wonen.",
                "answer": "a"
            },
            {
                "platform": "tiktok",
                "question":
                    "Je reageert vaak op een leuke meid van jou leeftijd en andersom.>Het blijkt dat die leuke meid een man van 45 is die misbruik van je wilde maken.> Over welk begrip hebben we het?",
                "a": "Xenofobie",
                "b": "Pedofilie",
                "c": "Grooming",
                "answer": "c"
            }, {
                "platform": "tiktok",
                "question":
                    "Wat maakt Tik Tok zo aantrekkelijk voor pedofielen?",
                "a": "Het is anoniem.",
                "b": "De chat en de niets vermoedende dansende meiden.",
                "c": "De verschillende soorten filmpjes die er te zien zijn.",
                "answer": "b"
            }, {
                "platform": "tiktok",
                "question":
                    "Je profiel op Tik Tok staat standaard op .... ingesteld.",
                "a": "Openbaar",
                "b": "Prive",
                "c": "Alleen voor familie",
                "answer": "a"
            }, {
                "platform": "tiktok",
                "question": "Je ouders zeggen dat je te veel tijd besteed aan tiktok.>Wat doe je dan?",
                "a": "Ik ga stiekem verder als mijn ouders weg zijn.",
                "b": "Ik word boos.",
                "c": "Ik maak regels over bijvoorbeeld 1 uur per dag.",
                "answer": "c"
            }, {
                "platform": "tiktok",
                "question": "Wat doe je als je een filmpje ziet wat jij niet geschikt vindt?",
                "a": "Ik doe niks.",
                "b": "Ik zeg er wat van via de reacties.",
                "c": "",
                "answer": "b"
            }
        ];
        this.twitterQuestions = [{
                "platform": "twitter",
                "question": "Ben jij ook schuldig als je een gemene tweet retweet?",
                "a": "Ja",
                "b": "Nee",
                "c": "Misschien",
                "answer": "a"
            }, {
                "platform": "twitter",
                "question": "Een groepje besluit het nieuwe meisje in de klas een les te leren.>Samen besluiten zij om een twitter account met haar naam aan te maken en beledigende berichten te versturen.> Jouw beste vriend/vriendin behoort ook tot de groep en vind het een goed plan.> Hoe ga je hiermee om?",
                "a":
                    "Je geeft dit meteen door aan de leraar, omdat je weet hoe het aanvoelt om gepest te worden.",
                "b": "Je bemoeit je er niet mee, want ook jij werd in het begin gepest.",
                "c": "Ik doe mee ik mag het meisje ook niet!",
                "answer": "a"
            }, {
                "platform": "twitter",
                "question": "Kan je alles tweeten ook al is het niet zo netjes wat je zegt? ",
                "a": "Nee dat kan niet.",
                "b": "Tuurlijk wel we leven immers in Nederland waar vrijheid van meningsuiting belangrijk is.",
                "c": "Ondanks dat er vrijheid van meningsuiting is, is het wel belangrijk om over de consequenties van je tweet na te denken.",
                "answer": "c"
            }, {
                "platform": "twitter",
                "question": "Soms tweeten mensen vanuit een account met een heel ander identiteit dan dat zij zelf zijn.> Hoe noem je zo'n account?",
                "a": "Detective account.",
                "b": "Fake account.",
                "c": "Alias account.",
                "answer": "b"
            },
        ];


        switch (platform) {
            case "twitter":
                this.img = Game.loadImage("./assets/socialmedia/twitter.png");
                this.platform = "twitter";
                if (index == 0) {
                    this.img1 = "";
                    this.img2 = "";
                    this.img1x = 500;
                    this.img1y = 500;
                    this.img2x = 300;
                    this.img2y = 300;
                }
                this.platformQuestion.push(this.twitterQuestions[index]);
                break;
            case "whatsapp":
                this.img = Game.loadImage("./assets/socialmedia/wApp.png");
                this.platform = "whatsapp";
                if (index === 7) {
                    this.img1 = "./assets/socialmedia/pesten.jpg";
                    this.img1x = 400;
                    this.img1y = 50;
                    console.log("whatsap question")
                }
                this.platformQuestion.push(this.whatsappQuestions[index]);
                console.log(this.platformQuestion[0]);
                break;
            case "tiktok":
                this.img = Game.loadImage("./assets/socialmedia/tiktok.png");
                this.platform = "tiktok";
                this.platformQuestion.push(this.tiktokQuestions[index]);
                console.log(this.platformQuestion);
                break;
            case "youtube":
                this.img = Game.loadImage("./assets/socialmedia/youtube.png")
                this.platform = "youtube";
                this.platformQuestion.push(this.youtubeQuestions[index]);
                break;
            case "facebook":
                this.img = Game.loadImage("./assets/socialmedia/fb.png");
                this.platform = "facebook";
                this.platformQuestion.push(this.facebookQuestions[index]);
                break;
            case "snapchat":
                this.img = Game.loadImage("./assets/socialmedia/snapchat.png");
                this.platform = "snapchat";
                this.platformQuestion.push(this.snapchatQuestions[index]);
                // console.log(this.snapchatQuestions[index]);
                break;
            case "instagram":
                this.img = Game.loadImage("./assets/socialmedia/ins.png");
                if (index === 4) {
                    this.img1 = "./assets/socialmedia/goodpic.jpg",
                        this.img1x = 400;
                    this.img1y = 100;
                    this.img2x = 650;
                    this.img2y = 130;
                    this.img2 = "./assets/socialmedia/badpicture.jpg"
                }
                if (index === 5) {
                    this.img1 = "./assets/socialmedia/goodselfie.jpg",
                        this.img1x = 400;
                    this.img1y = 100;
                    this.img2x = 650;
                    this.img2y = 100;
                    this.img2 = "./assets/socialmedia/duckface.jpg"
                }
                this.platform = "instagram";
                this.platformQuestion.push(this.instagramQuestions[index]);
                break;
        }
        // console.log(this.platformQuestion);
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
            if (this.platformQuestion[0] == undefined) {
                this.writeTextToCanvas(ctx, "Je hebt alle " + this.platform + "vragen al beantwoord", 25, canvas.width / 2, canvas.height / 2);
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                    this.setAnsweringQuestion(false);
                    this.playerAnswer = "";
                }
            } else {
                if (this.playerAnswer == "") {
                    // console.log(this.platformQuestion);
                    this.writeTextToCanvas(ctx, this.platformQuestion[0].question + ">1: " + this.platformQuestion[0].a + ">2: " + this.platformQuestion[0].b + ">3: " + this.platformQuestion[0].c, 25, canvas.width / 2, canvas.height / 2);

                    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)) {
                        this.playerAnswer = "a";
                    } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_2)) {
                        this.playerAnswer = "b";
                    } else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_3)) {
                        this.playerAnswer = "c";
                    }
                } else {
                    if (this.playerAnswer == this.platformQuestion[0].answer) {
                        this.writeTextToCanvas(ctx, "Dat klopt", 25, canvas.width / 2, canvas.height / 2);
                        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                            this.setAnsweringQuestion(false);
                            this.playerAnswer = "";
                        }
                    } else {
                        this.writeTextToCanvas(ctx, "Dat klopt niet", 25, canvas.width / 2, canvas.height / 2);
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
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) == ">") {
                this.writeTextToCanvas(ctx, text.substr(i + 1, text.length), fontSize, xCoordinate, yCoordinate + (75 / 2), alignment, color);
                text = text.substr(0, i);
            }
        }

        ctx.font = `${fontSize}px Patrick Hand`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        if (text.trim() !== "3:") {
            if (text.trim() == "1: img1")
                ctx.fillText("1 Links ", xCoordinate, yCoordinate);
            else if (text.trim() == "2: img2")
                ctx.fillText("2:Rechts", xCoordinate, yCoordinate);

            else if (text.trim() === "img1") { }
            else
                ctx.fillText(text.trim(), xCoordinate, yCoordinate);
        }

        if (text.includes("img1"))
            this.drawImg(Game.loadImage(this.img1), ctx, this.img1x, this.img1y);

        if (text.includes("img2"))
            this.drawImg(Game.loadImage(this.img2), ctx, this.img2x, this.img2y);
    }


    private drawImg(img: HTMLImageElement, ctx: CanvasRenderingContext2D, xPos: number, yPos: number) {
        const x = xPos - img.width / 2;
        const y = yPos - img.height / 2;

        // If the image is not yet loaded, don't draw anything
        if (img.naturalWidth > 0) {
            // ctx.drawImage(this.img, x, y);
            // ctx.save();
            // ctx.translate(x + img.x / 2, y + img.y / 2);
            // ctx.scale(this.scale, this.scale);

            ctx.drawImage(img, xPos, yPos);

            // ctx.restore();
        }
    }

    public getXPos() {
        return this.xPos// + this.getImgWidth();
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