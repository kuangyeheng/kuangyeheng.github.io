(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.DragByTranslate = factory();
}(this, function () {
    function DragByTranslate(ele){
        this.ele = ele;
        this.width=ele.offsetWidth;
        this.height=ele.offsetHeight;
        this.pagePositon=this.getPagePosition(ele);
        this.winWidth=document.documentElement.clientWidth;
        this.winHeight=document.documentElement.clientHeight;
        this.minTranslateX=-this.pagePositon.left;
        this.maxTranslateX=this.winWidth - this.pagePositon.left - this.width;
        this.minTranslateY=-this.pagePositon.top;
        this.maxTranslateY=this.winHeight - this.pagePositon.top - this.height;
    }
    DragByTranslate.prototype.init=function () {
        this.drag(this.ele);
    };
    DragByTranslate.prototype.getPagePosition=function (ele) {
        var left=0,top=0;
        while (ele) {
            left += ele.offsetLeft;
            top += ele.offsetTop;
            ele = ele.offsetParent; 
        }
        return {left: left,top: top};
    };
    DragByTranslate.prototype.drag=function  (ele) {
        var _this=this;
        function touchMove(e) {
            e.preventDefault();
            if (e.targetTouches.length == 1) {
                var finger = e.touches[0],translateX,translateY;
                translateX=finger.clientX - _this.width/2 - _this.pagePositon.left;
                translateY=finger.clientY - _this.height/2 - _this.pagePositon.top;
                translateX = translateX < _this.minTranslateX ? _this.minTranslateX : translateX;
                translateY = translateY < _this.minTranslateY ? _this.minTranslateY : translateY;
                translateX = translateX > _this.maxTranslateX ? _this.maxTranslateX : translateX;
                translateY = translateY > _this.maxTranslateY ? _this.maxTranslateY : translateY;
                ele.style.transform='translate('+translateX+'px,'+translateY+'px)';
                ele.style.webkitTransform='translate('+translateX+'px,'+translateY+'px)';
            }
        }
        function touchEnd () {
            ele.removeEventListener('touchmove',touchMove);
            ele.removeEventListener('touchend',touchEnd);
        }
        ele.addEventListener('touchstart',function (e) {
            e.preventDefault();
            _this.width=ele.offsetWidth;
            _this.height=ele.offsetHeight;
            _this.pagePositon=_this.getPagePosition(ele);
            _this.winWidth=document.documentElement.clientWidth;
            _this.winHeight=document.documentElement.clientHeight;
            _this.minTranslateX=-_this.pagePositon.left;
            _this.maxTranslateX=_this.winWidth - _this.pagePositon.left - _this.width;
            _this.minTranslateY=-_this.pagePositon.top;
            _this.maxTranslateY=_this.winHeight - _this.pagePositon.top - _this.height;
            ele.addEventListener('touchmove', touchMove, false);
            ele.addEventListener('touchend', touchEnd, false);
        },false);
    };

    return DragByTranslate;
}));
