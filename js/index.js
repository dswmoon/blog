/**
 * Created by Administrator on 2016/8/29.
 */
window.onload=function(){
    //������
    search();
    //����ʱ
    downTime();
    //�ֲ�ͼģ��
    banner();
};

//�������ɫ
function search(){
    //��ȡ��Ҫ�ı�ǩ
    var search=document.querySelector(".header-in");
    var bannerBox=document.querySelector(".jd-banner");
    //��ȡbanner�ĸ߶�
    var h=bannerBox.offsetHeight;
    //����������¼͸����
    var opacity=0;
    //�󶨹����¼�
    window.onscroll=function(){
        //��ȡҳ�泬��������ĸ߶�
        var top=document.body.scrollTop;
        //�жϹ���������
        if(top<=h){
            opacity=top/h*0.85;
        }else{
            opacity=0.85;
        }
        //�����ǻ�õ�͸�������ø� header-in ��ǩ

        search.style.background="rgba(201,21,35,"+opacity+")";
    };
}

//����ʱģ��
function downTime(){
    //��ȡ��Ҫ�õ���Ԫ��
    var timeBox=document.querySelector(".downtime");
    var spans=timeBox.querySelectorAll("span");
    //��Ŷ�ʱ��
    var timer=null;
    //ʵ�ֵ���ʱ
    var  time=5*60*60;
    //ʹ�ö�ʱ�� ʵ�ֵ���ʱ
    timer=setInterval(function(){
        //��ʱ�� ÿ���Ӽ�1
        time--;
        if(time<0){
            clearInterval(timer);
        }
        //�ֱ��ȡʱ����
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);
        //��ʱ�����õ�ҳ����
        spans[0].innerHTML=h>=10?Math.floor(h/10):0;
        spans[1].innerHTML=h>=10?Math.floor(h%10):h;

        spans[3].innerHTML=m>=10?Math.floor(m/10):0;
        spans[4].innerHTML=m>=10?Math.floor(m%10):m;

        spans[6].innerHTML=s>=10?Math.floor(s/10):0;
        spans[7].innerHTML=s>=10?Math.floor(s%10):s;
    },1000);
}

//�ֲ�ͼģ��

    //1.��ʱ�� �Զ������ֲ�ͼ
    //2.�Ǳ�  �Զ��л�
    //3.�û����Ի��� ͼƬ���Ż���
    //4.���û���������ʱ  �жϻ���������
    //5.�����ٽ�ֵ �л�ͼƬ
    //6.С���ٽ�ֵ ������ȥ
function banner(){
    //��ȡҪ���õ�Ԫ��
    var bannerBox=document.querySelector(".jd-banner");
    //console.log(bannerBox.offsetHeight);
    var w=bannerBox.offsetWidth;
    //��ȡul
    var imgBox=document.querySelector("ul");
    //��ȡol
    var pointBox=document.querySelector("ol");

    //��ȡul�����li��ǩ
    var points=pointBox.querySelectorAll("li");

    //��ʱ���ֲ�
    var timer=null;
    var  index=1;

    //�ı�ul��λ��
    var setTranslateX=function(currX){
        imgBox.style.transform="translateX("+currX+"px)";
        imgBox.style.webkitTransform="translateX("+currX+"px)";
    };
    //���ӹ���Ч��
    var addTransition=function(){
        imgBox.style.transition="all 0.4s";
        imgBox.style.webkitTransition="all 0.4s";
    };
    //ɾ������Ч��
    var removeTransition=function(){
        imgBox.style.transition="none";
        imgBox.style.webkitTransition="none";
    };
//   ��ʱ���ֲ�
    timer=setInterval(function(){
        index++;
        //���ӹ���Ч��
        addTransition();
        //�ı�ul��λ��
        var currX=-index*w;
        setTranslateX(currX);
    },1000);
    //ÿ�ι��Ƚ����� ����ֲ�ͼ�Ƿ�Խ��
    itcast.TransitionEnd(imgBox,function(){
        //���ݼ��
        if(index>=9){
            index=1;
        }
        if(index<=0){
            index=8;
        }
        //ɾ������Ч��
        removeTransition();
        //��ת �ı�ul��λ��
        var currX=-index*w;
        setTranslateX(currX);
        //�Ǳ�ͬ��
        setPoints(index);
    });
    //���ýǱ���ʽ
    var setPoints=function(index){
        //���� �ȸɵ����нǱ��active ��ͻ���Լ���active
        for(var i=0; i<points.length; i++){
            points[i].classList.remove("active");
        }
        points[index-1].classList.add("active");
    };

    //��������  ͼƬ���Ż���

    //��¼��������
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var ismove=false;

    //�󶨴����¼�
    bannerBox.addEventListener("touchstart",function(e){
        //�����¼���ʼʱ ��Ļֹͣ����  ��ռ�ʱ��
        clearInterval(timer);
        //��ȡ������ʼ������
        startX= e.changedTouches[0].clientX;
    })
    //��touchmove�¼�
    bannerBox.addEventListener("touchmove",function(e){
        ismove=true;
        moveX= e.changedTouches[0].clientX;
        //��ȡ �ƶ��ľ���
        distanceX=moveX-startX;
        //�������� ul���� ul��ʵ������ x=Ĭ��+distan
        var currX=-index*w+distanceX;
        //ʵʱ�ı�ul������
        setTranslateX(currX);
    })


    //��touchend�¼�
    bannerBox.addEventListener("touchend",function(){
        //�жϻ����ľ��� �������1/3�� �л�ͼƬ ���� ������ȥ
        if(ismove&&Math.abs(distanceX)>w/3){
            if(distanceX>0){
                //��ʾ��һ��ͼƬ
                index--;
            }
            if(distanceX<0){
                //��ʾ��һ��ͼƬ
                index++;
            }
            var currX=-index*w;
            //��ӹ���Ч��
            addTransition();
            //����ul��λ��
            setTranslateX(currX);
        }else {
            //������ȥ
            //�ٻ���ԭ���ĵط�
            var currX=-index*w;
            //��ӹ���Ч��
            addTransition();
            //����ul��λ��
            setTranslateX(currX);
        }
        //��������
        startX=0;
        moveX=0;
        distanceX=0;
        ismove=false;
        //������ʱ�� ��ʼ�ֲ�
        timer=setInterval(function(){
            index++;
            //��ӹ���Ч��
            addTransition();
            //�ı�ul��λ��
            var currX=-index*w;
            setTranslateX(currX);
        },1000);
    })
    window.onresize=function(){
        //���»�ȡbanner�Ŀ��
        w=bannerBox.offsetWidth;
        //�������� ul��λ��
        //��ӹ���Ч��
        addTransition();
        //�ı�ul��λ��
        var currX=-index*w;
        setTranslateX(currX);
    };



}































