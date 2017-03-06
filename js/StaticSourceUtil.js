/**
 * Created by 61770 on 2017/2/6.
 */
//加载资源，返回
(function () {
    window.StaticSourceUtil = Class.extend({
        init:function () {
           this.allImageObj = {};
        },
        //加载图片资源
        loadImage:function (jsonUrl,callback) {
            //备份指针
            var self = this;
            //创建xhr对象
            if(window.XMLHttpRequest){
                var xhr = new XMLHttpRequest();
            }else{
                var xhr = new ActiveXObject("Microsoft XMLHTTP");
            }

            xhr.open('get',jsonUrl);
            xhr.send();
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4){
                    if (xhr.status >=200 && xhr.status <300 || xhr.status == 304){
                        var imageCount = 0;
                        var responText = xhr.responseText;
                        var responJson = JSON.parse(responText);
                        var imageArr = responJson.images;
                        for(var i=0;i<imageArr.length;i++){
                            //创建图像对象
                            var image = new Image();
                            image.src = imageArr[i].src;
                            image.index = i;
                            image.onload = function () {
                                imageCount++;
                                self.allImageObj[imageArr[this.index].name] = this;
                                callback(self.allImageObj,imageArr.length,imageCount);
                            }
                        }
                    }
                }
            }
        }
    });
})();