/**
 * @Author : Ice
 * @Date : 2016-04-14
 */

/**
 * 设置第二个级联下拉菜单
 */
function setSubSel(){
    var sec = document.querySelector("#sel2");
    //处理初始状态
    if(!event){
        sec.options[0] = new Option("北京航空航天大学","bh");
        sec.options[1] = new Option("北京大学","bd");
        sec.options[2] = new Option("中国人民大学","rd");
    }
    else{
        var val = event.target.value;
        switch(val){
            case "bj" :
                sec.options[0] = new Option("北京航空航天大学","bh");
                sec.options[1] = new Option("北京大学","bd");
                sec.options[2] = new Option("中国人民大学","rd");
                break;
            case "sh" :
                sec.options[0] = new Option("复旦大学","fd");
                sec.options[1] = new Option("同济大学","tj");
                sec.options[2] = new Option("上海交通大学","sj");
                break;
            case "gz" :
                sec.options[0] = new Option("广州大学1","g1");
                sec.options[1] = new Option("广州大学2","g2");
                sec.options[2] = new Option("广州大学3","g3");
                break;
        }
    }
}
/**
 * 设置radio事件
 */
function radioEvent(){
    var radioList = document.getElementsByName("stu");
    if(radioList[0].checked){
        document.querySelector(".sel").classList.remove("hide-element");
        document.querySelector(".input-notstu").classList.add("hide-element");
    }
    else{
        document.querySelector(".input-notstu").classList.remove("hide-element");
        document.querySelector(".sel").classList.add("hide-element");
    }
    console.log("111");
}

function init(){
    //处理初始状态
    setSubSel();
    radioEvent();
    //绑定事件
    document.querySelector("#sel1").addEventListener("change",setSubSel);
    var radioList = document.querySelectorAll(".myradio");
    for(var i=0; i<radioList.length; i++){
        radioList[i] .addEventListener("change",radioEvent);
    }

}
init();