/**
 * Created by 61770 on 2017/2/6.
 */
(function () {
    window.Game = Class.extend({


        //初始化
        init:function (option) {
            //备份指针
            var self = this;

            option = option || {};
            this.fps = option.fps || 50;
            this.canvasid = option.canvasid;
            //获取上下文
            this.canvas = document.getElementById(this.canvasid);
            this.context = this.canvas.getContext('2d');

            //帧数对象
            this.frameUtil = new FrameUtil();

            //工具类对象
            this.staticSourceUtil = new StaticSourceUtil();
            this.allImageObj = {};
            this.staticSourceUtil.loadImage('r.json',function (allImageObj,imageArrLen,imageCount){
                self.allImageObj = allImageObj;
                if(imageCount == imageArrLen){
                    self.run();
                }
            });

            this.isGameOver = false;

        },
        //游戏运行
        run:function () {
            //备份指针
            var self = this;
            this.timer = setInterval(function () {
                self.runloop();
            },1000/this.fps);

            //房子对象
            this.fangzi = new Background({
                img: this.allImageObj["fangzi"],
                y:canvasH - 256 - 100,
                width:300,
                height:256,
                speed:2
            });

            //树对象
            this.shu = new Background({
                img: this.allImageObj["shu"],
                y:canvasH - 216 - 48,
                width:300,
                height:216,
                speed:3
            });

            //地板
            this.diban = new Background({
                img: this.allImageObj["diban"],
                y:canvasH  - 48,
                width:48,
                height:48,
                speed:4
            });

            //管道数组
            this.pipeArr = [];

            //鸟对象
            this.bird = new Bird();
        },
        //游戏循环
        runloop:function () {
            //清屏
            this.context.clearRect(0,0,canvasW,canvasH);
            //绘制帧数
            this.frameUtil.render();
            this.context.fillText('FPS / '+this.frameUtil.realfps,15,15);
            this.context.fillText('FON / '+this.frameUtil.currentFrame,15,30);

            //房子
            this.fangzi.update();
            this.fangzi.render();

            //树
            this.shu.update();
            this.shu.render();

            //地板
            this.diban.update();
            this.diban.render();

            //管道
            if(!this.isGameOver && this.frameUtil.currentFrame % 70 == 0){
                this.pipeArr.push(new Pipe());
            }

            //绘制管道
            for(var i=0;i<this.pipeArr.length;i++){
                this.pipeArr[i].update();
                this.pipeArr[i].render();
            }

            //绘制鸟对象
            this.bird.update();
            this.bird.render();

        },
        //游戏暂停
        pause:function () {
            clearInterval(this.timer);
        },
        //游戏结束
        gameOver:function () {
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();
            this.pipeArr.forEach(function (item,index) {
                item.pause();
            })
            this.isGameOver = true;
            this.bird.isdie = true;
        }
    });
})();