# CyberSpace
        for(let i = 0; i< this.icon.length; i++) {
            if(this.player.isColliding(this.icon[i])) {
                this.icon[i].setAnsweringQuestion(true);
                this.icon[i].drawQuestion(this.ctx, this.canvas);
                if(!this.icon[i].isAnsweringQuestion()) {
                   this.icon.splice(i, 1); 
                }
            } 
        }
