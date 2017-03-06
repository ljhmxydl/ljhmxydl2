/**
 * Created by 61770 on 2017/2/6.
 */
(function () {
    window.FrameUtil = Class.extend({
        init:function () {
            this.currentFrame = 0;//当前总帧数
            this.sFrame = 0;
            this.sTime = new Date();
            this.realfps = 0;
        },
        render:function () {
            this.currentFrame++;
            var currentTime = new Date();
            if(currentTime - this.sTime >= 1000){
                this.realfps = this.currentFrame - this.sFrame;
                this.sFrame = this.currentFrame;
                this.sTime = currentTime;
            }
        }
    });
})();