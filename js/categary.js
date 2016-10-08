/**
 * Created by Administrator on 2016/8/30.
 */


window.onload=function(){
    //��໬��
    categaryLeft();
    //�Ҳ໬��
    //categaryRight();
};

//���� ���������



function categaryLeft(){
    //��ȡԪ��
    var cateLeft=document.querySelector(".categary-left");
    //ul
    var leftUl=cateLeft.querySelector("ul");
    //lis
    var lis=leftUl.querySelectorAll("li");
    //�������� ���ul�ĵ�ǰ��λ��
    var currentY=0;
    //ul��λ�ٽ�ֵ
    var maxTop=0;
    var minTop=cateLeft.offsetHeight-leftUl.offsetHeight;
    //ul ��ק�������ٽ�ֵ
    var maxswipe=maxTop+150;
    var minswipe=minTop-150;

    //����λ��
    var setTranslateY=function(){
        leftUl.style.transform="translateY("+y+"px)";
        leftUl.style.webkitTransform="translateY("+y+"px)";
    };

    //���ӹ���
    var addTransition=function(){
        leftUl.style.transition="all 0.3s";
        leftUl.style.webkitTransition="all 0.3s";
    };

    //ɾ������Ч��
    var removeTransiton=function(){
        leftUl.style.transition="none";
        leftUl.style.webkitTransition="none";
    };

    //�������
    itcast.tap(leftUl,function(e){
        //��Ҫ֪���ҵ��������һ��li
        //e.target ���Ի�ȡ�� �����¼�����СԪ��
        var target= e.target;
        //console.log(target);
        //������Ҫ����liҲ����a��ǩ�ĸ�Ԫ��
        target=target.parentNode;
        //console.log(target);

        //��� ���� ʵ�� �����Ԫ�������ʽ
        for(var i=0;i<lis.length; i++){
            lis[i].classList.remove("active");
            //�ֶ���li�������ֵ
            lis[i].index=i;
        }
        //��ǰ����� active��ʽ
        target.classList.add("active");
        //console.log(target.index);

        //��ul�ƶ� �ƶ��ľ���= -index*50��
        var y=-target.index*50;
        //��֤�����Ƿ�Խ��
        if(y>=maxTop){
            y=maxTop
        }
        if(y<=minTop){
            y=minTop;
        }
        //��ӹ���

        addTransition();
        //�ı�ul��λ��
        setTranslateY(y);
        //��current��ֵ ����ͬ��
        currentY=y;
    });
    //���������������
    var startY=0;
    var moveY=0;
    var distanceY=0;

    //�������� ul����
    leftUl.addEventListener("touchstart",function(e){
        startY= e.changedTouches[0].clientY;
    })
    leftUl.addEventListener("touchmove",function(e){
        moveY= e.changedTouches[0].clientY;
        //��������
        distanceY=moveY-startY;
        //��ul���Ŷ�����

        //�ƶ��ľ���=��ǰ��λ��+����ƶ��ľ���
        var y=currentY+distanceY;
        //��֤
        if(y>maxswipe){
            y=maxswipe;
        }
        if(y<minswipe){
            y=minswipe;
        }
        //�������Ч��
        removeTransiton();
        //ulλ�÷����ı�
        setTranslateY(y);
    })
    //����������
    //�¼�ð�ݵı���
    window.addEventListener("touchend",function(){
        //��¼ul��ǰ��λ��
        currentY=currentY+distanceY;
        if(currentY>maxTop){
            currentY=maxTop;
        }
        //��ӹ���Ч��
        addTransition();
        //�ƶ���ȥ
        setTranslateY(currentY);
        if(currentY<minTop){
            currentY=minTop;
            //���ӹ���
            addTransition();
            //�ı�ul��λ��
            setTranslateY(currentY);
        }
        //��������
        startY=0;
        moveY=0;
        distanceY=0;
    })
}















































