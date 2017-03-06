/**
 * Created by 61770 on 2017/2/6.
 */
(function () {
    window.Pipe = Class.extend({
        init:function () {
            this.dir = _.random(0,1);//0：向下 1：向上
            this.width = 148;
            this.height = _.random(80,canvasH*0.5);
            this.x = canvasW;
            this.y = this.dir ==0?0:canvasH - this.height - 48;
            this.speed = 4;
        },

        update:function () {
            this.x -= this.speed;
            if(this.x < -this.width){
                game.pipeArr = _.without(game.pipeArr,this);
            }

            //判断鸟是否碰撞
            if(game.bird.x >= this.x - game.bird.width && game.bird.x <= this.x +this.width){
                if(this.dir == 0){
                    if(game.bird.y <= this.height){
                        game.gameOver();
                    }
                }else if(this.dir == 1){
                    if(game.bird.y+game.bird.height >= this.y){
                        game.gameOver();
                    }
                }

            }
        },

        render:function () {
            if(this.dir == 0){
                game.context.drawImage(game.allImageObj["pipe1"],0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            }else if(this.dir == 1){
                game.context.drawImage(game.allImageObj["pipe0"],0,0,this.width,this.height,this.x,this.y,this.width,this.height);
            }
        },

        pause:function () {
            this.speed = 0;
        }

    });
})();