/**
 * Created by 61770 on 2017/2/6.
 */
(function () {
    window.Bird = Class.extend({
        init:function () {
            this.x = (canvasW -85)/2;
            this.y = 100;
            this.width = 85;
            this.height = 60;

            //翅膀状态 0 1 2
            this.swing = 0;
            //翅膀山东频率
            this.swingRate = 5;
            //下落时的帧数
            this.dropFrame = game.frameUtil.currentFrame;
            //y变化量
            this.dY = 0;

            //变化角度
            this.rotateAngle = 0;
            //鸟的状态
            this.state = 0;//0：向上 1：向下
            this.birdClick();
            //空气阻力
            this.deltaY = 1;

            //鸟是否死亡
            this.isdie = false;
            //死亡动画的索引
            this.dieAnimationIndex = 0;
        } ,
        birdClick:function () {
            var self = this;
            game.canvas.addEventListener('mousedown',function () {
                self.state = 1;
                self.deltaY = 1;
                self.rotateAngle = -30;
            })
        },
        update:function () {
            //死亡动画
            if(this.isdie){
                this.dieAnimationIndex++;
                if(this.dieAnimationIndex == 30){
                    game.pause();
                }
                return;
            }

            //改变翅膀状态
            if(game.frameUtil.currentFrame % this.swingRate == 0){
                this.swing+=1;
                if(this.swing > 2){
                    this.swing = 0;
                }
            }

            //判断小鸟状态
            if(this.state == 0){
                //改变角度
                this.rotateAngle++;
                //自由落体
                this.dY = 0.01*Math.pow((game.frameUtil.currentFrame - this.dropFrame),2);
            }else if(this.state == 1){
                this.deltaY++;
                this.dY = -14 + this.deltaY;
                // 判断
                if(this.dY > 0){  // 下落
                    this.state = 0;
                    // 更新下落的时候的帧数
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }

            this.y += this.dY;
            //封顶操作
            if(this.y < 0 ){
                this.y = 0;
            }

            //碰地判断
            if(this.y > canvasH - this.height - 48){
                game.gameOver();
            }


        },

        render:function () {

            //绘制死亡动画
            if(this.isdie){
                var sWidth = 325, sHeight = 138;
                var row = parseInt(this.dieAnimationIndex / 5);
                var col = this.dieAnimationIndex % 5;
                game.context.drawImage(game.allImageObj["blood"],col*sWidth,row*sHeight,sWidth,sHeight,this.x-100,this.y,sWidth,sHeight);

                game.context.drawImage(game.allImageObj["gameover"],0,0,626,144,(canvasW - 626)*0.5,(canvasH - 144)*0.5,626,144);
                return;
            }


            game.context.save();
            game.context.translate((this.x+0.5*this.width),(this.y+0.5*this.height));
            game.context.rotate(this.rotateAngle*Math.PI/180);
            game.context.translate(-(this.x+0.5*this.width),-(this.y+0.5*this.height));
            game.context.drawImage(game.allImageObj["bird"],this.swing*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            game.context.restore();
        }
    });
})();