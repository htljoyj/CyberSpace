///<reference path="LevelScreen.ts"/>
class Cloud extends LevelScreen{

    constructor(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
        super(canvas,ctx)
        canvas.style.backgroundImage = "url('./assets/backgrounds/RevolvingAdolescentCougar-size_restricted.gif')";
    }
}