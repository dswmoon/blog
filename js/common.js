/**
 * Created by wcs on 2016/8/30.
 */

//   定义一个 itcast 对象
var itcast={};

// itcast 里面封装 给盒子绑定过渡事件结束的 方法
// 给一个盒子绑定事件，需要哪些 条件：
//  1、操作对象   2、事件  3、  事件触发后需要执行的代码
//box.onclick=function(){}
// 参数说明： dom: 绑定事件的对象  callback: 事件触发后需要执行的代码
itcast.TransitionEnd=function(dom,callback){
    //     给dom 绑定 transitionEnd事件， 事件触发后 执行 callback
    //null  o  嘿嘿
    // dom 不为空且为一个对象
    if(dom&& typeof dom=='object'){

        dom.addEventListener('transitionEnd',function(){
            //当callback 不为空是 执行 callback
            /*if(callback){
             callback();
             }*/
            callback&&callback();
        });

        dom.addEventListener('webkitTransitionEnd',function(){
            callback&&callback();
        });
    }
}

//给一个盒子 绑定事件 需要哪些条件：
//1.操作对象 2.事件 3.事件触发后  需要执行的代码
//参数：dom绑定事件的对象  callback事件触发后 需要执行的代码


itcast.tap=function(dom,callback){

//    判断dom是否是对象
    if(dom&&typeof dom=='object'){
        // 定义变量记录起始，结束事件
        var startTime=0;
        var endTime=0;
        var isMove=false;
        dom.addEventListener('touchstart',function(){
            //    记录触屏开始的时间
            startTime=Date.now();
        })
        // 记录是否触发 触屏移动事件
        dom.addEventListener('touchmove',function(){
            isMove=true;
        })
        //
        dom.addEventListener('touchend',function(e){
            //    记录结束时间
            endTime=Date.now();
            //     判断 满足条件 当点击事件处理
            if(!isMove&&endTime-startTime<150){
                //    执行点击的代码
                callback&&callback(e);
            }
        })

    }
}




























