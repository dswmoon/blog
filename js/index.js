/**
 * Created by Administrator on 2016/8/29.
 */
window.onload=function(){
    //搜索框
    search();
    //倒计时
    downTime();
    //轮播图模块
    banner();
};

//搜索框变色
function search(){
    //获取需要的标签
    var search=document.querySelector(".header-in");
    var bannerBox=document.querySelector(".jd-banner");
    //获取banner的高度
    var h=bannerBox.offsetHeight;
    //声明变量记录透明度
    var opacity=0;
    //绑定滚动事件
    window.onscroll=function(){
        //获取页面超出浏览器的高度
        var top=document.body.scrollTop;
        //判断滚动的区间
        if(top<=h){
            opacity=top/h*0.85;
        }else{
            opacity=0.85;
        }
        //将我们获得的透明度设置给 header-in 标签

        search.style.background="rgba(201,21,35,"+opacity+")";
    };
}

//倒计时模块
function downTime(){
    //获取需要用到的元素
    var timeBox=document.querySelector(".downtime");
    var spans=timeBox.querySelectorAll("span");
    //存放定时器
    var timer=null;
    //实现倒计时
    var  time=5*60*60;
    //使用定时器 实现倒计时
    timer=setInterval(function(){
        //定时器 每秒钟减1
        time--;
        if(time<0){
            clearInterval(timer);
        }
        //分别获取时分秒
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);
        //将时间设置到页面中
        spans[0].innerHTML=h>=10?Math.floor(h/10):0;
        spans[1].innerHTML=h>=10?Math.floor(h%10):h;

        spans[3].innerHTML=m>=10?Math.floor(m/10):0;
        spans[4].innerHTML=m>=10?Math.floor(m%10):m;

        spans[6].innerHTML=s>=10?Math.floor(s/10):0;
        spans[7].innerHTML=s>=10?Math.floor(s%10):s;
    },1000);
}

//轮播图模块

    //1.定时器 自动播放轮播图
    //2.角标  自动切换
    //3.用户可以滑动 图片跟着滑动
    //4.当用户结束滑动时  判断滑动距离里
    //5.大于临界值 切换图片
    //6.小雨临界值 吸附回去
function banner(){
    //获取要利用的元素
    var bannerBox=document.querySelector(".jd-banner");
    //console.log(bannerBox.offsetHeight);
    var w=bannerBox.offsetWidth;
    //获取ul
    var imgBox=document.querySelector("ul");
    //获取ol
    var pointBox=document.querySelector("ol");

    //获取ul里面的li标签
    var points=pointBox.querySelectorAll("li");

    //定时器轮播
    var timer=null;
    var  index=1;

    //改变ul的位置
    var setTranslateX=function(currX){
        imgBox.style.transform="translateX("+currX+"px)";
        imgBox.style.webkitTransform="translateX("+currX+"px)";
    };
    //增加过度效果
    var addTransition=function(){
        imgBox.style.transition="all 0.4s";
        imgBox.style.webkitTransition="all 0.4s";
    };
    //删除过度效果
    var removeTransition=function(){
        imgBox.style.transition="none";
        imgBox.style.webkitTransition="none";
    };
//   定时器轮播
    timer=setInterval(function(){
        index++;
        //增加过度效果
        addTransition();
        //改变ul的位置
        var currX=-index*w;
        setTranslateX(currX);
    },1000);
    //每次过度结束后 检测轮播图是否越界
    itcast.TransitionEnd(imgBox,function(){
        //数据检测
        if(index>=9){
            index=1;
        }
        if(index<=0){
            index=8;
        }
        //删除过度效果
        removeTransition();
        //跳转 改变ul的位置
        var currX=-index*w;
        setTranslateX(currX);
        //角标同步
        setPoints(index);
    });
    //设置角标样式
    var setPoints=function(index){
        //排他 先干掉所有角标的active 再突出自己的active
        for(var i=0; i<points.length; i++){
            points[i].classList.remove("active");
        }
        points[index-1].classList.add("active");
    };

    //触屏滑动  图片跟着滑动

    //记录滑屏数据
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var ismove=false;

    //绑定触屏事件
    bannerBox.addEventListener("touchstart",function(e){
        //触屏事件开始时 屏幕停止滑动  清空计时器
        clearInterval(timer);
        //获取触屏开始的数据
        startX= e.changedTouches[0].clientX;
    })
    //绑定touchmove事件
    bannerBox.addEventListener("touchmove",function(e){
        ismove=true;
        moveX= e.changedTouches[0].clientX;
        //获取 移动的距离
        distanceX=moveX-startX;
        //触屏滑动 ul跟随 ul的实际坐标 x=默认+distan
        var currX=-index*w+distanceX;
        //实时改变ul的坐标
        setTranslateX(currX);
    })


    //绑定touchend事件
    bannerBox.addEventListener("touchend",function(){
        //判断滑动的距离 如果大于1/3则 切换图片 否则 吸附回去
        if(ismove&&Math.abs(distanceX)>w/3){
            if(distanceX>0){
                //显示上一张图片
                index--;
            }
            if(distanceX<0){
                //显示下一张图片
                index++;
            }
            var currX=-index*w;
            //添加过度效果
            addTransition();
            //设置ul的位置
            setTranslateX(currX);
        }else {
            //吸附回去
            //再回来原来的地方
            var currX=-index*w;
            //添加过度效果
            addTransition();
            //设置ul的位置
            setTranslateX(currX);
        }
        //数据重置
        startX=0;
        moveX=0;
        distanceX=0;
        ismove=false;
        //开启计时器 开始轮播
        timer=setInterval(function(){
            index++;
            //添加过度效果
            addTransition();
            //改变ul的位置
            var currX=-index*w;
            setTranslateX(currX);
        },1000);
    })
    window.onresize=function(){
        //重新获取banner的宽度
        w=bannerBox.offsetWidth;
        //重新设置 ul的位置
        //添加过度效果
        addTransition();
        //改变ul的位置
        var currX=-index*w;
        setTranslateX(currX);
    };



}































