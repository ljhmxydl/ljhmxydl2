/**
 * Created by 61770 on 2017/2/6.
 */
(function () {
    window.Background = Class.extend({
        init:function (option) {
            option = option || {};
            this.img = option.img;
            this.x = option.x || 0;
            this.y = option.y || 0;
            this.width = option.width || 0;
            this.height = option.height || 0;

            //画的次数
            this.count = parseInt(canvasW / this.width)+1;
            //速度
            this.speed = option.speed || 2;
        },

        //更新
        update:function () {
            this.x -= this.speed;
            if(this.x < -this.count*this.width){
                this.x = 0;
            }
        },

        //绘制
        render:function () {
            for (var i=0;i<2*this.count;i++){
                game.context.drawImage(this.img,0,0,this.width,this.height,this.x+this.width*i,this.y,this.width,this.height);
            }

        },

        //暂停
        pause:function () {
            this.speed = 0;
        }
    });
})();