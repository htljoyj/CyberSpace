///<reference path="LevelScreen.ts"/>
class Cloud extends LevelScreen{

    constructor(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
        super(canvas,ctx)
        canvas.style.backgroundImage = "url('./assets/backgrounds/1_O-F1YaJaFMeijf6ewskl7A.gif')";
    }
}